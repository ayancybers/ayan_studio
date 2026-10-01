export function getTamaraBaseUrl() {
  const configured = String(process.env.TAMARA_API_URL || '').trim().replace(/\/$/, '');
  if (configured) return configured;
  return boolEnv('TAMARA_SANDBOX_MODE', false)
    ? 'https://api-sandbox.tamara.co'
    : 'https://api.tamara.co';
}

export function boolEnv(name, fallback = false) {
  const raw = String(process.env[name] ?? '').trim().toLowerCase();
  if (!raw) return fallback;
  if (['true','1','yes','on'].includes(raw)) return true;
  if (['false','0','no','off'].includes(raw)) return false;
  return fallback;
}

export function normalizeSaudiPhone(value) {
  const raw = String(value || '').replace(/\D/g, '');
  if (/^05\d{8}$/.test(raw)) return `966${raw.slice(1)}`;
  if (/^9665\d{8}$/.test(raw)) return raw;
  if (/^5\d{8}$/.test(raw)) return `966${raw}`;
  return raw;
}

export function formatDateValue(value) {
  if (value === null || value === undefined || value === '') return '';
  const n = typeof value === 'number' ? value : Number(value);
  if (Number.isFinite(n) && n > 0) return n < 1e12 ? new Date(n * 1000).toISOString() : new Date(n).toISOString();
  const d = new Date(String(value));
  return Number.isNaN(d.getTime()) ? '' : d.toISOString();
}

export function normalizeTamaraStatus(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, '_');
}

export function isTamaraPaidStatus(value) {
  return ['authorised', 'authorized', 'fully_captured'].includes(normalizeTamaraStatus(value));
}

export async function getTamaraOrder(orderId) {
  const token = String(process.env.TAMARA_API_TOKEN || '').trim();
  if (!token) throw new Error('TAMARA_API_TOKEN is missing');
  const id = String(orderId || '').trim();
  if (!id) throw new Error('Tamara order ID is missing');
  const response = await fetch(`${getTamaraBaseUrl()}/orders/${encodeURIComponent(id)}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, accept: 'application/json' },
    signal: timeoutSignal(15000)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.message || data?.error || `Tamara returned ${response.status}`);
  return data;
}

export async function authoriseTamaraOrder(orderId) {
  const token = String(process.env.TAMARA_API_TOKEN || '').trim();
  if (!token) throw new Error('TAMARA_API_TOKEN is missing');
  const id = String(orderId || '').trim();
  const response = await fetch(`${getTamaraBaseUrl()}/orders/${encodeURIComponent(id)}/authorise`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({}),
    signal: timeoutSignal(15000)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const msg = data?.message || data?.error || `Tamara authorise returned ${response.status}`;
    // Already-authorised / auto-authorised is safe to treat as success.
    if (response.status === 409 && /authori[sz]ed|already/i.test(String(msg))) return { ok: true, data, already: true };
    throw new Error(msg);
  }
  return { ok: true, data };
}

export function mapTamaraOrder(raw, fallback = {}) {
  const order = raw?.order && typeof raw.order === 'object' ? raw.order : raw || {};
  const additional = order.additional_data && typeof order.additional_data === 'object' ? order.additional_data : {};
  const booking = additional.ayan_booking && typeof additional.ayan_booking === 'object'
    ? additional.ayan_booking
    : additional.ayan && typeof additional.ayan === 'object'
      ? additional.ayan
      : order.metadata && typeof order.metadata === 'object'
        ? order.metadata
        : {};
  const consumer = order.consumer || order.customer || {};
  const items = Array.isArray(order.items) ? order.items : [];
  const firstItem = items[0] || {};
  const totalObj = order.total_amount && typeof order.total_amount === 'object' ? order.total_amount : {};
  const total = num(totalObj.amount ?? order.amount ?? booking.total ?? fallback.total ?? firstItem.total_amount?.amount ?? 0);
  const subtotal = num(booking.subtotal ?? firstItem.total_amount?.amount ?? firstItem.unit_price?.amount ?? total);
  const fee = num(booking.payment_fee ?? (total - subtotal) ?? 0);
  const status = normalizeTamaraStatus(order.status);
  const paymentId = order.order_id || order.id || fallback.paymentId || '';
  const phone = normalizeSaudiPhone(booking.phone || consumer.phone_number || consumer.phone || fallback.phone || '');
  return {
    status,
    paymentId,
    tapId: paymentId,
    orderId: paymentId,
    amount: total,
    currency: totalObj.currency || order.currency || 'SAR',
    customerName: booking.customer_name || [consumer.first_name, consumer.last_name].filter(Boolean).join(' ') || fallback.customerName || '—',
    email: booking.email || consumer.email || fallback.email || '',
    phone,
    packageKey: booking.package_key || fallback.packageKey || '',
    packageName: booking.package_name || booking.package_name_ar || booking.package_name_en || firstItem.name || fallback.packageName || '—',
    packageNameAr: booking.package_name_ar || fallback.packageNameAr || booking.package_name || '—',
    packageNameEn: booking.package_name_en || fallback.packageNameEn || booking.package_name || '—',
    subtotal,
    paymentFee: fee,
    paymentFeePercent: num(booking.payment_fee_percent ?? 6.99),
    paymentFeeFixed: num(booking.payment_fee_fixed ?? 7.5),
    serviceFee: fee,
    total,
    carType: booking.car_type || fallback.carType || '',
    shootRegion: booking.shoot_region || fallback.shootRegion || '',
    termsAccepted: String(booking.terms_accepted ?? 'false') === 'true' || booking.terms_accepted === true,
    termsAcceptedAt: booking.terms_accepted_at || fallback.termsAcceptedAt || '',
    lang: booking.lang === 'en' ? 'en' : 'ar',
    created: formatDateValue(order.created_at || order.created || order.updated_at || booking.created_at || fallback.created || ''),
    notes: booking.notes || fallback.notes || '—'
  };
}

function num(value) { const n = Number(value); return Number.isFinite(n) ? n : 0; }
function timeoutSignal(ms) { return typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(ms) : undefined; }
