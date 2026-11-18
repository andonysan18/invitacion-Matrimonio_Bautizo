// Capítulos: el scroll vertical los mueve en horizontal (en celular se deslizan con el dedo)
import { $, $$, onFrame, clamp } from './utils.js';

export function initChapters() {
  const section = $('capitulos'), track = $('chapTrack'), bar = $('chapBar'), now = $('chapNow');
  const chaps = $$('.chap', track);
  const desktop = matchMedia('(min-width: 821px)');
  let dist = 0;

  // Odómetro del "26": cada columna muestra los dígitos 0–9 en vertical
  $$('.odo-col').forEach((col) => {
    const inner = col.firstElementChild;
    inner.textContent = '';
    for (let d = 0; d <= 9; d++) { const s = document.createElement('span'); s.textContent = d; inner.appendChild(s); }
  });
  const rollOdo = () => $$('.odo-col').forEach((col, i) => setTimeout(() => {
    col.firstElementChild.style.transform = `translateY(-${col.dataset.digit}em)`;
  }, i * 200));
  const resetOdo = () => $$('.odo-col').forEach((col) => { col.firstElementChild.style.transform = ''; });

  const setActive = (i) => {
    chaps.forEach((c, k) => c.classList.toggle('active', k === i));
    now.textContent = String(i + 1).padStart(2, '0');
    if (chaps[i].classList.contains('chap-date')) rollOdo();
  };

  const measure = () => {
    if (desktop.matches) {
      dist = Math.max(0, track.scrollWidth - innerWidth);
      section.style.height = `${innerHeight + dist}px`;
    } else {
      section.style.height = '';
      track.style.transform = '';
    }
  };
  measure();
  addEventListener('resize', measure);
  desktop.addEventListener('change', measure);
  addEventListener('load', measure);

  let current = -1;
  onFrame(() => {
    if (!desktop.matches) return;
    const r = section.getBoundingClientRect();
    const p = clamp(-r.top / Math.max(1, dist));
    track.style.transform = `translate3d(${-p * dist}px, 0, 0)`;
    bar.style.transform = `scaleX(${p})`;
    const i = Math.min(chaps.length - 1, Math.round(p * (chaps.length - 1)));
    if (i !== current) { current = i; setActive(i); }
    if (r.top > innerHeight) resetOdo();
  });

  // Celular: el capítulo centrado se marca como activo
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!desktop.matches && en.isIntersecting) setActive(chaps.indexOf(en.target));
  }), { root: track, threshold: 0.6 });
  chaps.forEach((c) => io.observe(c));
  track.addEventListener('scroll', () => {
    if (desktop.matches) return;
    bar.style.transform = `scaleX(${track.scrollLeft / Math.max(1, track.scrollWidth - track.clientWidth)})`;
  }, { passive: true });
}
