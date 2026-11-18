// Confeti en un canvas fijo sobre toda la pantalla
import { $, prefersReducedMotion } from './utils.js';

const COLORS = ['#A3285E', '#2A8C8C', '#B08A3E', '#1F4D3F', '#F6C9DC', '#FFFFFF'];
let canvas, ctx, parts = [], running = false;

function resize() {
  const d = Math.min(2, devicePixelRatio || 1);
  canvas.width = innerWidth * d;
  canvas.height = innerHeight * d;
  ctx.setTransform(d, 0, 0, d, 0, 0);
}

function frame() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (const p of parts) {
    p.vy += 0.16; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life--;
    ctx.save();
    ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    ctx.globalAlpha = Math.min(1, p.life / 40);
    ctx.fillStyle = p.c;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  }
  parts = parts.filter((p) => p.life > 0 && p.y < innerHeight + 20);
  if (parts.length) requestAnimationFrame(frame);
  else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
}

export function initConfetti() {
  canvas = $('fx');
  ctx = canvas.getContext('2d');
  resize();
  addEventListener('resize', resize);
}

/** Lanza confeti desde un punto de la pantalla (por defecto, arriba al centro) */
export function confetti(n = 100, x = innerWidth / 2, y = innerHeight * 0.3) {
  if (prefersReducedMotion() || !ctx) return;
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, s = 3 + Math.random() * 7;
    parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 4, w: 5 + Math.random() * 7, h: 3 + Math.random() * 4,
      rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, c: COLORS[(Math.random() * COLORS.length) | 0], life: 130 + Math.random() * 60 });
  }
  if (!running) { running = true; requestAnimationFrame(frame); }
}

/** Confeti desde el centro de un elemento */
export function confettiFrom(el, n) {
  const r = el.getBoundingClientRect();
  confetti(n, r.left + r.width / 2, r.top + r.height / 2);
}
