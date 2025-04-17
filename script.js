// script.js
// ────────────────────────────────────────────────────────────────────────────────
// Load Supabase as an ES module
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// ─── Supabase Configuration ────────────────────────────────────────────────────
const supabaseUrl = 'https://xirmvfisugusybcktlqf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhpcm12ZmlzdWd1c3liY2t0bHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwODA4MjAsImV4cCI6MjA1OTY1NjgyMH0.TtTyRVAR1olHUM3Yf5o0OOlps_9bF2uJY_Vnk0VLrbY';
const supabase    = createClient(supabaseUrl, supabaseKey);

// ─── MAIN ENTRY ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // ─── DOM ELEMENTS ─────────────────────────────────────────────────────────────
  const header        = document.querySelector('header');
  const menuToggle    = document.querySelector('.menu-toggle');
  const nav           = document.querySelector('nav');
  const contactForm   = document.getElementById('contactForm');
  const modal         = document.getElementById('quoteModal');
  const closeButton   = document.querySelector('.close-button');
  const serviceCards  = document.querySelectorAll('.service-card');
  const cursorFollower= document.querySelector('.cursor-follower');
  const cursorTrail   = document.querySelector('.cursor-trail');

  // ─── CURSOR EFFECTS ────────────────────────────────────────────────────────────
  document.addEventListener('mousemove', e => {
    if (window.innerWidth > 768 && cursorFollower) {
      cursorFollower.style.left = `${e.clientX}px`;
      cursorFollower.style.top  = `${e.clientY}px`;
    }
    if (window.innerWidth > 768 && cursorTrail) {
      const moveX = (e.clientX/window.innerWidth - 0.5)*20;
      const moveY = (e.clientY/window.innerHeight - 0.5)*20;
      cursorTrail.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  });

  const hoverTargets = document.querySelectorAll('a, button, .service-card, .logo, .nav-link, input, textarea');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
    });
    el.addEventListener('mouseleave', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });

  // ─── HEADER SCROLL ─────────────────────────────────────────────────────────────
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ─── MOBILE MENU TOGGLE ───────────────────────────────────────────────────────
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
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
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();  // stop GET/navigation

    const formData = {
      name:         document.getElementById('name').value,
      email:        document.getElementById('email').value,
      phone:        document.getElementById('phone').value,
      requirements: document.getElementById('requirements').value,
    };

    try {
      const { error } = await supabase.from('inquiries').insert([formData]);
      if (error) throw error;

      contactForm.reset();
      modal.style.display = 'block';
    } catch (err) {
      console.error('Submission error:', err);
      alert('Oops! Something went wrong.');
    }
  });

  // ─── MODAL HANDLING ─────────────────────────────────────────────────────────────
  closeButton.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // ─── ANIMATIONS HELPERS ────────────────────────────────────────────────────────
  function animateServiceCards() {
    serviceCards.forEach((card, i) => {
      card.style.animationDelay = `${i * 0.1}s`;
    });
  }

  function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
      const target = +counter.textContent.replace(/\D/g,'');
      let count = 0;
      const step = () => {
        count += Math.ceil(target/200);
        if (count < target) {
          counter.textContent = `${count}${counter.textContent.includes('+')?'+':''}`;
          requestAnimationFrame(step);
        } else {
          counter.textContent = counter.textContent; 
        }
      };
      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          step();
          obs.disconnect();
        }
      }, { threshold: 0.5 });
      obs.observe(counter);
    });
  }

  function setupScrollReveal() {
    document.querySelectorAll('.section-header, .service-card, .about-grid-item, .stat, .contact-form').forEach(el => {
      new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          el.classList.add('reveal');
          this.disconnect();
        }
      }, { threshold: 0.1 }).observe(el);
    });
  }

  // ─── INITIALIZE EVERYTHING ─────────────────────────────────────────────────────
  animateServiceCards();
  animateCounters();
  setupScrollReveal();
  // (and any other init functions you have: initParallax, initGlitchEffect, etc.)

  // Fade‑in page
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = 'opacity 1s ease';
    document.body.style.opacity = 1;
  }, 100);
});