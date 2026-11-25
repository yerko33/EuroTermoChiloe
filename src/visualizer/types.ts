export type WindowType = 'abatible' | 'corredera' | 'pano_fijo' | 'oscilobatiente';

export type FinishId =
  | 'blanco'
  | 'roble'
  | 'grafito'
  | 'verde_profundo'
  | 'negro_mate';

export type LayoutDistributionId =
  | '1_hoja'
  | '2_hojas'
  | '3_hojas'
  | '2_hojas_montante'
  | 'cuadricula_2x2';

export interface WindowConfiguration {
  windowType: WindowType;
  widthCm: number;
  heightCm: number;
  finish: FinishId;
  distribution: LayoutDistributionId;
}

export interface WindowTypeOption {
  id: WindowType;
  label: string;
  shortDescription: string;
  openingHint: string;
}

export interface FinishOption {
  id: FinishId;
  label: string;
  frameHex: string;
  frameStrokeHex: string;
  innerDetailHex: string;
  isWoodTone?: boolean;
}

export interface DistributionOption {
  id: LayoutDistributionId;
  label: string;
  description: string;
}
