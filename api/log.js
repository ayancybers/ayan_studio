export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userAgent } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const webhookUrl = process.env.webhook;

    if (!webhookUrl) {
        return res.status(500).json({ error: 'Webhook URL missing' });
    }

    const discordPayload = {
        embeds: [
            {
                title: '🚨 زائر جديد دخل إلى الموقع',
                color: 15158332,
                fields: [
                    { name: '🌐 عنوان الـ IP', value: `\`${ip}\``, inline: false },
                    { name: '💻 معلومات الجهاز والمتصفح', value: `\`${userAgent}\``, inline: false }
                ],
                timestamp: new Date().toISOString()
            }
        ]
    };

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
        });
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send' });
    }
}