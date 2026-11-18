export const $ = (id) => document.getElementById(id);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const rand = (a, b) => a + Math.random() * (b - a);
export const pick = (arr) => arr[(Math.random() * arr.length) | 0];
export const COLORS = ['#E8506B', '#F2B33D', '#1FA3A3', '#5DB45B', '#F47C3C', '#7B4BC4'];

/** Ruta a una imagen de assets/img que funciona con Live Server y con Vite */
export const img = (name) => new URL(`../../assets/img/${name}`, import.meta.url).href;

/** Un solo bucle para los efectos ligados al scroll */
const tasks = new Set();
let queued = false;
const run = () => { queued = false; tasks.forEach((fn) => fn()); };
const request = () => { if (!queued) { queued = true; requestAnimationFrame(run); } };
addEventListener('scroll', request, { passive: true });
addEventListener('resize', request);
export function onFrame(fn) { tasks.add(fn); request(); }
