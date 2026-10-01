import paymentHandler from '../lib/server/routes/tabby-payment.js';
import webhookHandler from '../lib/server/routes/tabby-webhook.js';

export default async function handler(req, res) {
  const route = String(req.query?.__route || '').toLowerCase();
  if (route === 'tabby-webhook') return webhookHandler(req, res);
  return paymentHandler(req, res);
}
