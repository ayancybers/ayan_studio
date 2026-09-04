export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, packageType, carType, shootRegion, phone, notes } = req.body;

    const webhookUrl = process.env.webhook;

    if (!webhookUrl) {
        console.error('Webhook URL is missing in environment variables');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const discordPayload = {
        embeds: [
            {
                title: '📸 طلب حجز جلسة تصوير جديد',
                color: 27827,
                fields: [
                    { name: '👤 الاسم', value: name || 'غير محدد', inline: true },
                    { name: '📱 رقم التواصل', value: phone || 'غير محدد', inline: true },
                    { name: '📦 الباقة', value: packageType || 'غير محدد', inline: true },
                    { name: '🚗 نوع السيارة', value: carType || 'غير محدد', inline: true },
                    { name: "📱 رقم التواصل (واتساب)", value: `[${phone}](https://wa.me/966${phone.replace(/^0/, '')})`, inline: false },
                    { name: '💬 ملاحظات', value: notes || 'لا توجد ملاحظات', inline: false }
                ],
                timestamp: new Date().toISOString()
            }
        ]
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Discord API error:', errorText);
            return res.status(500).json({ error: 'Failed to send to Discord' });
        }

        return res.status(200).json({ success: true, message: 'Webhook sent successfully' });
    } catch (error) {
        console.error('Error executing webhook:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
