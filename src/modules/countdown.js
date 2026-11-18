// Cuenta regresiva con dígitos que caen al cambiar
import { $ } from './utils.js';
import { FECHA_EVENTO } from '../config.js';

const els = {};

function paint(id, value) {
  const box = els[id] ??= $(id);
  const str = String(value).padStart(2, '0');
  if (box.dataset.v === str) return;
  const old = box.dataset.v || '';
  box.dataset.v = str;
  if (box.children.length !== str.length) {
    box.replaceChildren(...[...str].map(() => { const d = document.createElement('span'); d.className = 'd'; d.innerHTML = '<span></span>'; return d; }));
  }
  [...str].forEach((ch, i) => {
    const d = box.children[i];
    if (old[i] === ch) return;
    d.firstChild.textContent = ch;
    d.classList.remove('tick'); void d.offsetWidth; d.classList.add('tick');
  });
  box.setAttribute('aria-label', str);
}

export function initCountdown() {
  const tick = () => {
    let s = Math.max(0, Math.floor((FECHA_EVENTO - Date.now()) / 1000));
    const d = Math.floor(s / 86400); s %= 86400;
    paint('cdD', d); paint('cdH', Math.floor(s / 3600)); paint('cdM', Math.floor((s % 3600) / 60)); paint('cdS', s % 60);
  };
  tick();
  setInterval(tick, 1000);
}
