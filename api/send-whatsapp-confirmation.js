import { retrieveTamaraOrder, mapTamaraOrder, isTamaraPaidStatus } from './lib/tamara.js';
export default async function handler(req, res) {
  setSecurityHeaders(res);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!sameOrigin(req)) return res.status(403).json({ error: 'Forbidden origin' });

  if (!boolEnv('WHATSLOOP_ENABLED', false)) {
    return res.status(200).json({ success: true, skipped: true, reason: 'WhatsLoop is disabled' });
  }

  const body = req.body || {};
  const provider = body.provider === 'tabby' ? 'tabby' : body.provider === 'tamara' ? 'tamara' : 'tap';
  const details = body.details && typeof body.details === 'object' ? body.details : {};
  const paymentId = String(body.paymentId || body.tapId || '').trim();
  if (!paymentId) return res.status(400).json({ error: 'Missing payment reference' });

  const token = String(process.env.WHATSLOOP_TOKEN || '').trim();
  const channelId = Number(process.env.WHATSLOOP_CHANNEL_ID || 0);
  const baseUrl = String(process.env.WHATSLOOP_API_BASE_URL || 'https://api.whatsloop.net/v1').trim().replace(/\/$/, '');
  if (!token || !/^wl_/.test(token) || !Number.isInteger(channelId) || channelId < 1) {
    return res.status(503).json({ error: 'WhatsLoop configuration is incomplete' });
  }

  try {
    let data = provider === 'tabby'
      ? await retrieveTabby(paymentId)
      : provider === 'tamara'
        ? mapTamaraOrder(await retrieveTamaraOrder(paymentId), { paymentId })
        : await retrieveTap(paymentId);

    const confirmed = provider === 'tabby' ? data.status === 'CLOSED' : provider === 'tamara' ? isTamaraPaidStatus(data.status) : data.status === 'CAPTURED';
    if (!confirmed) {
      return res.status(409).json({ error: 'Payment is not confirmed yet', status: data.status });
    }

    data = mergeBookingDetails(data, details);

    const to = normalizeSaudiPhone(data.phone);
    if (!/^9665\d{8}$/.test(to)) {
      return res.status(422).json({ error: 'Customer WhatsApp number is missing or invalid' });
    }

    const total = Number(data.total || data.amount || 0);
    const ref = String(data.paymentId || data.tapId || paymentId);
    const invoiceNo = `AYAN-${ref.replace(/[^A-Za-z0-9]/g, '').slice(-12).toUpperCase()}`;
    const packageName = data.packageNameAr || data.packageName || data.packageNameEn || 'الباقة';

    const message = data.lang === 'en'
      ? [
          `Hello ${firstName(data.customerName)} 👋`,
          '✅ Your booking has been confirmed successfully. Thank you for completing the payment.',
          `📸 Package: ${packageName}`,
          `💰 Total: ${total.toFixed(2)} SAR`,
          `🧾 Invoice: ${invoiceNo}`,
          'Please wait until we contact you to schedule your photography session.',
          'Thank you for choosing Ayan Photography 🤍'
        ].join('\n')
      : [
          `السلام عليكم ${firstName(data.customerName)}👋`,
          '✅ تم تأكيد حجزك بنجاح، شكرًا لإتمام الدفع.',
          `📸 الباقة: ${packageName}`,
          `💰 المبلغ: ${total.toFixed(2)} ريال`,
          `🧾 رقم الفاتورة: ${invoiceNo}`,
          'يرجى الانتظار حتى يتم التواصل معك لتحديد موعد التصوير.',
          'شكرًا لاختيارك Ayan Photography 🤍'
        ].join('\n');

    const response = await fetch(`${baseUrl}/messages/send-text`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({
        channel_id: channelId,
        to,
        message
      }),
      signal: timeoutSignal(12000)
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || result?.success === false) {
      const reason = result?.message || result?.error || `WhatsLoop returned ${response.status}`;
      throw new Error(reason);
    }

    return res.status(200).json({
      success: true,
      sent: true,
      messageId: result?.data?.message_id || result?.data?.id || ''
    });
  } catch (error) {
    console.error('WhatsLoop confirmation failed', {
      provider,
      paymentId,
      error: error?.message || String(error)
    });
    return res.status(502).json({ error: 'Unable to send WhatsApp confirmation' });
  }
}

async function retrieveTap(id) {
  const secret = String(process.env.TAP_SECRET_KEY || '').trim();
  if (!secret) throw new Error('TAP_SECRET_KEY is missing');
  const r = await fetch(`https://api.tap.company/v2/charges/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${secret}`, accept: 'application/json' },
    signal: timeoutSignal(12000)
  });
  const c = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(c?.response?.message || 'Unable to retrieve Tap payment');
  const m = c.metadata || {};
  return {
    status: String(c.status || '').toUpperCase(),
    paymentId: c.id || id,
    tapId: c.id || id,
    amount: Number(c.amount || m.total || 0),
    total: Number(m.total || c.amount || 0),
    customerName: m.customer_name || fullName(c),
    packageNameAr: m.package_name_ar || '',
    packageName: m.package_name || m.package_name_en || '',
    packageNameEn: m.package_name_en || '',
    phone: m.phone || c?.customer?.phone?.number || '',
    lang: m.lang === 'en' ? 'en' : 'ar'
  };
}

async function retrieveTabby(id) {
  const secret = String(process.env.TABBY_SECRET_KEY || '').trim();
  if (!secret) throw new Error('TABBY_SECRET_KEY is missing');
  const base = String(process.env.TABBY_API_BASE_URL || 'https://api.tabby.sa').trim().replace(/\/$/, '');
  const r = await fetch(`${base}/api/v2/payments/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${secret}`, accept: 'application/json' },
    signal: timeoutSignal(12000)
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d?.error || d?.message || 'Unable to retrieve Tabby payment');
  const m = d.meta || {};
  return {
    status: String(d.status || '').toUpperCase(),
    paymentId: d.id || id,
    tapId: d.id || id,
    amount: Number(d.amount || m.total || 0),
    total: Number(m.total || d.amount || 0),
    customerName: m.customer_name || d?.buyer?.name || '—',
    packageNameAr: m.package_name_ar || '',
    packageName: m.package_name || m.package_name_en || '',
    packageNameEn: m.package_name_en || '',
    phone: m.phone || d?.buyer?.phone || '',
    lang: m.lang === 'en' ? 'en' : 'ar'
  };
}

function fullName(c) {
  return [c?.customer?.first_name, c?.customer?.last_name].filter(Boolean).join(' ') || '—';
}

function firstName(value) {
  return String(value || 'عميل').trim().split(/\s+/)[0] || 'عميل';
}

function normalizeSaudiPhone(value) {
  const raw = String(value || '').replace(/\D/g, '');
  if (/^05\d{8}$/.test(raw)) return `966${raw.slice(1)}`;
  if (/^9665\d{8}$/.test(raw)) return raw;
  if (/^5\d{8}$/.test(raw)) return `966${raw}`;
  return raw;
}

function boolEnv(name, fallback) {
  const raw = String(process.env[name] ?? '').trim().toLowerCase();
  if (!raw) return fallback;
  if (['true', '1', 'yes', 'on'].includes(raw)) return true;
  if (['false', '0', 'no', 'off'].includes(raw)) return false;
  return fallback;
}

function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  const host = String(req.headers.host || '').split(':')[0];
  try { return new URL(origin).hostname === host; } catch { return false; }
}

function timeoutSignal(ms) {
  return typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(ms) : undefined;
}

function setSecurityHeaders(res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
}
