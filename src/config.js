// ============================================================
//  DATOS DE LA INVITACIÓN — edita aquí sin tocar el resto
// ============================================================

/** Fecha y hora de la misa en UTC. 18:00 en Ecuador (UTC-5) = 23:00 UTC. */
export const FECHA_EVENTO = Date.UTC(2026, 11, 26, 23, 0, 0); // mes 11 = diciembre

/**
 * Número de WhatsApp de los novios, con código de país y sin "+" ni espacios.
 * Ejemplo Ecuador: "593991234567". Si lo dejas vacío, el invitado elige a quién enviar.
 */
export const WHATSAPP_NOVIOS = '';

export const NOVIOS = 'Miguel y María';

/** Programa por día: [hora, título, detalle] */
export const PROGRAMA = {
  '25': [
    ['20H00', 'Saque del Niño Manuelito Buenaventura', 'Desde la comunidad de Cuisana. Iniciamos la fiesta acompañando al Niño.'],
  ],
  '26': [
    ['12H00', 'Saque de los novios y del niño bautizado', 'Con mucha alegría compartiremos este tradicional momento.'],
    ['15H00', 'Saque de la Virgencita del Quinche', 'Desde la comunidad de Itualo, con la banda de músicos La Elegancia.'],
    ['18H00', 'Santa Misa, matrimonio y bautizo', 'En la parroquia de Chugchilán, con la banda de músicos La Selecta.'],
    ['Luego', 'Recepción', 'Después de la celebración religiosa, en la comunidad La Moya, sector Moya Alta.'],
  ],
  '27': [
    ['Día', 'Prioste en la comunidad La Moya', 'Con la banda de músicos Los Sabrosos y diversos actos culturales para compartir en comunidad.'],
  ],
};

/** Día que se muestra abierto al entrar a la pantalla del programa */
export const DIA_INICIAL = '26';

/** Lugares. `imagen` es relativa a la carpeta assets/img. `mapa` es lo que se busca en Google Maps. */
export const LUGARES = [
  {
    pestaña: 'Misa',
    cuando: 'Sábado 26 · 18H00',
    nombre: 'Parroquia de Chugchilán',
    detalle: 'Santa Misa, matrimonio y bautizo, con la banda de músicos La Selecta.',
    imagen: 'flores.jpg',
    mapa: 'Iglesia de Chugchilán Cotopaxi Ecuador',
  },
  {
    pestaña: 'Recepción y prioste',
    cuando: 'Sábado 26 y domingo 27',
    nombre: 'Comunidad La Moya',
    detalle: 'Recepción después de la misa y prioste del domingo, en el sector Moya Alta.',
    imagen: 'casa.jpg',
    mapa: 'La Moya Moya Alta Chugchilán Ecuador',
  },
];
