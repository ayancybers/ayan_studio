import crypto from 'node:crypto';
import { PACKAGES, calculatePricing, getPricingConfig, roundMoney } from '../../pricing.js';
import { getTamaraBaseUrl, isTamaraPaidStatus, mapTamaraOrder, normalizeSaudiPhone, retrieveTamaraOrder } from '../tamara.js';

const ALLOWED_CARS = new Set(['سيدان','SUV','كوبيه','فاخر / رياضي','Sedan','Coupe','Luxury / Sport','Luxury / Sports']);
const ALLOWED_REGIONS = new Set(['القطيف','سيهات','الدمام','الخبر','حفر الباطن','Qatif','Saihat','Dammam','Khobar','Hafar Al Batin']);
const recentRequests = globalThis.__ayanTamaraRateLimit || new Map();
globalThis.__ayanTamaraRateLimit = recentRequests;

export default async function handler(req, res) {
  setSecurityHeaders(res);
  if (req.method === 'GET') return verifyTamara(req, res);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const requestId = makeRequestId();
  if (!sameOrigin(req)) return res.status(403).json({ error: 'Forbidden origin', requestId });

  if (!boolEnv('TAMARA_ENABLED', false)) return res.status(503).json({ error: 'Tamara payment is not enabled yet.', requestId });
  const token = String(process.env.TAMARA_API_TOKEN || '').trim();
  if (!token) return res.status(500).json({ error: 'Tamara API token is missing.', requestId });

  const ip = getClientIp(req), now = Date.now(), last = recentRequests.get(ip) || 0;
  if (now - last < 15000) return res.status(429).json({ error: 'Please wait before starting another payment.', requestId });
  recentRequests.set(ip, now); cleanupRateLimit(now);

  const body = req.body || {};
  if (String(body.website || '').trim()) return res.status(400).json({ error: 'Invalid request', requestId });
  const name = limit(body.name,80).trim();
  const email = limit(String(body.email || '').trim().toLowerCase(),160);
  const packageKey = limit(body.packageKey,20).trim();
  const packageType = limit(body.packageType,120).trim();
  const carType = limit(body.carType,40).trim();
  const shootRegion = limit(body.shootRegion,60).trim();
  const phone = normalizeSaudiPhone(body.phone);
  const notes = limit(body.notes,1200).trim();
  const lang = body.lang === 'en' ? 'en' : 'ar';

  if (!name || !email || !packageKey || !packageType || !carType || !shootRegion || !phone) return res.status(400).json({ error:'Missing required fields', requestId });
  if (!PACKAGES[packageKey] || !ALLOWED_CARS.has(carType) || !ALLOWED_REGIONS.has(shootRegion)) return res.status(400).json({ error:'Invalid booking option', requestId });
  if (!/^9665\d{8}$/.test(phone)) return res.status(400).json({ error:'Invalid Saudi mobile number', requestId });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error:'Enter a valid email address', requestId });
  if (body.termsAgreement !== true) return res.status(400).json({ error:'Terms and conditions must be accepted before payment.', requestId });

  const pkg = PACKAGES[packageKey];
  const pricing = calculatePricing(packageKey,'tamara');
  const baseUrl = getBaseUrl(req);
  const firstName = name.split(/\s+/)[0] || 'Customer';
  const lastName = name.split(/\s+/).slice(1).join(' ') || 'Customer';
  const orderReference = `AYAN-TM-${requestId.replace(/-/g,'').slice(-20).toUpperCase()}`;
  const orderNumber = `AYAN-${requestId.replace(/-/g,'').slice(-12).toUpperCase()}`;
  const today = new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Riyadh',day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date()).replaceAll('/','-');
  const cfg = getPricingConfig();
  const tamaraInstalments = Math.min(12, Math.max(4, Math.round(numberEnv('TAMARA_INSTALMENTS',4,4,12))));

  const extra = {
    source: 'ayan_studio', request_id: requestId, payment_method:'tamara', order_reference:orderReference,
    package_key:packageKey, package_name:pkg[lang], package_name_ar:pkg.ar, package_name_en:pkg.en,
    subtotal:pricing.subtotal.toFixed(2), payment_fee:pricing.paymentFee.toFixed(2),
    payment_fee_percent:String(pricing.paymentFeePercent), payment_fee_fixed:pricing.paymentFeeFixed.toFixed(2),
    total:pricing.total.toFixed(2), vat_enabled:'false', tax:'0', customer_name:name, email, phone,
    car_type:carType, shoot_region:shootRegion, notes:notes||'—', terms_accepted:'true', terms_version:'2026-10-01',
    terms_accepted_at:new Date().toISOString(), lang, instalments:String(tamaraInstalments), created_at:new Date().toISOString()
  };

  const payload = {
    total_amount:{amount:pricing.total,currency:'SAR'},
    shipping_amount:{amount:0,currency:'SAR'},
    tax_amount:{amount:0,currency:'SAR'},
    order_reference_id:orderReference,
    order_number:orderNumber,
    items:[
      { name:pkg.en, type:'Digital', reference_id:packageKey, sku:`AYAN-${packageKey.toUpperCase()}`, quantity:1,
        discount_amount:{amount:0,currency:'SAR'}, tax_amount:{amount:0,currency:'SAR'},
        unit_price:{amount:pricing.subtotal,currency:'SAR'}, total_amount:{amount:pricing.subtotal,currency:'SAR'},
        item_url:`${baseUrl}/booking.html` }
      , ...(pricing.paymentFee > 0 ? [{ name:'Payment processing fee', type:'Digital', reference_id:`fee-${packageKey}`, sku:`AYAN-FEE-${packageKey.toUpperCase()}`, quantity:1,
        discount_amount:{amount:0,currency:'SAR'}, tax_amount:{amount:0,currency:'SAR'}, unit_price:{amount:pricing.paymentFee,currency:'SAR'}, total_amount:{amount:pricing.paymentFee,currency:'SAR'} }] : [])
    ],
    consumer:{email,first_name:firstName,last_name:lastName,phone_number:phone.slice(3)},
    country_code:'SA', description:`Ayan Photography - ${pkg.en}`,
    merchant_url:{
      cancel:`${baseUrl}/payment-success.html?provider=tamara&result=cancel`,
      failure:`${baseUrl}/payment-success.html?provider=tamara&result=failure`,
      success:`${baseUrl}/payment-success.html?provider=tamara`
    },
    shipping_address:{city:mapRegionToEnglish(shootRegion),country_code:'SA',first_name:firstName,last_name:lastName,line1:'Ayan Photography - Digital Photography Service',line2:'',phone_number:phone.slice(3),region:mapRegionToEnglish(shootRegion)},
    platform:'Ayan Photography Website', is_mobile:isLikelyMobile(req), locale:lang==='en'?'en_US':'ar_SA',
    payment_type:'PAY_BY_INSTALMENTS', instalments:tamaraInstalments,
    risk_assessment:{
      is_premium_customer:false,
      account_creation_date:today,
      total_order_count:0,
      risk_score:0,
      date_first_paid:null,
      date_last_paid:null,
      order_count_last_24h:0
    },
    expires_in_minutes:60,
    additional_data:{ ayan_booking:extra }
  };

  try {
    const response = await fetch(`${getTamaraBaseUrl()}/checkout`,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json',accept:'application/json'},body:JSON.stringify(payload),signal:timeoutSignal(15000)});
    const result = await response.json().catch(()=>({}));
    if (!response.ok) {
      console.error('Tamara checkout creation failed',{requestId,status:response.status,error:result?.message||result?.error||result});
      return res.status(502).json({error:result?.message||result?.error||'Unable to create Tamara checkout',requestId});
    }
    const orderId = String(result?.order_id || result?.order?.order_id || '').trim();
    const checkoutUrl = String(result?.checkout_url || '').trim();
    if (!orderId || !checkoutUrl) return res.status(502).json({error:'Tamara did not return a checkout URL.',requestId});
    res.setHeader('Set-Cookie',`ayan_tamara_order_id=${encodeURIComponent(orderId)}; Max-Age=7200; Path=/; HttpOnly; Secure; SameSite=Lax`);
    return res.status(200).json({success:true,provider:'tamara',requestId,orderId,paymentId:orderId,status:String(result?.status||'').toLowerCase(),redirectUrl:checkoutUrl,invoiceUrl:`${baseUrl}/invoice.html?provider=tamara&order_id=${encodeURIComponent(orderId)}`,subtotal:pricing.subtotal,paymentFee:pricing.paymentFee,total:pricing.total,amount:pricing.total,paymentMethod:'tamara'});
  } catch(error){
    console.error('Tamara checkout request error',{requestId,error:error?.message||String(error)});
    return res.status(502).json({error:'Unable to connect to Tamara',requestId});
  }
}

