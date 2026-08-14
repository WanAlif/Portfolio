// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
});

// Smooth scroll + close mobile menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
});

// Navbar background on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('bg-ink-950/90', window.scrollY > 20);
});

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

// Reveal-on-scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Typing effect for role
const roles = ['Fullstack Developer', 'React & Laravel Developer', 'Frontend Engineer'];
const roleElement = document.getElementById('typed-role');
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeRole() {
    const currentRole = roles[roleIndex];
    roleElement.textContent = isDeleting
        ? currentRole.substring(0, charIndex - 1)
        : currentRole.substring(0, charIndex + 1);
    charIndex += isDeleting ? -1 : 1;

    let typeSpeed = isDeleting ? 45 : 90;
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400;
    }
    setTimeout(typeRole, typeSpeed);
}
setTimeout(typeRole, 600);

// Scroll-to-top button
let scrollBtn = null;
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
        if (!scrollBtn) {
            scrollBtn = document.createElement('button');
            scrollBtn.id = 'scroll-to-top';
            scrollBtn.setAttribute('aria-label', 'Scroll to top');
            scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
            scrollBtn.className = 'fixed bottom-8 right-8 w-11 h-11 flex items-center justify-center bg-accent hover:bg-accent-dark text-white rounded-xl shadow-lg transition-colors z-50';
            scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
            document.body.appendChild(scrollBtn);
        }
    } else if (scrollBtn) {
        scrollBtn.remove();
        scrollBtn = null;
    }
});

// Footer year
document.getElementById('footer-year').innerHTML =
    `&copy; ${new Date().getFullYear()} Wan Alif Wan Norazlan. All rights reserved.`;

window.addEventListener('load', () => document.body.classList.add('loaded'));
