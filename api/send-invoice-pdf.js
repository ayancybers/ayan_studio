import { sendInvoiceEmail } from './lib/invoice-email.js';

export default async function handler(req, res) {
  setSecurityHeaders(res);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!sameOrigin(req)) return res.status(403).json({ error: 'Forbidden origin' });

  const body = req.body || {};
  const provider = body.provider === 'tabby' ? 'tabby' : 'tap';
  const paymentId = String(body.paymentId || body.tapId || '').trim();
  const pdfBase64 = String(body.pdfBase64 || '').trim();
  if (!paymentId) return res.status(400).json({ error: 'Missing payment reference' });
  if (!pdfBase64) return res.status(400).json({ error: 'Missing PDF' });
  if (!process.env.RESEND_API_KEY) return res.status(503).json({ error: 'Email service is not configured' });

  try {
    const data = provider === 'tabby' ? await retrieveTabby(paymentId) : await retrieveTap(paymentId);
    const ok = provider === 'tabby' ? data.status === 'CLOSED' : data.status === 'CAPTURED';
    if (!ok) return res.status(409).json({ error: 'Payment is not confirmed yet', status: data.status });

    const ref = String(data.paymentId || data.tapId || paymentId);
    const invoiceNo = `AYAN-${ref.replace(/[^A-Za-z0-9]/g, '').slice(-12).toUpperCase()}`;
    const cleanPdf = pdfBase64.replace(/^data:application\/pdf;base64,/, '').replace(/\s+/g, '');
    if (!/^[A-Za-z0-9+/=]+$/.test(cleanPdf)) return res.status(400).json({ error: 'Invalid PDF' });
    const bytes = Buffer.from(cleanPdf, 'base64');
    if (bytes.length < 100 || bytes.length > 3_000_000) return res.status(413).json({ error: 'PDF is too large' });
    if (bytes.subarray(0, 4).toString() !== '%PDF') return res.status(400).json({ error: 'Invalid PDF file' });

    const emailResult = await sendInvoiceEmail({
      provider,
      paymentId,
      data,
      req,
      pdfBase64: cleanPdf,
      pdfFileName: `${invoiceNo}.pdf`
    });

    let discordSent = false;
    try {
      discordSent = await sendDiscordPdf({ provider, paymentId: ref, data, pdfBytes: bytes, fileName: `${invoiceNo}.pdf` });
    } catch (error) {
      console.error('Discord PDF upload failed', error?.message || String(error));
    }

    return res.status(200).json({ success: true, emailSent: Boolean(emailResult?.sent), discordSent });
  } catch (error) {
    console.error('Invoice PDF delivery failed', { provider, paymentId, error: error?.message || String(error) });
    return res.status(502).json({ error: 'Unable to deliver PDF invoice' });
  }
}

async function retrieveTap(id) {
  const secret = String(process.env.TAP_SECRET_KEY || '').trim();
  if (!secret) throw new Error('TAP_SECRET_KEY is missing');
  const r = await fetch(`https://api.tap.company/v2/charges/${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${secret}`, accept: 'application/json' } });
  const c = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(c?.response?.message || 'Unable to retrieve Tap payment');
  const m = c.metadata || {};
  return { status: String(c.status || '').toUpperCase(), paymentId: c.id || id, tapId: c.id || id, amount: Number(c.amount || m.total || 0), currency: c.currency || 'SAR', customerName: m.customer_name || '—', email: m.email || c?.customer?.email || '', phone: m.phone || '', packageName: m.package_name || m.package_name_en || '', packageNameAr: m.package_name_ar || '', packageNameEn: m.package_name_en || '', subtotal: Number(m.subtotal || 0), paymentFee: Number(m.payment_fee || m.service_fee || 0), serviceFee: Number(m.payment_fee || m.service_fee || 0), total: Number(m.total || c.amount || 0), carType: m.car_type || '', shootRegion: m.shoot_region || '', termsAccepted: String(m.terms_accepted || 'false') === 'true', termsAcceptedAt: m.terms_accepted_at || '', lang: m.lang === 'en' ? 'en' : 'ar', created: pickPaymentCreatedAt(c), notes: m.notes || '—' };
}

