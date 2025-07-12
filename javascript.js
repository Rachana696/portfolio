// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load theme preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Optional: Smooth scroll for anchor links
const links = document.querySelectorAll('a[href^="#"]');
for (const link of links) {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Skills Tabs Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));
        // Add active to clicked
        this.classList.add('active');
        const tab = this.getAttribute('data-tab');
        document.querySelector('.tab-' + tab).classList.add('active');
    });
});

// Scroll Glow Progress Bar
const scrollGlowBar = document.getElementById('scroll-glow-bar');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollGlowBar.style.width = percent + '%';
});

// Glow-in-view for cards/sections
const glowTargets = [
    ...document.querySelectorAll('.edu-card'),
    ...document.querySelectorAll('.skills-list > div'),
    ...document.querySelectorAll('.tab-content'),
];
const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('glow-in-view');
            setTimeout(() => entry.target.classList.remove('glow-in-view'), 1100);
        }
    });
}, { threshold: 0.3 });
glowTargets.forEach(el => observer.observe(el));

// Cartoon stars for cartoon galaxy theme
function randomStarColor() {
    const colors = ['yellow', '#7ecfff', '#ff4fff', '#fff', '#a259f7'];
    return colors[Math.floor(Math.random() * colors.length)];
}
// Add gradient overlay
(function(){
    const overlay = document.createElement('div');
    overlay.className = 'bg-gradient-overlay';
    document.body.appendChild(overlay);
})();

function createCartoonStars(num) {
    const bg = document.querySelector('.sparkle-bg');
    for (let i = 0; i < num; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 16 + 12;
        star.className = 'cartoon-star star-glow' + (Math.random() < 0.2 ? ' plus-star' : '');
        star.style.top = Math.random() * 90 + 'vh';
        star.style.left = Math.random() * 98 + 'vw';
        star.style.background = randomStarColor();
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        bg.appendChild(star);
    }
}

// Streak stars
function createStreakStar() {
    const bg = document.querySelector('.sparkle-bg');
    const streak = document.createElement('div');
    streak.className = 'streak-star';
    streak.style.top = (Math.random() * 90) + 'vh';
    streak.style.left = (Math.random() * 60 - 10) + 'vw';
    bg.appendChild(streak);
    streak.addEventListener('animationend', () => streak.remove());
}
setInterval(() => {
    if (Math.random() < 0.5) createStreakStar();
}, 3500);

// Little sparkles for cartoon galaxy theme
function createLittleSparkles(num) {
    const bg = document.querySelector('.sparkle-bg');
    for (let i = 0; i < num; i++) {
        const dot = document.createElement('div');
        dot.className = 'sparkle-dot' + (i % 2 === 1 ? ' blue' : '');
        dot.style.top = Math.random() * 95 + 'vh';
        dot.style.left = Math.random() * 98 + 'vw';
        dot.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        bg.appendChild(dot);
    }
}
createLittleSparkles(36);

// Planet Fun Fact Popup
function showPlanetFact(fact) {
    // Remove any existing popup
    const old = document.querySelector('.planet-fact-popup');
    if (old) old.remove();
    // Create popup
    const popup = document.createElement('div');
    popup.className = 'planet-fact-popup';
    popup.innerHTML = `<div>${fact}</div><button>Close</button>`;
    document.body.appendChild(popup);
    // Close logic
    popup.querySelector('button').onclick = () => popup.remove();
    document.addEventListener('keydown', function esc(e) {
        if (e.key === 'Escape') {
            popup.remove();
            document.removeEventListener('keydown', esc);
        }
    });
}
document.querySelectorAll('.planet').forEach(planet => {
    planet.addEventListener('click', e => {
        e.stopPropagation();
        showPlanetFact(planet.getAttribute('data-fact'));
    });
    planet.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            showPlanetFact(planet.getAttribute('data-fact'));
        }
    });
});

document.body.addEventListener('click', e => {
    const popup = document.querySelector('.planet-fact-popup');
    if (popup && !popup.contains(e.target)) popup.remove();
}); 