import paymentHandler from '../lib/server/routes/tamara-payment.js';
import webhookHandler from '../lib/server/routes/tamara-webhook.js';

export default async function handler(req, res) {
  const route = String(req.query?.__route || '').toLowerCase();
  if (route === 'tamara-webhook') return webhookHandler(req, res);
  return paymentHandler(req, res);
}
