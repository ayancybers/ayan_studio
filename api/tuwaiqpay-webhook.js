import crypto from 'node:crypto';
import { PACKAGES, calculatePricing } from '../lib/pricing.js';
import { sendInvoiceEmail } from '../lib/server/invoice-email.js';
import {
  getTuwaiqPayWebhookCredentials,
  sealTuwaiqPayReceipt
} from '../lib/server/tuwaiqpay.js';

const PROCESSED_PAYMENTS = globalThis.__ayanTuwaiqProcessedPayments || new Set();
globalThis.__ayanTuwaiqProcessedPayments = PROCESSED_PAYMENTS;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { headerName, headerValue } = getTuwaiqPayWebhookCredentials();
  if (!/^[a-z0-9-]{3,60}$/.test(headerName) || headerValue.length < 24) {
    return res.status(503).json({ error: 'TuwaiqPay webhook credentials are not configured.' });
  }
  const provided = String(req.headers[headerName] || '').trim();
  if (!timingSafeEqual(provided, headerValue)) return res.status(401).json({ error: 'Invalid webhook credentials.' });

  const body = parseBody(req);
  const details = body.transactionDetails;
  if (!details || typeof details !== 'object') return res.status(400).json({ error: 'Invalid webhook payload.' });

  const transactionStatus = String(details.transactionStatus || '').trim().toUpperCase();
  const bill = details.bill && typeof details.bill === 'object' ? details.bill : {};
  const billStatus = String(bill.status || '').trim().toUpperCase();
  const isPaid = !['FAILED', 'REJECTED', 'DECLINED', 'CANCELLED', 'CANCELED', 'REFUNDED', 'REFUND'].includes(transactionStatus)
    && (billStatus === 'PAID' || ['SETTLED', 'COMPLETED', 'CAPTURED'].includes(transactionStatus));
  if (!isPaid) return res.status(200).json({ received: true, processed: false, status: transactionStatus || billStatus });

  const paymentId = String(details.transactionId || details.transactionIdDisplay || details.id || details.merchantTransactionId || '').trim();
  if (!paymentId) return res.status(400).json({ error: 'Missing transaction reference.' });
  if (PROCESSED_PAYMENTS.has(paymentId)) return res.status(200).json({ received: true, duplicate: true, paymentId });

  const parsed = parseBookingDescription(bill.description || details.description || '');
  const pkg = parsed.packageKey ? PACKAGES[parsed.packageKey] : null;
  const pricingMethod = parsed.paymentMethod;
  if (!pkg || !pricingMethod) {
    console.error('TuwaiqPay webhook: booking details could not be recovered from the bill description.', { paymentId });
    return res.status(200).json({ received: true, processed: false, reason: 'Booking description was not recognized.' });
  }

  const pricing = calculatePricing(parsed.packageKey, pricingMethod);
  const amount = Number(bill.amount ?? details.amount ?? 0);
  if (!Number.isFinite(amount) || Math.abs(amount - pricing.total) > 0.01) {
    console.error('TuwaiqPay webhook: amount did not match the server-calculated booking total.', { paymentId, amount, expected: pricing.total });
    return res.status(200).json({ received: true, processed: false, reason: 'Amount mismatch.' });
  }

  const paymentMethod = String(
    bill.processedPaymentMethod?.displayName
      || bill.processedPaymentMethod?.code
      || details.paymentMethod?.displayName
      || details.paymentMethod?.code
      || parsed.paymentLabel
  ).slice(0, 80);
  const customerName = String(bill.customerName || details.customerName || '').slice(0, 120);
  const email = String(bill.customerEmail || details.customerEmail || '').trim().toLowerCase();
  const phone = String(bill.customerMobilePhone || details.customerMobilePhone || '').slice(0, 40);
  const lang = parsed.lang;
  const created = details.paymentDate || details.eventDate || details.createdAt || '';
  const receipt = {
    success: true,
    provider: 'tuwaiqpay',
    status: 'PAID',
    paymentId,
    transactionId: String(details.transactionId || paymentId),
    merchantTransactionId: String(details.merchantTransactionId || ''),
    amount,
    currency: String(bill.currency?.code || 'SAR'),
    customerName,
    email,
    phone,
    packageName: lang === 'en' ? pkg.en : pkg.ar,
    packageNameAr: pkg.ar,
    packageNameEn: pkg.en,
    paymentMethod,
    paymentMethodCode: String(bill.processedPaymentMethod?.code || details.paymentMethod?.code || '').toUpperCase(),
    subtotal: pricing.subtotal,
    paymentFee: pricing.paymentFee,
    paymentFeePercent: pricing.paymentFeePercent,
    paymentFeeFixed: pricing.paymentFeeFixed,
    serviceFee: pricing.paymentFee,
    total: amount,
    carType: parsed.carType,
    shootRegion: parsed.shootRegion,
    termsAccepted: true,
    termsAcceptedAt: '',
    lang,
    created,
    notes: '—'
  };

  try {
    const receiptToken = sealTuwaiqPayReceipt(receipt);
    const emailResult = await sendInvoiceEmail({ provider: 'tuwaiqpay', paymentId, data: receipt, req, receiptToken });
    if (emailResult.skipped) {
      console.error('TuwaiqPay payment was confirmed, but the invoice email was skipped.', { paymentId, reason: emailResult.reason });
    }
    try {
      await notifyDiscord(receipt, details, req, receiptToken);
    } catch (error) {
      console.error('TuwaiqPay payment was confirmed, but the Discord notification failed.', { paymentId, error: error?.message || String(error) });
    }
    PROCESSED_PAYMENTS.add(paymentId);
    return res.status(200).json({ received: true, processed: true, paymentId });
  } catch (error) {
    console.error('TuwaiqPay paid webhook processing failed', { paymentId, error: error?.message || String(error) });
    return res.status(500).json({ error: 'Unable to process confirmed payment.' });
  }
}

