# Miguel & María · Diseño editorial

Invitación web al matrimonio de **Miguel Toaquiza y María Pilatasig** y al bautizo de **Yael Noé**.
Sábado 26 de diciembre de 2026 · 18H00 · Parroquia de Chugchilán.

Estilo editorial nocturno: azul noche, marfil y champagne, tipografía Bodoni y movimientos ligados al scroll.
Hecha con HTML, CSS y JavaScript moderno (módulos ES), sin librerías.

## Interacciones
- **Intro:** el monograma M·M se dibuja, un contador llega a 100 y se abre una cortina.
- **Portada:** los nombres entran letra por letra, la foto tiene parallax y un polvo dorado se aparta del mouse.
- **Cursor propio** y botones "magnéticos" en computadora.
- **Bendición:** el texto se ilumina palabra por palabra al hacer scroll; para encender la vela hay que **mantener presionado** el botón.
- **Capítulos:** al bajar, cuatro capítulos (matrimonio, bautizo, fecha y padrinos) pasan en horizontal; el "26" rueda como un odómetro. En el celular se deslizan con el dedo.
- **Cuenta regresiva** con dígitos que caen.
- **Programa:** una línea dorada se llena con el scroll y marca cada actividad.
- **Lugares:** tarjetas con inclinación 3D y brillo que sigue al mouse.
- **Galería:** fotos que se descubren al aparecer, visor con flechas, teclado y deslizar.
- **Confirmación** en una ventana con cuatro pasos; arma el mensaje para WhatsApp.

## Cómo correrla en Visual Studio Code
**Live Server (sin instalar nada):** abre la carpeta, instala la extensión Live Server y haz clic derecho en `index.html` › *Open with Live Server*.

**Vite (Node.js 18+):**
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # carpeta dist/ lista para publicar
```
No abras `index.html` con doble clic: los módulos de JavaScript necesitan un servidor.

## Qué editar
| Qué | Dónde |
|---|---|
| Fecha y hora, programa, lugares, WhatsApp | `src/config.js` |
| Textos | `index.html` |
| Colores y tipografías | `src/styles/main.css` (variables en `:root`) |
| Fotos y música | `assets/img/` y `assets/audio/` (mismo nombre de archivo) |

**Invitación con nombre:** agrega `#Familia-Chicaiza` al final del enlace y la portada dice "Invitación para Familia Chicaiza".

## Estructura
```
index.html
src/main.js              Punto de entrada
src/config.js            Datos editables
src/modules/
  intro.js               Monograma, contador y cortina
  hero.js                Polvo dorado, parallax y nombre del invitado
  scrollfx.js            Barra de avance, apariciones, texto que se ilumina y menú
  cursor.js              Cursor propio y botones magnéticos
  candle.js              Vela de mantener presionado
  chapters.js            Capítulos horizontales y odómetro
  countdown.js           Cuenta regresiva
  program.js             Línea de tiempo y lugares 3D
  gallery.js             Galería y visor
  rsvp.js                Confirmación por pasos
  confetti.js            Destellos dorados
  music.js, utils.js
src/styles/main.css
assets/
```

Respeta la opción del sistema "reducir movimiento": en ese caso las animaciones se desactivan y todo queda visible.

## Música
Melodía original compuesta para esta invitación, sin derechos de terceros.
