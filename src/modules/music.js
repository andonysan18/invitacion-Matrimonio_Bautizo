// Música de fondo con indicador de ondas
import { $ } from './utils.js';

export function initMusic() {
  const audio = $('audio'), btn = $('music');
  const set = (on) => { btn.classList.toggle('on', on); btn.setAttribute('aria-pressed', on); btn.setAttribute('aria-label', on ? 'Pausar música' : 'Reproducir música'); };
  btn.addEventListener('click', async () => {
    if (!audio.paused) { audio.pause(); set(false); return; }
    try { audio.volume = 0.7; await audio.play(); set(true); } catch { set(false); }
  });
}
