export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userAgent } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'غير معروف';
    const webhookUrl = process.env.webhook;

    if (!webhookUrl) {
        return res.status(500).json({ error: 'Webhook URL missing' });
    }

    let deviceType = "💻 جهاز مكتبي (PC / Laptop)";
    if (/iphone|ipad|ipod/i.test(userAgent)) {
        deviceType = "📱 أيفون (iPhone / iOS)";
    } else if (/android/i.test(userAgent)) {
        deviceType = "📱 أندرويد (Android)";
    } else if (/macintosh|mac os x/i.test(userAgent)) {
        deviceType = "💻 ماك (MacBook / macOS)";
    }

    let browser = "متصفح غير معروف";
    if (useragent_includes(userAgent, "Chrome")) browser = "Google Chrome";
    else if (useragent_includes(userAgent, "Safari")) browser = "Apple Safari";
    else if (useragent_includes(userAgent, "Firefox")) browser = "Mozilla Firefox";
    else if (useragent_includes(userAgent, "Edge")) browser = "Microsoft Edge";

    function useragent_includes(ua, name) {
        return ua.indexOf(name) !== -1;
    }

    const discordPayload = {
        embeds: [
            {
                title: '🚨 تنبيه: زائر جديد دخل إلى الموقع',
                color: 3066993,
                fields: [
                    { name: '🌐 عنوان الـ IP', value: `\`${ip}\``, inline: false },
                    { name: '📱 نوع الجهاز', value: deviceType, inline: true },
                    { name: '🌐 المتصفح', value: browser, inline: true },
                    { name: '📋 تفاصيل النظام (User-Agent)', value: `\`\`\`${userAgent}\`\`\``, inline: false }
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
