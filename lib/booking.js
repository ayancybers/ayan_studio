export function isValidShootDate(value, now = new Date()) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) return false;
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Riyadh', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(now);
  const today = Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]));
  return value >= `${today.year}-${today.month}-${today.day}`;
}

export function normalizeGccPhone(value) {
  let digits = String(value || '').replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  return digits;
}

export function isValidGccPhone(value) {
  const phone = normalizeGccPhone(value);
  return /^(9665\d{8}|973\d{8}|965\d{8}|974\d{8}|971\d{9}|968\d{8})$/.test(phone);
}
