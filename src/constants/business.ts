export const BUSINESS_INFO = {
  name: 'Eurotermochiloe',
  tagline: 'Ventanas PVC a medida, con asesoría para definir la solución adecuada',
  concept: 'Precisión que se ve',
  whatsappDisplay: '+56 9 3499 1450',
  whatsappNumber: '56934991450',
  email: 'Eurotermochiloe@gmail.com',
  city: 'Castro',
  region: 'Chiloé, Chile',
  coverage: 'Toda la isla de Chiloé',
  logoPath: '/assets/aistudio/logo-eurotermo-color_95e891ae.png',
} as const;

export const HERO_WHATSAPP_MESSAGE =
  'Hola, quisiera recibir información sobre ventanas PVC para mi proyecto en Chiloé';

export const SERVICES_WHATSAPP_MESSAGE =
  'Hola, quisiera consultar por mi proyecto de ventanas PVC en Chiloé';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: 'Productos', href: '#productos' },
  { label: 'Visualizador', href: '#visualizador' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
] as const;
