import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const totalVisits = await kv.incr('site_visits');

        const userAgent = req.body?.userAgent || req.headers['user-agent'] || 'Unknown';
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';

        const country = req.headers['x-vercel-ip-country'] || 'غير محدد';
        const region = req.headers['x-vercel-ip-country-region'] || 'غير محدد';
        const city = req.headers['x-vercel-ip-city'] || 'غير محدد';

        const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
        if (discordWebhookUrl) {
            await fetch(discordWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    embeds: [{
                        title: "👀 زيارة جديدة إلى Ayan Studio",
                        color: 3066993,
                        fields: [
                            { name: "📊 إجمالي الزيارات", value: `**${totalVisits}**`, inline: true },
                            { name: "🌍 الدولة", value: country, inline: true },
                            { name: "🏙️ المدينة / المنطقة", value: `${city}, ${region}`, inline: true },
                            { name: "🌐 عنوان الـ IP", value: ip, inline: false },
                            { name: "💻 المتصفح والجهاز", value: userAgent, inline: false }
                        ],
                        timestamp: new Date().toISOString()
                    }]
                })
            }).catch(() => {});
        }

        return res.status(200).json({ success: true, visits: totalVisits, location: { country, region, city } });
    } catch (error) {
        console.error('Log error:', error);
        return res.status(200).json({ success: true, visits: 1421, error: error.message });
    }
}
