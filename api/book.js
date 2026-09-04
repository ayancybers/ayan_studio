document.getElementById('bookingForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const lastSubmitTime = localStorage.getItem('last_submit_time');
    const now = Date.now();
    if (lastSubmitTime && (now - lastSubmitTime < 15000)) {
        alert('⚠️ يرجى الانتظار قليلاً قبل إرسال طلب آخر لمنع الضغط والـ Spam.');
        return;
    }

    const name = document.getElementById('fullName').value.trim();
    const packageType = document.getElementById('packageType').value;
    const carType = document.getElementById('carType').value;
    const shootRegion = document.getElementById('shootRegion').value;
    const phone = document.getElementById('phone').value.trim();
    const notes = document.getElementById('notes').value.trim();

    if (!name || !packageType || !carType || !shootRegion || !phone) {
        alert('يرجى تعبئة الحقول الإجبارية!');
        return;
    }

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    localStorage.setItem('last_submit_time', now);

    const alertBox = document.getElementById('successAlert');
    alertBox.style.display = 'block';

    try {
        // إرسال البيانات لسيرفر Vercel الآمن بدلاً من كشف الويب هوك
        await fetch('/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, packageType, carType, shootRegion, phone, notes })
        });
    } catch (err) {
        console.error('Error sending webhook');
    }

    currentSessions += 1;
    localStorage.setItem('sessionsCount', currentSessions);
    const sessionsElem = document.getElementById('sessionsCount');
    if (sessionsElem) sessionsElem.innerHTML = currentSessions + '+';

    const whatsappNumber = "966565117739";
    const message = `مرحباً، تم استقبال طلب حجز جلسة تصوير:%0A` +
                    `- الاسم: ${name}%0A` +
                    `- الباقة: ${packageType}%0A` +
                    `- نوع السيارة: ${carType}%0A` +
                    `- منطقة التصوير: ${shootRegion}%0A` +
                    `- رقم التواصل: ${phone}%0A` +
                    (notes ? `- ملاحظات: ${notes}%0A` : '') +
                    `%0Aيرجى الانتظار لين ما يتواصل معك المصور ويتم التنسيق لتحديد الموعد. شكراً لاختيارك !`;

    window.location.href = `https://wa.me/${whatsappNumber}?text=${message}`;
});