// Fixed countdown date: March 5th, 2026 at 9:55 AM Israel Time (UTC+2)
// Using ISO 8601 format with timezone offset
const targetDate = new Date('2026-03-05T09:55:00+02:00');

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        document.getElementById('message').textContent = '🎉 Time to visit Prague! 🎉';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    if (days === 0 && hours === 0 && minutes < 10) {
        document.getElementById('message').textContent = '⏰ Almost time! Get ready! 🎒';
    } else if (days === 0) {
        document.getElementById('message').textContent = '🚀 Tomorrow is the big day!';
    } else if (days === 1) {
        document.getElementById('message').textContent = '📅 Just 1 day to go!';
    } else {
        document.getElementById('message').textContent = '';
    }
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);