function parseBookingDescription(value) {
  const parts = String(value || '').split('|').map((part) => part.trim());
  if (parts.length < 5 || parts[0] !== 'Ayan Photography') return {};
  const packageLabel = parts[1];
  const packageKey = Object.entries(PACKAGES).find(([, pkg]) => pkg.en === packageLabel || pkg.ar === packageLabel)?.[0] || '';
  const methodLabel = parts[2].toLowerCase();
  const methods = {
    'mada': 'tuwaiqpay_mada',
    'visa / mastercard - saudi issued': 'tuwaiqpay_visa_local',
    'visa / mastercard - international': 'tuwaiqpay_visa_international',
    'american express': 'tuwaiqpay_amex',
    'apple pay': 'tuwaiqpay_apple_pay',
    'stc pay': 'tuwaiqpay_stc_pay'
  };
  return {
    packageKey,
    paymentMethod: methods[methodLabel] || '',
    paymentLabel: parts[2],
    carType: String(parts[3] || '').slice(0, 40),
    shootRegion: String(parts[4] || '').slice(0, 60),
    lang: parts[5] === 'en' ? 'en' : 'ar'
  };
}

async function notifyDiscord(receipt, details, req, receiptToken) {
  const webhookUrl = String(process.env.webhookbooking || process.env.DISCORD_WEBHOOK_Booking || '').trim();
  if (!webhookUrl) return;
  const baseUrl = String(process.env.APP_BASE_URL || '').trim().replace(/\/$/, '') || getRequestBaseUrl(req);
  const invoiceUrl = `${baseUrl}/invoice?provider=tuwaiqpay&receipt=${encodeURIComponent(receiptToken)}`;
  const fields = [
    { name: 'Payment ID', value: limit(receipt.paymentId, 100), inline: true },
    { name: 'Customer', value: limit(receipt.customerName || '—', 100), inline: true },
    { name: 'WhatsApp', value: limit(receipt.phone || '—', 100), inline: true },
    { name: 'Package', value: limit(receipt.packageName || '—', 100), inline: true },
    { name: 'Payment method', value: limit(receipt.paymentMethod || 'TuwaiqPay', 80), inline: true },
    { name: 'Area', value: limit(receipt.shootRegion || '—', 80), inline: true },
    { name: 'Package price', value: `${receipt.subtotal.toFixed(2)} SAR`, inline: true },
    { name: 'Payment fee', value: `${receipt.paymentFee.toFixed(2)} SAR`, inline: true },
    { name: 'Paid total', value: `${receipt.total.toFixed(2)} SAR`, inline: true },
    { name: 'Provider reference', value: limit(details.merchantTransactionId || '—', 100), inline: false },
    { name: 'Invoice', value: `[Open invoice](${invoiceUrl})`, inline: false }
  ];
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [{ title: '✅ AYAN PHOTOGRAPHY • PAID BOOKING', color: 0x2dbb76, fields, timestamp: new Date().toISOString() }] }),
    signal: timeoutSignal(8000)
  });
  if (!response.ok) throw new Error(`Discord webhook returned ${response.status}.`);
}

function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch (_) {}
  }
  return {};
}
function timingSafeEqual(actual, expected) {
  const left = Buffer.from(String(actual), 'utf8');
  const right = Buffer.from(String(expected), 'utf8');
  try { return left.length === right.length && crypto.timingSafeEqual(left, right); } catch (_) { return false; }
}
function limit(value, max) { return String(value ?? '').slice(0, max); }
function getRequestBaseUrl(req) {
  const protocol = String(req.headers['x-forwarded-proto'] || 'https').split(',')[0];
  const host = String(req.headers.host || '').split(',')[0];
  return `${protocol}://${host}`;
}
function timeoutSignal(ms) {
  return typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(ms) : undefined;
}
