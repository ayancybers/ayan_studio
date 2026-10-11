import crypto from 'node:crypto';
import { PACKAGES, calculatePricing, getPricingConfig, isPackageAvailable } from '../lib/pricing.js';
import {
  createTuwaiqPayBill,
  getTuwaiqPaySupportedMethods,
  isTuwaiqPayReady,
  openTuwaiqPayReceipt
} from '../lib/server/tuwaiqpay.js';

const ALLOWED_CARS = new Set(['سيدان', 'SUV', 'كوبيه', 'فاخر / رياضي', 'Sedan', 'Coupe', 'Luxury / Sport', 'Luxury / Sports']);
const ALLOWED_REGIONS = new Set(['القطيف', 'سيهات', 'الدمام', 'الخبر', 'حفر الباطن', 'Qatif', 'Saihat', 'Dammam', 'Khobar', 'Hafar Al Batin']);
const RATE_LIMIT = globalThis.__ayanTuwaiqRateLimit || new Map();
globalThis.__ayanTuwaiqRateLimit = RATE_LIMIT;

const PAYMENT_METHODS = Object.freeze({
  tuwaiqpay_mada: { codes: ['MADA'], pricingMethod: 'tuwaiqpay_mada', label: 'mada' },
  tuwaiqpay_visa_local: { codes: ['VISA', 'MASTER'], pricingMethod: 'tuwaiqpay_visa_local', label: 'Visa / Mastercard - Saudi issued' },
  tuwaiqpay_visa_international: { codes: ['VISA', 'MASTER'], pricingMethod: 'tuwaiqpay_visa_international', label: 'Visa / Mastercard - international' },
  tuwaiqpay_amex: { codes: ['AMEX'], pricingMethod: 'tuwaiqpay_amex', label: 'American Express' },
  tuwaiqpay_apple_pay: { codes: ['APPLE_PAY'], pricingMethod: 'tuwaiqpay_apple_pay', label: 'Apple Pay' },
  tuwaiqpay_stc_pay: { codes: ['STC_PAY'], pricingMethod: 'tuwaiqpay_stc_pay', label: 'STC Pay' }
});

