import crypto from 'node:crypto';
import { PACKAGES, calculatePricing, getPricingConfig, roundMoney } from '../../pricing.js';

const ALLOWED_CARS = new Set([
  'سيدان', 'SUV', 'كوبيه', 'فاخر / رياضي',
  'Sedan', 'Coupe', 'Luxury / Sport', 'Luxury / Sports'
]);

const ALLOWED_REGIONS = new Set([
  'القطيف', 'سيهات', 'الدمام', 'الخبر', 'حفر الباطن',
  'Qatif', 'Saihat', 'Dammam', 'Khobar', 'Hafar Al Batin'
]);

const recentRequests = globalThis.__ayanPaymentRateLimit || new Map();
globalThis.__ayanPaymentRateLimit = recentRequests;

export default async function handler(req, res) {
  setSecurityHeaders(res);

  if (req.method === 'GET') return verifyPayment(req, res);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const requestId = makeRequestId();
  if (!sameOrigin(req)) return res.status(403).json({ error: 'Forbidden origin', requestId });

  const secret = String(process.env.TAP_SECRET_KEY || '').trim();
  const merchantId = String(process.env.TAP_MERCHANT_ID || '').trim();
  const testMode = boolEnv('PAYMENT_TEST_MODE', false);
  if (!secret || !merchantId) {
    console.error('Tap environment variables are missing', { requestId });
    return res.status(500).json({ error: 'Payment configuration is incomplete', requestId });
  }

  if (testMode && !secret.startsWith('sk_test_')) {
    return res.status(500).json({ error: 'PAYMENT_TEST_MODE requires a Tap Test Secret Key (sk_test_...).', requestId });
  }
  if (!testMode && secret.startsWith('sk_test_')) {
    return res.status(500).json({ error: 'Live payments require a Tap Live Secret Key (sk_live_...).', requestId });
  }

  const ip = getClientIp(req);
  const now = Date.now();
  const last = recentRequests.get(ip) || 0;
  if (now - last < 15000) return res.status(429).json({ error: 'Please wait before starting another payment.', requestId });
  recentRequests.set(ip, now);
  cleanupRateLimit(now);

  const body = req.body || {};
  if (String(body.website || '').trim()) return res.status(400).json({ error: 'Invalid request', requestId });

  const name = limit(String(body.name || '').trim(), 80);
  const packageKey = limit(String(body.packageKey || '').trim(), 20);
  const packageType = limit(String(body.packageType || '').trim(), 120);
  const email = limit(String(body.email || '').trim().toLowerCase(), 160);
  const carType = limit(String(body.carType || '').trim(), 40);
  const shootRegion = limit(String(body.shootRegion || '').trim(), 60);
  const phone = normalizeSaudiPhone(body.phone);
  const notes = limit(String(body.notes || '').trim(), 1200);
  const lang = body.lang === 'en' ? 'en' : 'ar';

  if (!name || !email || !packageKey || !packageType || !carType || !shootRegion || !phone) {
    return res.status(400).json({ error: 'Missing required fields', requestId });
  }
  if (!PACKAGES[packageKey] || !ALLOWED_CARS.has(carType) || !ALLOWED_REGIONS.has(shootRegion)) {
    return res.status(400).json({ error: 'Invalid booking option', requestId });
  }
  if (!/^9665\d{8}$/.test(phone)) return res.status(400).json({ error: 'Invalid Saudi mobile number', requestId });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Enter a valid email address', requestId });
  if (body.termsAgreement !== true) return res.status(400).json({ error: 'Terms and conditions must be accepted before payment.', requestId });

  const pkg = PACKAGES[packageKey];
  const cfg = getPricingConfig();
  const paymentMethod = 'card';
  let pricing = calculatePricing(packageKey, paymentMethod);
  let testPayment = false;

  // Safe Tap sandbox testing: set PAYMENT_TEST_MODE=true and use your Tap Test Secret Key.
  // Tap test charges are not actually charged. This is never enabled by default.
  const configuredTestAmount = roundMoney(numberEnv('TEST_PAYMENT_AMOUNT', 1, 0.1, 100000));
  if (testMode) {
    testPayment = true;
    pricing = {
      ...pricing,
      subtotal: configuredTestAmount,
      paymentMethod,
      paymentFee: 0,
      paymentFeePercent: 0,
      paymentFeeFixed: 0,
      paymentFeeTax: 0,
      serviceFee: 0,
      serviceFeePercent: 0,
      serviceFeeFixed: 0,
      taxableBase: configuredTestAmount,
      tax: 0,
      total: configuredTestAmount,
      vatEnabled: false,
      vatRate: 0,
      vatOnServiceFee: false
    };
  }

  const baseUrl = getBaseUrl(req);
  const firstName = name.split(/\s+/)[0] || 'Customer';
  const rest = name.split(/\s+/).slice(1).join(' ');
  const lastName = rest || 'Customer';

  const metadata = {
    request_id: requestId,
    package_key: packageKey,
    package_name: pkg[lang],
    package_name_ar: pkg.ar,
    package_name_en: pkg.en,
    subtotal: pricing.subtotal.toFixed(2),
    payment_method: paymentMethod,
    payment_fee: pricing.paymentFee.toFixed(2),
    payment_fee_percent: String(pricing.paymentFeePercent),
    payment_fee_fixed: pricing.paymentFeeFixed.toFixed(2),
    payment_fee_tax: pricing.paymentFeeTax.toFixed(2),
    service_fee: pricing.paymentFee.toFixed(2),
    service_fee_percent: String(pricing.paymentFeePercent),
    service_fee_fixed: pricing.paymentFeeFixed.toFixed(2),
    vat_enabled: String(pricing.vatEnabled),
    tax_rate: String(pricing.vatRate),
    vat_on_payment_fee: String(pricing.vatOnPaymentFee),
    taxable_base: pricing.taxableBase.toFixed(2),
    tax: pricing.tax.toFixed(2),
    total: pricing.total.toFixed(2),
    customer_name: name,
    email,
    phone,
    car_type: carType,
    shoot_region: shootRegion,
    notes: notes || '—',
    terms_accepted: 'true',
    terms_version: '2026-10-01',
    terms_accepted_at: new Date().toISOString(),
    lang,
    test_payment: String(testPayment)
  };

  const payload = {
    amount: pricing.total,
    currency: 'SAR',
    customer_initiated: true,
    threeDSecure: true,
    save_card: false,
    description: `${testPayment ? 'TEST - ' : ''}Ayan Photography - ${pkg.en}`,
    metadata,
    reference: {
      transaction: `ayan_${requestId.replace(/-/g, '').slice(0, 24)}`,
      order: `AYAN-${requestId.replace(/-/g, '').slice(-12).toUpperCase()}`
    },
    receipt: { email: false, sms: false },
    customer: {
      first_name: firstName,
      last_name: lastName,
      email,
      phone: { country_code: '966', number: phone.slice(3) }
    },
    merchant: { id: merchantId },
    source: { id: 'src_all' },
    post: { url: `${baseUrl}/api/tap-webhook` },
    redirect: { url: `${baseUrl}/payment-success.html` }
  };

  try {
    const response = await fetch('https://api.tap.company/v2/charges/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
        lang_code: lang
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('Tap charge creation failed', {
        requestId,
        status: response.status,
        code: result?.response?.code,
        message: result?.response?.message
      });
      const tapCode = result?.response?.code || result?.code || result?.errors?.[0]?.code || '';
      const tapMessage = result?.response?.message || result?.message || result?.errors?.[0]?.description || 'Unable to create payment';
      return res.status(502).json({
        error: tapCode ? `${tapMessage} [Tap ${tapCode}]` : tapMessage,
        requestId
      });
    }

    const tapId = result.id || '';
    const redirectUrl = result?.transaction?.url || '';
    const status = String(result.status || '').toUpperCase();

    return res.status(200).json({
      success: true,
      requestId,
      tapId,
      status,
      redirectUrl,
      invoiceUrl: `${baseUrl}/invoice.html?tap_id=${encodeURIComponent(tapId)}`,
      subtotal: pricing.subtotal,
      paymentMethod,
      paymentFee: pricing.paymentFee,
      serviceFee: pricing.paymentFee,
      tax: pricing.tax,
      paymentFeeTax: pricing.paymentFeeTax,
      taxRate: pricing.vatRate,
      total: pricing.total,
      amount: pricing.total,
      testPayment
    });
  } catch (error) {
    console.error('Tap request error', { requestId, error: error?.message || String(error) });
    return res.status(500).json({ error: 'Unable to connect to payment service', requestId });
  }
}

