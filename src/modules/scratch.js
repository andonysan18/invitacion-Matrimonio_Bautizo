// Tarjeta "rasca y descubre" la fecha + cuenta regresiva
import { $ } from './utils.js';
import { confettiFrom } from './confetti.js';
import { FECHA_EVENTO } from '../config.js';

let ready = false, revealed = false;

function reveal() {
  if (revealed) return;
  revealed = true;
  $('scratch').classList.add('revealed');
  $('scratchTip').lastChild.textContent = '¡Sábado 26 de diciembre a las 18H00!';
  $('reveal').hidden = true;
  confettiFrom($('scratch'), 130);
}

function setup() {
  if (ready) return;
  ready = true;
  const box = $('scratch'), cv = $('scratchCv');
  const c = cv.getContext('2d', { willReadFrequently: true });
  const r = box.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1);
  cv.width = r.width * d; cv.height = r.height * d; c.scale(d, d);

  const g = c.createLinearGradient(0, 0, r.width, r.height);
  g.addColorStop(0, '#C9A458'); g.addColorStop(0.5, '#F0DCA4'); g.addColorStop(1, '#A9843A');
  c.fillStyle = g; c.fillRect(0, 0, r.width, r.height);
  c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 1;
  for (let i = -r.height; i < r.width; i += 14) { c.beginPath(); c.moveTo(i, 0); c.lineTo(i + r.height, r.height); c.stroke(); }
  c.fillStyle = '#5A4316'; c.textAlign = 'center';
  c.font = '600 16px Jost, sans-serif'; c.fillText('RASCA AQUÍ', r.width / 2, r.height / 2 - 10);
  c.font = '40px Parisienne, cursive'; c.fillText('¿Cuándo es?', r.width / 2, r.height / 2 + 34);

  let down = false, moves = 0;
  const check = () => {
    if (revealed) return;
    const data = c.getImageData(0, 0, cv.width, cv.height).data;
    let clear = 0, total = 0;
    for (let i = 3; i < data.length; i += 64) { total++; if (data[i] === 0) clear++; }
    if (clear / total > 0.5) reveal();
  };
  const rub = (e) => {
    const b = cv.getBoundingClientRect();
    c.globalCompositeOperation = 'destination-out';
    c.beginPath(); c.arc(e.clientX - b.left, e.clientY - b.top, 26, 0, Math.PI * 2); c.fill();
    if (++moves % 12 === 0) check();
  };
  cv.addEventListener('pointerdown', (e) => { down = true; cv.setPointerCapture(e.pointerId); rub(e); });
  cv.addEventListener('pointermove', (e) => { if (down) rub(e); });
  cv.addEventListener('pointerup', () => { down = false; check(); });
}

function countdown() {
  const pad = (n) => String(n).padStart(2, '0');
  const tick = () => {
    let s = Math.max(0, Math.floor((FECHA_EVENTO - Date.now()) / 1000));
    const d = Math.floor(s / 86400); s %= 86400;
    $('cdD').textContent = d;
    $('cdH').textContent = pad(Math.floor(s / 3600));
    $('cdM').textContent = pad(Math.floor((s % 3600) / 60));
    $('cdS').textContent = pad(s % 60);
  };
  tick();
  setInterval(tick, 1000);
}

export function initScratch() {
  // Se dibuja cuando la tarjeta entra en pantalla (para medir bien su tamaño y cargar las letras)
  const io = new IntersectionObserver((entries) => {
    if (entries.some((en) => en.isIntersecting)) { document.fonts?.ready.then(setup) ?? setup(); io.disconnect(); }
  });
  io.observe($('scratch'));
  $('reveal').addEventListener('click', () => { setup(); reveal(); });
  countdown();
}
