# Invitación · Miguel & María

Landing page interactiva al matrimonio de **Miguel Toaquiza y María Pilatasig** y al bautizo de **Yael Noé**.
Sábado 26 de diciembre de 2026 · 18H00 · Parroquia de Chugchilán.

Hecha con HTML, CSS y JavaScript moderno (módulos ES), sin librerías. Vite es opcional y solo sirve para el servidor de desarrollo y para compilar.

## Cómo correrla en Visual Studio Code

### Opción A: Live Server (sin instalar nada)
1. Abre la carpeta `invitacion-miguel-maria` en VS Code (**Archivo › Abrir carpeta**).
2. Instala la extensión **Live Server** (VS Code te la sugiere al abrir la carpeta).
3. Clic derecho en `index.html` › **Open with Live Server**.

> No abras `index.html` con doble clic: los módulos de JavaScript necesitan un servidor, y desde `file://` el navegador los bloquea.

### Opción B: Vite (necesita Node.js 18 o superior)
```bash
npm install
npm run dev       # abre http://localhost:5173
npm run build     # genera la carpeta dist/ lista para publicar
npm run preview   # prueba la versión compilada
```

**Verla en el celular:** con el celular en la misma red wifi, abre la dirección "Network" que muestra la terminal (ej. `http://192.168.1.20:5173`).

## Qué editar

| Qué | Dónde |
|---|---|
| Fecha y hora (cuenta regresiva) | `src/config.js` › `FECHA_EVENTO` |
| Número de WhatsApp de los novios | `src/config.js` › `WHATSAPP_NOVIOS` |
| Programa por día | `src/config.js` › `PROGRAMA` |
| Lugares y búsqueda en Google Maps | `src/config.js` › `LUGARES` |
| Textos de cada sección | `index.html` |
| Colores y tipografías | `src/styles/main.css` (variables en `:root`) |
| Fotos y música | `assets/img/` y `assets/audio/` (mismo nombre de archivo) |

## Invitación con nombre
Agrega el nombre al final del enlace y el sobre lo muestra:
```
https://tu-sitio.com/#Familia-Chicaiza   →   "Invitación para Familia Chicaiza"
```

## Estructura
```
index.html              Landing con todas las secciones
src/main.js             Punto de entrada
src/config.js           Datos editables
src/modules/
  nav.js                Menú fijo, sección activa y menú en celular
  reveal.js             Aparición suave al hacer scroll
  hero.js               Portada, nombre del invitado y "Abrir con música"
  interactions.js       Vela, corazones, agua bendita y tarjetas que giran
  scratch.js            Rasca y descubre la fecha + cuenta regresiva
  program.js            Programa por día y lugares
  gallery.js            Galería deslizable y foto ampliada
  rsvp.js               Confirmación por pasos y WhatsApp
  confetti.js, music.js, utils.js
src/styles/main.css     Estilos (variables de color en :root)
assets/                 Fotos y música
```

## Publicarla gratis
- **Netlify Drop:** ejecuta `npm run build` y arrastra la carpeta `dist/` a https://app.netlify.com/drop
- **GitHub Pages / Vercel:** sube el proyecto; comando de compilación `npm run build`, carpeta de salida `dist`.
- Sin compilar, también puedes subir la carpeta tal cual a cualquier hosting estático.

## Música
Melodía original compuesta para esta invitación, sin derechos de terceros.
