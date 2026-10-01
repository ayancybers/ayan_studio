import logHandler from "../lib/server/routes/log.js";
import paymentConfigHandler from "../lib/server/routes/payment-config.js";
import paymentHandler from "../lib/server/routes/payment.js";
import sendInvoiceEmailHandler from "../lib/server/routes/send-invoice-email.js";
import sendInvoicePdfHandler from "../lib/server/routes/send-invoice-pdf.js";
import sendWhatsappConfirmationHandler from "../lib/server/routes/send-whatsapp-confirmation.js";
import tabbyPaymentHandler from "../lib/server/routes/tabby-payment.js";
import tabbyWebhookHandler from "../lib/server/routes/tabby-webhook.js";
import tamaraPaymentHandler from "../lib/server/routes/tamara-payment.js";
import tamaraWebhookHandler from "../lib/server/routes/tamara-webhook.js";
import tapWebhookHandler from "../lib/server/routes/tap-webhook.js";

const routes = new Map([
  ["log", logHandler],
  ["payment-config", paymentConfigHandler],
  ["payment", paymentHandler],
  ["send-invoice-email", sendInvoiceEmailHandler],
  ["send-invoice-pdf", sendInvoicePdfHandler],
  ["send-whatsapp-confirmation", sendWhatsappConfirmationHandler],
  ["tabby-payment", tabbyPaymentHandler],
  ["tabby-webhook", tabbyWebhookHandler],
  ["tamara-payment", tamaraPaymentHandler],
  ["tamara-webhook", tamaraWebhookHandler],
  ["tap-webhook", tapWebhookHandler]
]);

export default async function handler(req, res) {
  const raw = String(req.query?.path ?? "");
  const segments = Array.isArray(req.query?.path) ? req.query.path : raw.split("/");
  const route = String(segments.filter(Boolean).at(-1) || "").toLowerCase();
  const target = routes.get(route);
  if (!target) return res.status(404).json({ error: "API route not found" });
  return target(req, res);
}
