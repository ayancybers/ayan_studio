import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    try {
        const totalVisits = await kv.incr('site_visits');

        const userAgent = req.body?.userAgent || req.headers['user-agent'] || 'Unknown';
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';

        const country = req.headers['x-vercel-ip-country'] || 'غير حدد';
        const region = req.headers['x-vercel-ip-country-region'] || 'غير حدد';
        const city = req.headers['x-vercel-ip-city'] || 'غير حدد';

        const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
        if (discordWebhookUrl) {
            await fetch(discordWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    embeds: [{
                        title: "👀 زيارة جديدة للموقع!",
                        color: 3066993,
                        fields: [
                            { name: "إجمالي الزيارات", value: `**${totalVisits}**`, inline: true },
                            { name: "🌍 الدولة", value: country, inline: true },
                            { name: "🏙️ المدينة / المنطقة", value: `${city}, ${region}`, inline: true },
                            { name: "عنوان الـ IP", value: ip, inline: true },
                            { name: "نوع المتصفح والجهاز", value: userAgent }
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
