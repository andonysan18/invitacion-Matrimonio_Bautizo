import { defineConfig } from 'vite';

export default defineConfig({
  // Rutas relativas: la carpeta dist/ funciona en cualquier hosting o subcarpeta
  base: './',
  server: { host: true, port: 5173 }, // host: true permite abrirla desde el celular en la misma red
  build: { outDir: 'dist', assetsInlineLimit: 0 },
});
