const logRateLimit = globalThis.__ayanLogRateLimit || new Map();
globalThis.__ayanLogRateLimit = logRateLimit;

let currentEvents = Number(globalThis.__ayanEventCount || 0);

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

  if (!event || !page) {
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
              { name: '🌍 IP', value: safe(ip, 100), inline: true },
              { name: '📄 Page', value: page, inline: true },
              { name: '🌐 Language', value: body.lang === 'en' ? 'EN' : 'AR', inline: true },
              { name: '🎨 Theme', value: ['relax', 'dark', 'light'].includes(body.theme) ? body.theme : 'relax', inline: true },
              { name: '🖥️ Screen', value: safe(body.screen || 'unknown', 50), inline: true },
              { name: '🔗 Referrer', value: safe(body.referrer || 'direct', 180), inline: false },
              { name: '🧭 User-Agent', value: safe(req.headers['user-agent'] || 'unknown', 300), inline: false },
              { name: '🌎 Accept-Language', value: safe(req.headers['accept-language'] || 'unknown', 180), inline: true },
              { name: '📦 Content-Type', value: safe(req.headers['content-type'] || 'unknown', 100), inline: true },
              { name: '🔐 Origin', value: safe(req.headers.origin || 'none', 180), inline: false },
              { name: '📡 Forwarded Proto', value: safe(req.headers['x-forwarded-proto'] || 'unknown', 50), inline: true },
              { name: '📐 Payload', value: safe(req.headers['content-length'] || 'unknown', 30), inline: true },
              { name: '📍 Location', value: 'GPS disabled — no hidden location collection', inline: false },
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
  for (const [key, item] of Object.entries(value)) {
    if (Object.keys(output).length >= 20) break;
    const cleanKey = safe(key, 60);
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
  const raw = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  return String(raw).split(',')[0].trim();
}

function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
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
