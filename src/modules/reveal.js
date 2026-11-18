// Aparición suave de las secciones al hacer scroll
import { $$ } from './utils.js';

export function initReveal() {
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window)) return; // sin soporte: todo queda visible
  document.documentElement.classList.add('js');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach((el) => io.observe(el));
  // Seguridad: si algo no se activó (por ejemplo, al imprimir), mostrar todo
  setTimeout(() => items.forEach((el) => el.getBoundingClientRect().top < innerHeight && el.classList.add('in')), 1200);
}
