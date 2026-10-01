export function getTamaraBaseUrl() {
  const sandbox = boolEnv('TAMARA_SANDBOX_MODE', false);
  const configured = String(process.env.TAMARA_API_URL || '').trim().replace(/\/$/, '');
  return configured || (sandbox ? 'https://api-sandbox.tamara.co' : 'https://api.tamara.co');
}

export function normalizeSaudiPhone(value) {
  const raw = String(value || '').replace(/\D/g, '');
  if (/^05\d{8}$/.test(raw)) return `966${raw.slice(1)}`;
  if (/^9665\d{8}$/.test(raw)) return raw;
  if (/^5\d{8}$/.test(raw)) return `966${raw}`;
  return raw;
}

export function isTamaraPaidStatus(value) {
  const status = String(value || '').trim().toUpperCase().replace(/\s+/g, '_');
  return ['APPROVED','AUTHORISED','FULLY_CAPTURED','PARTIALLY_CAPTURED'].includes(status);
}

export async function retrieveTamaraOrder(orderId) {
  const token = String(process.env.TAMARA_API_TOKEN || '').trim();
  if (!token) throw new Error('TAMARA_API_TOKEN is missing');
  const id = String(orderId || '').trim();
  if (!id) throw new Error('Tamara order ID is missing');
  const response = await fetch(`${getTamaraBaseUrl()}/orders/${encodeURIComponent(id)}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, accept: 'application/json' },
    signal: timeoutSignal(12000)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.message || data?.error || `Tamara returned ${response.status}`);
  return data;
}

export function mapTamaraOrder(raw, fallback = {}) {
  const order = raw?.order && typeof raw.order === 'object' ? raw.order : raw || {};
  const extra = order?.additional_data?.ayan_booking || order?.additional_data?.ayan || order?.metadata || order?.meta || {};
  const consumer = order?.consumer || order?.buyer || {};
  const items = Array.isArray(order?.items) ? order.items : [];
  const firstItem = items[0] || {};
  const packageName = extra.package_name || extra.packageName || firstItem.name || fallback.packageName || '';
  const subtotal = Number(extra.subtotal ?? valueAmount(firstItem.total_amount ?? firstItem.unit_price) ?? order?.total_amount?.amount ?? order?.total_amount?.amount ?? order?.amount ?? fallback.subtotal ?? 0);
  const amount = Number(valueAmount(order?.total_amount ?? order?.amount) ?? extra.total ?? fallback.amount ?? subtotal);
  const fee = Number(extra.payment_fee ?? (amount - subtotal) ?? fallback.paymentFee ?? 0);
  const status = normalizeStatus(order?.status);
  const paymentId = order?.order_id || order?.id || fallback.paymentId || '';
  const phone = normalizeSaudiPhone(extra.phone || consumer.phone_number || consumer.phone || fallback.phone || '');
  return {
    status,
    paymentId,
    tapId: paymentId,
    orderId: paymentId,
    amount,
    currency: valueString(order?.total_amount?.currency || order?.currency) || 'SAR',
    customerName: extra.customer_name || [consumer.first_name, consumer.last_name].filter(Boolean).join(' ') || fallback.customerName || '—',
    email: extra.email || consumer.email || fallback.email || '',
    phone,
    packageKey: extra.package_key || fallback.packageKey || '',
    packageName,
    packageNameAr: extra.package_name_ar || fallback.packageNameAr || packageName,
    packageNameEn: extra.package_name_en || fallback.packageNameEn || packageName,
    subtotal,
    paymentFee: fee,
    paymentFeePercent: Number(extra.payment_fee_percent ?? fallback.paymentFeePercent ?? 6.99),
    paymentFeeFixed: Number(extra.payment_fee_fixed ?? fallback.paymentFeeFixed ?? 7.5),
    serviceFee: fee,
    total: Number(extra.total ?? amount),
    carType: extra.car_type || fallback.carType || '',
    shootRegion: extra.shoot_region || fallback.shootRegion || '',
    termsAccepted: String(extra.terms_accepted ?? 'false') === 'true',
    termsAcceptedAt: extra.terms_accepted_at || fallback.termsAcceptedAt || '',
    lang: extra.lang === 'en' ? 'en' : 'ar',
    created: order?.created_at || order?.created || order?.updated_at || extra.created_at || fallback.created || '',
    notes: extra.notes || fallback.notes || '—',
    testPayment: String(extra.test_payment || 'false') === 'true'
  };
}

function normalizeStatus(value) { return String(value || '').trim().toUpperCase().replace(/\s+/g, '_'); }
function valueAmount(value) {
  if (value && typeof value === 'object' && value.amount !== undefined) return Number(value.amount || 0);
  if (value === null || value === undefined || value === '') return 0;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}
function valueString(value) { return value == null ? '' : String(value); }
function boolEnv(name, fallback) { const raw = String(process.env[name] ?? '').trim().toLowerCase(); if (!raw) return fallback; if (['true','1','yes','on'].includes(raw)) return true; if (['false','0','no','off'].includes(raw)) return false; return fallback; }
function timeoutSignal(ms) { return typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(ms) : undefined; }
