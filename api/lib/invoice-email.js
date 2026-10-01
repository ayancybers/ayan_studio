export async function sendInvoiceEmail({ provider, paymentId, data, req, pdfBase64 = '', pdfFileName = '' }) {
  const apiKey = String(process.env.RESEND_API_KEY || '').trim();
  if (!apiKey) return { skipped: true, reason: 'RESEND_API_KEY is not configured' };

  const email = String(data?.email || '').trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { skipped: true, reason: 'Customer email is missing or invalid' };
  }

  const baseUrl = getBaseUrl(req);
  const ref = String(data?.paymentId || data?.tapId || paymentId || '').trim();
  const invoiceUrl = provider === 'tabby'
    ? `${baseUrl}/invoice.html?provider=tabby&payment_id=${encodeURIComponent(ref)}`
    : `${baseUrl}/invoice.html?tap_id=${encodeURIComponent(ref)}`;

  const isArabic = data?.lang !== 'en';
  const money = n => `${Number(n || 0).toFixed(2)} SAR`;
  const method = provider === 'tabby' ? 'Tabby' : 'البطاقات / Tap';
  const packageName = data?.packageName || data?.packageNameAr || data?.packageNameEn || '—';
  const total = money(data?.total ?? data?.amount);
  const subtotal = money(data?.subtotal);
  const fee = money(data?.paymentFee ?? data?.serviceFee);
  const invoiceNo = `AYAN-${ref.replace(/[^A-Za-z0-9]/g, '').slice(-12).toUpperCase()}`;
  const accepted = data?.termsAccepted === true;
  const dateText = formatDate(data?.created, isArabic);
  // PNG is used for email-client compatibility; keep it on the verified site domain.
  const logoUrl = String(process.env.EMAIL_LOGO_URL || `${baseUrl}/assets/ayan-logo-icon.png`).trim();

  const subject = isArabic
    ? `فاتورتك الإلكترونية — Ayan Photography — ${total}`
    : `Your Ayan Photography invoice — ${total}`;

  const html = `<!doctype html>
<html lang="${isArabic ? 'ar' : 'en'}" dir="${isArabic ? 'rtl' : 'ltr'}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"></head>
<body style="margin:0;padding:24px 10px;background:#07111f;font-family:Arial,Helvetica,sans-serif;color:#17263b;-webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:680px;border-collapse:separate;border-spacing:0;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 20px 70px rgba(0,0,0,.22);">
        <tr>
          <td align="center" bgcolor="#0d2238" style="padding:30px 26px 28px;background:#0d2238;background:linear-gradient(135deg,#0d2238,#142f4b);color:#ffffff !important;">
            <div style="margin:0 auto 14px;width:84px;height:84px;border-radius:50%;background:transparent;padding:0;box-shadow:0 10px 28px rgba(0,0,0,.28);overflow:hidden;">
              <img src="${escapeHtml(logoUrl)}" alt="Ayan Photography" width="84" height="84" style="display:block;width:84px;height:84px;border-radius:50%;object-fit:cover;border:0;outline:none;background:transparent;">
            </div>
            <div style="font-size:11px;letter-spacing:.16em;font-weight:800;color:#7db7ff;">AYAN PHOTOGRAPHY</div>
            <h1 style="margin:8px 0 5px;font-size:28px;line-height:1.25;color:#ffffff !important;-webkit-text-fill-color:#ffffff !important;">${isArabic ? 'فاتورة حجز إلكترونية' : 'Electronic Booking Invoice'}</h1>
            <div style="font-size:12px;color:#b9c9db;">${escapeHtml(invoiceNo)}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 26px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;border-spacing:0;margin:0 0 22px;background:#f0f7ff;border:1px solid #dceaff;border-radius:16px;">
              <tr><td style="padding:16px 18px;">
                <div style="font-weight:800;color:#1d8c57;margin-bottom:5px;">✓ ${isArabic ? 'تم تأكيد الدفع' : 'Payment confirmed'}</div>
                <div style="font-size:13px;line-height:1.7;color:#66758a;">${isArabic ? 'شكرًا لحجزك مع Ayan Photography. هذه تفاصيل فاتورتك.' : 'Thank you for booking with Ayan Photography. Here are your invoice details.'}</div>
              </td></tr>
            </table>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;font-size:13px;">
              <tbody>
                ${row(isArabic?'العميل':'Customer',data?.customerName)}
                ${row(isArabic?'البريد الإلكتروني':'Email',email)}
                ${row(isArabic?'الباقة':'Package',packageName)}
                ${row(isArabic?'السيارة':'Car',data?.carType)}
                ${row(isArabic?'منطقة التصوير':'Shoot area',data?.shootRegion)}
                ${row(isArabic?'طريقة الدفع':'Payment method',method)}
                ${row(isArabic?'تاريخ العملية':'Payment date',dateText)}
                ${row(isArabic?'رقم العملية':'Payment reference',ref)}
              </tbody>
            </table>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;border-spacing:0;margin-top:24px;background:#f7f9fc;border:1px solid #e8edf4;border-radius:18px;">
              <tr><td style="padding:18px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;font-size:13px;">
                  <tr><td style="padding:6px 0;color:#617086;">${isArabic?'سعر الباقة':'Package price'}</td><td align="right" style="padding:6px 0;color:#182a42;font-weight:800;">${subtotal}</td></tr>
                  <tr><td style="padding:6px 0;color:#617086;">${isArabic?'رسوم الدفع':'Payment fee'}</td><td align="right" style="padding:6px 0;color:#182a42;font-weight:800;">+ ${fee}</td></tr>
                  <tr><td style="padding:12px 0 0;margin-top:8px;border-top:1px dashed #ccd6e2;font-size:18px;font-weight:800;">${isArabic?'الإجمالي':'Total'}</td><td align="right" style="padding:12px 0 0;border-top:1px dashed #ccd6e2;font-size:18px;font-weight:900;color:#247be5;">${total}</td></tr>
                </table>
              </td></tr>
            </table>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;border-spacing:0;margin-top:22px;background:#fbfdff;border:1px solid #dfe8f1;border-radius:15px;">
              <tr><td style="padding:15px 18px;font-size:12px;line-height:1.8;color:#68788c;">
                <strong style="color:#31435c;">${isArabic?'الشروط والأحكام':'Terms & Conditions'}</strong><br>
                ${accepted ? (isArabic?'✅ تمت الموافقة على الشروط قبل الدفع.':'✅ Accepted before payment.') : (isArabic?'لم تُسجل الموافقة.':'Acceptance was not recorded.')}
              </td></tr>
            </table>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:24px;border-collapse:collapse;">
              <tr><td align="center">
                <a href="${escapeHtml(invoiceUrl)}" style="display:inline-block;padding:14px 24px;border-radius:14px;background:#4d96ff;color:#ffffff;text-decoration:none;font-weight:800;font-size:14px;">${isArabic?'تحميل الفاتورة PDF':'Download PDF invoice'}</a>
              </td></tr>
            </table>

            <p style="margin:18px 0 0;text-align:center;color:#8a98aa;font-size:11px;line-height:1.8;">${isArabic?'لا توجد ضريبة مضافة على هذا الطلب.':'No VAT is added to this order.'}</p>
          </td>
        </tr>
        <tr><td align="center" style="padding:18px 24px;background:#f7f9fc;border-top:1px solid #e7edf4;font-size:10px;color:#8390a0;">Ayan Photography • ayancybers.store</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

  const from = String(process.env.EMAIL_FROM || '').trim() || 'Ayan Photography <onboarding@resend.dev>';
  const bcc = String(process.env.EMAIL_BCC || '').trim();
  const body = { from, to:[email], subject, html };
  if (bcc) body.bcc = [bcc];
  const cleanPdf = String(pdfBase64 || '').replace(/^data:application\/pdf;base64,/, '').trim();
  if (cleanPdf) {
    if (!/^[A-Za-z0-9+/=\r\n]+$/.test(cleanPdf)) throw new Error('Invalid PDF payload');
    const bytes = Buffer.from(cleanPdf, 'base64');
    if (bytes.length < 100 || bytes.length > 3_000_000) throw new Error('PDF size is invalid');
    body.attachments = [{ filename: pdfFileName || `${invoiceNo}.pdf`, content: cleanPdf }];
  }

  const response = await fetch('https://api.resend.com/emails', {
    method:'POST',
    headers:{
      Authorization:`Bearer ${apiKey}`,
      'Content-Type':'application/json',
      accept:'application/json',
      'Idempotency-Key':`invoice/${provider}/${ref}`.slice(0,256)
    },
    body:JSON.stringify(body),
    signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(12000) : undefined
  });
  const result = await response.json().catch(()=>({}));
  if (!response.ok) throw new Error(result?.message || result?.error || `Resend returned ${response.status}`);
  return { sent:true, id:result?.id || '' };
}

function escapeHtml(value){return String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function row(label,value){return `<tr><td style="padding:9px 0;color:#7a899c;border-bottom:1px solid #edf1f5">${escapeHtml(label)}</td><td style="padding:9px 0;text-align:end;font-weight:700;border-bottom:1px solid #edf1f5;color:#1d2d43">${escapeHtml(value || '—')}</td></tr>`}
function formatDate(v,ar){if(!v)return'—';const d=new Date(v);if(Number.isNaN(d.getTime()))return'—';return new Intl.DateTimeFormat(ar?'ar-SA':'en-US',{dateStyle:'medium',timeStyle:'short'}).format(d)}
function getBaseUrl(req){const configured=String(process.env.APP_BASE_URL||'').trim().replace(/\/$/,'');if(configured)return configured;const protocol=String(req?.headers?.['x-forwarded-proto']||'https').split(',')[0];const host=String(req?.headers?.host||'').split(',')[0];return `${protocol}://${host}`}
