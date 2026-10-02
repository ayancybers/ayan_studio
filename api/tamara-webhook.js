import crypto from 'node:crypto';
import { authoriseTamaraOrder, boolEnv, getTamaraOrder, normalizeTamaraStatus } from '../lib/server/tamara.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const token = String(process.env.TAMARA_NOTIFICATION_TOKEN || '').trim();
  if (!token) return res.status(503).json({ error: 'Tamara notification token is not configured' });
  const supplied = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
  if (!supplied || !verifyJwt(supplied, token)) return res.status(401).json({ error: 'Invalid Tamara notification signature' });
  const body = req.body || {};
  const orderId = String(body.order_id || body.orderId || '').trim();
  if (!orderId) return res.status(400).json({ error: 'Missing order_id' });

  try {
    const event = String(body.event_type || '').trim().toLowerCase();
    if (event === 'order_approved' && boolEnv('TAMARA_AUTO_AUTHORISE', true)) {
      try { await authoriseTamaraOrder(orderId); } catch (error) { console.warn('Tamara webhook authorise failed', error?.message || String(error)); }
    }
    const order = await getTamaraOrder(orderId);
    return res.status(200).json({ received: true, order_id: orderId, event_type: event, status: normalizeTamaraStatus(order?.status) });
  } catch (error) {
    console.error('Tamara webhook error', { orderId, error: error?.message || String(error) });
    return res.status(200).json({ received: true, order_id: orderId });
  }
}

function verifyJwt(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const header = JSON.parse(Buffer.from(parts[0].replace(/-/g,'+').replace(/_/g,'/'), 'base64').toString('utf8'));
    if (header.alg !== 'HS256') return false;
    const expected = base64Url(crypto.createHmac('sha256', secret).update(`${parts[0]}.${parts[1]}`).digest());
    const a = Buffer.from(expected); const b = Buffer.from(parts[2]);
    return a.length === b.length && crypto.timingSafeEqual(a,b);
  } catch { return false; }
}
function base64Url(value) { return Buffer.from(value).toString('base64').replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_'); }
