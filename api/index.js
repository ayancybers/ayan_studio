import logHandler from '../lib/server/routes/log.js';
import paymentConfigHandler from '../lib/server/routes/payment-config.js';
import paymentHandler from '../lib/server/routes/payment.js';
import sendInvoiceEmailHandler from '../lib/server/routes/send-invoice-email.js';
import sendInvoicePdfHandler from '../lib/server/routes/send-invoice-pdf.js';
import sendWhatsappConfirmationHandler from '../lib/server/routes/send-whatsapp-confirmation.js';
import tabbyPaymentHandler from '../lib/server/routes/tabby-payment.js';
import tabbyWebhookHandler from '../lib/server/routes/tabby-webhook.js';
import tamaraPaymentHandler from '../lib/server/routes/tamara-payment.js';
import tamaraWebhookHandler from '../lib/server/routes/tamara-webhook.js';
import tapWebhookHandler from '../lib/server/routes/tap-webhook.js';

const routes = Object.freeze({
  log: logHandler,
  'payment-config': paymentConfigHandler,
  payment: paymentHandler,
  'send-invoice-email': sendInvoiceEmailHandler,
  'send-invoice-pdf': sendInvoicePdfHandler,
  'send-whatsapp-confirmation': sendWhatsappConfirmationHandler,
  'tabby-payment': tabbyPaymentHandler,
  'tabby-webhook': tabbyWebhookHandler,
  'tamara-payment': tamaraPaymentHandler,
  'tamara-webhook': tamaraWebhookHandler,
  'tap-webhook': tapWebhookHandler
});

export default async function handler(req, res) {
  const route = resolveRoute(req);
  const target = routes[route];

  if (!target) {
    return res.status(404).json({ error: 'API route not found', route });
  }

  try {
    return await target(req, res);
  } catch (error) {
    console.error('API route failure', {
      route,
      error: error?.message || String(error)
    });
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

function resolveRoute(req) {
  const queryRoute = req?.query?.route;
  if (Array.isArray(queryRoute) && queryRoute.length) {
    return String(queryRoute.at(-1)).trim().toLowerCase();
  }
  if (queryRoute) return String(queryRoute).trim().toLowerCase();

  const rawUrl = String(req?.url || '');
  try {
    const url = new URL(rawUrl, 'https://ayan.local');
    const fromQuery = url.searchParams.get('route');
    if (fromQuery) return fromQuery.trim().toLowerCase();
    const parts = url.pathname.split('/').filter(Boolean);
    return String(parts.at(-1) || '').trim().toLowerCase();
  } catch {
    const parts = rawUrl.split('?')[0].split('/').filter(Boolean);
    return String(parts.at(-1) || '').trim().toLowerCase();
  }
}
