document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = applyFetch();
        const res = await fetch('/api/log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userAgent: navigator.userAgent })
        });
        const data = await res.json();
        
        if (data.success && data.visits) {
            document.getElementById('visitor-count').textContent = data.visits;
        }
    } catch (e) {
        document.getElementById('visitor-count').textContent = "1421";
    }
});