async function retrieveTabby(id) {
  const secret = String(process.env.TABBY_SECRET_KEY || '').trim();
  if (!secret) throw new Error('TABBY_SECRET_KEY is missing');
  const base = String(process.env.TABBY_API_BASE_URL || 'https://api.tabby.sa').trim().replace(/\/$/, '');
  const r = await fetch(`${base}/api/v2/payments/${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${secret}`, accept: 'application/json' } });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d?.error || d?.message || 'Unable to retrieve Tabby payment');
  const m = d.meta || {};
  return { status: String(d.status || '').toUpperCase(), paymentId: d.id || id, tapId: d.id || id, amount: Number(d.amount || m.total || 0), currency: d.currency || 'SAR', customerName: m.customer_name || d?.buyer?.name || '—', email: m.email || d?.buyer?.email || '', phone: m.phone || d?.buyer?.phone || '', packageName: m.package_name || m.package_name_en || '', packageNameAr: m.package_name_ar || '', packageNameEn: m.package_name_en || '', subtotal: Number(m.subtotal || 0), paymentFee: Number(m.payment_fee || 0), serviceFee: Number(m.payment_fee || 0), total: Number(m.total || d.amount || 0), carType: m.car_type || '', shootRegion: m.shoot_region || '', termsAccepted: String(m.terms_accepted || 'false') === 'true', termsAcceptedAt: m.terms_accepted_at || '', lang: m.lang === 'en' ? 'en' : 'ar', created: d.created_at || '', notes: m.notes || '—' };
}

async function sendDiscordPdf({ provider, paymentId, data, pdfBytes, fileName }) {
  const webhookUrl = String(process.env.webhookbooking || process.env.DISCORD_WEBHOOK_Booking || '').trim();
  if (!webhookUrl) return false;

  const form = new FormData();
  const title = provider === 'tabby' ? '📄 AYAN PHOTOGRAPHY • TABBY PDF INVOICE' : '📄 AYAN PHOTOGRAPHY • TAP PDF INVOICE';
  const payload = {
    embeds: [{
      title,
      description: `PDF invoice for **${String(data.customerName || 'Customer').slice(0, 100)}** • ${Number(data.total || data.amount || 0).toFixed(2)} SAR`,
      color: 3066993,
      fields: [
        { name: '🆔 Payment ID', value: limit(paymentId, 100), inline: true },
        { name: '📦 Package', value: limit(data.packageName || '—', 100), inline: true },
        { name: '🚗 Car', value: limit(data.carType || '—', 80), inline: true },
        { name: '📍 Shoot Area', value: limit(data.shootRegion || '—', 80), inline: true },
        { name: '💰 Total', value: `${Number(data.total || data.amount || 0).toFixed(2)} SAR`, inline: true },
        { name: '🕒 Payment Date', value: formatDiscordDate(data.created), inline: true }
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'Ayan Photography • PDF Invoice' }
    }]
  };
  form.append('payload_json', JSON.stringify(payload));
  form.append('files[0]', new Blob([pdfBytes], { type: 'application/pdf' }), fileName);

  const response = await fetch(webhookUrl, { method: 'POST', body: form });
  if (!response.ok) throw new Error(`Discord returned ${response.status}`);
  return true;
}

function formatDiscordDate(value) {
  if (value === null || value === undefined || value === '') return '—';
  const raw = String(value).trim();
  const d = /^\d+$/.test(raw) ? new Date(Number(raw)) : new Date(raw);
  if (Number.isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat('ar-SA',{timeZone:'Asia/Riyadh',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).format(d);
}

function limit(value, max = 1000) { return String(value ?? '').slice(0, max); }
function sameOrigin(req) { const origin = req.headers.origin; if (!origin) return true; const host = String(req.headers.host || '').split(':')[0]; try { return new URL(origin).hostname === host; } catch { return false; } }
function setSecurityHeaders(res) { res.setHeader('Cache-Control', 'no-store, max-age=0'); res.setHeader('X-Content-Type-Options', 'nosniff'); res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin'); res.setHeader('X-Frame-Options', 'SAMEORIGIN'); }
