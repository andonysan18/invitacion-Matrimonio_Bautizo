// Destellos dorados (en lugar de confeti de colores, para mantener la elegancia)
import { $, reduceMotion } from './utils.js';

const COLORS = ['#C9A96E', '#E3CD9E', '#F3EEE4', '#B8935A'];
let cv, ctx, parts = [], running = false;

function size() { const d = Math.min(2, devicePixelRatio || 1); cv.width = innerWidth * d; cv.height = innerHeight * d; ctx.setTransform(d, 0, 0, d, 0, 0); }

function frame() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (const p of parts) {
    p.vy += 0.06; p.vx *= 0.985; p.vy *= 0.985; p.x += p.vx; p.y += p.vy; p.life--; p.rot += p.vr;
    ctx.save(); ctx.globalAlpha = Math.min(1, p.life / 50); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c;
    if (p.star) { ctx.beginPath(); for (let k = 0; k < 4; k++) { ctx.rotate(Math.PI / 2); ctx.lineTo(0, -p.s); ctx.lineTo(p.s * 0.25, -p.s * 0.25); } ctx.fill(); }
    else { ctx.beginPath(); ctx.arc(0, 0, p.s * 0.4, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  }
  parts = parts.filter((p) => p.life > 0);
  if (parts.length) requestAnimationFrame(frame); else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
}

export function initConfetti() { cv = $('fx'); ctx = cv.getContext('2d'); size(); addEventListener('resize', size); }

export function goldBurst(el, n = 70) {
  if (reduceMotion() || !ctx) return;
  const r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, s = 1.5 + Math.random() * 5.5;
    parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 1.5, s: 3 + Math.random() * 6, star: Math.random() > 0.45, rot: Math.random() * 3, vr: (Math.random() - 0.5) * 0.15, c: COLORS[(Math.random() * COLORS.length) | 0], life: 70 + Math.random() * 60 });
  }
  if (!running) { running = true; requestAnimationFrame(frame); }
}
