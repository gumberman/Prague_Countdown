// Fixed countdown date: March 5th, 2026 at 9:55 AM Israel Time (UTC+2)
// Using ISO 8601 format with timezone offset
const targetDate = new Date('2026-03-05T09:55:00+02:00');

// Store previous values for animation
let previousValues = { days: 0, hours: 0, minutes: 0, seconds: 0 };

// Animate number changes
function animateValue(element, start, end, duration = 300) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
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

    // Animate number changes
    if (previousValues.days !== days) {
        animateValue(document.getElementById('days'), previousValues.days, days);
        previousValues.days = days;
    }
    if (previousValues.hours !== hours) {
        animateValue(document.getElementById('hours'), previousValues.hours, hours);
        previousValues.hours = hours;
    }
    if (previousValues.minutes !== minutes) {
        animateValue(document.getElementById('minutes'), previousValues.minutes, minutes);
        previousValues.minutes = minutes;
    }
    if (previousValues.seconds !== seconds) {
        animateValue(document.getElementById('seconds'), previousValues.seconds, seconds, 200);
        previousValues.seconds = seconds;
    }

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

// ===== CURSOR GLOW EFFECT =====
function initCursorGlow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Track mouse/touch position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    });

    // Smooth animation loop
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// ===== FLOATING PARTICLES =====
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);

    const particleCount = window.innerWidth < 768 ? 15 : 25;
    const particles = [];

    class Particle {
        constructor() {
            this.element = document.createElement('div');
            this.element.className = 'particle';
            this.reset();
            particlesContainer.appendChild(this.element);
        }

        reset() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;

            this.element.style.width = this.size + 'px';
            this.element.style.height = this.size + 'px';
            this.element.style.opacity = this.opacity;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Wrap around screen
            if (this.x < 0) this.x = window.innerWidth;
            if (this.x > window.innerWidth) this.x = 0;
            if (this.y < 0) this.y = window.innerHeight;
            if (this.y > window.innerHeight) this.y = 0;

            this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    function animateParticles() {
        particles.forEach(particle => particle.update());
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initParticles();
});

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);
