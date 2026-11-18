export const $ = (id) => document.getElementById(id);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Ruta a una imagen de assets/img que funciona con Live Server y con Vite */
export const img = (name) => new URL(`../../assets/img/${name}`, import.meta.url).href;

/** Posición del toque dentro de un elemento (si es por teclado, el centro) */
export function pointIn(el, e) {
  const r = el.getBoundingClientRect();
  const x = (e.clientX || r.left + r.width / 2) - r.left;
  const y = (e.clientY || r.top + r.height / 2) - r.top;
  return { x, y };
}
