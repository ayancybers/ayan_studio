import { get } from '@vercel/blob';
import crypto from 'node:crypto';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (!['GET', 'HEAD'].includes(req.method)) return res.status(405).json({ error: 'Method not allowed' });

  const path = String(req.query?.path || '').trim();
  const exp = Number(req.query?.exp || 0);
  const sig = String(req.query?.sig || '').trim();
  const requestedFilename = String(req.query?.filename || '').trim();
  const secret = String(process.env.WHATSLOOP_TOKEN || '').trim();

  if (!secret || !/^wl_/.test(secret)) return res.status(503).json({ error: 'WhatsLoop configuration is incomplete' });
  const cleanPath = path.replace(/^\/+/, '');
  if (!cleanPath.startsWith('invoices/') || !cleanPath.endsWith('.pdf')) return res.status(400).json({ error: 'Invalid file path' });
  if (!Number.isFinite(exp) || exp < Date.now() || exp > Date.now() + 60 * 60 * 1000) return res.status(410).json({ error: 'Link expired' });

  const expected = crypto.createHmac('sha256', secret).update(`${cleanPath}|${exp}`).digest('hex');
  if (!safeEqual(sig, expected)) return res.status(403).json({ error: 'Invalid signature' });

  try {
    const result = await get(cleanPath, { access: 'private', useCache: false });
    if (!result) return res.status(404).json({ error: 'File not found' });

    res.setHeader('Content-Type', result.blob?.contentType || 'application/pdf');
    if (Number.isFinite(Number(result.blob?.size))) res.setHeader('Content-Length', String(result.blob.size));
    const filename = requestedFilename || cleanPath.split('/').pop() || 'invoice.pdf';
    res.setHeader('Content-Disposition', `inline; filename="${filename.replace(/[^A-Za-z0-9._-]/g, '_')}"`);
    res.setHeader('Accept-Ranges', 'bytes');

    if (req.method === 'HEAD') return res.status(200).end();

    const reader = result.stream.getReader();
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        res.write(Buffer.from(value));
      }
      res.end();
    } finally {
      reader.releaseLock?.();
    }
  } catch (error) {
    console.error('WhatsLoop invoice relay failed', error?.message || String(error));
    if (!res.headersSent) return res.status(502).json({ error: 'Unable to retrieve invoice PDF' });
    res.end();
  }
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}
