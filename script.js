// Default countdown date - set to 30 days from now
let targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 30);

// Load saved date from localStorage if available
const savedDate = localStorage.getItem('pragueCountdownDate');
if (savedDate) {
    targetDate = new Date(savedDate);
}

// Set the input field to the current target date
document.getElementById('target-date').value = formatDateForInput(targetDate);

function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function setCountdown() {
    const inputDate = document.getElementById('target-date').value;
    if (inputDate) {
        targetDate = new Date(inputDate);
        localStorage.setItem('pragueCountdownDate', targetDate.toISOString());
        updateCountdown();
    }
}

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
