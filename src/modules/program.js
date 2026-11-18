// Línea de tiempo del programa (se llena con el scroll) y tarjetas de lugares con efecto 3D
import { $, img, onFrame, clamp, finePointer, reduceMotion } from './utils.js';
import { PROGRAMA, LUGARES } from '../config.js';

const DAY_NAMES = { '25': 'Viernes 25', '26': 'Sábado 26', '27': 'Domingo 27' };

function timeline() {
  const list = $('tlList'), fill = $('tlFill'), box = $('timeline');
  Object.entries(PROGRAMA).forEach(([day, events]) => {
    const h = document.createElement('li');
    h.className = 'tl-day';
    h.textContent = DAY_NAMES[day] || `Día ${day}`;
    list.appendChild(h);
    events.forEach(([hora, titulo, detalle]) => {
      const li = document.createElement('li');
      li.className = 'tl-item';
      li.innerHTML = '<span class="tl-time"></span><div class="tl-body"><h3></h3><p></p></div>';
      li.querySelector('.tl-time').textContent = hora;
      li.querySelector('h3').textContent = titulo;
      li.querySelector('p').textContent = detalle;
      li.setAttribute('data-reveal', '');
      list.appendChild(li);
    });
  });
  const items = [...list.querySelectorAll('.tl-item')];
  onFrame(() => {
    const r = box.getBoundingClientRect();
    const p = clamp((innerHeight * 0.6 - r.top) / r.height);
    fill.style.transform = `scaleY(${p})`;
    const lineY = r.top + p * r.height;
    items.forEach((it) => it.classList.toggle('in', it.getBoundingClientRect().top + 14 < lineY));
  });
}

function places() {
  const grid = $('placeGrid');
  LUGARES.forEach((p) => {
    const a = document.createElement('article');
    a.className = 'place';
    a.setAttribute('data-reveal', '');
    a.innerHTML = `<img alt="" loading="lazy"><span class="glare"></span>
      <div class="place-body"><p class="eyebrow"></p><h3 class="display"></h3><p></p>
      <a class="link-line" target="_blank" rel="noopener">Cómo llegar</a></div>`;
    a.querySelector('img').src = img(p.imagen);
    a.querySelector('.eyebrow').textContent = p.cuando;
    a.querySelector('h3').textContent = p.nombre;
    a.querySelector('.place-body > p:not(.eyebrow)').textContent = p.detalle;
    a.querySelector('a').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.mapa)}`;
    grid.appendChild(a);

    if (!finePointer() || reduceMotion()) return;
    a.addEventListener('pointermove', (e) => {
      const r = a.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      a.style.transform = `rotateY(${(x - 0.5) * 8}deg) rotateX(${(0.5 - y) * 8}deg)`;
      a.style.setProperty('--gx', `${x * 100}%`); a.style.setProperty('--gy', `${y * 100}%`);
    });
    a.addEventListener('pointerleave', () => { a.style.transform = ''; });
  });
}

export function initProgram() {
  timeline();
  places();
}
