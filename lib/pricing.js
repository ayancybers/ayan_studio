const DEFAULT_PACKAGES = Object.freeze({
  silver: { price: 50, originalPrice: 70, discount: 20, symbol: '◈', ar: 'الرول', en: 'ROLL' },
  basic: { price: 80, originalPrice: 100, discount: 20, symbol: '◇', ar: 'الحركة', en: 'MOTION' },
  advanced: { price: 130, originalPrice: 150, discount: 20, symbol: '✦', ar: 'البصمة', en: 'SIGNATURE' },
  royal: { price: 180, originalPrice: 200, discount: 20, symbol: '✧', ar: 'السينمائي', en: 'CINEMATIC' }
});

export const PACKAGES = DEFAULT_PACKAGES;

function numberEnv(name, fallback, min = 0, max = Number.MAX_SAFE_INTEGER) {
  const raw = process.env[name];
  if (raw === undefined || raw === null || raw === '') return fallback;
  const value = Number(raw);
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

function boolEnv(name, fallback) {
  const raw = String(process.env[name] ?? '').trim().toLowerCase();
  if (!raw) return fallback;
  if (['true', '1', 'yes', 'on'].includes(raw)) return true;
  if (['false', '0', 'no', 'off'].includes(raw)) return false;
  return fallback;
}

export function getPricingConfig() {
  return {
    vatEnabled: false,
    vatRate: 0,
    paymentFeeEnabled: boolEnv('PAYMENT_FEE_ENABLED', true),
    vatOnPaymentFee: false,
    paymentFees: {
      card: {
        percent: numberEnv('CARD_FEE_PERCENT', 2.75, 0, 100),
        fixed: numberEnv('CARD_FEE_FIXED', 6, 0, 100000),
        fixedBreakdown: { first: 1, second: 5 }
      },
      tabby: {
        percent: numberEnv('TABBY_FEE_PERCENT', 6.99, 0, 100),
        fixed: numberEnv('TABBY_FEE_FIXED', 7.5, 0, 100000),
        fixedBreakdown: { first: 1.5, second: 6 }
      },
      tamara: {
        percent: numberEnv('TAMARA_FEE_PERCENT', 6.99, 0, 100),
        fixed: numberEnv('TAMARA_FEE_FIXED', 7.5, 0, 100000),
        fixedBreakdown: { first: 1.5, second: 6 }
      }
    }
  };
}

export function calculatePricing(packageKey, paymentMethod = 'none') {
  const pkg = PACKAGES[packageKey];
  if (!pkg) throw new Error('Invalid package');

  const cfg = getPricingConfig();
  const method = paymentMethod === 'tabby' ? 'tabby' : paymentMethod === 'tamara' ? 'tamara' : paymentMethod === 'card' ? 'card' : 'none';
  const subtotal = roundMoney(pkg.price);

  // No VAT is added. Payment-provider fees are calculated directly on the package price.
  const packageTax = 0;
  const amountBeforePaymentFee = subtotal;
  const feeCfg = cfg.paymentFees[method] || { percent: 0, fixed: 0, fixedBreakdown: {} };
  const paymentFee = cfg.paymentFeeEnabled && method !== 'none'
    ? roundMoney((amountBeforePaymentFee * feeCfg.percent / 100) + feeCfg.fixed)
    : 0;
  const paymentFeeTax = cfg.vatOnPaymentFee && cfg.vatEnabled
    ? roundMoney(paymentFee * cfg.vatRate / 100)
    : 0;
  const total = roundMoney(amountBeforePaymentFee + paymentFee + paymentFeeTax);

  return {
    paymentMethod: method,
    subtotal,
    paymentFee,
    paymentFeePercent: feeCfg.percent,
    paymentFeeFixed: feeCfg.fixed,
    paymentFeeFixedBreakdown: feeCfg.fixedBreakdown || {},
    vatEnabled: cfg.vatEnabled,
    vatRate: cfg.vatRate,
    vatOnPaymentFee: cfg.vatOnPaymentFee,
    taxableBase: subtotal,
    tax: packageTax,
    paymentFeeTax,
    amountBeforePaymentFee,
    total,
    originalPrice: pkg.originalPrice ?? pkg.price,
    discount: pkg.discount ?? 0,
    packageSymbol: pkg.symbol ?? ''
  };
}

export function roundMoney(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}
