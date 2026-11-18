// Confirmación en una ventana con pasos; el mensaje se envía por WhatsApp
import { $, $$ } from './utils.js';
import { goldBurst } from './confetti.js';
import { WHATSAPP_NOVIOS } from '../config.js';

let going = 'si', pax = 1;

function showStep(n) {
  $$('#rsvp .step').forEach((s) => s.classList.toggle('on', s.dataset.s === String(n)));
  $$('.r-steps i').forEach((b, k) => b.classList.toggle('on', k < n));
  document.querySelector(`#rsvp .step[data-s="${n}"] :is(input, textarea, button)`)?.focus({ preventScroll: true });
}

export function initRsvp() {
  const dlg = $('rsvp');
  $$('[data-open-rsvp]').forEach((b) => b.addEventListener('click', () => { dlg.showModal?.(); showStep(1); }));
  $('rClose').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });

  $$('[data-go]').forEach((b) => b.addEventListener('click', () => { going = b.dataset.go; $('paxWrap').hidden = going === 'no'; showStep(2); }));
  $('minus').onclick = () => { pax = Math.max(1, pax - 1); $('pax').textContent = pax; };
  $('plus').onclick = () => { pax = Math.min(20, pax + 1); $('pax').textContent = pax; };
  $('toStep3').onclick = () => {
    if (!$('nm').value.trim()) { $('nmErr').textContent = 'Escribe tu nombre para continuar.'; $('nm').focus(); return; }
    $('nmErr').textContent = ''; showStep(3);
  };
  $$('.chips button').forEach((b) => b.addEventListener('click', () => { $('wish').value = b.textContent; }));
  $('toStep4').onclick = () => {
    const name = $('nm').value.trim(), wish = $('wish').value.trim();
    let text = going === 'si'
      ? `¡Hola Miguel y María! Soy ${name} y confirmo mi asistencia a su matrimonio y al bautizo de Yael Noé el sábado 26 de diciembre. Seremos ${pax} ${pax === 1 ? 'persona' : 'personas'}.`
      : `¡Hola Miguel y María! Soy ${name}. No podré acompañarlos el 26 de diciembre, pero los tengo presentes en mis oraciones.`;
    if (wish) text += `\n\n${wish}`;
    $('preview').textContent = text;
    $('wa').href = `https://wa.me/${WHATSAPP_NOVIOS}?text=${encodeURIComponent(text)}`;
    $('copyNote').textContent = '';
    showStep(4);
    if (going === 'si') goldBurst($('preview'), 90);
  };
  $('copy').onclick = async () => {
    try { await navigator.clipboard.writeText($('preview').textContent); $('copyNote').textContent = 'Mensaje copiado. Pégalo en el chat de los novios.'; }
    catch { $('copyNote').textContent = 'No se pudo copiar: selecciona el texto y cópialo.'; }
  };
  $('restart').onclick = () => { $('nm').value = ''; $('wish').value = ''; pax = 1; $('pax').textContent = '1'; showStep(1); };
}
