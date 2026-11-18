# ¡Miguel & María! · Diseño de fiesta

Invitación web al matrimonio de **Miguel Toaquiza y María Pilatasig** y al bautizo de **Yael Noé**.
Sábado 26 de diciembre de 2026 · 18H00 · Parroquia de Chugchilán.

Diseño alegre y colorido, inspirado en las fiestas de la comunidad: papel picado, globos, stickers y movimientos con rebote.
Hecho con HTML, CSS y JavaScript moderno (módulos ES), sin librerías.

## Interacciones
- **Portada:** banderines de papel picado que se mecen, globos que se revientan con un toque, nombres que saltan letra por letra y el botón **¡A celebrar!** con cañones de confeti y música.
- **La pareja:** la foto lanza corazones al tocarla y cuenta cuántos se enviaron.
- **El bautizo:** burbujas de agua bendita que se revientan, con contador.
- **Tu boleto:** se arrastra el talón para cortarlo (también con Enter) y aparece "¡Nos vemos ahí!". Lleva el nombre del invitado.
- **Cuenta regresiva** en burbujas de colores que cambian de forma.
- **¡Así celebramos!:** el programa por día con tarjetas que entran repartidas.
- **Tres bandas:** al tocar una suena la música y se mueve su tambor.
- **Padrinos:** medallas que giran y revelan los nombres.
- **Mesa de fotos:** polaroids que se arrastran, se mezclan y se amplían con doble toque.
- **Confirmación:** barra de avance, muñequitos de colores por cada persona y mensaje listo para WhatsApp.

## Cómo correrla en Visual Studio Code
**Live Server:** abre la carpeta, instala la extensión Live Server y haz clic derecho en `index.html` › *Open with Live Server*.

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
| Fecha, programa, lugares, WhatsApp | `src/config.js` |
| Textos | `index.html` |
| Colores y letras | `src/styles/main.css` (variables en `:root`) |
| Fotos y música | `assets/img/` y `assets/audio/` |

**Invitación con nombre:** agrega `#Familia-Chicaiza` al final del enlace; aparece en la portada y en el boleto.

## Estructura
```
src/main.js            Punto de entrada
src/config.js          Datos editables
src/modules/
  hero.js              Banderines, globos, nombres y botón de fiesta
  pair.js              Corazones y burbujas
  ticket.js            Boleto para cortar y cuenta regresiva
  party.js             Programa, medallas de padrinos y lugares
  photos.js            Mesa de fotos arrastrables
  rsvp.js              Confirmación
  music.js             Música y tarjetas de bandas
  confetti.js          Confeti y cañones
  page.js              Menú y apariciones
  utils.js
```

Respeta la opción del sistema "reducir movimiento".

## Música
Melodía original compuesta para esta invitación, sin derechos de terceros.
