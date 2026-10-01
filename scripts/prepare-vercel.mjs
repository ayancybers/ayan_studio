import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = path.join(root, 'api');
const allowed = new Set([
  'log.js',
  'payment-config.js',
  'payment.js',
  'send-invoice-email.js',
  'send-invoice-pdf.js',
  'send-whatsapp-confirmation.js',
  'tabby-payment.js',
  'tabby-webhook.js',
  'tamara-payment.js',
  'tamara-webhook.js',
  'tap-webhook.js'
]);

if (!fs.existsSync(apiDir)) process.exit(0);

for (const entry of fs.readdirSync(apiDir, { withFileTypes: true })) {
  const full = path.join(apiDir, entry.name);
  if (entry.isDirectory()) {
    // No helper modules should live under /api; Vercel can count nested JS files as functions.
    fs.rmSync(full, { recursive: true, force: true });
    continue;
  }
  if (entry.name.endsWith('.js') && !allowed.has(entry.name)) {
    fs.rmSync(full, { force: true });
  }
}

console.log(`Vercel API cleanup complete. Active endpoints: ${[...allowed].join(', ')}`);
