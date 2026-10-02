import { sendInvoiceEmail } from '../lib/server/invoice-email.js';
import { getTamaraOrder, mapTamaraOrder } from '../lib/server/tamara.js';

export default async function handler(req, res) {
  setSecurityHeaders(res);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!sameOrigin(req)) return res.status(403).json({ error: 'Forbidden origin' });

  const body = req.body || {};
  const provider = body.provider === 'tabby' ? 'tabby' : body.provider === 'tamara' ? 'tamara' : 'tap';
  const paymentId = String(body.paymentId || body.tapId || '').trim();
  const pdfBase64 = String(body.pdfBase64 || '').trim();
  const details = body.details && typeof body.details === 'object' ? body.details : {};
  if (!paymentId) return res.status(400).json({ error: 'Missing payment reference' });
  if (!pdfBase64) return res.status(400).json({ error: 'Missing PDF' });

  try {
    let data = provider === 'tabby' ? await retrieveTabby(paymentId) : provider === 'tamara' ? mapTamaraOrder(await getTamaraOrder(paymentId)) : await retrieveTap(paymentId);
    const confirmed = provider === 'tabby' ? data.status === 'CLOSED' : provider === 'tamara' ? ['authorised','authorized','fully_captured'].includes(String(data.status||'').toLowerCase()) : data.status === 'CAPTURED';
    if (!confirmed) return res.status(409).json({ error: 'Payment is not confirmed yet', status: data.status });

    data = mergeBookingDetails(data, sanitizeBookingDetails(details));

    const ref = String(data.paymentId || data.tapId || paymentId);
    const invoiceNo = `AYAN-${ref.replace(/[^A-Za-z0-9]/g, '').slice(-12).toUpperCase()}`;
    const cleanPdf = pdfBase64.replace(/^data:application\/pdf;base64,/, '').replace(/\s+/g, '');
    if (!/^[A-Za-z0-9+/=]+$/.test(cleanPdf)) return res.status(400).json({ error: 'Invalid PDF' });
    const pdfBytes = Buffer.from(cleanPdf, 'base64');
    if (pdfBytes.length < 100) return res.status(400).json({ error: 'Invalid PDF file' });
    if (pdfBytes.length > 3_000_000) return res.status(413).json({ error: 'PDF is too large' });
    if (pdfBytes.subarray(0, 4).toString() !== '%PDF') return res.status(400).json({ error: 'Invalid PDF file' });

    const result = { success: true, emailSent: false, discordSent: false };
    const errors = [];

    // Send the actual PDF as an email attachment.
    try {
      const emailResult = await sendInvoiceEmail({
        provider,
        paymentId: ref,
        data,
        req,
        pdfBase64: cleanPdf,
        pdfFileName: `${invoiceNo}.pdf`
      });
      result.emailSent = Boolean(emailResult?.sent);
      if (!result.emailSent) errors.push(`email: ${emailResult?.reason || 'not sent'}`);
    } catch (error) {
      errors.push(`email: ${error?.message || String(error)}`);
    }

    // Send the same PDF bytes directly to Discord as a real file attachment.
    try {
      result.discordSent = await sendDiscordPdf({
        provider,
        paymentId: ref,
        data,
        pdfBytes,
        fileName: `${invoiceNo}.pdf`
      });
    } catch (error) {
      errors.push(`discord: ${error?.message || String(error)}`);
    }

    if (errors.length) {
      console.error('Invoice delivery partial result', {
        provider,
        paymentId: ref,
        emailSent: result.emailSent,
        discordSent: result.discordSent,
        errors
      });
    }

    // Return the exact delivery state so the success page can tell the customer what actually happened.
    return res.status(200).json({
      ...result,
      partialErrors: errors.slice(0, 3)
    });
  } catch (error) {
    console.error('Invoice PDF delivery failed', {
      provider,
      paymentId,
      error: error?.message || String(error)
    });
    return res.status(502).json({ error: 'Unable to deliver PDF invoice' });
  }
}

async function retrieveTap(id) {
  const secret = String(process.env.TAP_SECRET_KEY || '').trim();
  if (!secret) throw new Error('TAP_SECRET_KEY is missing');
  const r = await fetch(`https://api.tap.company/v2/charges/${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${secret}`, accept: 'application/json' }, signal: timeoutSignal(12000) });
  const c = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(c?.response?.message || 'Unable to retrieve Tap payment');
  const m = c.metadata || {};
  return { status: String(c.status || '').toUpperCase(), paymentId: c.id || id, tapId: c.id || id, amount: Number(c.amount || m.total || 0), currency: c.currency || 'SAR', customerName: m.customer_name || '—', email: m.email || c?.customer?.email || '', phone: m.phone || '', packageName: m.package_name || m.package_name_en || '', packageNameAr: m.package_name_ar || '', packageNameEn: m.package_name_en || '', subtotal: Number(m.subtotal || 0), paymentFee: Number(m.payment_fee || m.service_fee || 0), serviceFee: Number(m.payment_fee || m.service_fee || 0), total: Number(m.total || c.amount || 0), carType: m.car_type || '', shootRegion: m.shoot_region || '', termsAccepted: String(m.terms_accepted || 'false') === 'true', termsAcceptedAt: m.terms_accepted_at || '', lang: m.lang === 'en' ? 'en' : 'ar', created: pickPaymentCreatedAt(c), notes: m.notes || '—' };
}

