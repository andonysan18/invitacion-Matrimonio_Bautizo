// Efectos de scroll: barra de avance, apariciones, texto que se ilumina, menú y sección activa
import { $, $$, onFrame, clamp } from './utils.js';

function progressBar() {
  const bar = $('progress');
  onFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  });
}

function reveals() {
  // Se mide la posición en cada cuadro (un elemento recortado con clip-path no cuenta como visible para IntersectionObserver)
  document.documentElement.classList.add('js');
  let pending = $$('[data-reveal]');
  pending.forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 0.08}s`; });
  onFrame(() => {
    if (!pending.length) return;
    const limit = innerHeight * 0.9;
    pending = pending.filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < limit && r.bottom > 0) { el.classList.add('in'); return false; }
      return true;
    });
  });
}

function words() {
  const box = $('words');
  const list = box.textContent.trim().split(/\s+/);
  box.textContent = '';
  const spans = list.map((w, i) => {
    const s = document.createElement('span'); s.className = 'w'; s.textContent = w;
    box.appendChild(s); if (i < list.length - 1) box.appendChild(document.createTextNode(' '));
    return s;
  });
  onFrame(() => {
    const r = box.getBoundingClientRect();
    const p = clamp((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35));
    const n = Math.round(p * spans.length);
    spans.forEach((s, i) => s.classList.toggle('on', i < n));
  });
}

function nav() {
  const navEl = $('nav'), links = $('navLinks'), btn = $('menuBtn');
  let last = 0;
  onFrame(() => {
    const y = scrollY;
    navEl.classList.toggle('scrolled', y > 40);
    navEl.classList.toggle('hide', y > last + 4 && y > innerHeight && !links.classList.contains('open'));
    if (y < last - 4) navEl.classList.remove('hide');
    last = y;
  });
  const setOpen = (o) => { links.classList.toggle('open', o); btn.setAttribute('aria-expanded', o); btn.setAttribute('aria-label', o ? 'Cerrar menú' : 'Abrir menú'); document.body.style.overflow = o ? 'hidden' : ''; };
  btn.addEventListener('click', () => setOpen(!links.classList.contains('open')));
  links.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

  const map = new Map($$('a', links).map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { map.forEach((a) => a.classList.remove('active')); map.get(en.target.id)?.classList.add('active'); }
  }), { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}

export function initScrollFx() {
  progressBar();
  reveals();
  words();
  nav();
}
