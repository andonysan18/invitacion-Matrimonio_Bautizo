// Intro: monograma que se dibuja, contador 0–100 y cortina que se abre
import { $, $$, reduceMotion } from './utils.js';

function splitLetters() {
  $$('.split').forEach((el) => {
    const text = el.textContent;
    el.setAttribute('aria-label', text);
    el.textContent = '';
    [...text].forEach((c, i) => {
      const s = document.createElement('span');
      s.className = 'ch';
      s.setAttribute('aria-hidden', 'true');
      s.textContent = c;
      s.style.transitionDelay = `${0.35 + i * 0.06}s`;
      el.appendChild(s);
    });
  });
}

export function initIntro() {
  splitLetters();
  const loader = $('loader'), num = $('loadNum');
  const finish = () => {
    loader.classList.add('done');
    document.body.classList.remove('is-loading');
    document.body.classList.add('loaded');
    setTimeout(() => loader.classList.add('gone'), 1300);
  };
  if (reduceMotion()) { num.textContent = '100'; finish(); return; }

  // El contador avanza con el tiempo y espera a que carguen las letras y la foto principal
  const start = performance.now(), MIN = 1900;
  let ready = false;
  Promise.all([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((r) => { const im = document.querySelector('.hero-media img'); im.complete ? r() : (im.onload = im.onerror = r); }),
  ]).then(() => { ready = true; });
  setTimeout(() => { ready = true; }, 4500); // nunca esperar más de 4,5 s

  const step = (now) => {
    const t = Math.min(1, (now - start) / MIN);
    const shown = Math.floor((ready ? t : Math.min(t, 0.9)) * 100);
    num.textContent = String(shown);
    if (shown >= 100) setTimeout(finish, 250);
    else requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
