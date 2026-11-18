// Barra superior, menú en celular, sección activa y apariciones con rebote
import { $, $$, onFrame } from './utils.js';

export function initPage() {
  const bar = $('topbar'), menu = $('menu'), burger = $('burger');
  onFrame(() => bar.classList.toggle('scrolled', scrollY > 30));

  const setOpen = (o) => { menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Cerrar menú' : 'Abrir menú'); };
  burger.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

  const links = new Map($$('a[href^="#"]', menu).map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { links.forEach((a) => a.classList.remove('active')); links.get(en.target.id)?.classList.add('active'); }
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });

  // Apariciones: se miden en cada cuadro de scroll
  document.documentElement.classList.add('js');
  let pending = $$('.pop-in');
  onFrame(() => {
    if (!pending.length) return;
    pending = pending.filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.9 && r.bottom > 0) { el.classList.add('in'); return false; }
      return true;
    });
  });
}
