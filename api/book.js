export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, packageType, carType, shootRegion, phone, notes } = req.body;

        if (!name || !packageType || !carType || !shootRegion || !phone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const cleanPhone = phone.startsWith('0') ? '966' + phone.slice(1) : phone;

        const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
        if (discordWebhookUrl) {
            await fetch(discordWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    embeds: [{
                        title: "🚗 طلب حجز جلسة تصوير جديد!",
                        color: 15844367,
                        fields: [
                            { name: "👤 اسم العميل", value: name, inline: true },
                            { name: "📦 الباقة المختارة", value: packageType, inline: true },
                            { name: "🚙 نوع السيارة", value: carType, inline: true },
                            { name: "📍 منطقة التصوير", value: shootRegion, inline: true },
                            { name: "📱 رقم الواتساب", value: `[${phone}](https://wa.me/${cleanPhone})`, inline: true },
                            { name: "📝 ملاحظات إضافية", value: notes || "لا توجد ملاحظات", inline: false }
                        ],
                        footer: {
                            text: "Ayan Studio Booking System"
                        },
                        timestamp: new Date().toISOString()
                    }]
                })
            }).catch(() => {});
        }

        return res.status(200).json({ success: type = true, message: 'Booking received successfully' });
    } catch (error) {
        console.error('Booking error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
