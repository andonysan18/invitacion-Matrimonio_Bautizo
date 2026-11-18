// Confeti de colores, serpentinas y cañón de fiesta
import { $, reduceMotion, rand, pick, COLORS } from './utils.js';

let cv, ctx, parts = [], running = false;

function size() { const d = Math.min(2, devicePixelRatio || 1); cv.width = innerWidth * d; cv.height = innerHeight * d; ctx.setTransform(d, 0, 0, d, 0, 0); }

function frame() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (const p of parts) {
    p.vy += 0.18; p.vx *= 0.99; p.x += p.vx + Math.sin(p.t) * p.wob; p.y += p.vy; p.t += 0.1; p.rot += p.vr; p.life--;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = Math.min(1, p.life / 30); ctx.fillStyle = p.c;
    if (p.kind === 0) ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.t)));
    else if (p.kind === 1) { ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2); ctx.fill(); }
    else { ctx.strokeStyle = p.c; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-8, 0); ctx.bezierCurveTo(-3, -8, 3, 8, 8, 0); ctx.stroke(); }
    ctx.restore();
  }
  parts = parts.filter((p) => p.life > 0 && p.y < innerHeight + 40);
  if (parts.length) requestAnimationFrame(frame); else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
}

function start() { if (!running) { running = true; requestAnimationFrame(frame); } }

export function initConfetti() { cv = $('fx'); ctx = cv.getContext('2d'); size(); addEventListener('resize', size); }

/** Explosión desde un punto */
export function burst(x, y, n = 80, power = 9) {
  if (reduceMotion() || !ctx) return;
  for (let i = 0; i < n; i++) {
    const a = rand(0, Math.PI * 2), s = rand(2, power);
    parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 4, w: rand(6, 12), h: rand(8, 14), kind: (Math.random() * 3) | 0, c: pick(COLORS), rot: rand(0, 6), vr: rand(-0.2, 0.2), t: rand(0, 6), wob: rand(0, 0.8), life: rand(90, 160) });
  }
  start();
}

export function burstFrom(el, n, power) {
  const r = el.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, n, power);
}

/** Dos cañones desde las esquinas de abajo */
export function cannons() {
  if (reduceMotion() || !ctx) return;
  [[0, -1], [innerWidth, 1]].forEach(([x, dir]) => {
    for (let i = 0; i < 110; i++) {
      const a = -Math.PI / 2 + dir * rand(0.25, 0.75), s = rand(10, 20);
      parts.push({ x, y: innerHeight, vx: -Math.cos(a) * s * -1 * (dir === 1 ? 1 : 1), vy: Math.sin(a) * s, w: rand(6, 12), h: rand(8, 14), kind: (Math.random() * 3) | 0, c: pick(COLORS), rot: rand(0, 6), vr: rand(-0.25, 0.25), t: rand(0, 6), wob: rand(0, 1), life: rand(140, 220) });
      const p = parts[parts.length - 1];
      p.vx = dir === -1 ? Math.abs(p.vx) : -Math.abs(p.vx);
    }
  });
  start();
}
