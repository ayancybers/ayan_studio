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

const recentRequests = globalThis.__ayanTabbyRateLimit || new Map();
globalThis.__ayanTabbyRateLimit = recentRequests;

export default async function handler(req, res) {
  setSecurityHeaders(res);
  if (req.method === 'GET') return verifyAndCapture(req, res);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const requestId = makeRequestId();
  if (!sameOrigin(req)) return res.status(403).json({ error: 'Forbidden origin', requestId });

  const secret = String(process.env.TABBY_SECRET_KEY || '').trim();
  const merchantCode = String(process.env.TABBY_MERCHANT_CODE || 'default').trim();
  const apiBase = getTabbyBaseUrl();
  const testMode = boolEnv('PAYMENT_TEST_MODE', false);
  if (!secret || !merchantCode) {
    console.error('Tabby environment variables are missing', { requestId });
    return res.status(500).json({ error: 'Tabby configuration is incomplete', requestId });
  }
  if (testMode && !secret.startsWith('sk_test_')) {
    return res.status(500).json({ error: 'PAYMENT_TEST_MODE requires a Tabby test secret key (sk_test_...).', requestId });
  }
  if (!testMode && secret.startsWith('sk_test_')) {
    return res.status(500).json({ error: 'Live Tabby payments require a live secret key.', requestId });
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
  const email = limit(String(body.email || '').trim().toLowerCase(), 160);
  const packageKey = limit(String(body.packageKey || '').trim(), 20);
  const packageType = limit(String(body.packageType || '').trim(), 120);
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
  if (body.termsAgreement !== true) return res.status(400).json({ error: 'Terms and conditions must be accepted before payment.', requestId });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Enter a valid email address', requestId });

  const pkg = PACKAGES[packageKey];
  const pricing = calculatePricing(packageKey, 'tabby');
  const orderReference = `AYAN-T-${requestId.replace(/-/g, '').slice(-20).toUpperCase()}`;
  const firstName = name.split(/\s+/)[0] || 'Customer';
  const baseUrl = getBaseUrl(req);

  let sessionPricing = pricing;
  if (testMode) {
    const configuredTestAmount = roundMoney(numberEnv('TEST_PAYMENT_AMOUNT', 1, 0.1, 100000));
    sessionPricing = {
      ...pricing,
      subtotal: configuredTestAmount,
      paymentFee: 0,
      paymentFeePercent: 0,
      paymentFeeFixed: 0,
      paymentFeeTax: 0,
      taxableBase: configuredTestAmount,
      tax: 0,
      amountBeforePaymentFee: configuredTestAmount,
      total: configuredTestAmount,
      vatEnabled: false,
      vatRate: 0,
      vatOnPaymentFee: false
    };
  }

  const metadata = {
    request_id: requestId,
    payment_method: 'tabby',
    order_reference: orderReference,
    package_key: packageKey,
    package_name: pkg[lang],
    package_name_ar: pkg.ar,
    package_name_en: pkg.en,
    subtotal: sessionPricing.subtotal.toFixed(2),
    payment_fee: sessionPricing.paymentFee.toFixed(2),
    payment_fee_percent: String(sessionPricing.paymentFeePercent),
    payment_fee_fixed: sessionPricing.paymentFeeFixed.toFixed(2),
    payment_fee_tax: sessionPricing.paymentFeeTax.toFixed(2),
    vat_enabled: String(sessionPricing.vatEnabled),
    tax_rate: String(sessionPricing.vatRate),
    vat_on_payment_fee: String(sessionPricing.vatOnPaymentFee),
    taxable_base: sessionPricing.taxableBase.toFixed(2),
    tax: sessionPricing.tax.toFixed(2),
    total: sessionPricing.total.toFixed(2),
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
    test_payment: String(testMode)
  };

  const payload = {
    payment: {
      amount: sessionPricing.total.toFixed(2),
      currency: 'SAR',
      description: `${testMode ? 'TEST - ' : ''}Ayan Photography - ${pkg.en}`,
      buyer: {
        name,
        email,
        phone: phone.slice(3)
      },
      shipping_address: {
        city: mapRegionToEnglish(shootRegion),
        address: 'Ayan Photography - Automotive Photography Service',
        zip: '00000'
      },
      order: {
        reference_id: orderReference,
        updated_at: new Date().toISOString(),
        tax_amount: sessionPricing.tax.toFixed(2),
        shipping_amount: '0.00',
        discount_amount: '0.00',
        items: [
          {
            reference_id: packageKey,
            title: pkg.en,
            description: `${pkg.en} - Ayan Photography`,
            quantity: 1,
            unit_price: sessionPricing.subtotal.toFixed(2),
            category: 'Photography Service',
            is_refundable: true
          },
          ...(sessionPricing.paymentFee > 0 ? [{
            reference_id: `payment-fee-${packageKey}`,
            title: 'Payment processing fee',
            description: 'Payment processing fee',
            quantity: 1,
            unit_price: sessionPricing.paymentFee.toFixed(2),
            category: 'Service',
            is_refundable: true
          }] : [])
        ]
      },
      buyer_history: {
        registered_since: new Date().toISOString(),
        loyalty_level: 0,
        wishlist_count: 0,
        is_social_networks_connected: false,
        is_phone_number_verified: false,
        is_email_verified: false
      },
      order_history: [],
      meta: {
        order_id: orderReference,
        customer: name,
        ...metadata
      }
    },
    lang,
    merchant_code: merchantCode,
    merchant_urls: {
      success: `${baseUrl}/payment-success.html?provider=tabby`,
      cancel: `${baseUrl}/payment-success.html?provider=tabby&result=cancel`,
      failure: `${baseUrl}/payment-success.html?provider=tabby&result=failure`
    }
  };

  try {
    const response = await fetch(`${apiBase}/api/v2/checkout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify(payload),
      signal: timeoutSignal(15000)
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('Tabby checkout creation failed', {
        requestId,
        status: response.status,
        type: result?.errorType,
        error: result?.error
      });
      return res.status(502).json({
        error: result?.error || result?.message || 'Unable to create Tabby checkout',
        requestId
      });
    }

    const webUrl = result?.configuration?.available_products?.installments?.[0]?.web_url || '';
    const paymentId = result?.payment?.id || '';
    if (result?.status !== 'created' || !webUrl || !paymentId) {
      const rejection = result?.configuration?.products?.installments?.rejection_reason || 'Tabby is not available for this order.';
      return res.status(422).json({ error: rejection, requestId, status: result?.status || 'rejected' });
    }

    return res.status(200).json({
      success: true,
      provider: 'tabby',
      requestId,
      paymentId,
      status: result.status,
      redirectUrl: webUrl,
      invoiceUrl: `${baseUrl}/invoice.html?provider=tabby&payment_id=${encodeURIComponent(paymentId)}`,
      subtotal: sessionPricing.subtotal,
      paymentFee: sessionPricing.paymentFee,
      serviceFee: sessionPricing.paymentFee,
      tax: sessionPricing.tax,
      paymentFeeTax: sessionPricing.paymentFeeTax,
      taxRate: sessionPricing.vatRate,
      total: sessionPricing.total,
      amount: sessionPricing.total,
      testPayment: testMode
    });
  } catch (error) {
    const message = error?.name === 'TimeoutError' ? 'Tabby took too long to respond. Please try again.' : 'Unable to connect to Tabby';
    console.error('Tabby checkout request error', { requestId, error: error?.message || String(error) });
    return res.status(502).json({ error: message, requestId });
  }
}

async function verifyAndCapture(req, res) {
  const paymentId = limit(String(req.query?.payment_id || '').trim(), 120);
  if (!paymentId) return res.status(400).json({ error: 'Missing payment reference' });

  const secret = String(process.env.TABBY_SECRET_KEY || '').trim();
  if (!secret) return res.status(500).json({ error: 'Tabby configuration is incomplete' });

  try {
    let payment = await retrievePayment(paymentId, secret);
    if (!payment.ok) return res.status(502).json({ error: payment.data?.error || payment.data?.message || 'Unable to verify Tabby payment' });

    let result = payment.data;
    const captures = Array.isArray(result.captures) ? result.captures : [];
    const status = String(result.status || '').toUpperCase();

    if (status === 'AUTHORIZED' && captures.length === 0) {
      const orderRef = String(result?.order?.reference_id || result?.meta?.order_id || paymentId);
      const capture = await capturePayment(paymentId, Number(result.amount || 0), secret, `capture-${orderRef}`);
      if (!capture.ok) {
        return res.status(502).json({ error: capture.data?.error || 'Tabby payment is authorized but could not be captured yet', status: 'AUTHORIZED' });
      }
      result = capture.data;
    }

    const statusAfter = String(result.status || '').toUpperCase();
    return res.status(200).json(buildTabbyResult(result, paymentId));
  } catch (error) {
    console.error('Tabby verification error', error);
    return res.status(500).json({ error: 'Unable to verify Tabby payment' });
  }
}

async function retrievePayment(paymentId, secret) {
  const response = await fetch(`${getTabbyBaseUrl()}/api/v2/payments/${encodeURIComponent(paymentId)}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${secret}`, accept: 'application/json' },
    signal: timeoutSignal(12000)
  });
  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data };
}

async function capturePayment(paymentId, amount, secret, referenceId) {
  const response = await fetch(`${getTabbyBaseUrl()}/api/v2/payments/${encodeURIComponent(paymentId)}/captures`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({ amount: Number(amount || 0).toFixed(2), reference_id: referenceId }),
    signal: timeoutSignal(12000)
  });
  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data };
}

export async function handleTabbyAuthorizedWebhook(payload, secret) {
  const paymentId = String(payload?.id || '').trim();
  const status = String(payload?.status || '').toLowerCase();
  const captures = Array.isArray(payload?.captures) ? payload.captures : [];
  if (!paymentId || status !== 'authorized' || captures.length > 0) return { skipped: true };
  const orderRef = String(payload?.order?.reference_id || paymentId);
  const result = await capturePayment(paymentId, Number(payload?.amount || 0), secret, `capture-${orderRef}`);
  return { skipped: false, ...result };
}

function buildTabbyResult(data, paymentId) {
  const meta = data?.meta || {};
  const amount = Number(data?.amount || meta.total || 0);
  const status = String(data?.status || '').toUpperCase();
  return {
    success: status === 'CLOSED',
    status,
    provider: 'tabby',
    paymentId: data?.id || paymentId,
    tapId: data?.id || paymentId,
    amount,
    currency: data?.currency || 'SAR',
    customerName: meta.customer_name || data?.buyer?.name || '—',
    email: meta.email || data?.buyer?.email || '',
    phone: meta.phone || normalizeSaudiPhone(data?.buyer?.phone || ''),
    packageKey: meta.package_key || '',
    packageName: meta.package_name || meta.package_name_en || '',
    packageNameAr: meta.package_name_ar || '',
    packageNameEn: meta.package_name_en || '',
    subtotal: Number(meta.subtotal || 0),
    paymentFee: Number(meta.payment_fee || 0),
    paymentFeePercent: Number(meta.payment_fee_percent || 0),
    paymentFeeFixed: Number(meta.payment_fee_fixed || 0),
    paymentFeeTax: Number(meta.payment_fee_tax || 0),
    serviceFee: Number(meta.payment_fee || 0),
    serviceFeePercent: Number(meta.payment_fee_percent || 0),
    serviceFeeFixed: Number(meta.payment_fee_fixed || 0),
    vatEnabled: String(meta.vat_enabled || 'false') === 'true',
    taxRate: Number(meta.tax_rate || 0),
    vatOnPaymentFee: String(meta.vat_on_payment_fee || 'false') === 'true',
    vatOnServiceFee: String(meta.vat_on_payment_fee || 'false') === 'true',
    taxableBase: Number(meta.taxable_base || meta.subtotal || 0),
    tax: Number(meta.tax || 0),
    total: Number(meta.total || amount),
    carType: meta.car_type || '',
    shootRegion: meta.shoot_region || '',
    notes: meta.notes || '—',
    termsAccepted: String(meta.terms_accepted || 'false') === 'true',
    termsVersion: meta.terms_version || '',
    termsAcceptedAt: meta.terms_accepted_at || '',
    requestId: meta.request_id || '',
    lang: meta.lang === 'en' ? 'en' : 'ar',
    testPayment: Boolean(data?.is_test) || String(meta.test_payment || 'false') === 'true',
    created: data?.created_at || data?.created || data?.updated_at || ''
  };
}

function mapRegionToEnglish(value) {
  const map = {
    'القطيف':'Qatif', 'سيهات':'Saihat', 'الدمام':'Dammam', 'الخبر':'Khobar', 'حفر الباطن':'Hafar Al Batin'
  };
  return map[value] || value;
}

function normalizeSaudiPhone(value) {
  const raw = String(value || '').replace(/\D/g, '');
  if (/^05\d{8}$/.test(raw)) return `966${raw.slice(1)}`;
  if (/^9665\d{8}$/.test(raw)) return raw;
  if (/^5\d{8}$/.test(raw)) return `966${raw}`;
  return raw;
}

function getTabbyBaseUrl() {
  return String(process.env.TABBY_API_BASE_URL || 'https://api.tabby.sa').trim().replace(/\/$/, '');
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
  if (['true','1','yes','on'].includes(raw)) return true;
  if (['false','0','no','off'].includes(raw)) return false;
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
function timeoutSignal(ms) { return typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(ms) : undefined; }
function setSecurityHeaders(res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=(), payment=*');
}
