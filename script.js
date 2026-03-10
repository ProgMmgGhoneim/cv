// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            const navbar = document.querySelector('.main-nav');
            const navHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: 'smooth'
            });
            
            // Close mobile menu
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPosition = window.pageYOffset;
    const navbar = document.querySelector('.main-nav');
    const navHeight = navbar ? navbar.offsetHeight : 0;
    const offset = navHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition + offset >= sectionTop && scrollPosition + offset < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Throttle scroll event for better performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveNav();
            ticking = false;
        });
        ticking = true;
    }
});

// Animate Counters
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-revealed');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate counters
            if (entry.target.classList.contains('about-section')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    animateCounter(counter, target);
                });
            }
            
        }
    });
}, observerOptions);

// Observe sections (exclude hero section from initial opacity)
// On mobile, keep all sections visible to avoid content not showing (e.g. Resume/Experience)
var isMobile = window.innerWidth <= 768;
sections.forEach(section => {
    if (!section.classList.contains('hero-section')) {
        if (!isMobile) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        } else {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    }
    observer.observe(section);
});


// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const subject = contactForm.querySelector('input[name="subject"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;
        
        const mailtoSubject = encodeURIComponent('CV Website – ' + (subject || 'Contact'));
        const mailtoBody = encodeURIComponent(
            (message || '') + '\n\n--\n' + name + '\n' + email
        );
        const mailtoUrl = 'mailto:progmmgghoneim@gmail.com?subject=' + mailtoSubject + '&body=' + mailtoBody;
        window.location.href = mailtoUrl;
        
        setTimeout(function() {
            alert('Thank you, ' + name + '! Your email client should open. I\'ll get back to you at ' + email + ' soon.');
            contactForm.reset();
        }, 300);
    });
}

// Navbar Background on Scroll (theme-aware via CSS variables)
const navbar = document.querySelector('.main-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    
    if (currentScroll > 100) {
        navbar.style.background = isLight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = isLight ? '0 10px 40px rgba(0, 0, 0, 0.08)' : '0 10px 40px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(10, 10, 10, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Parallax Effect for Hero Section (disabled to prevent scroll conflicts)
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero-section');
//     if (hero && scrolled < window.innerHeight) {
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });

// Theme Toggle (Light / Dark)
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme, themeIcon);
            // Reset nav inline styles so CSS variables apply
            const nav = document.querySelector('.main-nav');
            if (nav) {
                nav.style.background = '';
                nav.style.boxShadow = '';
            }
        });
    }
}

function updateThemeIcon(theme, icon) {
    if (icon) {
        if (theme === 'light') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();

    // Show hero section immediately
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }

    // Initialize active nav on page load
    updateActiveNav();
    
    // Handle hash in URL (for direct links to sections)
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const navbar = document.querySelector('.main-nav');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
    
    
    // Add hover effect to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Handle Window Resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
});

// Add typing effect to hero name (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Uncomment to enable typing effect
// const heroName = document.querySelector('.hero-name .name-line:last-child');
// if (heroName) {
//     const originalText = heroName.textContent;
//     setTimeout(() => {
//         typeWriter(heroName, originalText, 150);
//     }, 1000);
// }
