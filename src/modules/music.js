import { $ } from './utils.js';

let audio, btn;

function setOn(on) {
  btn.classList.toggle('on', on);
  btn.setAttribute('aria-pressed', on);
  btn.setAttribute('aria-label', on ? 'Pausar música' : 'Reproducir música');
}

export async function playMusic() {
  try { audio.volume = 0.7; await audio.play(); setOn(true); }
  catch { setOn(false); } // el navegador puede bloquear el audio sin un toque previo
}

export function initMusic() {
  audio = $('audio');
  btn = $('music');
  btn.addEventListener('click', () => (audio.paused ? playMusic() : (audio.pause(), setOn(false))));
}
