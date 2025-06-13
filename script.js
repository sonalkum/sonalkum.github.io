// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // e.preventDefault();
        let target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Scroll Indicator Animation
window.addEventListener('scroll', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (window.scrollY > 100) {
        scrollIndicator.style.display = 'none';
    } else {
        scrollIndicator.style.display = 'block';
    }
});

// Optional: Add animations when elements come into the viewport
const sections = document.querySelectorAll('.project-section');

const options = {
    root: null,
    threshold: 0.1,
};

const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
};

const observer = new IntersectionObserver(revealSection, options);

sections.forEach(section => {
    observer.observe(section);
    section.classList.add('hidden');
});

// Animated Typing Text
const typedText = document.querySelector('.animated-text');
const textArray = [
    "Started my summer research internship with Adobe.",
    "Audio Flamingo 2 got accepted at ICML 2025."
];
const typingDelay = 100; // Delay between each character (milliseconds)
const erasingDelay = 50; // Delay between each character when erasing
const newTextDelay = 2000; // Delay between current and next text (milliseconds)
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedText.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 500);
    }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
    if(textArray.length) setTimeout(type, newTextDelay + 250);
});
