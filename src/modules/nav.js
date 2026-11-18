// Menú fijo: fondo al hacer scroll, sección activa y menú en celular
import { $, $$ } from './utils.js';

export function initNav() {
  const nav = $('nav'), links = $('links'), burger = $('burger');

  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 20);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  const setOpen = (open) => {
    links.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  burger.addEventListener('click', () => setOpen(!links.classList.contains('open')));
  links.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

  // Marca en el menú la sección que se está viendo
  const map = new Map($$('a[href^="#"]', links).map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      map.forEach((a) => a.classList.remove('active'));
      map.get(en.target.id)?.classList.add('active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}
