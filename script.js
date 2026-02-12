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

        // Change text to Hebrew "Enjoy!"
        const targetDateDisplay = document.querySelector('.target-date-display p');
        if (targetDateDisplay) {
            targetDateDisplay.textContent = 'תהנו!';
        }

        // Position airplane at beer glass
        updateAirplanePosition(0);
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

    // Update airplane position based on time remaining
    updateAirplanePosition(distance);
}

// ===== AIRPLANE JOURNEY ANIMATION =====
let pathDots = [];

function createPathDots() {
    const pathDotsContainer = document.getElementById('pathDots');
    if (!pathDotsContainer) return;

    const numDots = 30; // Number of dots along the path
    pathDots = [];

    for (let i = 0; i <= numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'path-dot not-traveled';

        const progress = i / numDots;

        // Calculate position along arc (same formula as airplane)
        const startX = 10;
        const endX = 90;
        const xPosition = startX + (endX - startX) * progress;

        const arcHeight = 60;
        const yPosition = -Math.sin(progress * Math.PI) * arcHeight;

        dot.style.left = xPosition + '%';
        dot.style.top = `calc(50% + ${yPosition}px)`;
        dot.style.transform = 'translate(-50%, -50%)';

        pathDotsContainer.appendChild(dot);
        pathDots.push({ element: dot, progress: progress });
    }
}

function updateAirplanePosition(distance) {
    const airplane = document.getElementById('airplane');
    if (!airplane) return;

    // Convert distance to total seconds remaining
    const totalSecondsRemaining = Math.max(0, distance / 1000);

    // Maximum is 30 days (in seconds)
    const maxSeconds = 30 * 24 * 60 * 60;

    // Calculate progress (0 = at start, 1 = at destination)
    let progress = 1 - (totalSecondsRemaining / maxSeconds);
    progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1

    // Calculate position along arc
    // Start at 10% from left, end at 90% (where beer is)
    const startX = 10;
    const endX = 90;
    const xPosition = startX + (endX - startX) * progress;

    // Create arc: highest at middle of journey
    // Arc height: 60px at peak (middle of journey)
    const arcHeight = 60;
    const yPosition = -Math.sin(progress * Math.PI) * arcHeight;

    airplane.style.left = xPosition + '%';
    airplane.style.top = `calc(50% + ${yPosition}px)`;

    // Rotate airplane slightly based on arc slope
    const rotation = Math.cos(progress * Math.PI) * 15;
    airplane.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

    // Update dot colors based on airplane position
    pathDots.forEach(dot => {
        if (dot.progress <= progress) {
            dot.element.className = 'path-dot traveled';
        } else {
            dot.element.className = 'path-dot not-traveled';
        }
    });
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
    createPathDots();
});

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);
