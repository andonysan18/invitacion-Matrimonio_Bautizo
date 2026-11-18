// Boleto: arrastrar el talón para cortarlo + cuenta regresiva en burbujas
import { $ } from './utils.js';
import { burstFrom } from './confetti.js';
import { FECHA_EVENTO } from '../config.js';

function tear() {
  const ticket = $('ticket'), stub = $('stub');
  const vertical = () => matchMedia('(max-width: 640px)').matches;
  let sx = 0, sy = 0, dragging = false, torn = false;

  const doTear = () => {
    if (torn) return; torn = true;
    ticket.classList.add('torn');
    burstFrom(ticket, 120, 11);
  };
  stub.addEventListener('pointerdown', (e) => { if (torn) return; dragging = true; sx = e.clientX; sy = e.clientY; stub.setPointerCapture(e.pointerId); stub.style.transition = 'none'; });
  stub.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const d = vertical() ? Math.max(0, e.clientY - sy) : Math.max(0, e.clientX - sx);
    const rot = Math.min(18, d / 6);
    stub.style.transform = vertical() ? `translateY(${d}px) rotate(${-rot / 2}deg)` : `translateX(${d}px) rotate(${rot}deg)`;
    if (d > 110) { dragging = false; stub.style.transition = ''; doTear(); }
  });
  const end = () => { if (!dragging) return; dragging = false; stub.style.transition = ''; stub.style.transform = ''; };
  stub.addEventListener('pointerup', end);
  stub.addEventListener('pointercancel', end);
  stub.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); doTear(); } });
}

function countdown() {
  const ids = ['cdD', 'cdH', 'cdM', 'cdS'];
  const pad = (n) => String(n).padStart(2, '0');
  const tick = () => {
    let s = Math.max(0, Math.floor((FECHA_EVENTO - Date.now()) / 1000));
    const d = Math.floor(s / 86400); s %= 86400;
    [d, Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].forEach((v, i) => {
      const el = $(ids[i]), txt = i === 0 ? String(v) : pad(v);
      if (el.textContent !== txt) { el.textContent = txt; el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
    });
  };
  tick(); setInterval(tick, 1000);
}

export function initTicket() { tear(); countdown(); }
