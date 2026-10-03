import { sendInvoiceEmail } from '../lib/server/invoice-email.js';
import crypto from 'node:crypto';
import { handleTabbyAuthorizedWebhook } from './tabby-payment.js';

const notifiedPayments = globalThis.__ayanTabbyNotifiedPayments || new Set();
globalThis.__ayanTabbyNotifiedPayments = notifiedPayments;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const webhookSecret = String(process.env.TABBY_WEBHOOK_SECRET || '').trim();
  const expectedHeader = String(process.env.TABBY_WEBHOOK_HEADER || 'X-Auth-Key').trim();
  if (!webhookSecret) return res.status(500).json({ error: 'Tabby webhook configuration is incomplete' });

  const provided = String(req.headers[expectedHeader.toLowerCase()] || '').trim();
  if (!timingSafeEqual(provided, webhookSecret)) {
    console.warn('Rejected Tabby webhook: invalid authentication header');
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const payload = req.body || {};
  const status = String(payload.status || '').toLowerCase();
  const paymentId = String(payload.id || '').trim();

  try {
    if (status === 'authorized') {
      await handleTabbyAuthorizedWebhook(payload, String(process.env.TABBY_SECRET_KEY || '').trim());
    }
    if (status === 'closed' && paymentId && !notifiedPayments.has(paymentId)) {
      try { await notifyDiscord(payload, paymentId); } catch (error) { console.error('Discord notification failed', error); }
      if (String(process.env.INVOICE_WEBHOOK_FALLBACK || '').toLowerCase() === 'true') { try { await notifyInvoiceEmail(payload, paymentId, req); } catch (error) { console.error('Invoice email failed', error); } }
      notifiedPayments.add(paymentId);
    }
  } catch (error) {
    console.error('Tabby webhook processing failed', error);
    if (status === 'closed' && paymentId) notifiedPayments.delete(paymentId);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }

  return res.status(200).json({ received: true, status, paymentId });
}

function timingSafeEqual(a, b) {
  const aa = Buffer.from(String(a), 'utf8');
  const bb = Buffer.from(String(b), 'utf8');
  try { return aa.length === bb.length && crypto.timingSafeEqual(aa, bb); }
  catch (_) { return false; }
}

async function notifyInvoiceEmail(payload, paymentId, req) {
  const m=payload.meta||{};
  if(!m.email) return;
  await sendInvoiceEmail({provider:'tabby',paymentId,req,data:{status:String(payload.status||'').toUpperCase(),paymentId,tapId:paymentId,amount:Number(payload.amount||m.total||0),currency:payload.currency||'SAR',customerName:m.customer_name||payload?.buyer?.name||'—',email:m.email,packageName:m.package_name||m.package_name_en||'',packageNameAr:m.package_name_ar||'',packageNameEn:m.package_name_en||'',subtotal:Number(m.subtotal||0),paymentFee:Number(m.payment_fee||0),serviceFee:Number(m.payment_fee||0),total:Number(m.total||payload.amount||0),carType:m.car_type||'',shootRegion:m.shoot_region||'',termsAccepted:String(m.terms_accepted||'false')==='true',termsAcceptedAt:m.terms_accepted_at||'',lang:m.lang==='en'?'en':'ar',created:payload.created_at||'',notes:m.notes||'—'}});
}

async function notifyDiscord(payload, paymentId) {
  const webhookUrl = process.env.webhookbooking || process.env.DISCORD_WEBHOOK_Booking;
  if (!webhookUrl) return;
  const meta = payload.meta || {};
  const baseUrl = String(process.env.APP_BASE_URL || '').replace(/\/$/, '');
  const invoiceUrl = baseUrl ? `${baseUrl}/invoice?provider=tabby&payment_id=${encodeURIComponent(paymentId)}` : '';
  const packageName = meta.package_name || meta.package_name_en || '—';
  const subtotal = Number(meta.subtotal || 0).toFixed(2);
  const paymentFee = Number(meta.payment_fee || 0).toFixed(2);
  const tax = Number(meta.tax || 0).toFixed(2);
  const taxRate = Number(meta.tax_rate || 0).toString();
  const total = Number(meta.total || payload.amount || 0).toFixed(2);
  const termsAccepted = String((meta).terms_accepted || 'false') === 'true';
  const termsAcceptedAt = String((meta).terms_accepted_at || '');
  const testPayment = String(meta.test_payment || 'false') === 'true' || Boolean(payload.is_test);

  const fields = [
    { name: '🆔 Payment ID', value: limit(paymentId, 100), inline: true },
    { name: '👤 Customer', value: limit(meta.customer_name || '—', 100), inline: true },
    { name: '📱 WhatsApp', value: limit(meta.phone || '—', 100), inline: true },
    { name: '📦 Package', value: limit(packageName, 100), inline: true },
    { name: '🚗 Car', value: limit(meta.car_type || '—', 80), inline: true },
    { name: '📍 Shoot Area', value: limit(meta.shoot_region || '—', 80), inline: true },
    { name: '💵 Package', value: `${subtotal} SAR`, inline: true },
    { name: '💳 Payment Fee', value: `${paymentFee} SAR`, inline: true },
    { name: '✅ Paid Total', value: `${total} SAR`, inline: true },
    { name: '📜 Terms & Conditions', value: termsAccepted ? '✅ Accepted before payment' : '⚠️ Not recorded', inline: true },
    { name: '🕒 Terms Accepted At', value: limit(termsAcceptedAt || '—', 100), inline: true },
    { name: '🌐 Language', value: meta.lang === 'en' ? 'EN' : 'AR', inline: true },
    { name: '🧪 Mode', value: testPayment ? 'TEST / SANDBOX' : 'LIVE', inline: true },
    { name: '💬 Notes', value: limit(meta.notes || '—', 900), inline: false }
  ];
  if (invoiceUrl) fields.push({ name: '📄 Invoice', value: `[Open & download invoice](${invoiceUrl})`, inline: false });

  const body = {
    embeds: [{
      title: testPayment ? '🧪 AYAN PHOTOGRAPHY • TEST TABBY PAYMENT' : '✅ AYAN PHOTOGRAPHY • PAID TABBY BOOKING',
      description: testPayment ? 'A sandbox test payment was closed through Tabby.' : 'A booking payment was completed through Tabby.',
      color: 3066993,
      fields,
      timestamp: new Date().toISOString(),
      footer: { text: 'Ayan Photography • Tabby Payment' }
    }]
  };

  const response = await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!response.ok) throw new Error(`Discord webhook returned ${response.status}`);
}

function limit(value, max = 1000) { return String(value ?? '').slice(0, max); }
