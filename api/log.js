import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userAgent } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const webhookUrl = process.env.webhook;

    let totalVisits = await kv.incr('total_visits') || 1420;

    if (webhookUrl) {
        const discordPayload = {
            embeds: [
                {
                    title: '🚨 زائر جديد دخل إلى الموقع',
                    color: 15158332,
                    fields: [
                        { name: '🌐 عنوان الـ IP', value: `\`${ip}\``, inline: false },
                        { name: '💻 معلومات الجهاز والمتصفح', value: `\`${userAgent}\``, inline: false },
                        { name: '📊 إجمالي الزيارات الحالي', value: `\`${totalVisits}\``, inline: false }
                    ],
                    timestamp: new Date().toISOString()
                }
            ]
        };

        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
        }).catch(() => {});
    }

    return res.status(200).json({ success: true, visits: totalVisits });
}
