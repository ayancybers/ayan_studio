export default async function handler(req, res) {
  setSecurityHeaders(res);
  if (req.method === 'GET') return verifyLegacyTapPayment(req, res);
  if (req.method === 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(410).json({
      error: 'Tap checkout has been replaced. Choose TuwaiqPay, Tabby, or Tamara.',
      code: 'TAP_CHECKOUT_REPLACED'
    });
  }
  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}

async function verifyLegacyTapPayment(req, res) {
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
    const metadata = charge.metadata || {};
    return res.status(200).json({
      success: status === 'CAPTURED',
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
    });
  } catch (error) {
    console.error('Legacy Tap payment verification failed', error);
    return res.status(500).json({ error: 'Unable to verify payment' });
  }
}

function pickPaymentCreatedAt(charge) {
  const activities = Array.isArray(charge?.activities) ? charge.activities : [];
  const captured = activities
    .filter((activity) => String(activity?.status || '').toUpperCase() === 'CAPTURED')
    .sort((a, b) => Number(b?.created || 0) - Number(a?.created || 0))[0];
  return captured?.created || charge?.transaction?.created || charge?.created || '';
}

function fullCustomerName(charge) {
  const first = String(charge?.customer?.first_name || '').trim();
  const last = String(charge?.customer?.last_name || '').trim();
  return [first, last].filter(Boolean).join(' ') || '—';
}

function normalizeSaudiPhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (/^05\d{8}$/.test(digits)) return `966${digits.slice(1)}`;
  if (/^9665\d{8}$/.test(digits)) return digits;
  if (/^5\d{8}$/.test(digits)) return `966${digits}`;
  return digits;
}

function limit(value, max) { return String(value ?? '').slice(0, max); }

function setSecurityHeaders(res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=(), payment=*');
}
