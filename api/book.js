const recentRequests = globalThis.__ayanBookingRateLimit || new Map();
globalThis.__ayanBookingRateLimit = recentRequests;

const ALLOWED_PACKAGES = new Set([
  '🥈 الباقة الفضية - 70 ريال', 'Silver Package - 70 SAR',
  '🥉 الباقة الأساسية - 100 ريال', 'Basic Package - 100 SAR',
  '🏆 الباقة المتقدمة - 150 ريال', 'Advanced Package - 150 SAR',
  '👑 الباقة الملكية - 200 ريال', 'Royal Package - 200 SAR'
]);

const ALLOWED_CARS = new Set([
  'سيدان', 'SUV', 'كوبيه', 'فاخر / رياضي',
  'Sedan', 'Coupe', 'Luxury / Sport'
]);

const ALLOWED_REGIONS = new Set([
  'القطيف', 'سيهات', 'الدمام', 'الخبر', 'حفر الباطن',
  'Qatif', 'Saihat', 'Dammam', 'Khobar', 'Hafar Al Batin'
]);

export default async function handler(req, res) {
  const requestId = makeRequestId();

  setSecurityHeaders(res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed', requestId });
  }

  if (!sameOrigin(req)) {
    await sendSecurityLog(req, {
      event: 'INVALID_ORIGIN',
      severity: 'HIGH',
      requestId
    });
    return res.status(403).json({ error: 'Forbidden origin', requestId });
  }

  if (isPayloadTooLarge(req)) {
    await sendSecurityLog(req, {
      event: 'PAYLOAD_TOO_LARGE',
      severity: 'HIGH',
      requestId
    });
    return res.status(413).json({ error: 'Payload too large', requestId });
  }

  const ip = getClientIp(req);
  const now = Date.now();
  const last = recentRequests.get(ip) || 0;

  if (now - last < 15000) {
    await sendSecurityLog(req, {
      event: 'RATE_LIMIT',
      severity: 'MEDIUM',
      requestId,
      details: { cooldownMs: 15000 }
    });
    return res.status(429).json({ error: 'Too many requests', requestId });
  }

  recentRequests.set(ip, now);
  cleanupRateLimit(now);

  const body = req.body || {};
  const name = limit(String(body.name || '').trim(), 80);
  const packageType = limit(String(body.packageType || '').trim(), 100);
  const carType = limit(String(body.carType || '').trim(), 40);
  const shootRegion = limit(String(body.shootRegion || '').trim(), 60);
  const rawPhone = String(body.phone || '').replace(/\D/g, '');
  const phone = normalizeSaudiPhone(rawPhone);
  const notes = limit(String(body.notes || '').trim(), 1200);
  const website = String(body.website || '').trim();

  const lang = body.lang === 'en' ? 'en' : 'ar';
  const sourcePage = limit(String(body.sourcePage || '/booking.html'), 120);
  const theme = ['relax', 'dark', 'light'].includes(body.theme)
    ? body.theme
    : 'relax';
  const screen = limit(String(body.screen || 'unknown'), 50);
  const userAgent = limit(String(req.headers['user-agent'] || 'unknown'), 300);
  const webhookUrl = process.env.webhookbooking || process.env.DISCORD_WEBHOOK_Booking;

  if (website) {
    await sendSecurityLog(req, {
      event: 'HONEYPOT',
      severity: 'HIGH',
      requestId,
      details: { page: sourcePage }
    });
    return res.status(400).json({ error: 'Invalid submission', requestId });
  }

  if (!name || !packageType || !carType || !shootRegion || !rawPhone) {
    await sendSecurityLog(req, {
      event: 'INVALID_REQUEST',
      severity: 'MEDIUM',
      requestId,
      details: {
        missingName: !name,
        missingPackage: !packageType,
        missingCar: !carType,
        missingRegion: !shootRegion,
        missingPhone: !rawPhone
      }
    });
    return res.status(400).json({ error: 'Missing required fields', requestId });
  }

  if (!ALLOWED_PACKAGES.has(packageType)) {
    await sendSecurityLog(req, {
      event: 'INVALID_PACKAGE',
      severity: 'MEDIUM',
      requestId,
      details: { value: packageType }
    });
    return res.status(400).json({ error: 'Invalid booking option', requestId });
  }

  if (!ALLOWED_CARS.has(carType)) {
    await sendSecurityLog(req, {
      event: 'INVALID_CAR',
      severity: 'MEDIUM',
      requestId,
      details: { value: carType }
    });
    return res.status(400).json({ error: 'Invalid booking option', requestId });
  }

  if (!ALLOWED_REGIONS.has(shootRegion)) {
    await sendSecurityLog(req, {
      event: 'INVALID_REGION',
      severity: 'MEDIUM',
      requestId,
      details: { value: shootRegion }
    });
    return res.status(400).json({ error: 'Invalid booking option', requestId });
  }

  if (!/^9665\d{8}$/.test(phone)) {
    await sendSecurityLog(req, {
      event: 'INVALID_PHONE',
      severity: 'MEDIUM',
      requestId,
      details: {
        receivedLength: rawPhone.length,
        format: rawPhone.startsWith('05') ? 'LOCAL_05' : 'UNKNOWN'
      }
    });
    return res.status(400).json({
      error: 'Invalid phone number. Use 05xxxxxxxx.',
      requestId
    });
  }

  if (!webhookUrl) {
    console.error('Booking webhook is not configured', { requestId });
    return res.status(500).json({ error: 'Server configuration error', requestId });
  }

  const title = lang === 'en'
    ? '📸 NEW AYAN PHOTOGRAPHY BOOKING'
    : '📸 طلب حجز جديد — AYAN PHOTOGRAPHY';

  const discordPayload = {
    embeds: [{
      title,
      color: 5177734,
      fields: [
        { name: '🆔 Request ID', value: requestId, inline: true },
        { name: '👤 Name', value: limit(name), inline: true },
        { name: '📱 WhatsApp', value: limit(phone), inline: true },
        { name: '📦 Package', value: limit(packageType), inline: true },
        { name: '🚗 Car', value: limit(carType), inline: true },
        { name: '📍 Shoot Area', value: limit(shootRegion), inline: true },
        { name: '🌐 Language', value: lang.toUpperCase(), inline: true },
        { name: '🎨 Theme', value: theme, inline: true },
        { name: '🖥️ Screen', value: screen, inline: true },
        { name: '🌍 IP', value: limit(ip, 100), inline: true },
        { name: '🧭 User-Agent', value: limit(userAgent, 300), inline: false },
        { name: '📄 Source', value: sourcePage, inline: true },
        { name: '💬 Notes', value: limit(notes || '—'), inline: false },
        {
          name: '🔗 Customer WhatsApp',
          value: `[Contact](https://wa.me/${phone})`,
          inline: false
        }
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'Ayan Photography • Secure Booking' }
    }]
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload)
    });

    if (!response.ok) {
      console.error('Booking webhook failed', {
        requestId,
        status: response.status
      });
      return res.status(502).json({ error: 'Failed to send booking', requestId });
    }

    return res.status(200).json({ success: true, requestId });
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({ error: 'Internal Server Error', requestId });
  }
}

