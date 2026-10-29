const logRateLimit = globalThis.__ayanLogRateLimit || new Map();
globalThis.__ayanLogRateLimit = logRateLimit;

let currentEvents = Number(globalThis.__ayanEventCount || 0);
const allowedEvents = new Set([
  'language_change', 'theme_change', 'package_select', 'booking_checkout_open',
  'gallery_filter', 'gallery_open', 'support_request', 'social_click', 'page_view'
]);

export default async function handler(req, res) {
  const requestId = makeRequestId();
  setSecurityHeaders(res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed', requestId });
  }

  if (!sameOrigin(req)) {
    await emitSecurityEvent(req, {
      event: 'INVALID_ORIGIN',
      severity: 'HIGH',
      requestId
    });
    return res.status(403).json({ error: 'Forbidden origin', requestId });
  }

  if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) {
    return res.status(415).json({ error: 'Content-Type must be application/json', requestId });
  }

  if (isPayloadTooLarge(req)) {
    await emitSecurityEvent(req, {
      event: 'PAYLOAD_TOO_LARGE',
      severity: 'HIGH',
      requestId
    });
    return res.status(413).json({ error: 'Payload too large', requestId });
  }

  const ip = getClientIp(req);
  const now = Date.now();
  const recent = logRateLimit.get(ip) || [];
  const active = recent.filter((time) => now - time < 10000);

  if (active.length >= 30) {
    await emitSecurityEvent(req, {
      event: 'LOG_RATE_LIMIT',
      severity: 'HIGH',
      requestId,
      details: { eventsLast10Seconds: active.length }
    });
    return res.status(429).json({ error: 'Too many events', requestId });
  }

  active.push(now);
  logRateLimit.set(ip, active);
  cleanupLogRateLimit(now);

  const body = req.body || {};
  const event = safe(body.event, 60);
  const page = safe(body.page, 120);
  const language = body.lang === 'en' ? 'en' : 'ar';
  const approximateLocation = getApproximateIpLocation(req, language);

  if (!allowedEvents.has(event) || !page.startsWith('/') || /[\r\n]/.test(page)) {
    await emitSecurityEvent(req, {
      event: 'INVALID_EVENT',
      severity: 'MEDIUM',
      requestId
    });
    return res.status(400).json({ error: 'Invalid event', requestId });
  }

  currentEvents += 1;
  globalThis.__ayanEventCount = currentEvents;

  const details = body.details && typeof body.details === 'object'
    ? sanitizeDetails(body.details)
    : {};

  const securityEvents = new Set([
    'INVALID_PHONE',
    'INVALID_ORIGIN',
    'RATE_LIMIT',
    'LOG_RATE_LIMIT',
    'HONEYPOT',
    'INVALID_REQUEST',
    'INVALID_PACKAGE',
    'INVALID_CAR',
    'INVALID_REGION',
    'PAYLOAD_TOO_LARGE'
  ]);

  const highEvents = new Set([
    'INVALID_ORIGIN',
    'RATE_LIMIT',
    'LOG_RATE_LIMIT',
    'HONEYPOT',
    'PAYLOAD_TOO_LARGE'
  ]);

  const severity = securityEvents.has(event)
    ? (highEvents.has(event) ? 'HIGH' : 'MEDIUM')
    : 'INFO';

  const webhookUrl = process.env.webhook || process.env.DISCORD_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: severity === 'INFO'
              ? '📡 AYAN SITE EVENT'
              : '🛡️ AYAN SECURITY EVENT',
            description: `**${event}**`,
            color: severity === 'HIGH' ? 15158332 : severity === 'MEDIUM' ? 16753920 : 43904,
            fields: [
              { name: '⚠️ Severity', value: severity, inline: true },
              { name: '🆔 Request ID', value: requestId, inline: true },
              { name: '📊 Event #', value: String(currentEvents), inline: true },
              { name: '🌐 IP Address', value: safe(ip, 100), inline: true },
              { name: '📍 Approx. IP Location', value: approximateLocation, inline: false },
              { name: '📄 Page', value: page, inline: true },
              { name: '🌐 Language', value: body.lang === 'en' ? 'EN' : 'AR', inline: true },
              { name: '🎨 Theme', value: ['relax', 'dark', 'light'].includes(body.theme) ? body.theme : 'relax', inline: true },
              { name: '🧾 Details', value: safeJson(details), inline: false }
            ],
            timestamp: new Date().toISOString(),
            footer: { text: 'Ayan Photography • Security Monitor' }
          }]
        })
      });
    } catch (_) {}
  }

  return res.status(200).json({
    success: true,
    requestId,
    eventCount: currentEvents
  });
}

