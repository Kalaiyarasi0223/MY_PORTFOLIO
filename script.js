const menu = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');

if (menu) {
  menu.addEventListener('click', () => navLinks.classList.toggle('open'));
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* Simple cursor indicator — follows the pointer without any glow */
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);

window.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
  document.body.classList.add('cursor-active');
});

window.addEventListener('mouseleave', () => {
  document.body.classList.remove('cursor-active');
});

/* Small 3D movement when the mouse is over the profile card */
const heroCard = document.querySelector('.hero-card');
if (heroCard && window.matchMedia('(pointer:fine)').matches) {
  heroCard.addEventListener('mousemove', (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroCard.style.transform =
      `perspective(900px) rotateY(${x * 7}deg) rotateX(${y * -7}deg) translateY(-3px)`;
  });

  heroCard.addEventListener('mouseleave', () => {
    heroCard.style.transform = '';
  });
}

/* Scroll reveal */
const revealItems = document.querySelectorAll(
  '.section, .project, .skill-card, .stats div, .timeline-item, .contact-box'
);
revealItems.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(el => observer.observe(el));
