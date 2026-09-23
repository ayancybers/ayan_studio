const recentRequests = globalThis.__ayanBookingRateLimit || new Map();
globalThis.__ayanBookingRateLimit = recentRequests;

const ALLOWED_PACKAGES = new Set([
  '🥈 الباقة الفضية - 70 ريال', 'Silver Package - 70 SAR',
  '🥉 الباقة الأساسية - 100 ريال', 'Basic Package - 100 SAR',
  '🏆 الباقة المتقدمة - 150 ريال', 'Advanced Package - 150 SAR',
  '👑 الباقة الملكية - 200 ريال', 'Royal Package - 200 SAR'
]);

const ALLOWED_CARS = new Set(['سيدان','SUV','كوبيه','فاخر / رياضي','Sedan','Coupe','Luxury / Sport']);
const ALLOWED_REGIONS = new Set(['القطيف','سيهات','الدمام','الخبر','حفر الباطن','Qatif','Saihat','Dammam','Khobar','Hafar Al Batin']);

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!sameOrigin(req)) return res.status(403).json({ error: 'Forbidden origin' });

  const ip = getClientIp(req);
  const now = Date.now();
  const last = recentRequests.get(ip) || 0;
  if (now - last < 15000) return res.status(429).json({ error: 'Too many requests' });
  recentRequests.set(ip, now);
  cleanupRateLimit(now);

  const body = req.body || {};
  const name = limit(String(body.name || '').trim(), 80);
  const packageType = limit(String(body.packageType || '').trim(), 100);
  const carType = limit(String(body.carType || '').trim(), 40);
  const shootRegion = limit(String(body.shootRegion || '').trim(), 60);
  const phone = String(body.phone || '').replace(/\D/g, '');
  const notes = limit(String(body.notes || '').trim(), 1200);
  const website = String(body.website || '').trim();
  const lang = body.lang === 'en' ? 'en' : 'ar';
  const sourcePage = limit(String(body.sourcePage || '/booking.html'), 120);
  const theme = ['relax','dark','light'].includes(body.theme) ? body.theme : 'relax';
  const screen = limit(String(body.screen || 'unknown'), 50);
  const webhookUrl = process.env.webhook || process.env.DISCORD_WEBHOOK_URL;

  if (website) return res.status(400).json({ error: 'Invalid submission' });
  if (!name || !packageType || !carType || !shootRegion || !phone) return res.status(400).json({ error: 'Missing required fields' });
  if (!ALLOWED_PACKAGES.has(packageType) || !ALLOWED_CARS.has(carType) || !ALLOWED_REGIONS.has(shootRegion)) return res.status(400).json({ error: 'Invalid booking option' });
  if (!/^9665\d{8}$/.test(phone)) return res.status(400).json({ error: 'Invalid phone number' });
  if (!webhookUrl) return res.status(500).json({ error: 'Server configuration error' });

  const title = lang === 'en' ? '📸 New Ayan Photography Booking' : '📸 طلب حجز جديد — Ayan Photography';
  const discordPayload = {
    embeds: [{
      title,
      color: 5177734,
      fields: [
        { name: '👤 Name', value: limit(name), inline: true },
        { name: '📱 WhatsApp', value: limit(phone), inline: true },
        { name: '📦 Package', value: limit(packageType), inline: true },
        { name: '🚗 Car', value: limit(carType), inline: true },
        { name: '📍 Area', value: limit(shootRegion), inline: true },
        { name: '🌐 Language', value: lang.toUpperCase(), inline: true },
        { name: '📄 Source Page', value: sourcePage, inline: true },
        { name: '🎨 Theme', value: theme, inline: true },
        { name: '🖥️ Screen', value: screen, inline: true },
        { name: '💬 Notes', value: limit(notes || '—'), inline: false },
        { name: '🔗 WhatsApp', value: `[Contact](https://wa.me/${phone})`, inline: false }
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'Ayan Photography • Booking' }
    }]
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload)
    });
    if (!response.ok) return res.status(502).json({ error: 'Failed to send booking' });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

function limit(value, max = 1000) { return String(value).slice(0, max); }
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
function cleanupRateLimit(now) {
  if (recentRequests.size < 250) return;
  for (const [key, timestamp] of recentRequests) if (now - timestamp > 60000) recentRequests.delete(key);
}