async function emitSecurityEvent(req, data) {
  const webhookUrl = process.env.webhook || process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const ip = getClientIp(req);
  const approximateLocation = getApproximateIpLocation(req, getEventLanguage(req));

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: `🚨 AYAN SECURITY • ${data.event}`,
          color: data.severity === 'HIGH' ? 15158332 : 16753920,
          fields: [
            { name: '⚠️ Severity', value: data.severity || 'MEDIUM', inline: true },
            { name: '🆔 Request ID', value: data.requestId || 'unknown', inline: true },
            { name: '🌍 IP', value: safe(ip, 100), inline: true },
            { name: '📍 Approx. IP Location', value: approximateLocation, inline: false },
            { name: '🧭 User-Agent', value: safe(req.headers['user-agent'] || 'unknown', 300), inline: false },
            { name: '📄 Endpoint', value: '/api/log', inline: true },
            { name: '📊 Details', value: safeJson(data.details || {}), inline: false }
          ],
          timestamp: new Date().toISOString(),
          footer: { text: 'Ayan Photography • Security Monitor' }
        }]
      })
    });
  } catch (_) {}
}

function sanitizeDetails(value) {
  const output = {};
  const allowedKeys = new Set(['package', 'packageKey', 'source', 'filter', 'type', 'success', 'network', 'title', 'to']);
  for (const [key, item] of Object.entries(value)) {
    if (Object.keys(output).length >= 20) break;
    const cleanKey = safe(key, 60);
    if (!allowedKeys.has(cleanKey)) continue;
    if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') {
      output[cleanKey] = safe(item, 250);
    } else {
      output[cleanKey] = safeJson(item).slice(0, 250);
    }
  }
  return output;
}

