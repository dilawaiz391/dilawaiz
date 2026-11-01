// Mobile navigation
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Reveal sections as they enter the viewport
const revealTargets = document.querySelectorAll(
  '.section-label, .section-heading, .intro-text, .stats-row, .skill-card, .tool-card, .value-card, .approach-card, .approach-note, .tool-note, .project-card, .timeline-item, .contact-inner > *'
);
revealTargets.forEach(element => element.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      element.classList.add('in-view');
      observer.unobserve(element);
      // Once revealed, drop the reveal classes so card hover effects work normally
      setTimeout(() => element.classList.remove('reveal', 'in-view'), 1000);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(element => revealObserver.observe(element));

// Back-to-top button
const backTop = document.querySelector('.back-top');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 500);
});
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Subtle pointer glow (disabled on touch devices)
const glow = document.querySelector('.cursor-glow');
if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', event => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}

// Dynamic copyright year
document.querySelector('#year').textContent = new Date().getFullYear();

// Contact form (opens the visitor's email app with the message pre-filled)
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const CONTACT_EMAIL = 'your.email@example.com'; // <- change to your real email
  const formNote = document.querySelector('#form-note');
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    const data = new FormData(contactForm);
    const subject = `Portfolio message from ${data.get('name')}`;
    const body = `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    formNote.textContent = `Opening your email app… if nothing opens, email me directly at ${CONTACT_EMAIL}.`;
  });
}
