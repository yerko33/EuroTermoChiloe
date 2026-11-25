import {
  DistributionOption,
  FinishOption,
  WindowConfiguration,
  WindowTypeOption,
} from './types';

export const VISUALIZER_BOUNDS = {
  minWidthCm: 40,
  maxWidthCm: 300,
  minHeightCm: 40,
  maxHeightCm: 240,
  stepCm: 5,
} as const;

export const DEFAULT_WINDOW_CONFIG: WindowConfiguration = {
  windowType: 'abatible',
  widthCm: 120,
  heightCm: 100,
  finish: 'blanco',
  distribution: '2_hojas',
};

export const WINDOW_TYPE_OPTIONS: WindowTypeOption[] = [
  {
    id: 'abatible',
    label: 'Abatible',
    shortDescription:
      'Apertura lateral mediante bisagras para una ventilación amplia del vano.',
    openingHint: 'Líneas punteadas indican sentido de giro lateral hacia bisagras.',
  },
  {
    id: 'corredera',
    label: 'Corredera',
    shortDescription:
      'Hojas que se deslizan horizontalmente sobre rieles sin ocupar espacio al abrir.',
    openingHint: 'Flechas horizontales indican deslizamiento referencial de hojas.',
  },
  {
    id: 'pano_fijo',
    label: 'Paño fijo',
    shortDescription:
      'Marco acristalado sin hojas móviles, enfocado en luz natural y vistas limpias.',
    openingHint: 'Paño cerrado sin mecanismo de apertura.',
  },
  {
    id: 'oscilobatiente',
    label: 'Oscilobatiente',
    shortDescription:
      'Doble apertura: abatimiento lateral completo o inclinación superior controlada.',
    openingHint: 'Combina giro lateral e inclinación superior referencial.',
  },
];

// Acabados provisionales hasta recibir la carta oficial de Eurotermochiloe
export const FINISH_OPTIONS: FinishOption[] = [
  {
    id: 'blanco',
    label: 'Blanco (referencial)',
    frameHex: '#F7F8F7',
    frameStrokeHex: '#CBD2CC',
    innerDetailHex: '#DDE3DE',
  },
  {
    id: 'roble',
    label: 'Tono madera (referencial)',
    frameHex: '#8C4325',
    frameStrokeHex: '#5F2B16',
    innerDetailHex: '#A75837',
    isWoodTone: true,
  },
  {
    id: 'grafito',
    label: 'Gris grafito (referencial)',
    frameHex: '#3A3E42',
    frameStrokeHex: '#232629',
    innerDetailHex: '#53585D',
  },
  {
    id: 'verde_profundo',
    label: 'Verde oscuro (referencial)',
    frameHex: '#145A36',
    frameStrokeHex: '#0C3B22',
    innerDetailHex: '#1B7547',
  },
  {
    id: 'negro_mate',
    label: 'Negro mate (referencial)',
    frameHex: '#1E1B18',
    frameStrokeHex: '#0F0D0C',
    innerDetailHex: '#36312C',
  },
];

export const DISTRIBUTION_OPTIONS: DistributionOption[] = [
  {
    id: '1_hoja',
    label: '1 hoja / paño único',
    description: 'Superficie continua sin divisiones intermedias.',
  },
  {
    id: '2_hojas',
    label: '2 hojas verticales',
    description: 'División central vertical en dos módulos simétricos.',
  },
  {
    id: '3_hojas',
    label: '3 hojas verticales',
    description: 'Tres módulos verticales alineados para vanos más anchos.',
  },
  {
    id: '2_hojas_montante',
    label: '2 hojas + montante superior',
    description: 'División vertical inferior con paño fijo superior horizontal.',
  },
  {
    id: 'cuadricula_2x2',
    label: 'División en cuadrícula (2x2)',
    description: 'Cuatro paños organizados con perfil vertical y horizontal.',
  },
];

export function buildVisualizerWhatsAppMessage(config: WindowConfiguration): string {
  const windowTypeLabel =
    WINDOW_TYPE_OPTIONS.find((item) => item.id === config.windowType)?.label.toLowerCase() ??
    config.windowType;
  const finishLabel =
    FINISH_OPTIONS.find((item) => item.id === config.finish)?.label ?? config.finish;
  const distributionLabel =
    DISTRIBUTION_OPTIONS.find((item) => item.id === config.distribution)?.label ??
    config.distribution;

  return [
    'Hola, quisiera consultar por una ventana PVC con estas características:',
    `Tipo: ${windowTypeLabel}.`,
    `Ancho aproximado: ${config.widthCm} cm.`,
    `Alto aproximado: ${config.heightCm} cm.`,
    `Acabado: ${finishLabel}.`,
    `Distribución: ${distributionLabel}.`,
    'Quisiera coordinar una visita para revisar mi proyecto.',
  ].join('\n');
}
