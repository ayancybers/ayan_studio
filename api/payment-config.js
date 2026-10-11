import { PACKAGES, getPricingConfig } from '../lib/pricing.js';
import { getTuwaiqPaySupportedMethods, isTuwaiqPayReady } from '../lib/server/tuwaiqpay.js';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const config = getPricingConfig();
  const tuwaiqPayMethods = getTuwaiqPaySupportedMethods();
  return res.status(200).json({
    currency: 'SAR',
    tuwaiqPayConfigured: isTuwaiqPayReady(),
    tuwaiqPayMethods,
    availablePaymentMethods: ['tuwaiqpay', 'tabby', 'tamara'],
    tabbyConfigured: Boolean(String(process.env.TABBY_SECRET_KEY || '').trim()),
    tamaraConfigured: Boolean(String(process.env.TAMARA_API_TOKEN || '').trim()),
    testMode: ['true','1','yes','on'].includes(String(process.env.PAYMENT_TEST_MODE || '').trim().toLowerCase()),
    pricing: config,
    packages: Object.fromEntries(
      Object.entries(PACKAGES).map(([key, value]) => [key, { price: value.price, originalPrice: value.originalPrice ?? value.price, discount: value.discount ?? 0, symbol: value.symbol ?? '', ar: value.ar, en: value.en }])
    )
  });
}
