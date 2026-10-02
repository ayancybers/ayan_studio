const TYPE_LABELS = {
  suggestion: { ar: 'اقتراح', en: 'Suggestion' },
  complaint: { ar: 'شكوى', en: 'Complaint' },
  inquiry: { ar: 'استفسار', en: 'Inquiry' },
  contact: { ar: 'طلب تواصل', en: 'Contact request' }
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = parseBody(req);
  if (String(body.website || '').trim()) {
    return res.status(200).json({ ok: true });
  }

  const lang = body.lang === 'en' ? 'en' : 'ar';
  const type = String(body.type || '').trim().toLowerCase();
  const name = clean(body.name, 80);
  const phone = normalizePhone(body.phone);
  const email = clean(body.email, 120).toLowerCase();
  const subject = clean(body.subject, 120);
  const message = clean(body.message, 3000);

  if (!TYPE_LABELS[type]) return fail(res, lang, 'Choose a request type.', 'اختر نوع الطلب.');
  if (!name) return fail(res, lang, 'Enter your full name.', 'اكتب اسمك الكامل.');
  if (!/^9665\d{8}$/.test(phone)) return fail(res, lang, 'Enter a valid Saudi mobile number.', 'اكتب رقم جوال سعودي صحيح.');
  if (!EMAIL_RE.test(email)) return fail(res, lang, 'Enter a valid email address.', 'اكتب بريدًا إلكترونيًا صحيحًا.');
  if (!subject) return fail(res, lang, 'Enter the subject.', 'اكتب موضوع الطلب.');
  if (message.length < 10) return fail(res, lang, 'Please add more details.', 'اكتب تفاصيل الطلب بشكل أوضح.');

  const ticket = `AYAN-${Date.now().toString(36).toUpperCase()}`;
  const createdAt = new Date().toISOString();
  const page = clean(body.sourcePage, 120) || '/support.html';
  const theme = clean(body.theme, 30);
  const screen = clean(body.screen, 30);
  const typeLabel = TYPE_LABELS[type][lang];

  const discordWebhook = String(process.env.SUPPORT_DISCORD_WEBHOOK_URL || '').trim();
  const resendKey = String(process.env.RESEND_API_KEY || '').trim();
  const adminEmail = String(process.env.SUPPORT_EMAIL_TO || process.env.EMAIL_BCC || '').trim();
  const fromEmail = String(process.env.EMAIL_FROM || '').trim() || 'Ayan Photography <onboarding@resend.dev>';

  if (!discordWebhook || !resendKey || !adminEmail) {
    console.error('Support integrations are not configured', {
      discord: Boolean(discordWebhook),
      email: Boolean(resendKey),
      adminEmail: Boolean(adminEmail)
    });
    return res.status(503).json({
      error: lang === 'en'
        ? 'Support service is not configured yet.'
        : 'خدمة الدعم غير مهيأة حاليًا.'
    });
  }

  const results = await Promise.allSettled([
    sendDiscord(discordWebhook, {
      ticket, typeLabel, name, phone, email, subject, message, page, theme, screen, createdAt
    }),
    sendResendEmail(resendKey, {
      from: fromEmail,
      to: [adminEmail],
      reply_to: email,
      subject: `🛟 ${typeLabel} — ${subject} — ${ticket}`,
      html: adminHtml({ ticket, typeLabel, name, phone, email, subject, message, page, theme, screen, createdAt })
    }),
    sendResendEmail(resendKey, {
      from: fromEmail,
      to: [email],
      reply_to: adminEmail,
      subject: lang === 'en'
        ? `Ayan Photography — Request received (${ticket})`
        : `Ayan Photography — تم استقبال طلبك (${ticket})`,
      html: customerHtml({ lang, ticket, name, typeLabel, subject })
    })
  ]);

  const failed = results.find((result) => result.status === 'rejected');
  if (failed) {
    console.error('Support delivery failed', failed.reason);
    return res.status(502).json({
      error: lang === 'en'
        ? 'The request was received, but one notification channel failed. Please try again.'
        : 'استقبلنا الطلب، لكن تعذر إرسال إحدى إشعارات التنبيه. حاول مرة ثانية.'
    });
  }

  return res.status(200).json({ ok: true, ticket });
}

function fail(res, lang, en, ar) {
  return res.status(400).json({ error: lang === 'en' ? en : ar });
}

function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch (_) {}
  }
  return {};
}

function clean(value, max) {
  return String(value ?? '').replace(/\u0000/g, '').trim().slice(0, max);
}

function normalizePhone(value) {
  const digits = String(value ?? '').replace(/\D/g, '');
  if (digits.startsWith('966')) return digits.slice(0, 12);
  if (digits.startsWith('05')) return `966${digits.slice(1, 10)}`;
  return digits.slice(0, 12);
}

