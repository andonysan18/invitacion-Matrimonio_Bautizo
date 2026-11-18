// Programa por día, medallas de padrinos y tarjetas de lugares
import { $, $$, img } from './utils.js';
import { burstFrom } from './confetti.js';
import { PROGRAMA, DIA_INICIAL, LUGARES } from '../config.js';

function program() {
  const box = $('events'), tabs = $$('.dt');
  const show = (day) => {
    tabs.forEach((t) => t.setAttribute('aria-selected', t.dataset.d === day));
    box.replaceChildren(...(PROGRAMA[day] || []).map(([hora, titulo, detalle], i) => {
      const card = document.createElement('article');
      card.className = 'ev'; card.style.animationDelay = `${i * 0.08}s`;
      card.innerHTML = '<span class="hr"></span><div><h3></h3><p></p></div>';
      card.querySelector('.hr').textContent = hora;
      card.querySelector('h3').textContent = titulo;
      card.querySelector('p').textContent = detalle;
      return card;
    }));
  };
  tabs.forEach((t) => t.addEventListener('click', () => show(t.dataset.d)));
  show(DIA_INICIAL);
}

function medals() {
  $$('.medal').forEach((m) => m.addEventListener('click', () => {
    const on = !m.classList.contains('on');
    m.classList.toggle('on', on); m.setAttribute('aria-pressed', on);
    if (on) setTimeout(() => burstFrom(m, 60, 8), 350);
  }));
}

function places() {
  const box = $('places');
  const tagColors = ['t-pink', 't-teal'];
  LUGARES.forEach((p, i) => {
    const a = document.createElement('article');
    a.className = 'place pop-in';
    a.innerHTML = `<div class="place-img"><img alt="" loading="lazy"><span class="tag ${tagColors[i % 2]}"></span></div>
      <div class="place-body"><h3></h3><p></p><a class="btn" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 21s-6-5.3-6-11a6 6 0 0112 0c0 5.7-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/></svg>Cómo llegar</a></div>`;
    a.querySelector('img').src = img(p.imagen);
    a.querySelector('.tag').textContent = p.cuando;
    a.querySelector('h3').textContent = p.nombre;
    a.querySelector('p').textContent = p.detalle;
    a.querySelector('a').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.mapa)}`;
    box.appendChild(a);
  });
}

export function initParty() { program(); medals(); places(); }
