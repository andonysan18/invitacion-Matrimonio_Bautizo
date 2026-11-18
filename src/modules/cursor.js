// Cursor personalizado y botones "magnéticos" (solo con mouse)
import { $, $$, finePointer, reduceMotion, lerp } from './utils.js';

export function initCursor() {
  if (!finePointer()) return;
  const c = $('cursor');
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
  addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; c.classList.remove('hidden'); });
  document.addEventListener('pointerleave', () => c.classList.add('hidden'));
  const tick = () => {
    cx = lerp(cx, x, 0.2); cy = lerp(cy, y, 0.2);
    c.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    requestAnimationFrame(tick);
  };
  tick();
  document.addEventListener('pointerover', (e) => {
    c.classList.toggle('hover', !!e.target.closest('a, button, .g, .place, [role="button"]'));
  });

  if (reduceMotion()) return;
  $$('.magnetic').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.3}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}
