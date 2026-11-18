// Punto de entrada del diseño editorial
import { initIntro } from './modules/intro.js';
import { initScrollFx } from './modules/scrollfx.js';
import { initCursor } from './modules/cursor.js';
import { initConfetti } from './modules/confetti.js';
import { initHero } from './modules/hero.js';
import { initCandle } from './modules/candle.js';
import { initChapters } from './modules/chapters.js';
import { initCountdown } from './modules/countdown.js';
import { initProgram } from './modules/program.js';
import { initGallery } from './modules/gallery.js';
import { initRsvp } from './modules/rsvp.js';
import { initMusic } from './modules/music.js';

initIntro();
initProgram();      // crea la línea de tiempo y los lugares antes de activar las apariciones
initScrollFx();
initCursor();
initConfetti();
initHero();
initCandle();
initChapters();
initCountdown();
initGallery();
initRsvp();
initMusic();
