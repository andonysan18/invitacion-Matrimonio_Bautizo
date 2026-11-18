export const $ = (id) => document.getElementById(id);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () => matchMedia('(pointer: fine)').matches;
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;

/** Ruta a una imagen de assets/img que funciona con Live Server y con Vite */
export const img = (name) => new URL(`../../assets/img/${name}`, import.meta.url).href;

/** Un solo bucle de animación para todos los efectos ligados al scroll */
const tasks = new Set();
let ticking = false;
function loop() {
  tasks.forEach((fn) => fn());
  ticking = false;
}
export function onFrame(fn) {
  tasks.add(fn);
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(loop); } };
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', req);
  req();
}
