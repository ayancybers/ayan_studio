import crypto from 'node:crypto';
import { PACKAGES, calculatePricing } from '../lib/pricing.js';
import { authoriseTamaraOrder, boolEnv, getTamaraBaseUrl, getTamaraOrder, mapTamaraOrder, normalizeSaudiPhone, normalizeTamaraStatus } from '../lib/server/tamara.js';

const ALLOWED_CARS = new Set(['سيدان','SUV','كوبيه','فاخر / رياضي','Sedan','Coupe','Luxury / Sport','Luxury / Sports']);
const ALLOWED_REGIONS = new Set(['القطيف','سيهات','الدمام','الخبر','حفر الباطن','Qatif','Saihat','Dammam','Khobar','Hafar Al Batin']);
const recentRequests = globalThis.__ayanTamaraRateLimit || new Map();
globalThis.__ayanTamaraRateLimit = recentRequests;

export default async function handler(req, res) {
  setSecurityHeaders(res);
  if (req.method === 'GET') return verify(req, res);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const requestId = makeRequestId();
  if (!sameOrigin(req)) return res.status(403).json({ error: 'Forbidden origin', requestId });

  const token = String(process.env.TAMARA_API_TOKEN || '').trim();
  if (!token) return res.status(503).json({ error: 'Tamara configuration is incomplete', requestId });

  const body = req.body || {};
  if (String(body.website || '').trim()) return res.status(400).json({ error: 'Invalid request', requestId });
  const name = limit(body.name, 80);
  const email = limit(String(body.email || '').trim().toLowerCase(), 160);
  const packageKey = limit(body.packageKey, 20);
  const carType = limit(body.carType, 40);
  const shootRegion = limit(body.shootRegion, 60);
  const notes = limit(body.notes, 1200) || '—';
  const phone = normalizeSaudiPhone(body.phone);
  const lang = body.lang === 'en' ? 'en' : 'ar';

  if (!name || !email || !packageKey || !carType || !shootRegion || !phone) return res.status(400).json({ error: 'Missing required fields', requestId });
  if (!PACKAGES[packageKey] || !ALLOWED_CARS.has(carType) || !ALLOWED_REGIONS.has(shootRegion)) return res.status(400).json({ error: 'Invalid booking option', requestId });
  if (!/^9665\d{8}$/.test(phone)) return res.status(400).json({ error: 'Invalid Saudi mobile number', requestId });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Enter a valid email address', requestId });
  if (body.termsAgreement !== true) return res.status(400).json({ error: 'Terms and conditions must be accepted before payment.', requestId });

  const now = Date.now();
  const ip = getClientIp(req);
  const last = recentRequests.get(ip) || 0;
  if (now - last < 15000) return res.status(429).json({ error: 'Please wait before starting another payment.', requestId });
  recentRequests.set(ip, now);
  cleanupRateLimit(now);

  const pricing = calculatePricing(packageKey, 'tamara');
  const pkg = PACKAGES[packageKey];
  const orderReference = `AYAN-TAMARA-${requestId.replace(/-/g, '').slice(-18).toUpperCase()}`;
  const baseUrl = getBaseUrl(req);
  const firstName = name.split(/\s+/)[0] || 'Customer';
  const lastName = name.split(/\s+/).slice(1).join(' ') || 'Ayan';
  const metadata = {
    request_id: requestId, payment_method: 'tamara', order_reference: orderReference,
    package_key: packageKey, package_name: pkg[lang], package_name_ar: pkg.ar, package_name_en: pkg.en,
    subtotal: pricing.subtotal.toFixed(2), payment_fee: pricing.paymentFee.toFixed(2),
    payment_fee_percent: String(pricing.paymentFeePercent), payment_fee_fixed: pricing.paymentFeeFixed.toFixed(2),
    total: pricing.total.toFixed(2), customer_name: name, email, phone, car_type: carType,
    shoot_region: shootRegion, notes, terms_accepted: 'true', terms_version: '2026-10-01',
    terms_accepted_at: new Date().toISOString(), lang
  };
  const city = mapRegionToEnglish(shootRegion);
  const payload = {
    total_amount: { amount: pricing.total, currency: 'SAR' },
    shipping_amount: { amount: 0, currency: 'SAR' },
    tax_amount: { amount: 0, currency: 'SAR' },
    order_reference_id: orderReference,
    order_number: orderReference,
    items: [{
      name: pkg.en,
      type: 'Digital',
      reference_id: packageKey,
      sku: `AYAN-${packageKey}`,
      quantity: 1,
      discount_amount: { amount: 0, currency: 'SAR' },
      tax_amount: { amount: 0, currency: 'SAR' },
      unit_price: { amount: pricing.subtotal, currency: 'SAR' },
      total_amount: { amount: pricing.total, currency: 'SAR' }
    }],
    consumer: { email, first_name: firstName, last_name: lastName, phone_number: phone.slice(3) },
    country_code: 'SA',
    description: `Ayan Photography - ${pkg.en}`,
    merchant_url: {
      success: `${baseUrl}/payment-success?provider=tamara`,
      failure: `${baseUrl}/payment-success?provider=tamara&result=failure`,
      cancel: `${baseUrl}/payment-success?provider=tamara&result=cancel`
    },
    shipping_address: { first_name: firstName, last_name: lastName, line1: 'Ayan Photography - Automotive Photography Service', city, country_code: 'SA' },
    billing_address: { first_name: firstName, last_name: lastName, line1: 'Ayan Photography - Automotive Photography Service', city, country_code: 'SA' },
    platform: 'Ayan Photography',
    is_mobile: Boolean(body.isMobile),
    locale: lang === 'en' ? 'en_US' : 'ar_SA',
    additional_data: { ayan_booking: metadata }
  };

  try {
    const response = await fetch(`${getTamaraBaseUrl()}/checkout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: timeoutSignal(18000)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('Tamara checkout creation failed', { requestId, status: response.status, message: result?.message || result?.error || '' });
      return res.status(502).json({ error: result?.message || result?.error || 'Unable to create Tamara checkout', requestId });
    }
    const orderId = result?.order_id || result?.order?.order_id || '';
    const checkoutUrl = result?.checkout_url || '';
    if (!orderId || !checkoutUrl) return res.status(502).json({ error: 'Tamara did not return a checkout URL.', requestId });
    return res.status(200).json({ success: true, provider: 'tamara', requestId, orderId, paymentId: orderId, redirectUrl: checkoutUrl, subtotal: pricing.subtotal, paymentFee: pricing.paymentFee, serviceFee: pricing.paymentFee, total: pricing.total, amount: pricing.total });
  } catch (error) {
    console.error('Tamara checkout request error', { requestId, error: error?.message || String(error) });
    return res.status(502).json({ error: error?.name === 'TimeoutError' ? 'Tamara took too long to respond. Please try again.' : 'Unable to connect to Tamara', requestId });
  }
}

async function verify(req, res) {
  const orderId = limit(String(req.query?.order_id || req.query?.payment_id || '').trim(), 120);
  if (!orderId) return res.status(400).json({ error: 'Missing Tamara order reference' });
  try {
    let raw = await getTamaraOrder(orderId);
    let mapped = mapTamaraOrder(raw);
    // If the merchant has not enabled Tamara auto-authorisation, use the return page as a safe fallback to authorise an approved order.
    if (mapped.status === 'approved' && boolEnv('TAMARA_AUTO_AUTHORISE', true)) {
      try { await authoriseTamaraOrder(orderId); } catch (error) { console.warn('Tamara return authorise fallback failed', error?.message || String(error)); }
      raw = await getTamaraOrder(orderId);
      mapped = mapTamaraOrder(raw);
    }
    const status = normalizeTamaraStatus(mapped.status);
    const paid = ['authorised','authorized','fully_captured'].includes(status);
    const canceled = ['canceled','cancelled'].includes(status);
    return res.status(200).json({ success: paid, paid, provider: 'tamara', ...mapped, status: mapped.status, canceled });
  } catch (error) {
    console.error('Tamara verification error', { orderId, error: error?.message || String(error) });
    return res.status(502).json({ error: 'Unable to verify Tamara order' });
  }
}

function mapRegionToEnglish(value) {
  const map = {'القطيف':'Qatif','سيهات':'Saihat','الدمام':'Dammam','الخبر':'Khobar','حفر الباطن':'Hafar Al Batin',Qatif:'Qatif',Saihat:'Saihat',Dammam:'Dammam',Khobar:'Khobar','Hafar Al Batin':'Hafar Al Batin'};
  return map[value] || 'Eastern Province';
}
function getClientIp(req) { const raw = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'; return String(raw).split(',')[0].trim(); }
function sameOrigin(req) { const origin = req.headers.origin; if (!origin) return true; const host = String(req.headers.host || '').split(':')[0]; try { return new URL(origin).hostname === host; } catch { return false; } }
function getBaseUrl(req) { const configured = String(process.env.APP_BASE_URL || '').trim().replace(/\/$/, ''); if (configured) return configured; return `https://${String(req.headers.host || '').split(',')[0]}`; }
function limit(value, max = 1000) { return String(value ?? '').trim().slice(0, max); }
function makeRequestId() { try { return crypto.randomUUID(); } catch { return `ayan-${Date.now()}-${Math.random().toString(36).slice(2,10)}`; } }
function cleanupRateLimit(now) { if (recentRequests.size < 250) return; for (const [key, timestamp] of recentRequests) if (now - timestamp > 60000) recentRequests.delete(key); }
function setSecurityHeaders(res) { res.setHeader('Cache-Control','no-store, max-age=0'); res.setHeader('X-Content-Type-Options','nosniff'); res.setHeader('Referrer-Policy','strict-origin-when-cross-origin'); res.setHeader('X-Frame-Options','SAMEORIGIN'); }
function timeoutSignal(ms) { return typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(ms) : undefined; }
