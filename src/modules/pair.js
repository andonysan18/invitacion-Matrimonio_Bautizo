// La pareja (corazones con contador) y el bautizo (burbujas que se revientan)
import { $, reduceMotion, rand, pick } from './utils.js';
import { burst } from './confetti.js';

const HEART = '<svg viewBox="0 0 24 24"><path fill="currentColor" stroke="#3B1F4E" stroke-width="1.6" d="M12 21s-7-4.4-9.3-8.6C1 9 3 5 6.8 5c2 0 3.4 1.1 5.2 3 1.8-1.9 3.2-3 5.2-3C21 5 23 9 21.3 12.4 19 16.6 12 21 12 21z"/></svg>';
const HEART_COLORS = ['#E8506B', '#F47C3C', '#F2B33D', '#F7B7C3'];

function hearts() {
  const btn = $('loveBtn'), counter = $('loveCount');
  let total = 0;
  btn.addEventListener('click', (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX || r.left + r.width / 2, y = e.clientY || r.top + r.height / 2;
    const n = reduceMotion() ? 1 : 9;
    for (let i = 0; i < n; i++) {
      const h = document.createElement('span');
      h.className = 'heart'; h.innerHTML = HEART; h.style.color = pick(HEART_COLORS);
      h.style.left = `${x}px`; h.style.top = `${y}px`;
      h.style.setProperty('--dx', `${rand(-110, 110)}px`); h.style.setProperty('--r', `${rand(-40, 40)}deg`);
      h.style.animationDelay = `${i * 0.05}s`;
      document.body.appendChild(h); setTimeout(() => h.remove(), 1700);
    }
    total += 1; counter.textContent = total;
    if (total % 10 === 0) burst(x, y, 70);
  });
}

function bubbles() {
  const zone = $('bubbleZone'), counter = $('bubbleCount');
  let popped = 0;
  const make = () => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'bubble'; b.setAttribute('aria-label', 'Reventar burbuja');
    const s = rand(34, 70);
    Object.assign(b.style, { width: `${s}px`, height: `${s}px`, left: `${rand(4, 86)}%`, top: `${rand(2, 78)}%` });
    b.style.setProperty('--d', `${rand(4, 8)}s`); b.style.setProperty('--fx', `${rand(-20, 20)}px`); b.style.setProperty('--fy', `${rand(-30, -10)}px`);
    b.addEventListener('click', () => {
      const r = b.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2, 18, 5);
      b.classList.add('popped');
      popped += 1; counter.textContent = popped;
      setTimeout(() => { b.remove(); zone.appendChild(make()); }, 320);
    });
    return b;
  };
  for (let i = 0; i < 7; i++) zone.appendChild(make());
}

export function initPair() { hearts(); bubbles(); }
