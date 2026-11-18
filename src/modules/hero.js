// Portada: polvo dorado que reacciona al mouse, parallax de la foto y nombre del invitado
import { $, reduceMotion, onFrame, clamp } from './utils.js';

const SECTION_IDS = new Set(['inicio', 'historia', 'capitulos', 'programa', 'lugares', 'galeria', 'contenido']);

function guest() {
  try {
    const raw = decodeURIComponent(location.hash.slice(1));
    if (!raw || SECTION_IDS.has(raw)) return;
    const name = raw.replace(/[-_]+/g, ' ').trim();
    if (/^[\p{L}\d ]{2,40}$/u.test(name)) $('guest').textContent = name.replace(/(^|\s)\p{L}/gu, (c) => c.toUpperCase());
  } catch { /* enlace con caracteres inválidos */ }
}

function dust() {
  const cv = $('dust'), ctx = cv.getContext('2d'), hero = $('inicio');
  let w = 0, h = 0, mx = -999, my = -999, visible = true;
  const N = innerWidth < 700 ? 45 : 90;
  const parts = Array.from({ length: N }, () => ({ x: Math.random(), y: Math.random(), r: 0.6 + Math.random() * 1.8, vx: (Math.random() - 0.5) * 0.15, vy: -0.08 - Math.random() * 0.25, a: 0.2 + Math.random() * 0.6, t: Math.random() * 6 }));
  const size = () => { const d = Math.min(2, devicePixelRatio || 1); w = hero.clientWidth; h = hero.clientHeight; cv.width = w * d; cv.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
  size(); addEventListener('resize', size);
  hero.addEventListener('pointermove', (e) => { const r = hero.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
  hero.addEventListener('pointerleave', () => { mx = my = -999; });
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) requestAnimationFrame(draw); }).observe(hero);
  function draw() {
    if (!visible) return;
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      let px = p.x * w, py = p.y * h;
      const dx = px - mx, dy = py - my, dist = Math.hypot(dx, dy);
      if (dist < 140) { const f = (140 - dist) / 140; p.x += (dx / dist) * f * 0.004; p.y += (dy / dist) * f * 0.004; }
      p.x += p.vx / w * 3; p.y += p.vy / h * 3; p.t += 0.03;
      if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
      if (p.x < -0.02) p.x = 1.02; if (p.x > 1.02) p.x = -0.02;
      ctx.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.t));
      ctx.fillStyle = '#E3CD9E';
      ctx.beginPath(); ctx.arc(px, py, p.r, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

export function initHero() {
  guest();
  if (reduceMotion()) return;
  dust();
  const media = document.querySelector('.hero-media'), inner = document.querySelector('.hero-inner');
  onFrame(() => {
    const p = clamp(scrollY / innerHeight);
    media.style.transform = `translate3d(0, ${p * 18}vh, 0)`;
    inner.style.transform = `translate3d(0, ${p * -8}vh, 0)`;
    inner.style.opacity = String(1 - p * 1.2);
  });
}