async function sendDiscord(webhook, data) {
  const response = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'Ayan Photography Support',
      allowed_mentions: { parse: [] },
      embeds: [{
        title: `🛟 Support Request · ${data.ticket}`,
        color: 4667781,
        timestamp: data.createdAt,
        fields: [
          { name: 'Type', value: truncate(data.typeLabel, 100), inline: true },
          { name: 'Name', value: truncate(data.name, 100), inline: true },
          { name: 'Phone', value: truncate(data.phone, 100), inline: true },
          { name: 'Email', value: truncate(data.email, 120), inline: false },
          { name: 'Subject', value: truncate(data.subject, 200), inline: false },
          { name: 'Message', value: truncate(data.message, 1000), inline: false },
          { name: 'Page', value: truncate(data.page || 'support.html', 120), inline: true },
          { name: 'Theme', value: truncate(data.theme || '—', 60), inline: true },
          { name: 'Screen', value: truncate(data.screen || '—', 60), inline: true }
        ],
        footer: { text: 'Ayan Photography • Support Center' }
      }]
    })
  });

  if (!response.ok) throw new Error(`Discord webhook returned ${response.status}`);
}

async function sendResendEmail(apiKey, payload) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result?.message || result?.error || `Resend returned ${response.status}`);
  return result;
}

function adminHtml(data) {
  return shell(`
    <h2 style="margin:0 0 8px;">🛟 Support Request</h2>
    <p style="margin:0 0 18px;color:#667085;">Ticket <strong>${esc(data.ticket)}</strong></p>
    ${row('Type', data.typeLabel)}
    ${row('Name', data.name)}
    ${row('Phone', data.phone)}
    ${row('Email', data.email)}
    ${row('Subject', data.subject)}
    ${row('Message', data.message.replace(/\n/g,'<br>'))}
    ${row('Page', data.page)}
    ${row('Theme', data.theme || '—')}
    ${row('Screen', data.screen || '—')}
    ${row('Created', new Date(data.createdAt).toLocaleString('en-GB',{timeZone:'Asia/Riyadh'})+' (Riyadh)')}
  `);
}

function customerHtml(data) {
  return shell(data.lang === 'en' ? `
    <h2 style="margin:0 0 10px;">Your request was received successfully ✅</h2>
    <p style="margin:0 0 16px;">Hi ${esc(data.name)}, we received your request at Ayan Photography.</p>
    ${row('Ticket', data.ticket)}
    ${row('Request type', data.typeLabel)}
    ${row('Subject', data.subject)}
    <div style="margin-top:18px;padding:14px 16px;border-radius:14px;background:#f4f7fb;border:1px solid #e5eaf1;">
      We will contact you within <strong>24 business hours</strong>.
    </div>
    <p style="color:#667085;font-size:12px;margin:18px 0 0;">Keep your ticket number for follow-up: ${esc(data.ticket)}</p>
  ` : `
    <h2 style="margin:0 0 10px;">تم استقبال طلبك بنجاح ✅</h2>
    <p style="margin:0 0 16px;">هلا ${esc(data.name)}، وصلنا طلبك في Ayan Photography.</p>
    ${row('رقم الطلب', data.ticket)}
    ${row('نوع الطلب', data.typeLabel)}
    ${row('الموضوع', data.subject)}
    <div style="margin-top:18px;padding:14px 16px;border-radius:14px;background:#f4f7fb;border:1px solid #e5eaf1;">
      سوف يتم التواصل معك خلال <strong>24 ساعة عمل</strong>.
    </div>
    <p style="color:#667085;font-size:12px;margin:18px 0 0;">احتفظ برقم الطلب للمتابعة: ${esc(data.ticket)}</p>
  `);
}

function shell(content) {
  return `<!doctype html><html><body style="margin:0;background:#f6f8fb;font-family:Arial,Helvetica,sans-serif;color:#101828"><div style="max-width:640px;margin:28px auto;padding:24px;background:#fff;border:1px solid #e4e7ec;border-radius:18px">${content}<div style="margin-top:24px;padding-top:14px;border-top:1px solid #eef1f5;color:#98a2b3;font-size:11px">Ayan Photography • Support Center</div></div></body></html>`;
}

function row(label, value) {
  return `<div style="padding:10px 0;border-bottom:1px solid #f0f2f4"><div style="font-size:11px;color:#98a2b3;margin-bottom:3px">${esc(label)}</div><div style="font-size:14px;line-height:1.6;white-space:normal">${esc(value)}</div></div>`;
}

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  })[char]);
}

function truncate(value, max) {
  const s = String(value ?? '');
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}
