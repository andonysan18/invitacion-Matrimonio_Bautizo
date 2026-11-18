// Vela, corazones, agua bendita y tarjetas que giran
import { $, $$, pointIn } from './utils.js';

const HEART = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.4-9.3-8.6C1 9 3 5 6.8 5c2 0 3.4 1.1 5.2 3 1.8-1.9 3.2-3 5.2-3C21 5 23 9 21.3 12.4 19 16.6 12 21 12 21z"/></svg>';

function candle() {
  $('shrine').addEventListener('click', (e) => {
    const s = e.currentTarget;
    const lit = !s.classList.contains('lit');
    s.classList.toggle('lit', lit);
    s.setAttribute('aria-pressed', lit);
    $('candleTip').lastChild.textContent = lit ? 'Vela encendida por la familia' : 'Toca la imagen para encender una vela';
  });
}

function hearts() {
  $('hearts').addEventListener('click', (e) => {
    const host = e.currentTarget.parentElement;
    const { x, y } = pointIn(host, e);
    for (let i = 0; i < 8; i++) {
      const h = document.createElement('span');
      h.className = 'heart';
      h.innerHTML = HEART;
      h.style.left = `${x}px`;
      h.style.top = `${y}px`;
      h.style.setProperty('--dx', `${Math.random() * 140 - 70}px`);
      h.style.setProperty('--r', `${Math.random() * 40 - 20}deg`);
      h.style.animationDelay = `${i * 0.07}s`;
      host.appendChild(h);
      setTimeout(() => h.remove(), 2100);
    }
  });
}

function holyWater() {
  $('pool').addEventListener('click', (e) => {
    const host = e.currentTarget.parentElement;
    const { x, y } = pointIn(host, e);
    [0, 180, 360].forEach((delay) => setTimeout(() => {
      const r = document.createElement('span');
      r.className = 'ripple';
      r.style.left = `${x}px`;
      r.style.top = `${y}px`;
      host.appendChild(r);
      setTimeout(() => r.remove(), 1400);
    }, delay));
  });
}

function flipCards() {
  $$('.flip').forEach((f) => f.addEventListener('click', () => {
    const on = !f.classList.contains('on');
    f.classList.toggle('on', on);
    f.setAttribute('aria-pressed', on);
  }));
}

export function initInteractions() {
  candle();
  hearts();
  holyWater();
  flipCards();
}
