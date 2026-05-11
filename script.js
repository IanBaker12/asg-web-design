document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

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
    `Name: ${name}\nEmail: ${email}\nBusiness: ${business || '—'}\n\n${message}`
  );
  window.location.href = `mailto:ian12baker@gmail.com?subject=${subject}&body=${body}`;

  showNote("Opening your email app… If nothing happens, email ian12baker@gmail.com directly.", 'success');
  form.reset();
});

function showNote(text, type) {
  note.textContent = text;
  note.className = `form-note ${type}`;
  note.hidden = false;
}
