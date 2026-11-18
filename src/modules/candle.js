// Vela: mantener presionado para encenderla (también con teclado: mantener Espacio o Enter)
import { $ } from './utils.js';
import { goldBurst } from './confetti.js';

export function initCandle() {
  const btn = $('hold'), ring = $('holdRing'), story = $('historia'), hint = $('holdHint');
  const LEN = 182.2, DURATION = 1200;
  let start = 0, raf = 0, lit = false;

  const set = (p) => { ring.style.strokeDashoffset = String(LEN * (1 - p)); };
  const done = () => {
    lit = true;
    story.classList.add('lit');
    set(1);
    hint.textContent = 'Vela encendida por la familia';
    btn.setAttribute('aria-label', 'Vela encendida. Mantén presionado para apagarla');
    goldBurst(btn);
  };
  const off = () => {
    lit = false;
    story.classList.remove('lit');
    set(0);
    hint.textContent = 'Mantén presionado para encender una vela';
    btn.setAttribute('aria-label', 'Mantén presionado para encender una vela');
  };
  const step = (now) => {
    const p = Math.min(1, (now - start) / DURATION);
    set(lit ? 1 - p : p);
    if (p >= 1) { lit ? off() : done(); stop(false); return; }
    raf = requestAnimationFrame(step);
  };
  const begin = (e) => { e.preventDefault(); start = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(step); };
  const stop = (reset = true) => { cancelAnimationFrame(raf); raf = 0; if (reset) set(lit ? 1 : 0); };

  btn.setAttribute('aria-label', 'Mantén presionado para encender una vela');
  btn.addEventListener('pointerdown', begin);
  ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => btn.addEventListener(ev, () => stop()));
  btn.addEventListener('contextmenu', (e) => e.preventDefault());
  btn.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) begin(e); });
  btn.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') stop(); });
}
