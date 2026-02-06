// Current scene tracker
let currentScene = 0;
let musicPlaying = false;

// Unlock and start music
function unlockSite() {
    const music = document.getElementById('bgMusic');
    music.play().catch(e => console.log('Music autoplay blocked'));
    musicPlaying = true;
    nextScene(1);
    createFloatingHearts();
}

// Scene navigation
function nextScene(n) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    const scene = document.getElementById('scene' + n);
    if (scene) {
        scene.classList.add('active');
        currentScene = n;

        // Initialize scene-specific features
        if (n === 5) {
            initCountdown();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Floating Hearts Background
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');

    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = ['💕', '💖', '💗', '💝', '💘'][Math.floor(Math.random() * 5)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.bottom = '-50px';
        heart.style.fontSize = (20 + Math.random() * 30) + 'px';
        heart.style.opacity = '0.6';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '2';
        heart.style.animation = `floatUp ${5 + Math.random() * 3}s linear forwards`;

        container.appendChild(heart);

        setTimeout(() => heart.remove(), 8000);
    }, 1500);
}

// Add float up animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatStyle);

// Rose watering
function waterRose() {
    const rose = document.getElementById('rose');
    const waterBtn = document.getElementById('waterBtn');
    const bloomText = document.getElementById('bloomText');
    const continueBtn = document.getElementById('continueBtn');

    if (rose && !rose.classList.contains('bloomed')) {
        rose.classList.add('bloomed');

        if (waterBtn) waterBtn.style.display = 'none';

        // Create sparkles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createSparkle(rose);
            }, i * 100);
        }

        setTimeout(() => {
            if (bloomText) bloomText.style.display = 'block';
            if (continueBtn) continueBtn.style.display = 'inline-block';
        }, 1500);
    }
}

function createSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = element.getBoundingClientRect().left + Math.random() * 200 + 'px';
    sparkle.style.top = element.getBoundingClientRect().top + Math.random() * 300 + 'px';
    sparkle.style.fontSize = '20px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkleAnim 1s ease-out forwards';
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1000);
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnim {
        0% {
            transform: scale(0) translateY(0);
            opacity: 1;
        }
        100% {
            transform: scale(1.5) translateY(-80px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Love Letters
let openedLetters = new Set();

function openLetter(n) {
    const card = document.querySelectorAll('.letter-card')[n - 1];
    if (card && !openedLetters.has(n)) {
        card.classList.add('flipped');
        openedLetters.add(n);

        // Create heart explosion
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = '💕';
                heart.style.position = 'fixed';
                heart.style.left = card.getBoundingClientRect().left + Math.random() * 200 + 'px';
                heart.style.top = card.getBoundingClientRect().top + Math.random() * 250 + 'px';
                heart.style.fontSize = '25px';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '1000';
                heart.style.animation = 'heartPop 1.5s ease-out forwards';
                document.body.appendChild(heart);

                setTimeout(() => heart.remove(), 1500);
            }, i * 50);
        }
    }
}

const heartPopStyle = document.createElement('style');
heartPopStyle.textContent = `
    @keyframes heartPop {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(2) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartPopStyle);

// Countdown Timer
let countdownInterval;

function initCountdown() {
    if (countdownInterval) clearInterval(countdownInterval);

    // Set target date (30 days from now - you can change this)
    const now = new Date();
    const targetDate = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));

    countdownInterval = setInterval(() => {
        const now = new Date();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            updateCountdown(0, 0, 0, 0);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        updateCountdown(days, hours, minutes, seconds);
    }, 1000);
}

function updateCountdown(days, hours, minutes, seconds) {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

// Gift Box
function openGift() {
    const giftBox = document.getElementById('giftBox');
    const giftBoxContainer = document.getElementById('giftBoxContainer');
    const giftReveal = document.getElementById('giftReveal');

    if (giftBox && !giftBox.classList.contains('opened')) {
        giftBox.classList.add('opened');

        setTimeout(() => {
            if (giftBoxContainer) giftBoxContainer.style.display = 'none';
            if (giftReveal) {
                giftReveal.classList.add('show');
                createRosePetals();
            }
        }, 1000);
    }
}

function createRosePetals() {
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.textContent = ['🌹', '🌺', '🌸', '💐'][Math.floor(Math.random() * 4)];
            petal.style.position = 'fixed';
            petal.style.left = Math.random() * window.innerWidth + 'px';
            petal.style.top = '-50px';
            petal.style.fontSize = (25 + Math.random() * 35) + 'px';
            petal.style.opacity = '0.9';
            petal.style.pointerEvents = 'none';
            petal.style.zIndex = '1000';
            petal.style.animation = `petalFall ${3 + Math.random() * 2}s linear forwards`;
            document.body.appendChild(petal);

            setTimeout(() => petal.remove(), 6000);
        }, i * 80);
    }
}

const petalStyle = document.createElement('style');
petalStyle.textContent = `
    @keyframes petalFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.9;
        }
        100% {
            transform: translateY(${window.innerHeight + 100}px) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(petalStyle);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentScene < 8) {
        nextScene(currentScene + 1);
    } else if (e.key === 'ArrowLeft' && currentScene > 0) {
        nextScene(currentScene - 1);
    }
});

// Music toggle on click (if autoplay blocked)
document.addEventListener('click', () => {
    const music = document.getElementById('bgMusic');
    if (!musicPlaying && currentScene > 0) {
        music.play().catch(e => console.log('Music blocked'));
        musicPlaying = true;
    }
}, { once: true });

// Console message
console.log('%c❤️ Made with infinite love for Komal ❤️', 'font-size: 24px; color: #ff69b4; font-weight: bold; text-shadow: 0 0 10px rgba(255, 105, 180, 1);');
console.log('%cHappy Rose Day! 🌹', 'font-size: 18px; color: #ff1493;');
console.log('%cDistance sirf map pe hota hai… dil mein nahi. ❤️', 'font-size: 14px; color: #ffb6c1;');
