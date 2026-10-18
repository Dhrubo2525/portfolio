/* Dhrubo portfolio interactions — no library required. */
(() => {
  'use strict';

  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const rotatingRole = document.getElementById('rotatingRole');
  const projectFilters = Array.from(document.querySelectorAll('.filter-button'));
  const projectCards = Array.from(document.querySelectorAll('.project-card'));
  const contactForm = document.getElementById('contactForm');
  const formHint = document.getElementById('formHint');

  // Add your real email address here to make the contact form open a pre-filled email.
  // Example: const CONTACT_EMAIL = 'yourname@example.com';
  const CONTACT_EMAIL = 'dhrubo2525@gmail.com';

  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Theme preference is remembered in this browser.
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('dhrubo-portfolio-theme'); } catch (error) { /* Storage may be unavailable. */ }
  if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;

  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = nextTheme;
    themeToggle.setAttribute('aria-label', nextTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    try { localStorage.setItem('dhrubo-portfolio-theme', nextTheme); } catch (error) { /* Theme still works for this page view. */ }
  });

  // Mobile navigation opens and closes accessibly.
  function closeMenu() {
    navLinks.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  }
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    navLinks.classList.toggle('is-open', !isOpen);
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', !isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => {
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });

  // Rotate the short role line without blocking access to the rest of the page.
  const roles = ['CSE student', 'curious builder', 'lifelong learner', 'future developer'];
  let roleIndex = 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && rotatingRole) {
    window.setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      rotatingRole.classList.add('role-changing');
      window.setTimeout(() => {
        rotatingRole.textContent = roles[roleIndex];
        rotatingRole.classList.remove('role-changing');
      }, 180);
    }, 2700);
  }

  // Filter project cards by their data-category.
  projectFilters.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      projectFilters.forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      projectCards.forEach(card => {
        card.hidden = filter !== 'all' && card.dataset.category !== filter;
      });
    });
  });
  projectFilters.forEach(button => button.setAttribute('aria-pressed', String(button.classList.contains('is-active'))));

  // Reveal sections as they enter the viewport; keep content visible for reduced-motion users.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Static HTML has no server, so submit opens the visitor's email app (mailto).
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    if (CONTACT_EMAIL === '' || !CONTACT_EMAIL.includes('@')) {
      formHint.textContent = 'The form is ready, but you need to add your real email in script.js (CONTACT_EMAIL) before messages can be sent.';
      formHint.classList.add('form-hint-warning');
      return;
    }

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const senderEmail = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Hi Dhrubo,\n\n${message}\n\nFrom: ${name}\nReply to: ${senderEmail}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    formHint.textContent = 'Your email app should open with the message prepared. Send it from there to complete delivery.';
    formHint.classList.remove('form-hint-warning');
  });
})();
