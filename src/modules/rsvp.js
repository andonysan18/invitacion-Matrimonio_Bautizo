// Confirmación con barra de avance, muñequitos por persona y mensaje de WhatsApp
import { $, $$, COLORS } from './utils.js';
import { burstFrom, cannons } from './confetti.js';
import { WHATSAPP_NOVIOS } from '../config.js';

let going = 'si', pax = 1;

function step(n) {
  $$('.rsvp-card .step').forEach((s) => s.classList.toggle('on', s.dataset.s === String(n)));
  $('rBar').style.width = `${n * 25}%`;
  document.querySelector(`.rsvp-card .step[data-s="${n}"] :is(input, textarea, button)`)?.focus({ preventScroll: true });
}

function people() {
  const box = $('people');
  while (box.children.length < pax) { const p = document.createElement('span'); p.className = 'person'; p.style.setProperty('--c', COLORS[box.children.length % COLORS.length]); box.appendChild(p); }
  while (box.children.length > pax) box.lastElementChild.remove();
  $('pax').textContent = pax;
}

export function initRsvp() {
  people();
  $$('[data-go]').forEach((b) => b.addEventListener('click', () => {
    going = b.dataset.go; $('paxWrap').hidden = going === 'no';
    if (going === 'si') burstFrom(b, 50, 7);
    step(2);
  }));
  $('minus').onclick = () => { pax = Math.max(1, pax - 1); people(); };
  $('plus').onclick = () => { pax = Math.min(20, pax + 1); people(); };
  $('toStep3').onclick = () => {
    if (!$('nm').value.trim()) { $('nmErr').textContent = '¡Falta tu nombre!'; $('nm').focus(); return; }
    $('nmErr').textContent = ''; step(3);
  };
  $$('.wish-chips button').forEach((b) => b.addEventListener('click', () => { $('wish').value = b.textContent; }));
  $('toStep4').onclick = () => {
    const name = $('nm').value.trim(), wish = $('wish').value.trim();
    let text = going === 'si'
      ? `¡Hola Miguel y María! Soy ${name} y confirmo mi asistencia a su matrimonio y al bautizo de Yael Noé el sábado 26 de diciembre. Seremos ${pax} ${pax === 1 ? 'persona' : 'personas'}. ¡Nos vemos en la fiesta!`
      : `¡Hola Miguel y María! Soy ${name}. No podré acompañarlos el 26 de diciembre, pero les deseo un día lleno de bendiciones.`;
    if (wish) text += `\n\n${wish}`;
    $('preview').textContent = text;
    $('wa').href = `https://wa.me/${WHATSAPP_NOVIOS}?text=${encodeURIComponent(text)}`;
    $('copyNote').textContent = '';
    step(4);
    if (going === 'si') cannons();
  };
  $('copy').onclick = async () => {
    try { await navigator.clipboard.writeText($('preview').textContent); $('copyNote').textContent = '¡Copiado! Pégalo en el chat de los novios.'; }
    catch { $('copyNote').textContent = 'No se pudo copiar: selecciona el texto y cópialo.'; }
  };
  $('restart').onclick = () => { $('nm').value = ''; $('wish').value = ''; pax = 1; people(); step(1); };
}
