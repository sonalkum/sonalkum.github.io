// =============================================
// Theme Toggle (Light / Dark)
// =============================================
(function () {
    // Apply saved theme immediately before paint to avoid flash
    const saved = localStorage.getItem('theme') || 'light';
    if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');
})();

function applyTheme(theme) {
    const icon = document.getElementById('theme-icon');
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (icon) { icon.className = 'fas fa-moon'; }
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (icon) { icon.className = 'fas fa-sun'; }
    }
    localStorage.setItem('theme', theme);
}

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('theme') || 'dark';
    // Sync icon to current theme on load
    applyTheme(saved);

    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        applyTheme(current === 'light' ? 'dark' : 'light');
    });
});

// =============================================
// Publication Card Toggle
// =============================================
function togglePub(id) {
    const card = document.getElementById(id);
    if (!card) return;
    card.classList.toggle('open');
}

// =============================================
// Organising Card Toggle
// =============================================
function toggleOrg(id) {
    const card = document.getElementById(id);
    if (!card) return;
    card.classList.toggle('open');
}

// =============================================
// Smooth Scroll + Mobile Menu Close
// =============================================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetEl = document.getElementById(href.substring(1));
            if (targetEl) {
                const headerH = document.getElementById('main-header').offsetHeight;
                const top = targetEl.getBoundingClientRect().top + window.scrollY - headerH;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }
        const toggle = document.getElementById('nav-toggle');
        if (toggle) toggle.checked = false;
    });
});

// Logo also scrolls to top
document.querySelector('.logo a')?.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('nav-toggle').checked = false;
});

// =============================================
// Scroll Spy
// =============================================
const spySections = ['about', 'publications', 'service', 'news', 'resume'];

function updateActiveNav() {
    const headerH = (document.getElementById('main-header')?.offsetHeight || 64) + 80;
    const scrollPos = window.scrollY + headerH;
    let current = 'about';

    for (const id of spySections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) current = id;
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-section') === current);
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('load', updateActiveNav);

// =============================================
// Typing Animation
// =============================================
const typedEl = document.querySelector('.animated-text');

// Each phrase can have an optional href to make the text clickable when fully typed.
const phrases = [
    { text: "Check out my latest work: TAC (click here)", href: "https://sonalkum.github.io/tacmodel" },
    { text: "MMAU eval has moved to HuggingFace 🤗 (click here)", href: "https://huggingface.co/spaces/sonalkum/MMAU-Eval" },
    { text: "Started my Internship at Google 🎉" },
];

const TYPING_MS = 60;
const ERASE_MS = 30;
const PAUSE_MS = 2800;

let pIdx = 0, cIdx = 0;

function getContainer() {
    // typedEl lives inside a .hero-latest span; we'll turn it into an <a> when done.
    return typedEl;
}

function setLink(phrase) {
    if (!phrase.href || !typedEl) return;
    typedEl.style.cursor = 'pointer';
    typedEl.style.textDecoration = 'underline';
    typedEl.onclick = () => window.open(phrase.href, '_blank', 'noopener');
}

function clearLink() {
    if (!typedEl) return;
    typedEl.style.cursor = '';
    typedEl.style.textDecoration = '';
    typedEl.onclick = null;
}

function typeChar() {
    if (!typedEl) return;
    const phrase = phrases[pIdx];
    if (cIdx < phrase.text.length) {
        typedEl.textContent += phrase.text[cIdx++];
        setTimeout(typeChar, TYPING_MS);
    } else {
        setLink(phrase);
        setTimeout(eraseChar, PAUSE_MS);
    }
}

function eraseChar() {
    if (!typedEl) return;
    clearLink();
    const phrase = phrases[pIdx];
    if (cIdx > 0) {
        typedEl.textContent = phrase.text.substring(0, --cIdx);
        setTimeout(eraseChar, ERASE_MS);
    } else {
        pIdx = (pIdx + 1) % phrases.length;
        setTimeout(typeChar, 400);
    }
}

// Highlight author name in all publication author lists
function highlightMyName() {
    const ME = /\b(Sonal Kumar|S Kumar)\b/g;
    document.querySelectorAll('.pub-authors').forEach(el => {
        el.innerHTML = el.innerHTML.replace(
            ME,
            '<span class="author-me">$1</span>'
        );
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (typedEl && phrases.length) setTimeout(typeChar, 1200);
    highlightMyName();
});
