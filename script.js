/* ============================================================
   MEVONLABS — SCRIPT.JS
   Navbar scroll, hamburger, FAQ accordion, scroll reveal,
   WhatsApp float visibility, GA4 events
   ============================================================ */

(function () {
  'use strict';

  // --- DOM REFS ---
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  const whatsappFloat = document.getElementById('whatsappFloat');
  const heroSection = document.getElementById('hero');
  const faqItems = document.querySelectorAll('.faq-item');
  const revealElements = document.querySelectorAll('.reveal');

  // --- 1. NAVBAR SCROLL EFFECT ---
  let lastScrollY = 0;
  const onScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // --- 2. HAMBURGER MENU ---
  const openMenu = () => {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('active');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navOverlay.addEventListener('click', closeMenu);

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        closeMenu();
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      closeMenu();
      hamburger.focus();
    }
  });

  // --- 3. SMOOTH SCROLL WITH OFFSET ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- 4. FAQ ACCORDION ---
  faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(faqItem => {
        faqItem.classList.remove('active');
        faqItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if it wasn't already open)
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');

        // GA4 event
        trackEvent('faq_open', { question: 'q' + (index + 1) });
      }
    });
  });

  // --- 5. SCROLL REVEAL ---
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show everything
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // --- 6. WHATSAPP FLOAT VISIBILITY ---
  if (heroSection && whatsappFloat) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          whatsappFloat.classList.remove('visible');
        } else {
          whatsappFloat.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });

    heroObserver.observe(heroSection);
  }

  // --- 7. GA4 EVENT TRACKING ---
  function trackEvent(eventName, params) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  }

  // Track WhatsApp clicks
  document.addEventListener('click', (e) => {
    const waLink = e.target.closest('[data-wa]');
    if (waLink) {
      trackEvent('whatsapp_click', {
        location: waLink.getAttribute('data-wa')
      });
    }

    const portfolioLink = e.target.closest('[data-portfolio]');
    if (portfolioLink) {
      trackEvent('portfolio_click', {
        site: portfolioLink.getAttribute('data-portfolio')
      });
    }
  });

})();
