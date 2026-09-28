const DEFAULT_PACKAGES = Object.freeze({
  silver: { price: 70, ar: '🥈 الباقة الفضية', en: '🥈 Silver Package' },
  basic: { price: 100, ar: '🥉 الباقة الأساسية', en: '🥉 Basic Package' },
  advanced: { price: 150, ar: '🏆 الباقة المتقدمة', en: '🏆 Advanced Package' },
  royal: { price: 200, ar: '👑 الباقة الملكية', en: '👑 Royal Package' }
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
    vatEnabled: boolEnv('VAT_ENABLED', true),
    vatRate: numberEnv('VAT_RATE', 15, 0, 100),
    serviceFeeEnabled: boolEnv('SERVICE_FEE_ENABLED', true),
    serviceFeePercent: numberEnv('SERVICE_FEE_PERCENT', 0, 0, 100),
    serviceFeeFixed: numberEnv('SERVICE_FEE_FIXED', 0, 0, 100000),
    vatOnServiceFee: boolEnv('VAT_ON_SERVICE_FEE', true)
  };
}

export function calculatePricing(packageKey) {
  const pkg = PACKAGES[packageKey];
  if (!pkg) throw new Error('Invalid package');

  const cfg = getPricingConfig();
  const subtotal = roundMoney(pkg.price);
  const serviceFee = cfg.serviceFeeEnabled
    ? roundMoney((subtotal * cfg.serviceFeePercent / 100) + cfg.serviceFeeFixed)
    : 0;
  const taxableBase = cfg.vatOnServiceFee ? subtotal + serviceFee : subtotal;
  const tax = cfg.vatEnabled ? roundMoney(taxableBase * cfg.vatRate / 100) : 0;
  const total = roundMoney(subtotal + serviceFee + tax);

  return {
    subtotal,
    serviceFee,
    serviceFeePercent: cfg.serviceFeePercent,
    serviceFeeFixed: cfg.serviceFeeFixed,
    vatEnabled: cfg.vatEnabled,
    vatRate: cfg.vatRate,
    vatOnServiceFee: cfg.vatOnServiceFee,
    taxableBase: roundMoney(taxableBase),
    tax,
    total
  };
}

export function roundMoney(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}
