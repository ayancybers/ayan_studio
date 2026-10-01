import { sendInvoiceEmail } from './lib/invoice-email.js';
import { retrieveTamaraOrder, mapTamaraOrder } from './lib/tamara.js';

export default async function handler(req, res) {
  setSecurityHeaders(res);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!sameOrigin(req)) return res.status(403).json({ error: 'Forbidden origin' });

  const body = req.body || {};
  const provider = body.provider === 'tabby' ? 'tabby' : body.provider === 'tamara' ? 'tamara' : 'tap';
  const paymentId = String(body.paymentId || body.tapId || '').trim();
  if (!paymentId) return res.status(400).json({ error: 'Missing payment reference' });
  if (!process.env.RESEND_API_KEY) return res.status(503).json({ error: 'Email service is not configured' });

  try {
    const data = provider === 'tabby'
      ? await retrieveTabby(paymentId)
      : provider === 'tamara'
        ? mapTamaraOrder(await retrieveTamaraOrder(paymentId), { paymentId })
        : await retrieveTap(paymentId);
    const ok = provider === 'tabby' ? data.status === 'CLOSED' : provider === 'tamara' ? ['APPROVED','AUTHORISED','FULLY_CAPTURED','PARTIALLY_CAPTURED'].includes(String(data.status||'').toUpperCase().replace(/\s+/g,'_')) : data.status === 'CAPTURED';
    if (!ok) return res.status(409).json({ error: 'Payment is not confirmed yet', status: data.status });

    const result = await sendInvoiceEmail({ provider, paymentId, data, req });
    if (result.skipped) return res.status(422).json({ error: result.reason });
    return res.status(200).json({ success: true, sent: true, id: result.id || '' });
  } catch (error) {
    console.error('Invoice email failed', { provider, paymentId, error: error?.message || String(error) });
    return res.status(502).json({ error: 'Unable to send invoice email' });
  }
}

async function retrieveTap(id){
  const secret=String(process.env.TAP_SECRET_KEY||'').trim();
  if(!secret) throw new Error('TAP_SECRET_KEY is missing');
  const r=await fetch(`https://api.tap.company/v2/charges/${encodeURIComponent(id)}`,{headers:{Authorization:`Bearer ${secret}`,accept:'application/json'}});
  const c=await r.json().catch(()=>({}));
  if(!r.ok) throw new Error(c?.response?.message || 'Unable to retrieve Tap payment');
  const m=c.metadata||{};
  return {status:String(c.status||'').toUpperCase(),paymentId:c.id||id,tapId:c.id||id,amount:Number(c.amount||m.total||0),currency:c.currency||'SAR',customerName:m.customer_name||fullName(c),email:m.email||c?.customer?.email||'',phone:m.phone||'',packageName:m.package_name||m.package_name_en||'',packageNameAr:m.package_name_ar||'',packageNameEn:m.package_name_en||'',subtotal:Number(m.subtotal||0),paymentFee:Number(m.payment_fee||m.service_fee||0),serviceFee:Number(m.payment_fee||m.service_fee||0),total:Number(m.total||c.amount||0),carType:m.car_type||'',shootRegion:m.shoot_region||'',termsAccepted:String(m.terms_accepted||'false')==='true',termsAcceptedAt:m.terms_accepted_at||'',lang:m.lang==='en'?'en':'ar',created:c?.transaction?.created||'',notes:m.notes||'—'};
}

async function retrieveTabby(id){
  const secret=String(process.env.TABBY_SECRET_KEY||'').trim();
  if(!secret) throw new Error('TABBY_SECRET_KEY is missing');
  const base=String(process.env.TABBY_API_BASE_URL||'https://api.tabby.sa').trim().replace(/\/$/,'');
  const r=await fetch(`${base}/api/v2/payments/${encodeURIComponent(id)}`,{headers:{Authorization:`Bearer ${secret}`,accept:'application/json'}});
  const d=await r.json().catch(()=>({}));
  if(!r.ok) throw new Error(d?.error||d?.message||'Unable to retrieve Tabby payment');
  const m=d.meta||{};
  return {status:String(d.status||'').toUpperCase(),paymentId:d.id||id,tapId:d.id||id,amount:Number(d.amount||m.total||0),currency:d.currency||'SAR',customerName:m.customer_name||d?.buyer?.name||'—',email:m.email||d?.buyer?.email||'',phone:m.phone||d?.buyer?.phone||'',packageName:m.package_name||m.package_name_en||'',packageNameAr:m.package_name_ar||'',packageNameEn:m.package_name_en||'',subtotal:Number(m.subtotal||0),paymentFee:Number(m.payment_fee||0),serviceFee:Number(m.payment_fee||0),total:Number(m.total||d.amount||0),carType:m.car_type||'',shootRegion:m.shoot_region||'',termsAccepted:String(m.terms_accepted||'false')==='true',termsAcceptedAt:m.terms_accepted_at||'',lang:m.lang==='en'?'en':'ar',created:d.created_at||'',notes:m.notes||'—'};
}
function fullName(c){return [c?.customer?.first_name,c?.customer?.last_name].filter(Boolean).join(' ')||'—'}
function sameOrigin(req){const origin=req.headers.origin;if(!origin)return true;const host=String(req.headers.host||'').split(':')[0];try{return new URL(origin).hostname===host}catch{return false}}
function setSecurityHeaders(res){res.setHeader('Cache-Control','no-store, max-age=0');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');res.setHeader('X-Frame-Options','SAMEORIGIN')}
