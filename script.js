// Year stamp (footer)
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll reveal: fade elements in as they enter the viewport
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in-view'));
}

// Hamburger / overlay menu
const menuToggle = document.getElementById('menuToggle');
const overlay = document.getElementById('overlayMenu');

function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  if (menuToggle) menuToggle.setAttribute('aria-expanded', String(open));
  if (overlay) overlay.setAttribute('aria-hidden', String(!open));
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    setMenu(!document.body.classList.contains('menu-open'));
  });
}

if (overlay) {
  overlay.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setMenu(false));
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
    setMenu(false);
  }
});

// Contact form (only on contact page)
const form = document.getElementById('contactForm');
if (form) {
  const note = document.getElementById('formNote');
  const showNote = (text, type) => {
    if (!note) return;
    note.textContent = text;
    note.className = `form-note ${type}`;
    note.hidden = false;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const business = (data.get('business') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    if (!name || !email || !message) {
      showNote('Please fill in your name, email, and message.', 'error');
      return;
    }

    const subject = encodeURIComponent(`New project inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nBusiness: ${business || 'N/A'}\n\n${message}`
    );
    window.location.href = `mailto:ian12baker@gmail.com?subject=${subject}&body=${body}`;
    showNote("Opening your email app… If nothing happens, email ian12baker@gmail.com directly.", 'success');
    form.reset();
  });
}
