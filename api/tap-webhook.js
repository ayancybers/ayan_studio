import { sendInvoiceEmail } from './lib/invoice-email.js';
import crypto from 'node:crypto';

const notifiedCharges = globalThis.__ayanNotifiedCharges || new Set();
globalThis.__ayanNotifiedCharges = notifiedCharges;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const secret = String(process.env.TAP_SECRET_KEY || '').trim();
  if (!secret) return res.status(500).json({ error: 'Payment configuration is incomplete' });

  const payload = req.body || {};
  const postedHash = String(req.headers.hashstring || req.headers['x-hashstring'] || '').trim();
  if (!validateTapHash(payload, postedHash, secret)) {
    console.warn('Rejected Tap webhook: invalid hashstring');
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const status = String(payload.status || '').toUpperCase();
  const chargeId = String(payload.id || '').trim();

  if (status === 'CAPTURED' && chargeId) {
    try { await notifyDiscord(payload, chargeId); }
    catch (error) { console.error('Discord notification failed', error); }
    try { await notifyInvoiceEmail(payload, chargeId, req); }
    catch (error) { console.error('Invoice email failed', error); }
  }

  return res.status(200).json({ received: true, status, chargeId });
}

function validateTapHash(payload, postedHash, secret) {
  if (!postedHash || !payload?.id) return false;
  const id = String(payload.id || '');
  const amount = formatTapAmount(payload.amount, payload.currency);
  const currency = String(payload.currency || '');
  const gatewayReference = String(payload?.reference?.gateway || '');
  const paymentReference = String(payload?.reference?.payment || '');
  const status = String(payload.status || '');
  const created = String(payload?.transaction?.created || '');
  const toBeHashed = ['x_id', id, 'x_amount', amount, 'x_currency', currency, 'x_gateway_reference', gatewayReference, 'x_payment_reference', paymentReference, 'x_status', status, 'x_created', created].join('');
  const expected = crypto.createHmac('sha256', secret).update(toBeHashed).digest('hex');
  try {
    const a = Buffer.from(expected, 'utf8');
    const b = Buffer.from(postedHash, 'utf8');
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch (_) { return false; }
}

function formatTapAmount(value, currency) {
  const amount = Number(value || 0);
  const threeDecimal = new Set(['BHD', 'KWD', 'OMR']);
  return amount.toFixed(threeDecimal.has(String(currency || '').toUpperCase()) ? 3 : 2);
}

async function notifyInvoiceEmail(payload, chargeId, req) {
  const m=payload.metadata||{};
  if(!m.email) return;
  await sendInvoiceEmail({provider:'tap',paymentId:chargeId,req,data:{status:String(payload.status||'').toUpperCase(),tapId:chargeId,paymentId:chargeId,amount:Number(payload.amount||m.total||0),currency:payload.currency||'SAR',customerName:m.customer_name||'—',email:m.email,packageName:m.package_name||m.package_name_en||'',packageNameAr:m.package_name_ar||'',packageNameEn:m.package_name_en||'',subtotal:Number(m.subtotal||0),paymentFee:Number(m.payment_fee||m.service_fee||0),serviceFee:Number(m.payment_fee||m.service_fee||0),total:Number(m.total||payload.amount||0),carType:m.car_type||'',shootRegion:m.shoot_region||'',termsAccepted:String(m.terms_accepted||'false')==='true',termsAcceptedAt:m.terms_accepted_at||'',lang:m.lang==='en'?'en':'ar',created:payload?.transaction?.created||'',notes:m.notes||'—'}});
}

async function notifyDiscord(payload, chargeId) {
  const webhookUrl = process.env.webhookbooking || process.env.DISCORD_WEBHOOK_Booking;
  if (!webhookUrl || notifiedCharges.has(chargeId)) return;
  notifiedCharges.add(chargeId);

  const metadata = payload.metadata || {};
  const baseUrl = String(process.env.APP_BASE_URL || '').replace(/\/$/, '');
  const invoiceUrl = baseUrl ? `${baseUrl}/invoice.html?tap_id=${encodeURIComponent(chargeId)}` : '';
  const language = metadata.lang === 'en' ? 'EN' : 'AR';
  const packageName = metadata.package_name || metadata.package_name_en || '—';
  const subtotal = Number(metadata.subtotal || 0).toFixed(2);
  const serviceFee = Number(metadata.service_fee || 0).toFixed(2);
  const tax = Number(metadata.tax || 0).toFixed(2);
  const taxRate = Number(metadata.tax_rate || 0).toString();
  const total = Number(metadata.total || payload.amount || 0).toFixed(2);
  const termsAccepted = String((metadata).terms_accepted || 'false') === 'true';
  const termsAcceptedAt = String((metadata).terms_accepted_at || '');
  const testPayment = String(metadata.test_payment || 'false') === 'true';

  const fields = [
    { name: '🆔 Charge ID', value: limit(chargeId, 100), inline: true },
    { name: '👤 Customer', value: limit(metadata.customer_name || '—', 100), inline: true },
    { name: '📱 WhatsApp', value: limit(metadata.phone || '—', 100), inline: true },
    { name: '📦 Package', value: limit(packageName, 100), inline: true },
    { name: '🚗 Car', value: limit(metadata.car_type || '—', 80), inline: true },
    { name: '📍 Shoot Area', value: limit(metadata.shoot_region || '—', 80), inline: true },
    { name: '💵 Package', value: `${subtotal} SAR`, inline: true },
    { name: '🧾 Service Fee', value: `${serviceFee} SAR`, inline: true },
    { name: '✅ Paid Total', value: `${total} SAR`, inline: true },
    { name: '📜 Terms & Conditions', value: termsAccepted ? '✅ Accepted before payment' : '⚠️ Not recorded', inline: true },
    { name: '🕒 Terms Accepted At', value: limit(termsAcceptedAt || '—', 100), inline: true },
    { name: '🌐 Language', value: language, inline: true },
    { name: '🧪 Mode', value: testPayment ? 'TEST / SANDBOX' : 'LIVE', inline: true },
    { name: '💬 Notes', value: limit(metadata.notes || '—', 900), inline: false }
  ];

  if (invoiceUrl) fields.push({ name: '📄 Invoice', value: `[Open & download invoice](${invoiceUrl})`, inline: false });

  const body = {
    embeds: [{
      title: testPayment ? '🧪 AYAN PHOTOGRAPHY • TEST PAYMENT' : '✅ AYAN PHOTOGRAPHY • PAID BOOKING',
      description: testPayment ? 'A sandbox test payment was captured through Tap.' : 'A booking payment was captured successfully through Tap.',
      color: 3066993,
      fields,
      timestamp: new Date().toISOString(),
      footer: { text: 'Ayan Photography • Tap Payment' }
    }]
  };

  const response = await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!response.ok) { notifiedCharges.delete(chargeId); throw new Error(`Discord webhook returned ${response.status}`); }
}

function limit(value, max = 1000) { return String(value ?? '').slice(0, max); }
