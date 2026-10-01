<<<<<<<< HEAD:lib/server/routes/payment-config.js
import { PACKAGES, getPricingConfig } from '../../pricing.js';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const config = getPricingConfig();
  return res.status(200).json({
    currency: 'SAR',
    testMode: ['true','1','yes','on'].includes(String(process.env.PAYMENT_TEST_MODE || '').trim().toLowerCase()),
    tamaraEnabled: ['true','1','yes','on'].includes(String(process.env.TAMARA_ENABLED || '').trim().toLowerCase()),
    pricing: config,
    packages: Object.fromEntries(
      Object.entries(PACKAGES).map(([key, value]) => [key, { price: value.price, ar: value.ar, en: value.en }])
    )
  });
}
========
import handler from '../lib/server/routes/payment-config.js';
export default handler;
>>>>>>>> f5140ab9eade47a14bca4dfdb2e2f9551b5c20c1:api/payment-config.js
