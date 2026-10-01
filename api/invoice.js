import sendInvoiceEmail from '../lib/server/routes/send-invoice-email.js';
import sendInvoicePdf from '../lib/server/routes/send-invoice-pdf.js';

export default async function handler(req, res) {
  const route = String(req.query?.__route || '').toLowerCase();
  if (route === 'send-invoice-email') return sendInvoiceEmail(req, res);
  if (route === 'send-invoice-pdf') return sendInvoicePdf(req, res);
  return res.status(404).json({ error: 'Invoice API route not found' });
}
