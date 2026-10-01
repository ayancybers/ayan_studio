import { getTamaraBaseUrl, retrieveTamaraOrder, isTamaraPaidStatus, mapTamaraOrder } from '../lib/server/tamara.js';

export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store, max-age=0');
  res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const expected=String(process.env.TAMARA_NOTIFICATION_TOKEN||'').trim();
  if(!expected) return res.status(500).json({error:'TAMARA_NOTIFICATION_TOKEN is missing'});
  const auth=String(req.headers.authorization||'').replace(/^Bearer\s+/i,'').trim();
  const queryToken=String(req.query?.tamaraToken||'').trim();
  if(auth && auth!==expected) return res.status(401).json({error:'Invalid Tamara notification token'});
  if(queryToken && queryToken!==expected) return res.status(401).json({error:'Invalid Tamara notification token'});
  if(!auth && !queryToken) return res.status(401).json({error:'Missing Tamara notification token'});
  try{
    const payload=req.body||{};
    const orderId=String(payload.order_id||'').trim();
    const event=String(payload.event_type||'').trim().toLowerCase();
    if(!orderId) return res.status(400).json({error:'Missing order_id'});
    if(event==='order_approved'){
      const token=String(process.env.TAMARA_API_TOKEN||'').trim();
      if(token){
        const r=await fetch(`${getTamaraBaseUrl()}/orders/${encodeURIComponent(orderId)}/authorise`,{method:'POST',headers:{Authorization:`Bearer ${token}`,accept:'application/json'},signal:timeoutSignal(12000)});
        if(!r.ok){const d=await r.json().catch(()=>({}));console.warn('Tamara authorise returned non-2xx',{orderId,status:r.status,error:d?.message||d?.error||d});}
      }
    }
    const raw=await retrieveTamaraOrder(orderId).catch(()=>null);
    const data=raw?mapTamaraOrder(raw,{paymentId:orderId}):null;
    return res.status(200).json({received:true,orderId,event,status:data?.status||payload?.status||''});
  }catch(error){console.error('Tamara webhook error',{error:error?.message||String(error)});return res.status(500).json({error:'Webhook processing failed'});}
}
function timeoutSignal(ms){return typeof AbortSignal!=='undefined'&&typeof AbortSignal.timeout==='function'?AbortSignal.timeout(ms):undefined}