export default async function handler(req, res) {
  setSecurityHeaders(res);
  if (req.method === 'GET') {
    if (String(req.query?.config || '') === '1') return getPaymentConfig(res);
    return verifyReceipt(req, res);
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const requestId = makeRequestId();
  if (!sameOrigin(req)) return res.status(403).json({ error: 'Forbidden origin', requestId });
  if (!isTuwaiqPayReady()) return res.status(503).json({ error: 'TuwaiqPay payment, webhook, and invoice settings are not complete yet.', requestId });

  const body = parseBody(req);
  if (String(body.website || '').trim()) return res.status(400).json({ error: 'Invalid request', requestId });

  const name = limit(body.name, 80);
  const email = limit(String(body.email || '').trim().toLowerCase(), 160);
  const packageKey = limit(body.packageKey, 20);
  const paymentMethod = limit(body.paymentMethod, 50);
  const carType = limit(body.carType, 40);
  const shootRegion = limit(body.shootRegion, 60);
  const lang = body.lang === 'en' ? 'en' : 'ar';
  const phone = normalizeSaudiPhone(body.phone);
  const method = PAYMENT_METHODS[paymentMethod];

  if (!name || !email || !packageKey || !paymentMethod || !carType || !shootRegion || !phone) {
    return res.status(400).json({ error: 'Missing required booking details', requestId });
  }
  if (!isPackageAvailable(packageKey) || !ALLOWED_CARS.has(carType) || !ALLOWED_REGIONS.has(shootRegion)) {
    return res.status(400).json({ error: 'Invalid booking option', requestId });
  }
  if (!/^9665\d{8}$/.test(phone)) return res.status(400).json({ error: 'Invalid Saudi mobile number', requestId });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Enter a valid email address', requestId });
  if (body.termsAgreement !== true) return res.status(400).json({ error: 'Terms and conditions must be accepted before payment.', requestId });
  if (!method) return res.status(400).json({ error: 'Choose a supported TuwaiqPay payment method.', requestId });

  const configuredMethods = new Set(getTuwaiqPaySupportedMethods());
  const supportedPaymentMethods = method.codes.filter((code) => configuredMethods.has(code));
  if (!supportedPaymentMethods.length) return res.status(400).json({ error: 'This payment method is not enabled for the merchant account.', requestId });

  const ip = getClientIp(req);
  const now = Date.now();
  const last = RATE_LIMIT.get(ip) || 0;
  if (now - last < 15000) return res.status(429).json({ error: 'Please wait before starting another payment.', requestId });
  RATE_LIMIT.set(ip, now);
  cleanupRateLimit(now);

  const pricing = calculatePricing(packageKey, method.pricingMethod);
  const pkg = PACKAGES[packageKey];
  const phoneWithCountryCode = `+${phone}`;
  const packageName = lang === 'en' ? pkg.en : pkg.ar;
  const description = [
    'Ayan Photography',
    packageName,
    method.label,
    carType,
    shootRegion,
    lang
  ].join(' | ').slice(0, 180);
  const baseUrl = getBaseUrl(req);
  const billPayload = {
    actionDateInDays: 3,
    amount: pricing.total,
    currencyId: 1,
    supportedPaymentMethods,
    description,
    customerName: name,
    customerMobilePhone: phoneWithCountryCode,
    customerEmail: email,
    includeVat: false,
    continueWithMaxCharge: false,
    returnUrl: `${baseUrl}/payment-success?provider=tuwaiqpay`
  };

  try {
    const bill = await createTuwaiqPayBill(billPayload);
    return res.status(200).json({
      success: true,
      provider: 'tuwaiqpay',
      requestId,
      transactionId: bill.transactionId,
      merchantTransactionId: bill.merchantTransactionId,
      billId: bill.billId || '',
      redirectUrl: bill.link,
      paymentMethod,
      subtotal: pricing.subtotal,
      paymentFee: pricing.paymentFee,
      paymentFeePercent: pricing.paymentFeePercent,
      paymentFeeFixed: pricing.paymentFeeFixed,
      total: pricing.total,
      amount: pricing.total
    });
  } catch (error) {
    console.error('TuwaiqPay bill creation failed', {
      requestId,
      packageKey,
      paymentMethod,
      amount: pricing.total,
      error: error?.message || String(error)
    });
    return res.status(502).json({ error: 'Unable to prepare TuwaiqPay checkout. Please try again.', requestId });
  }
}

function getPaymentConfig(res) {
  const config = getPricingConfig();
  const tuwaiqPayMethods = getTuwaiqPaySupportedMethods();
  return res.status(200).json({
    currency: 'SAR',
    tuwaiqPayConfigured: isTuwaiqPayReady(),
    tuwaiqPayMethods,
    availablePaymentMethods: ['tuwaiqpay', 'tabby', 'tamara'],
    tabbyConfigured: Boolean(String(process.env.TABBY_SECRET_KEY || '').trim()),
    tamaraConfigured: Boolean(String(process.env.TAMARA_API_TOKEN || '').trim()),
    testMode: ['true', '1', 'yes', 'on'].includes(String(process.env.PAYMENT_TEST_MODE || '').trim().toLowerCase()),
    pricing: config,
    packages: Object.fromEntries(
      Object.entries(PACKAGES).filter(([key]) => isPackageAvailable(key)).map(([key, value]) => [key, { price: value.price, originalPrice: value.originalPrice ?? value.price, discount: value.discount ?? 0, symbol: value.symbol ?? '', ar: value.ar, en: value.en }])
    )
  });
}

function verifyReceipt(req, res) {
  const token = String(req.query?.receipt || '').trim();
  if (!token) return res.status(400).json({ error: 'Missing invoice receipt.' });
  try {
    return res.status(200).json(openTuwaiqPayReceipt(token));
  } catch (error) {
    return res.status(404).json({ error: 'Invoice receipt is invalid or unavailable.' });
  }
}

function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch (_) {}
  }
  return {};
}

function normalizeSaudiPhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (/^05\d{8}$/.test(digits)) return `966${digits.slice(1)}`;
  if (/^9665\d{8}$/.test(digits)) return digits;
  if (/^5\d{8}$/.test(digits)) return `966${digits}`;
  return digits;
}

function limit(value, max) { return String(value ?? '').trim().slice(0, max); }
function getClientIp(req) { return String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim(); }
function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return false;
  const host = String(req.headers.host || '').split(':')[0];
  try { return new URL(origin).hostname === host; } catch (_) { return false; }
}
function getBaseUrl(req) {
  const configured = String(process.env.APP_BASE_URL || '').trim().replace(/\/$/, '');
  if (configured) return configured;
  const protocol = String(req.headers['x-forwarded-proto'] || 'https').split(',')[0];
  const host = String(req.headers.host || '').split(',')[0];
  return `${protocol}://${host}`;
}
function makeRequestId() { try { return crypto.randomUUID(); } catch (_) { return `ayan-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`; } }
function cleanupRateLimit(now) {
  if (RATE_LIMIT.size < 250) return;
  for (const [key, timestamp] of RATE_LIMIT) if (now - timestamp > 60000) RATE_LIMIT.delete(key);
}
function setSecurityHeaders(res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
}