async function retrieveTabby(id) {
  const secret = String(process.env.TABBY_SECRET_KEY || '').trim();
  if (!secret) throw new Error('TABBY_SECRET_KEY is missing');
  const base = String(process.env.TABBY_API_BASE_URL || 'https://api.tabby.sa').trim().replace(/\/$/, '');
  const r = await fetch(`${base}/api/v2/payments/${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${secret}`, accept: 'application/json' }, signal: timeoutSignal(12000) });
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
  const fields = [
    { name: '🆔 Payment ID', value: limit(paymentId, 100), inline: true },
    { name: '👤 Customer', value: limit(data.customerName || '—', 100), inline: true },
    { name: '📱 WhatsApp', value: limit(data.phone || '—', 100), inline: true },
    { name: '📧 Email', value: limit(data.email || '—', 140), inline: true },
    { name: '📦 Package', value: limit(data.packageName || data.packageNameAr || data.packageNameEn || '—', 100), inline: true },
    { name: '🚗 Car', value: limit(data.carType || '—', 80), inline: true },
    { name: '📍 Shoot Area', value: limit(data.shootRegion || '—', 80), inline: true },
    { name: '💵 Package Price', value: `${Number(data.subtotal || 0).toFixed(2)} SAR`, inline: true },
    { name: '🧾 Payment Fee', value: `+ ${Number(data.paymentFee || data.serviceFee || 0).toFixed(2)} SAR`, inline: true },
    { name: '✅ Paid Total', value: `${Number(data.total || data.amount || 0).toFixed(2)} SAR`, inline: true },
    { name: '🕒 Payment Date', value: formatDiscordDate(data.created), inline: true },
    { name: '📜 Terms & Conditions', value: data.termsAccepted === true ? '✅ Accepted before payment' : '⚠️ Not recorded', inline: true },
    { name: '🕒 Terms Accepted At', value: limit(formatDiscordDate(data.termsAcceptedAt) || '—', 100), inline: true },
    { name: '🌐 Language', value: data.lang === 'en' ? 'EN' : 'AR', inline: true },
    { name: '💬 Notes', value: limit(data.notes || '—', 900), inline: false }
  ];
  const payload = { embeds: [{ title, description: `PDF invoice for **${String(data.customerName || 'Customer').slice(0, 100)}** • ${Number(data.total || data.amount || 0).toFixed(2)} SAR`, color: 3066993, fields, timestamp: new Date().toISOString(), footer: { text: 'Ayan Photography • PDF Invoice' } }] };
  form.append('payload_json', JSON.stringify(payload));
  form.append('files[0]', new Blob([pdfBytes], { type: 'application/pdf' }), fileName);

  const response = await fetch(webhookUrl, { method: 'POST', body: form, signal: timeoutSignal(20000) });
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

function pickPaymentCreatedAt(c) {
  const candidates = [c?.created, c?.created_at, c?.activities?.find?.(a => String(a?.status || '').toUpperCase() === 'CAPTURED')?.created, c?.activities?.[0]?.created];
  for (const value of candidates) {
    if (value === null || value === undefined || value === '') continue;
    const n = typeof value === 'number' ? value : Number(value);
    if (Number.isFinite(n) && n > 0) return n < 1e12 ? n * 1000 : n;
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d.toISOString();
  }
  return '';
}

function normalizeSaudiPhone(value) { const raw = String(value || '').replace(/\D/g, ''); if (/^05\d{8}$/.test(raw)) return `966${raw.slice(1)}`; if (/^9665\d{8}$/.test(raw)) return raw; if (/^5\d{8}$/.test(raw)) return `966${raw}`; return raw; }
function limit(value, max = 1000) { return String(value ?? '').slice(0, max); }
function boolEnv(name, fallback) { const raw = String(process.env[name] ?? '').trim().toLowerCase(); if (!raw) return fallback; if (['true','1','yes','on'].includes(raw)) return true; if (['false','0','no','off'].includes(raw)) return false; return fallback; }
function sameOrigin(req) { const origin = req.headers.origin; if (!origin) return true; const host = String(req.headers.host || '').split(':')[0]; try { return new URL(origin).hostname === host; } catch { return false; } }
function timeoutSignal(ms) { return typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(ms) : undefined; }
function setSecurityHeaders(res) { res.setHeader('Cache-Control', 'no-store, max-age=0'); res.setHeader('X-Content-Type-Options', 'nosniff'); res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin'); res.setHeader('X-Frame-Options', 'SAMEORIGIN'); }
