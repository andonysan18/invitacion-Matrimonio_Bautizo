// Programa por día (pestañas + acordeón) y lugares (selector)
import { $, $$, img } from './utils.js';
import { PROGRAMA, DIA_INICIAL, LUGARES } from '../config.js';

const CHEVRON = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

function renderDay(day) {
  const box = $('events');
  box.replaceChildren();
  (PROGRAMA[day] || []).forEach(([hora, titulo, detalle], i) => {
    const id = `ev${day}-${i}`;
    const ev = document.createElement('div');
    ev.className = `ev${i === 0 ? ' open' : ''}`;
    ev.innerHTML = `<button type="button" aria-expanded="${i === 0}" aria-controls="${id}">
        <span class="hr"></span><span class="tt"></span>${CHEVRON}</button>
      <div class="more" id="${id}"><div><p></p></div></div>`;
    ev.querySelector('.hr').textContent = hora;
    ev.querySelector('.tt').textContent = titulo;
    ev.querySelector('p').textContent = detalle;
    const btn = ev.querySelector('button');
    btn.addEventListener('click', () => {
      const open = !ev.classList.contains('open');
      ev.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
    });
    box.appendChild(ev);
  });
  $$('.day').forEach((b) => b.setAttribute('aria-selected', b.dataset.d === day));
}

function showPlace(i) {
  const p = LUGARES[i];
  const pic = $('pImg');
  pic.classList.add('swap');
  setTimeout(() => { pic.style.backgroundImage = `url('${img(p.imagen)}')`; pic.classList.remove('swap'); }, 180);
  $('pWhen').textContent = p.cuando;
  $('pName').textContent = p.nombre;
  $('pDesc').textContent = p.detalle;
  $('pMap').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.mapa)}`;
  $$('.seg button').forEach((b) => b.setAttribute('aria-selected', Number(b.dataset.p) === i));
}

export function initProgram() {
  $$('.day').forEach((b) => b.addEventListener('click', () => renderDay(b.dataset.d)));
  renderDay(DIA_INICIAL);

  $$('.seg button').forEach((b, i) => {
    if (LUGARES[i]) b.textContent = LUGARES[i].pestaña;
    b.addEventListener('click', () => showPlace(i));
  });
  showPlace(0);
}
