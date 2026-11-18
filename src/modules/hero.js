// Portada: nombre del invitado desde el enlace (#Familia-Chicaiza) y botón "Abrir con música"
import { $ } from './utils.js';
import { playMusic } from './music.js';
import { confettiFrom } from './confetti.js';

const SECTION_IDS = new Set(['inicio', 'bendicion', 'celebramos', 'fecha', 'padrinos', 'programa', 'lugares', 'galeria', 'confirmar', 'contenido']);

function guestFromHash() {
  const raw = decodeURIComponent(location.hash.slice(1));
  if (!raw || SECTION_IDS.has(raw)) return; // es un enlace a una sección, no un nombre
  const name = raw.replace(/[-_]+/g, ' ').trim();
  if (/^[\p{L}\d ]{2,40}$/u.test(name)) {
    $('guest').textContent = name.replace(/(^|\s)\p{L}/gu, (c) => c.toUpperCase());
    sessionStorage?.setItem?.('guest', $('guest').textContent);
  }
}

export function initHero() {
  try {
    const saved = sessionStorage.getItem('guest');
    if (saved) $('guest').textContent = saved;
  } catch { /* sin almacenamiento: no pasa nada */ }
  try { guestFromHash(); } catch { /* hash inválido */ }

  $('open').addEventListener('click', (e) => {
    playMusic();
    confettiFrom(e.currentTarget, 120);
    setTimeout(() => $('bendicion').scrollIntoView({ behavior: 'smooth' }), 700);
  });
}