function safe(value, max = 1000) {
  return String(value ?? '')
    .replace(/```/g, "'''")
    .replace(/@everyone|@here/gi, '@\u200beveryone')
    .slice(0, max);
}

function safeJson(value) {
  try { return safe(JSON.stringify(value), 900); }
  catch (_) { return '{}'; }
}

function getClientIp(req) {
  const raw = req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  return String(raw).split(',')[0].trim();
}

function getApproximateIpLocation(req, language = 'ar') {
  const cityHeader = cleanGeoHeader(req.headers['x-vercel-ip-city']);
  const regionHeader = cleanGeoHeader(req.headers['x-vercel-ip-country-region']);
  const countryCode = cleanGeoHeader(req.headers['x-vercel-ip-country']).toUpperCase();
  const isSaudi = countryCode === 'SA';

  const cityKey = cityHeader.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  const cityNames = {
    dammam: ['الدمام', 'Dammam'], 'al dammam': ['الدمام', 'Dammam'],
    khobar: ['الخبر', 'Al Khobar'], 'al khobar': ['الخبر', 'Al Khobar'],
    dhahran: ['الظهران', 'Dhahran'],
    hofuf: ['الهفوف / الأحساء', 'Al Hofuf / Al Ahsa'], 'al hofuf': ['الهفوف / الأحساء', 'Al Hofuf / Al Ahsa'],
    mubarraz: ['المبرز / الأحساء', 'Al Mubarraz / Al Ahsa'], 'al mubarraz': ['المبرز / الأحساء', 'Al Mubarraz / Al Ahsa'],
    ahsa: ['الأحساء', 'Al Ahsa'], 'al ahsa': ['الأحساء', 'Al Ahsa'], 'al hasa': ['الأحساء', 'Al Ahsa'],
    riyadh: ['الرياض', 'Riyadh'], jeddah: ['جدة', 'Jeddah'],
    makkah: ['مكة المكرمة', 'Makkah'], mecca: ['مكة المكرمة', 'Makkah'],
    madinah: ['المدينة المنورة', 'Madinah'], medina: ['المدينة المنورة', 'Madinah'],
    qatif: ['القطيف', 'Qatif'], 'al qatif': ['القطيف', 'Qatif'],
    saihat: ['سيهات', 'Saihat'], jubail: ['الجبيل', 'Jubail'],
    taif: ['الطائف', 'Taif'], abha: ['أبها', 'Abha'],
    tabuk: ['تبوك', 'Tabuk'], jazan: ['جازان', 'Jazan'], yanbu: ['ينبع', 'Yanbu']
  };
  const city = cityNames[cityKey]
    ? cityNames[cityKey][language === 'en' ? 1 : 0]
    : cityHeader;

  const regionKey = regionHeader.toLowerCase().replace(/^sa[-\s]*/, '').trim();
  const saudiRegions = {
    '01': ['منطقة الرياض', 'Riyadh Region'], '02': ['منطقة مكة المكرمة', 'Makkah Region'],
    '03': ['منطقة المدينة المنورة', 'Madinah Region'], '04': ['المنطقة الشرقية', 'Eastern Province'],
    '05': ['منطقة القصيم', 'Qassim Region'], '06': ['منطقة حائل', 'Hail Region'],
    '07': ['منطقة تبوك', 'Tabuk Region'], '08': ['الحدود الشمالية', 'Northern Borders'],
    '09': ['منطقة جازان', 'Jazan Region'], '10': ['منطقة نجران', 'Najran Region'],
    '11': ['منطقة الباحة', 'Al Bahah Region'], '12': ['منطقة الجوف', 'Al Jawf Region'],
    '14': ['منطقة عسير', 'Asir Region'],
    'eastern province': ['المنطقة الشرقية', 'Eastern Province'],
    'riyadh province': ['منطقة الرياض', 'Riyadh Region'],
    'makkah province': ['منطقة مكة المكرمة', 'Makkah Region'],
    'madinah province': ['منطقة المدينة المنورة', 'Madinah Region']
  };
  const region = isSaudi && saudiRegions[regionKey]
    ? saudiRegions[regionKey][language === 'en' ? 1 : 0]
    : regionHeader;
  const country = isSaudi
    ? (language === 'en' ? 'Saudi Arabia' : 'السعودية')
    : countryCode;
  const place = [city, region, country].filter(Boolean).join(language === 'en' ? ', ' : '، ');

  if (!place) {
    return language === 'en'
      ? 'Unavailable — hosting provider supplied no IP location'
      : 'غير متاح — مزود الاستضافة لم يرسل موقعًا تقريبيًا عبر IP';
  }
  return safe(language === 'en' ? `Approximate: ${place}` : `تقريبي عبر IP: ${place}`, 180);
}

function cleanGeoHeader(value) {
  if (Array.isArray(value)) value = value[0];
  let decoded = String(value || '').slice(0, 240);
  try { decoded = decodeURIComponent(decoded.replace(/\+/g, '%20')); } catch (_) {}
  return decoded.replace(/[\u0000-\u001f`*_~|<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 100);
}

function getEventLanguage(req) {
  if (req.body?.lang === 'en') return 'en';
  if (req.body?.lang === 'ar') return 'ar';
  return String(req.headers['accept-language'] || '').toLowerCase().startsWith('en') ? 'en' : 'ar';
}

function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return false;
  const host = String(req.headers.host || '').split(':')[0];
  try { return new URL(origin).hostname === host; }
  catch (_) { return false; }
}

function isPayloadTooLarge(req) {
  const length = Number(req.headers['content-length'] || 0);
  return Number.isFinite(length) && length > 30000;
}

function makeRequestId() {
  try { return crypto.randomUUID(); }
  catch (_) { return `ayan-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`; }
}

function setSecurityHeaders(res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
}

function cleanupLogRateLimit(now) {
  if (logRateLimit.size < 250) return;

  for (const [key, timestamps] of logRateLimit) {
    const active = timestamps.filter((time) => now - time < 60000);
    if (active.length === 0) logRateLimit.delete(key);
    else logRateLimit.set(key, active);
  }
}