async function verifyPayment(req, res) {
  const tapId = limit(String(req.query?.tap_id || '').trim(), 120);
  if (!/^chg_[A-Za-z0-9_-]+$/.test(tapId)) return res.status(400).json({ error: 'Invalid payment reference' });

  const secret = String(process.env.TAP_SECRET_KEY || '').trim();
  if (!secret) return res.status(500).json({ error: 'Payment configuration is incomplete' });

  try {
    const response = await fetch(`https://api.tap.company/v2/charges/${encodeURIComponent(tapId)}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${secret}`, accept: 'application/json' }
    });

    const charge = await response.json().catch(() => ({}));
    if (!response.ok) return res.status(502).json({ error: charge?.response?.message || 'Unable to verify payment' });

    const status = String(charge.status || '').toUpperCase();
    const captured = status === 'CAPTURED';
    const metadata = charge.metadata || {};

    const result = {
      success: captured,
      status,
      tapId: charge.id || tapId,
      amount: Number(charge.amount || metadata.total || 0),
      currency: charge.currency || 'SAR',
      customerName: metadata.customer_name || fullCustomerName(charge),
      email: metadata.email || charge?.customer?.email || '',
      phone: metadata.phone || normalizeSaudiPhone(charge?.customer?.phone?.number || ''),
      packageKey: metadata.package_key || '',
      packageName: metadata.package_name || '',
      packageNameAr: metadata.package_name_ar || '',
      packageNameEn: metadata.package_name_en || '',
      subtotal: Number(metadata.subtotal || 0),
      paymentMethod: metadata.payment_method === 'tabby' ? 'tabby' : 'card',
      paymentFee: Number(metadata.payment_fee || metadata.service_fee || 0),
      paymentFeePercent: Number(metadata.payment_fee_percent || metadata.service_fee_percent || 0),
      paymentFeeFixed: Number(metadata.payment_fee_fixed || metadata.service_fee_fixed || 0),
      paymentFeeTax: Number(metadata.payment_fee_tax || 0),
      serviceFee: Number(metadata.payment_fee || metadata.service_fee || 0),
      serviceFeePercent: Number(metadata.payment_fee_percent || metadata.service_fee_percent || 0),
      serviceFeeFixed: Number(metadata.payment_fee_fixed || metadata.service_fee_fixed || 0),
      vatEnabled: String(metadata.vat_enabled || 'false') === 'true',
      taxRate: Number(metadata.tax_rate || 0),
      vatOnPaymentFee: String(metadata.vat_on_payment_fee || 'false') === 'true',
      vatOnServiceFee: String(metadata.vat_on_payment_fee || 'false') === 'true',
      taxableBase: Number(metadata.taxable_base || metadata.subtotal || 0),
      tax: Number(metadata.tax || 0),
      total: Number(metadata.total || charge.amount || 0),
      carType: metadata.car_type || '',
      shootRegion: metadata.shoot_region || '',
      notes: metadata.notes || '—',
      termsAccepted: String(metadata.terms_accepted || 'false') === 'true',
      termsVersion: metadata.terms_version || '',
      termsAcceptedAt: metadata.terms_accepted_at || '',
      requestId: metadata.request_id || '',
      lang: metadata.lang === 'en' ? 'en' : 'ar',
      testPayment: String(metadata.test_payment || 'false') === 'true',
      created: pickPaymentCreatedAt(charge)
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error('Tap verification error', error);
    return res.status(500).json({ error: 'Unable to verify payment' });
  }
}

