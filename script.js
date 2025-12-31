document.addEventListener('DOMContentLoaded', () => {
    const navSlide = () => {
        const burger = document.querySelector('.hamburger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        if (!burger) return;

        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            // Add checking for spans to avoid error if structure changes
            const spans = burger.querySelectorAll('span');
            if (spans.length === 3) {
                spans[0].classList.toggle('line1');
                spans[1].classList.toggle('line2');
                spans[2].classList.toggle('line3');
            }
            burger.classList.toggle('toggle');
        });
    }

    navSlide();

    // Scroll Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Initial fade-in elements
    // We can also target other elements we want to animate on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .about-text, .about-image, .tutorial-card');

    animatedElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Handle scroll-triggered class to override initial styles
    // This part is a bit tricky with inline styles, so let's add a stylesheet rule dynamically or just rely on class addition
    // Better yet, let's just use the class

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .in-view {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});
