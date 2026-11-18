// Mesa de fotos: polaroids que se arrastran, se mezclan y se amplían con doble toque
import { $, $$, rand } from './utils.js';

export function initPhotos() {
  const table = $('table'), cards = $$('.polaroid', table), zoom = $('zoom'), zImg = $('zoomImg');
  let z = 10;

  const scatter = (animate) => {
    const W = table.clientWidth, H = table.clientHeight;
    cards.forEach((c, i) => {
      const cw = c.offsetWidth, ch = c.offsetHeight;
      const cols = Math.min(cards.length, Math.max(2, Math.floor(W / (cw * 0.8))));
      const col = i % cols, row = Math.floor(i / cols), rows = Math.ceil(cards.length / cols);
      const x = (W - cw) * (cols === 1 ? 0.5 : col / (cols - 1)) + rand(-20, 20);
      const y = (H - ch) * (rows === 1 ? 0.3 : row / (rows - 1)) * 0.95 + rand(-10, 10);
      c.classList.toggle('settle', animate);
      c.style.left = `${Math.max(0, Math.min(W - cw, x))}px`;
      c.style.top = `${Math.max(0, Math.min(H - ch, y))}px`;
      c.style.rotate = `${rand(-12, 12)}deg`;
      c.style.zIndex = String(++z);
    });
    if (animate) setTimeout(() => cards.forEach((c) => c.classList.remove('settle')), 750);
  };
  const ready = () => scatter(false);
  if (document.readyState === 'complete') ready(); else addEventListener('load', ready);
  requestAnimationFrame(ready);
  addEventListener('resize', ready);
  $('shuffle').addEventListener('click', () => scatter(true));

  cards.forEach((c) => {
    let sx = 0, sy = 0, ox = 0, oy = 0, moved = 0, dragging = false, lastTap = 0;
    c.addEventListener('pointerdown', (e) => {
      dragging = true; moved = 0; c.setPointerCapture(e.pointerId);
      sx = e.clientX; sy = e.clientY; ox = c.offsetLeft; oy = c.offsetTop;
      c.style.zIndex = String(++z); c.classList.add('dragging');
    });
    c.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      moved = Math.max(moved, Math.hypot(dx, dy));
      const maxX = table.clientWidth - c.offsetWidth, maxY = table.clientHeight - c.offsetHeight;
      c.style.left = `${Math.max(-20, Math.min(maxX + 20, ox + dx))}px`;
      c.style.top = `${Math.max(-20, Math.min(maxY + 20, oy + dy))}px`;
      c.style.rotate = `${Math.max(-15, Math.min(15, dx / 12))}deg`;
    });
    const end = () => {
      if (!dragging) return; dragging = false; c.classList.remove('dragging');
      if (moved < 6) {
        const now = Date.now();
        if (now - lastTap < 350) openZoom(c);
        lastTap = now;
      }
    };
    c.addEventListener('pointerup', end); c.addEventListener('pointercancel', end);
    c.tabIndex = 0; c.setAttribute('role', 'button'); c.setAttribute('aria-label', `${c.querySelector('img').alt}. Enter para ver en grande`);
    c.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openZoom(c); } });
  });

  function openZoom(c) { zImg.src = c.dataset.src; zImg.alt = c.querySelector('img').alt; zoom.showModal?.(); }
  $('zoomClose').addEventListener('click', () => zoom.close());
  zoom.addEventListener('click', (e) => { if (e.target === zoom) zoom.close(); });
}