function pickPaymentCreatedAt(charge){
  const activities=Array.isArray(charge?.activities)?charge.activities:[];
  const captured=activities.filter(a=>String(a?.status||'').toUpperCase()==='CAPTURED').sort((a,b)=>Number(b?.created||0)-Number(a?.created||0))[0];
  return captured?.created || charge?.transaction?.created || charge?.created || '';
}

function fullCustomerName(charge) {
  const first = String(charge?.customer?.first_name || '').trim();
  const last = String(charge?.customer?.last_name || '').trim();
  return [first, last].filter(Boolean).join(' ') || '—';
}

function normalizeSaudiPhone(value) {
  const raw = String(value || '').replace(/\D/g, '');
  if (/^05\d{8}$/.test(raw)) return `966${raw.slice(1)}`;
  if (/^9665\d{8}$/.test(raw)) return raw;
  if (/^5\d{8}$/.test(raw)) return `966${raw}`;
  return raw;
}

function numberEnv(name, fallback, min = 0, max = Number.MAX_SAFE_INTEGER) {
  const raw = process.env[name];
  if (raw === undefined || raw === null || raw === '') return fallback;
  const value = Number(raw);
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

function boolEnv(name, fallback) {
  const raw = String(process.env[name] ?? '').trim().toLowerCase();
  if (!raw) return fallback;
  if (['true', '1', 'yes', 'on'].includes(raw)) return true;
  if (['false', '0', 'no', 'off'].includes(raw)) return false;
  return fallback;
}

function limit(value, max = 1000) { return String(value ?? '').slice(0, max); }
function getClientIp(req) { const raw = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'; return String(raw).split(',')[0].trim(); }
function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
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
function makeRequestId() { try { return crypto.randomUUID(); } catch (_) { return `ayan-${Date.now()}-${Math.random().toString(36).slice(2,10)}`; } }
function cleanupRateLimit(now) { if (recentRequests.size < 250) return; for (const [key, timestamp] of recentRequests) if (now - timestamp > 60000) recentRequests.delete(key); }
function setSecurityHeaders(res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=(), payment=*');
}

