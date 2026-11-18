// Portada: banderines de papel picado, globos que se revientan, nombres que saltan y botón de fiesta
import { $, $$, reduceMotion, rand, pick, COLORS } from './utils.js';
import { burst, cannons } from './confetti.js';
import { playMusic } from './music.js';

const SECTION_IDS = new Set(['inicio', 'pareja', 'boleto', 'fiesta', 'fotos', 'confirmar', 'contenido']);

export function makeFlags(box) {
  const n = Math.max(8, Math.round(innerWidth / 70));
  box.replaceChildren();
  for (let i = 0; i < n; i++) {
    const f = document.createElement('span');
    f.className = 'flag';
    f.style.background = COLORS[i % COLORS.length];
    f.style.animationDelay = `${-rand(0, 3)}s`;
    f.style.animationDuration = `${rand(2.6, 3.8)}s`;
    box.appendChild(f);
  }
}

function splitNames() {
  $$('.names .nm').forEach((el, w) => {
    const t = el.textContent; el.textContent = '';
    [...t].forEach((c, i) => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = c; s.style.animationDelay = `${0.15 + w * 0.35 + i * 0.06}s`; el.appendChild(s); });
  });
}

function balloons() {
  const box = $('balloons');
  const count = innerWidth < 700 ? 6 : 10;
  const spawn = (b, first) => {
    b.className = 'balloon';
    b.style.left = `${rand(2, 92)}%`;
    b.style.background = pick(COLORS);
    const size = rand(50, 76);
    b.style.width = `${size}px`; b.style.height = `${size * 1.25}px`;
    b.style.setProperty('--sway', `${rand(-60, 60)}px`);
    const dur = rand(11, 18);
    b.style.animation = `rise ${dur}s linear ${first ? -rand(0, dur) : 0}s infinite`;
  };
  for (let i = 0; i < count; i++) {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Reventar globo');
    spawn(b, true);
    b.addEventListener('click', (e) => {
      const r = b.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2, 40, 7);
      b.classList.add('pop');
      setTimeout(() => spawn(b, false), 260);
    });
    box.appendChild(b);
  }
}

function guest() {
  try {
    const raw = decodeURIComponent(location.hash.slice(1));
    if (!raw || SECTION_IDS.has(raw)) return;
    const name = raw.replace(/[-_]+/g, ' ').trim();
    if (!/^[\p{L}\d ]{2,40}$/u.test(name)) return;
    const pretty = name.replace(/(^|\s)\p{L}/gu, (c) => c.toUpperCase());
    $('guest').textContent = pretty;
    $('ticketName').textContent = pretty;
  } catch { /* enlace inválido */ }
}

export function initHero() {
  makeFlags($('flags'));
  makeFlags($('flags2'));
  addEventListener('resize', () => { makeFlags($('flags')); makeFlags($('flags2')); });
  splitNames();
  guest();
  if (!reduceMotion()) balloons();
  $('party').addEventListener('click', () => { playMusic(); cannons(); });
}
