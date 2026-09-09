let currentVisits = 1421; 

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        currentVisits += 1;

        const userAgent = req.body?.userAgent || req.headers['user-agent'] || 'Unknown';
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';

        const webhookUrl = process.env.webhook || process.env.DISCORD_WEBHOOK_URL;

        if (webhookUrl && req.method === 'POST') {
            const discordPayload = {
                embeds: [
                    {
                        title: '🚨 زائر جديد دخل إلى الموقع',
                        color: 15158332,
                        fields: [
                            { name: '🌐 عنوان الـ IP', value: `\`${ip}\``, inline: false },
                            { name: '💻 معلومات الجهاز والمتصفح', value: `\`${userAgent}\``, inline: false },
                            { name: '📊 إجمالي الزيارات الحالي', value: `\`${currentVisits}\``, inline: false }
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

        return res.status(200).json({ success: true, visits: currentVisits });
    } catch (error) {
        console.error('Log error:', error);
        return res.status(200).json({ success: true, visits: currentVisits });
    }
}
