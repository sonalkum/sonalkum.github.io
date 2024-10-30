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