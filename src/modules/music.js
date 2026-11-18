// Música de fondo (botón de la barra y tarjetas de bandas)
import { $, $$ } from './utils.js';

let audio, btn;
const listeners = new Set();
export const onMusic = (fn) => listeners.add(fn);

function set(on) {
  btn.classList.toggle('on', on);
  btn.setAttribute('aria-pressed', on);
  btn.setAttribute('aria-label', on ? 'Pausar música' : 'Poner música');
  listeners.forEach((fn) => fn(on));
}

export async function playMusic() {
  try { audio.volume = 0.7; await audio.play(); set(true); } catch { set(false); }
}
export function pauseMusic() { audio.pause(); set(false); }
export const isPlaying = () => audio && !audio.paused;

export function initMusic() {
  audio = $('audio');
  btn = $('music');
  btn.addEventListener('click', () => (audio.paused ? playMusic() : pauseMusic()));

  // Tarjetas de bandas: tocar una pone la música y la marca como "sonando"
  const bands = $$('.band');
  let active = null;
  const paint = () => bands.forEach((b) => b.setAttribute('aria-pressed', String(b === active && isPlaying())));
  bands.forEach((b) => b.addEventListener('click', () => {
    if (active === b && isPlaying()) { pauseMusic(); return; }
    active = b; playMusic().then(paint);
  }));
  onMusic(paint);
}
