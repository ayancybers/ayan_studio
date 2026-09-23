const logRateLimit = globalThis.__ayanLogRateLimit || new Map();
globalThis.__ayanLogRateLimit = logRateLimit;

let currentEvents = Number(globalThis.__ayanEventCount || 0);

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!sameOrigin(req)) return res.status(403).json({ error: 'Forbidden origin' });

  const ip = getClientIp(req);
  const now = Date.now();
  const recent = logRateLimit.get(ip) || [];
  const active = recent.filter((time) => now - time < 10000);
  if (active.length >= 30) return res.status(429).json({ error: 'Too many events' });
  active.push(now);
  logRateLimit.set(ip, active);

  const body = req.body || {};
  const event = safe(body.event, 60);
  const page = safe(body.page, 120);
  if (!event || !page) return res.status(400).json({ error: 'Invalid event' });

  currentEvents += 1;
  globalThis.__ayanEventCount = currentEvents;

  const webhookUrl = process.env.webhook || process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return res.status(200).json({ success: true });

  const details = body.details && typeof body.details === 'object' ? body.details : {};
  const fields = [
    { name: 'Event', value: safe(event, 60), inline: true },
    { name: 'Page', value: safe(page, 120), inline: true },
    { name: 'Language', value: body.lang === 'en' ? 'EN' : 'AR', inline: true },
    { name: 'Theme', value: ['relax','dark','light'].includes(body.theme) ? body.theme : 'relax', inline: true },
    { name: 'IP', value: safe(ip, 100), inline: true },
    { name: 'Screen', value: safe(body.screen, 50), inline: true },
    { name: 'Referrer', value: safe(body.referrer || 'direct', 180), inline: false },
    { name: 'Details', value: safe(JSON.stringify(details), 900), inline: false }
  ];

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: '🛡️ Ayan Photography • Site Event',
          color: 43904,
          fields,
          timestamp: new Date().toISOString()
        }]
      })
    });
  } catch (_) {}

  return res.status(200).json({ success: true });
}

function safe(value, max) { return String(value ?? '').replace(/```/g, "'''").slice(0, max); }
function getClientIp(req) {
  const raw = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  return String(raw).split(',')[0].trim();
}
function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  const host = String(req.headers.host || '').split(':')[0];
  try { return new URL(origin).hostname === host; } catch (_) { return false; }
}
