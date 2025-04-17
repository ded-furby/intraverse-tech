import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// ─── Supabase Configuration ────────────────────────────────────────────────────
const SUPABASE_URL = 'https://xirmvfisugusybcktlqf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhpcm12ZmlzdWd1c3liY2t0bHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwODA4MjAsImV4cCI6MjA1OTY1NjgyMH0.TtTyRVAR1olHUM3Yf5o0OOlps_9bF2uJY_Vnk0VLrbY'; 
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── DOM ELEMENTS ───────────────────────────────────────────────────────────────
const header        = document.querySelector('header');
const menuToggle    = document.querySelector('.menu-toggle');
const nav           = document.querySelector('nav');
const contactForm   = document.getElementById('contactForm');
const modal         = document.getElementById('quoteModal');
const closeButton   = document.querySelector('.close-button');
const serviceCards  = document.querySelectorAll('.service-card');
const cursorFollower= document.querySelector('.cursor-follower');
const cursorTrail   = document.querySelector('.cursor-trail');

// ─── UI & CURSOR EFFECTS ────────────────────────────────────────────────────────
// (pixelated follower, trail, hover effects, scroll header)...
// [Keep your existing implementations here]

// ─── MENU TOGGLE ───────────────────────────────────────────────────────────────
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.querySelector('i').classList.replace('fa-times','fa-bars');
  });
});

// ─── SERVICE CARD HOVER ─────────────────────────────────────────────────────────
serviceCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelector('.card-hover-content').style.transform = 'translateY(0)';
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('.card-hover-content').style.transform = 'translateY(100%)';
  });
});

// ─── FORM SUBMISSION ────────────────────────────────────────────────────────────
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name:         document.getElementById('name').value,
    email:        document.getElementById('email').value,
    phone:        document.getElementById('phone').value,
    requirements: document.getElementById('requirements').value,
  };

  try {
    const { error } = await supabase
      .from('inquiries')
      .insert([formData]);

    if (error) throw error;

    contactForm.reset();
    modal.style.display = 'block';
  } catch (err) {
    console.error('Submission error:', err);
    alert('Oops! Something went wrong. Please try again.');
  }
});

// Close the modal
closeButton.addEventListener('click',   () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

// Animation for service cards
function animateServiceCards() {
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${0.1 * index}s`;
    });
}

// Animate stats counters
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    counters.forEach(counter => {
        const target = +counter.innerText.replace(/\+/g, '').replace('%','');
        let count = 0;
        const updateCount = () => {
            const increment = Math.ceil(target / speed);
            if (count < target) {
                count += increment;
                counter.innerText = count + (counter.innerText.includes('+') ? '+' : (counter.innerText.includes('%') ? '%' : ''));
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + (counter.innerText.includes('+') ? '+' : (counter.innerText.includes('%') ? '%' : ''));
            }
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(counter);
    });
}

// Text animation for sections
function animateText() {
    const textElements = document.querySelectorAll('.section-header h2, .section-header p, .about-grid-item p, .highlight');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    textElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// Parallax effect on scroll
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        const sections = document.querySelectorAll('section');
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        sections.forEach(section => {
            const offset = section.offsetTop;
            const distance = (scrollY - offset) * 0.1;
            if (section.classList.contains('hero')) return;
            if (window.innerWidth > 768) {
                section.style.backgroundPositionY = `${distance}px`;
            }
        });
    });
}

// Enhanced About section animations
function enhanceAboutSection() {
    const aboutItems = document.querySelectorAll('.about-grid-item, .story-card');
    const stats = document.querySelectorAll('.stat');
    aboutItems.forEach((item, index) => {
        item.style.transitionDelay = `${0.1 * index}s`;
        item.addEventListener('mouseenter', () => {
            const highlight = item.querySelector('.highlight');
            if (highlight) {
                highlight.style.transform = 'scale(1.2)';
                highlight.style.transition = 'transform 0.3s ease';
            }
        });
        item.addEventListener('mouseleave', () => {
            const highlight = item.querySelector('.highlight');
            if (highlight) {
                highlight.style.transform = 'scale(1)';
            }
        });
    });
    stats.forEach(stat => {
        stat.addEventListener('mouseenter', () => {
            const counter = stat.querySelector('.counter');
            if (counter) {
                counter.style.transform = 'translateY(-5px)';
                counter.style.transition = 'transform 0.3s ease';
            }
        });
        stats.forEach(stat => {
            stat.addEventListener('mouseleave', () => {
                const counter = stat.querySelector('.counter');
                if (counter) {
                    counter.style.transform = 'translateY(0)';
                }
            });
        });
    });
}

// Glitch animation for INTRAVERSE title
function initGlitchEffect() {
    const logo = document.querySelector('.logo a');
    logo.addEventListener('mouseenter', () => {
        logo.classList.add('glitch-effect');
        setTimeout(() => {
            logo.classList.remove('glitch-effect');
        }, 1000);
    });
}

// Scroll reveal animation
function setupScrollReveal() {
    const elements = document.querySelectorAll('.section-header, .service-card, .about-grid-item, .about-stats-grid, .contact-form');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    if (supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseKey !== 'YOUR_SUPABASE_KEY') {
        initSupabase();
    }
    animateServiceCards();
    animateCounters();
    setupScrollReveal();
    animateText();
    initParallax();
    initGlitchEffect();
    enhanceAboutSection();
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});