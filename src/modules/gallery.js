// Galería con visor: flechas, teclado y deslizar con el dedo
import { $, $$ } from './utils.js';

export function initGallery() {
  const items = $$('.g'), viewer = $('viewer'), vImg = $('vImg'), vCap = $('vCap');
  const photos = items.map((b) => ({ src: b.querySelector('img').src, alt: b.querySelector('img').alt }));
  let i = 0;
  const show = (k) => {
    i = (k + photos.length) % photos.length;
    vImg.animate?.([{ opacity: 0, transform: 'scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 450, easing: 'cubic-bezier(.22,1,.36,1)' });
    vImg.src = photos[i].src; vImg.alt = photos[i].alt; vCap.textContent = photos[i].alt;
  };
  items.forEach((b, k) => b.addEventListener('click', () => { show(k); viewer.showModal?.(); }));
  $('vPrev').addEventListener('click', () => show(i - 1));
  $('vNext').addEventListener('click', () => show(i + 1));
  $('vClose').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', (e) => { if (e.target === viewer) viewer.close(); });
  viewer.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') show(i + 1); if (e.key === 'ArrowLeft') show(i - 1); });
  let sx = 0;
  viewer.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
  viewer.addEventListener('touchend', (e) => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1)); });
}