async function verifyTamara(req,res){
  const orderId = limit(String(req.query?.order_id || req.query?.payment_id || getCookie(req,'ayan_tamara_order_id') || '').trim(),120);
  if (!orderId) return res.status(400).json({error:'Missing Tamara order reference'});
  try {
    const raw = await retrieveTamaraOrder(orderId);
    const data = mapTamaraOrder(raw,{paymentId:orderId});
    return res.status(200).json({...data,success:isTamaraPaidStatus(data.status)});
  } catch(error){
    console.error('Tamara verification error',{orderId,error:error?.message||String(error)});
    return res.status(502).json({error:'Unable to verify Tamara order'});
  }
}

function mapRegionToEnglish(value){const map={'القطيف':'Qatif','سيهات':'Saihat','الدمام':'Dammam','الخبر':'Khobar','حفر الباطن':'Hafar Al Batin'};return map[value]||value;}
function isLikelyMobile(req){const ua=String(req.headers['user-agent']||'');return /Mobile|Android|iPhone|iPad/i.test(ua);}
function getCookie(req,name){const raw=String(req.headers.cookie||'');for(const part of raw.split(';')){const [k,...v]=part.trim().split('=');if(k===name)return decodeURIComponent(v.join('='));}return '';}
function numberEnv(name,fallback,min=0,max=Number.MAX_SAFE_INTEGER){const v=Number(process.env[name]);return Number.isFinite(v)?Math.min(max,Math.max(min,v)):fallback;}
function boolEnv(name,fallback){const raw=String(process.env[name]??'').trim().toLowerCase();if(!raw)return fallback;if(['true','1','yes','on'].includes(raw))return true;if(['false','0','no','off'].includes(raw))return false;return fallback;}
function limit(value,max=1000){return String(value??'').slice(0,max)}
function getClientIp(req){return String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim()}
function sameOrigin(req){const origin=req.headers.origin;if(!origin)return true;const host=String(req.headers.host||'').split(':')[0];try{return new URL(origin).hostname===host}catch{return false}}
function timeoutSignal(ms){return typeof AbortSignal!=='undefined'&&typeof AbortSignal.timeout==='function'?AbortSignal.timeout(ms):undefined}
function makeRequestId(){try{return crypto.randomUUID()}catch{return `ayan-${Date.now()}-${Math.random().toString(36).slice(2,10)}`}}
function cleanupRateLimit(now){if(recentRequests.size<250)return;for(const [key,t] of recentRequests)if(now-t>60000)recentRequests.delete(key)}
function setSecurityHeaders(res){res.setHeader('Cache-Control','no-store, max-age=0');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');res.setHeader('X-Frame-Options','SAMEORIGIN');res.setHeader('Permissions-Policy','geolocation=(), camera=(), microphone=(), payment=*')}
