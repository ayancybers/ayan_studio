import logHandler from "../lib/ayan-api/routes/log.js";
import paymentConfigHandler from "../lib/ayan-api/routes/payment-config.js";
import paymentHandler from "../lib/ayan-api/routes/payment.js";
import sendInvoiceEmailHandler from "../lib/ayan-api/routes/send-invoice-email.js";
import sendInvoicePdfHandler from "../lib/ayan-api/routes/send-invoice-pdf.js";
import sendWhatsappConfirmationHandler from "../lib/ayan-api/routes/send-whatsapp-confirmation.js";
import tabbyPaymentHandler from "../lib/ayan-api/routes/tabby-payment.js";
import tabbyWebhookHandler from "../lib/ayan-api/routes/tabby-webhook.js";
import tamaraPaymentHandler from "../lib/ayan-api/routes/tamara-payment.js";
import tamaraWebhookHandler from "../lib/ayan-api/routes/tamara-webhook.js";
import tapWebhookHandler from "../lib/ayan-api/routes/tap-webhook.js";

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
  const raw = req.query?.path;
  const segments = Array.isArray(raw) ? raw : String(raw || "").split("/");
  const route = String(segments.filter(Boolean).at(-1) || "").toLowerCase();
  const target = routes.get(route);
  if (!target) return res.status(404).json({ error: "API route not found" });
  return target(req, res);
}
