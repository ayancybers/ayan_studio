import crypto from 'node:crypto';

const KNOWN_PAYMENT_METHODS = new Set(['VISA', 'MASTER', 'MADA', 'AMEX', 'STC_PAY', 'APPLE_PAY']);
const DEFAULT_PAYMENT_METHODS = ['VISA', 'MASTER', 'MADA', 'AMEX', 'STC_PAY', 'APPLE_PAY'];

export function getTuwaiqPayCredentials() {
  return {
    username: String(process.env.TUWAIQPAY_USERNAME || '').trim(),
    password: String(process.env.TUWAIQPAY_PASSWORD || '').trim(),
    userNameType: String(process.env.TUWAIQPAY_USER_NAME_TYPE || '').trim().toUpperCase()
  };
}

export function isTuwaiqPayConfigured() {
  const { username, password } = getTuwaiqPayCredentials();
  return Boolean(username && password);
}

export function isTuwaiqPayReady() {
  const { headerName, headerValue } = getTuwaiqPayWebhookCredentials();
  const receiptSecret = String(process.env.TUWAIQPAY_RECEIPT_SECRET || '').trim();
  const resendKey = String(process.env.RESEND_API_KEY || '').trim();
  const emailFrom = String(process.env.EMAIL_FROM || '').trim();
  return isTuwaiqPayConfigured()
    && /^[a-z0-9-]{3,60}$/.test(headerName)
    && headerValue.length >= 24
    && receiptSecret.length >= 32
    && Boolean(resendKey && emailFrom);
}

export function getTuwaiqPaySupportedMethods() {
  const raw = String(process.env.TUWAIQPAY_SUPPORTED_METHODS || '').trim();
  const requested = raw ? raw.split(',').map((value) => value.trim().toUpperCase()) : DEFAULT_PAYMENT_METHODS;
  return [...new Set(requested.filter((method) => KNOWN_PAYMENT_METHODS.has(method)))];
}

export function getTuwaiqPayApiBaseUrl() {
  const raw = String(process.env.TUWAIQPAY_API_BASE_URL || 'https://onboarding-prod.tuwaiqpay.com.sa/api/v1').trim().replace(/\/$/, '');
  const url = new URL(raw);
  const allowedHosts = new Set(['onboarding-prod.tuwaiqpay.com.sa', 'onboarding-uat.tuwaiqpay.com.sa']);
  if (url.protocol !== 'https:' || !allowedHosts.has(url.hostname) || url.username || url.password) {
    throw new Error('TUWAIQPAY_API_BASE_URL must use an official TuwaiqPay HTTPS host.');
  }
  return `${url.origin}/api/v1`;
}

export async function createTuwaiqPayBill(billPayload) {
  const { username, password, userNameType } = getTuwaiqPayCredentials();
  if (!username || !password) throw new Error('TuwaiqPay username/password are not configured.');

  const baseUrl = getTuwaiqPayApiBaseUrl();
  const authResponse = await fetch(`${baseUrl}/auth/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': 'en' },
    body: JSON.stringify({
      username,
      password,
      userNameType: userNameType === 'MOBILE' || userNameType === 'EMAIL' ? userNameType : username.includes('@') ? 'EMAIL' : 'MOBILE'
    }),
    signal: timeoutSignal(12000)
  });
  const authData = await authResponse.json().catch(() => ({}));
  const accessToken = String(authData?.data?.access_token || '').trim();
  if (!authResponse.ok || !accessToken) {
    throw new Error(authData?.message || authData?.errors?.[0] || `TuwaiqPay authentication failed (${authResponse.status}).`);
  }

  const billResponse = await fetch(`${baseUrl}/integration/bills`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': 'en' },
    body: JSON.stringify(billPayload),
    signal: timeoutSignal(15000)
  });
  const billData = await billResponse.json().catch(() => ({}));
  const data = billData?.data || {};
  const link = String(data.link || '').trim();
  if (!billResponse.ok || !link) {
    throw new Error(billData?.message || billData?.errors?.[0] || `TuwaiqPay could not create the payment link (${billResponse.status}).`);
  }

  const paymentUrl = new URL(link);
  if (paymentUrl.protocol !== 'https:' || paymentUrl.username || paymentUrl.password) {
    throw new Error('TuwaiqPay returned an invalid payment link.');
  }

  return {
    ...data,
    link: paymentUrl.toString(),
    transactionId: String(data.transactionId || '').trim(),
    merchantTransactionId: String(data.merchantTransactionId || '').trim()
  };
}

export function getTuwaiqPayWebhookCredentials() {
  return {
    headerName: String(process.env.TUWAIQPAY_WEBHOOK_HEADER_KEY || '').trim().toLowerCase(),
    headerValue: String(process.env.TUWAIQPAY_WEBHOOK_HEADER_VALUE || '').trim()
  };
}

export function sealTuwaiqPayReceipt(data) {
  const key = getReceiptKey();
  const plaintext = JSON.stringify(data);
  const iv = crypto.createHmac('sha256', key).update(`ayan-tuwaiqpay-receipt:${plaintext}`, 'utf8').digest().subarray(0, 12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  return [base64Url(iv), base64Url(cipher.getAuthTag()), base64Url(encrypted)].join('.');
}

export function openTuwaiqPayReceipt(token) {
  const parts = String(token || '').split('.');
  if (parts.length !== 3 || String(token).length > 18000) throw new Error('Invalid invoice receipt.');
  const [iv, tag, encrypted] = parts.map(fromBase64Url);
  if (iv.length !== 12 || tag.length !== 16 || encrypted.length < 2) throw new Error('Invalid invoice receipt.');
  const decipher = crypto.createDecipheriv('aes-256-gcm', getReceiptKey(), iv);
  decipher.setAuthTag(tag);
  const plain = Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
  const data = JSON.parse(plain);
  if (data?.provider !== 'tuwaiqpay' || data?.status !== 'PAID' || data?.success !== true) throw new Error('Invoice receipt is not a confirmed TuwaiqPay payment.');
  return data;
}

function getReceiptKey() {
  const secret = String(process.env.TUWAIQPAY_RECEIPT_SECRET || '').trim();
  if (secret.length < 32) throw new Error('TUWAIQPAY_RECEIPT_SECRET must contain at least 32 characters.');
  return crypto.createHash('sha256').update(secret, 'utf8').digest();
}

function base64Url(value) {
  return Buffer.from(value).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function fromBase64Url(value) {
  const text = String(value || '').replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(text + '='.repeat((4 - text.length % 4) % 4), 'base64');
}

function timeoutSignal(ms) {
  return typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(ms) : undefined;
}