async function sendSecurityLog(req, data) {
  const webhookUrl = process.env.webhook || process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const ip = getClientIp(req);

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: `🛡️ AYAN SECURITY • ${data.event}`,
          color: data.severity === 'HIGH' ? 15158332 : 16753920,
          fields: [
            { name: '⚠️ Severity', value: data.severity || 'MEDIUM', inline: true },
            { name: '🆔 Request ID', value: data.requestId || 'unknown', inline: true },
            { name: '🌍 IP', value: limit(ip, 100), inline: true },
            { name: '📄 Page', value: limit(data.page || '/api/book', 120), inline: true },
            { name: '🧭 User-Agent', value: limit(req.headers['user-agent'] || 'unknown', 300), inline: false },
            { name: '📊 Details', value: safeJson(data.details || {}), inline: false }
          ],
          timestamp: new Date().toISOString(),
          footer: { text: 'Ayan Photography • Security Monitor' }
        }]
      })
    });
  } catch (_) {}
}

function normalizeSaudiPhone(value) {
  const phone = String(value || '').replace(/\D/g, '');
  if (/^05\d{8}$/.test(phone)) return `966${phone.slice(1)}`;
  if (/^9665\d{8}$/.test(phone)) return phone;
  return phone;
}

function limit(value, max = 1000) {
  return String(value ?? '').slice(0, max);
}

function safeJson(value) {
  try {
    return limit(JSON.stringify(value), 900).replace(/```/g, "'''");
  } catch (_) {
    return '{}';
  }
}

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

function isPayloadTooLarge(req) {
  const length = Number(req.headers['content-length'] || 0);
  return Number.isFinite(length) && length > 30000;
}

function makeRequestId() {
  try { return crypto.randomUUID(); }
  catch (_) { return `ayan-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`; }
}

function setSecurityHeaders(res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
}

function cleanupRateLimit(now) {
  if (recentRequests.size < 250) return;
  for (const [key, timestamp] of recentRequests) {
    if (now - timestamp > 60000) recentRequests.delete(key);
  }
}
