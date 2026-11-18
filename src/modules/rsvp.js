// Confirmación de asistencia en pasos, enviada por WhatsApp
import { $, $$ } from './utils.js';
import { confettiFrom } from './confetti.js';
import { WHATSAPP_NOVIOS } from '../config.js';

let going = 'si', pax = 1;

function showStep(n) {
  $$('.step').forEach((s) => s.classList.toggle('on', s.dataset.s === String(n)));
  $$('.step-dots li').forEach((li, i) => li.classList.toggle('on', i < n));
  const first = document.querySelector(`.step[data-s="${n}"] :is(input, textarea, button)`);
  first?.focus({ preventScroll: true });
}

function buildMessage() {
  const name = $('nm').value.trim();
  const wish = $('wish').value.trim();
  let text = going === 'si'
    ? `¡Hola Miguel y María! Soy ${name} y confirmo mi asistencia a su matrimonio y al bautizo de Yael Noé el sábado 26 de diciembre. Seremos ${pax} ${pax === 1 ? 'persona' : 'personas'}.`
    : `¡Hola Miguel y María! Soy ${name}. No podré acompañarlos el 26 de diciembre, pero los tengo presentes en mis oraciones.`;
  if (wish) text += `\n\n${wish}`;
  return text;
}

export function initRsvp() {
  $$('[data-go]').forEach((b) => b.addEventListener('click', () => {
    going = b.dataset.go;
    $('paxWrap').hidden = going === 'no';
    showStep(2);
  }));
  $('minus').onclick = () => { pax = Math.max(1, pax - 1); $('pax').textContent = pax; };
  $('plus').onclick = () => { pax = Math.min(20, pax + 1); $('pax').textContent = pax; };

  $('toStep3').onclick = () => {
    if (!$('nm').value.trim()) { $('nmErr').textContent = 'Escribe tu nombre para continuar.'; $('nm').focus(); return; }
    $('nmErr').textContent = '';
    showStep(3);
  };
  $$('.wishes button').forEach((b) => b.addEventListener('click', () => { $('wish').value = b.textContent; }));

  $('toStep4').onclick = () => {
    const text = buildMessage();
    $('preview').textContent = text;
    $('wa').href = `https://wa.me/${WHATSAPP_NOVIOS}?text=${encodeURIComponent(text)}`;
    $('copyNote').textContent = '';
    showStep(4);
    if (going === 'si') confettiFrom($('preview'), 110);
  };

  $('copy').onclick = async () => {
    try {
      await navigator.clipboard.writeText($('preview').textContent);
      $('copyNote').textContent = 'Mensaje copiado. Pégalo en el chat de los novios.';
    } catch {
      $('copyNote').textContent = 'No se pudo copiar: mantén presionado el texto para copiarlo.';
    }
  };

  $('restart').onclick = () => {
    $('nm').value = ''; $('wish').value = ''; pax = 1; $('pax').textContent = '1';
    showStep(1);
  };
}
