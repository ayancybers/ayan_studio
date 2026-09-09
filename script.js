document.addEventListener("DOMContentLoaded", async () => {
    try {

        const response = await fetch('/api/log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userAgent: navigator.userAgent })
        });
        
        const data = await response.json();
        console.گ("Server Response:", data); 
        
        if (data.success && data.visits) {
            const counterElement = document.getElementById('visitor-count');
            if (counterElement) {
                counterElement.textContent = `+${data.visits}`;
            }
        }
    } catch (error) {
        console.error("خطأ في تحديث العداد:", error);
    }
});
