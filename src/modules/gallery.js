// Galería: carril que se arrastra con el mouse o se desliza con el dedo, flechas y foto ampliada
import { $, $$ } from './utils.js';

export function initGallery() {
  const rail = $('rail'), lb = $('lightbox'), lbImg = $('lbImg');
  const step = () => (rail.querySelector('.shot')?.offsetWidth || 300) + 18;

  $('gPrev').addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
  $('gNext').addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
  rail.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') rail.scrollBy({ left: step(), behavior: 'smooth' });
    if (e.key === 'ArrowLeft') rail.scrollBy({ left: -step(), behavior: 'smooth' });
  });

  // Arrastrar con el mouse (en celular ya se desliza solo)
  let down = false, startX = 0, startScroll = 0, moved = 0;
  rail.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true; moved = 0; startX = e.clientX; startScroll = rail.scrollLeft;
  });
  addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    if (moved > 6) rail.classList.add('dragging');
    rail.scrollLeft = startScroll - dx;
  });
  addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    requestAnimationFrame(() => rail.classList.remove('dragging'));
  });

  // Foto ampliada
  $$('.shot', rail).forEach((b) => b.addEventListener('click', () => {
    if (moved > 6) return; // fue un arrastre, no un clic
    lbImg.src = b.dataset.full;
    lbImg.alt = b.querySelector('img').alt;
    lb.showModal?.();
  }));
  $('lbClose').addEventListener('click', () => lb.close());
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
}
