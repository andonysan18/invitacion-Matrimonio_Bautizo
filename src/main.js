// Punto de entrada del diseño de fiesta
import { initConfetti } from './modules/confetti.js';
import { initMusic } from './modules/music.js';
import { initHero } from './modules/hero.js';
import { initPair } from './modules/pair.js';
import { initTicket } from './modules/ticket.js';
import { initParty } from './modules/party.js';
import { initPhotos } from './modules/photos.js';
import { initRsvp } from './modules/rsvp.js';
import { initPage } from './modules/page.js';

initConfetti();
initMusic();
initHero();
initPair();
initTicket();
initParty();      // crea las tarjetas de lugares antes de activar las apariciones
initPhotos();
initRsvp();
initPage();
