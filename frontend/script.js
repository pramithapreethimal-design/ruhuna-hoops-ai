document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('predictionForm');
    const resultBox = document.getElementById('result-box');
    const finalScore = document.getElementById('final-score');
    const predictBtn = document.getElementById('predictBtn');
    const themeToggle = document.getElementById('themeToggle');
    const resetBtn = document.getElementById('resetBtn');

    // 🌓 Theme Toggle
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        themeToggle.textContent = next === 'light' ? '☀️' : '🌙';
    });

    // 📤 Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Start loading animation
        predictBtn.classList.add('loading');
        predictBtn.disabled = true;
        resultBox.classList.add('d-none');

        const payload = {
            practice_hours: parseFloat(document.getElementById('practice').value),
            total_players: parseFloat(document.getElementById('players').value),
            total_assists: parseFloat(document.getElementById('assists').value),
            total_rebounds: parseFloat(document.getElementById('rebounds').value)
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            // Display Results
            if (data.success) {
                resultBox.className = 'alert alert-success mt-4 text-center';
                finalScore.textContent = data.predicted_points.toFixed(2);
            } else {
                resultBox.className = 'alert alert-danger mt-4 text-center';
                finalScore.textContent = "Error: " + data.error;
            }
            resultBox.classList.remove('d-none');

        } catch (error) {
            // Handle server crashes or connection issues
            resultBox.className = 'alert alert-danger mt-4 text-center';
            finalScore.textContent = "Network Error! Is the backend running?";
            resultBox.classList.remove('d-none');
            console.error("Fetch Error:", error);
        } finally {
            // Always stop the loading spinner, even if it fails
            predictBtn.classList.remove('loading');
            predictBtn.disabled = false;
        }
    });

    // 🔄 Reset Button Logic
    resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        form.reset();
        resultBox.classList.add('d-none');
    });
});