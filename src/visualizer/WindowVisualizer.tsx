import React from 'react';
import { Info, MessageCircle, RotateCcw } from 'lucide-react';
import { buildWhatsAppUrl } from '../constants/business';
import {
  DISTRIBUTION_OPTIONS,
  FINISH_OPTIONS,
  VISUALIZER_BOUNDS,
  WINDOW_TYPE_OPTIONS,
  buildVisualizerWhatsAppMessage,
} from './constants';
import { WindowSvgPreview } from './WindowSvgPreview';
import { WindowConfiguration } from './types';

interface WindowVisualizerProps {
  config: WindowConfiguration;
  onChange: (next: WindowConfiguration) => void;
  onReset: () => void;
}

export const WindowVisualizer: React.FC<WindowVisualizerProps> = ({
  config,
  onChange,
  onReset,
}) => {
  const activeType = WINDOW_TYPE_OPTIONS.find((item) => item.id === config.windowType);
  const activeFinish = FINISH_OPTIONS.find((item) => item.id === config.finish);
  const activeDistribution = DISTRIBUTION_OPTIONS.find(
    (item) => item.id === config.distribution
  );

  const handleDimensionInput = (field: 'widthCm' | 'heightCm', raw: string) => {
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) return;
    const min =
      field === 'widthCm' ? VISUALIZER_BOUNDS.minWidthCm : VISUALIZER_BOUNDS.minHeightCm;
    const max =
      field === 'widthCm' ? VISUALIZER_BOUNDS.maxWidthCm : VISUALIZER_BOUNDS.maxHeightCm;
    const clamped = Math.max(min, Math.min(max, Math.round(parsed)));
    onChange({ ...config, [field]: clamped });
  };

  const whatsappHref = buildWhatsAppUrl(buildVisualizerWhatsAppMessage(config));

  return (
    <section
      id="visualizador"
      aria-labelledby="visualizador-heading"
      className="py-16 md:py-24 bg-[#E8F5E9]/50 border-y border-[#8C4325]/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 md:mb-12">
          <p className="text-sm font-medium text-[#8C4325] mb-2">
            Visualizador 2D referencial
          </p>
          <h2
            id="visualizador-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1E1B18]"
          >
            Explora la configuración de tu ventana
          </h2>
          <p className="mt-3 text-base text-[#1E1B18]/80 leading-relaxed">
            Selecciona el tipo de apertura, ajusta medidas aproximadas y prueba una distribución
            esquemática para enviarnos tu referencia por WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 2D Schematic Viewport + Live Summary */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white border border-[#1E1B18]/12 rounded-xl p-5 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#1E1B18]/10">
                <span className="text-sm font-semibold text-[#1E1B18]">
                  Vista frontal esquemática
                </span>
                <span className="text-xs text-[#1E1B18]/65 tabular-nums">
                  Proporción referencial {config.widthCm} × {config.heightCm} cm
                </span>
              </div>

              <div className="architectural-grid rounded-lg border border-[#145A36]/12 bg-white p-2 sm:p-4 flex items-center justify-center min-h-[260px] sm:min-h-[360px]">
                <WindowSvgPreview config={config} />
              </div>

              <div className="mt-4 pt-3 border-t border-[#1E1B18]/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#1E1B18]/75">
                <span>{activeType?.openingHint}</span>
                <span className="text-[#8C4325] font-medium">Esquema no técnico</span>
              </div>
            </div>

            {/* Dynamic Configuration Summary & Actions */}
            <div className="bg-white border border-[#1E1B18]/12 rounded-xl p-5 sm:p-6">
              <h3 className="text-base font-bold text-[#1E1B18] mb-4">
                Resumen de configuración
              </h3>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm border-b border-[#1E1B18]/10 pb-5 mb-5">
                <div className="flex justify-between sm:block">
                  <dt className="text-[#1E1B18]/60 text-xs">Tipo de ventana</dt>
                  <dd className="font-semibold text-[#1E1B18] mt-0.5">{activeType?.label}</dd>
                </div>
                <div className="flex justify-between sm:block">
                  <dt className="text-[#1E1B18]/60 text-xs">Distribución</dt>
                  <dd className="font-semibold text-[#1E1B18] mt-0.5">
                    {activeDistribution?.label}
                  </dd>
                </div>
                <div className="flex justify-between sm:block">
                  <dt className="text-[#1E1B18]/60 text-xs">Ancho aproximado</dt>
                  <dd className="font-semibold text-[#1E1B18] mt-0.5 tabular-nums">
                    {config.widthCm} cm
                  </dd>
                </div>
                <div className="flex justify-between sm:block">
                  <dt className="text-[#1E1B18]/60 text-xs">Alto aproximado</dt>
                  <dd className="font-semibold text-[#1E1B18] mt-0.5 tabular-nums">
                    {config.heightCm} cm
                  </dd>
                </div>
                <div className="sm:col-span-2 flex justify-between sm:block">
                  <dt className="text-[#1E1B18]/60 text-xs">Acabado seleccionado</dt>
                  <dd className="font-semibold text-[#1E1B18] mt-0.5 flex items-center gap-2">
                    <span
                      className="inline-block w-3.5 h-3.5 rounded-sm border border-[#1E1B18]/25 shrink-0"
                      style={{ backgroundColor: activeFinish?.frameHex }}
                      aria-hidden="true"
                    />
                    <span>{activeFinish?.label}</span>
                  </dd>
                </div>
              </dl>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#145A36] hover:bg-[#1B7547] text-white text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145A36]"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Enviar configuración por WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={onReset}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#1E1B18]/20 bg-white hover:bg-[#E8F5E9] text-[#1E1B18] text-sm font-medium transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145A36]"
                >
                  <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Reiniciar configuración</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Controls */}
          <div className="lg:col-span-5 bg-white border border-[#1E1B18]/12 rounded-xl p-5 sm:p-6 space-y-7">
            {/* 1. Tipo de ventana */}
            <fieldset>
              <legend className="text-sm font-bold text-[#1E1B18] mb-3">
                1. Tipo de ventana
              </legend>
              <div className="grid grid-cols-2 gap-2.5">
                {WINDOW_TYPE_OPTIONS.map((option) => {
                  const selected = config.windowType === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onChange({ ...config, windowType: option.id })}
                      className={`px-3.5 py-2.5 text-left rounded-lg border text-sm font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C4325] ${
                        selected
                          ? 'bg-[#8C4325] border-[#8C4325] text-white'
                          : 'bg-white border-[#1E1B18]/15 text-[#1E1B18] hover:border-[#8C4325] hover:bg-[#FBF7F4]'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* 2. Dimensiones aproximadas */}
            <div className="space-y-4 pt-2 border-t border-[#1E1B18]/10">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-bold text-[#1E1B18]">
                  2. Dimensiones aproximadas (cm)
                </span>
                <span className="text-xs text-[#1E1B18]/60">Valores referenciales</span>
              </div>

              {/* Width */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="viz-width-input" className="text-xs font-medium text-[#1E1B18]/80">
                    Ancho aproximado
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      id="viz-width-input"
                      type="number"
                      min={VISUALIZER_BOUNDS.minWidthCm}
                      max={VISUALIZER_BOUNDS.maxWidthCm}
                      step={VISUALIZER_BOUNDS.stepCm}
                      value={config.widthCm}
                      onChange={(e) => handleDimensionInput('widthCm', e.target.value)}
                      className="w-18 px-2 py-1 text-right text-sm font-semibold tabular-nums border border-[#1E1B18]/20 rounded-md focus:outline-2 focus:outline-[#145A36]"
                    />
                    <span className="text-xs text-[#1E1B18]/70">cm</span>
                  </div>
                </div>
                <input
                  type="range"
                  aria-label="Selector deslizante de ancho aproximado en centímetros"
                  min={VISUALIZER_BOUNDS.minWidthCm}
                  max={VISUALIZER_BOUNDS.maxWidthCm}
                  step={VISUALIZER_BOUNDS.stepCm}
                  value={config.widthCm}
                  onChange={(e) => handleDimensionInput('widthCm', e.target.value)}
                  className="w-full accent-[#8C4325] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#1E1B18]/55 tabular-nums">
                  <span>{VISUALIZER_BOUNDS.minWidthCm} cm</span>
                  <span>{VISUALIZER_BOUNDS.maxWidthCm} cm</span>
                </div>
              </div>

              {/* Height */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="viz-height-input" className="text-xs font-medium text-[#1E1B18]/80">
                    Alto aproximado
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      id="viz-height-input"
                      type="number"
                      min={VISUALIZER_BOUNDS.minHeightCm}
                      max={VISUALIZER_BOUNDS.maxHeightCm}
                      step={VISUALIZER_BOUNDS.stepCm}
                      value={config.heightCm}
                      onChange={(e) => handleDimensionInput('heightCm', e.target.value)}
                      className="w-18 px-2 py-1 text-right text-sm font-semibold tabular-nums border border-[#1E1B18]/20 rounded-md focus:outline-2 focus:outline-[#145A36]"
                    />
                    <span className="text-xs text-[#1E1B18]/70">cm</span>
                  </div>
                </div>
                <input
                  type="range"
                  aria-label="Selector deslizante de alto aproximado en centímetros"
                  min={VISUALIZER_BOUNDS.minHeightCm}
                  max={VISUALIZER_BOUNDS.maxHeightCm}
                  step={VISUALIZER_BOUNDS.stepCm}
                  value={config.heightCm}
                  onChange={(e) => handleDimensionInput('heightCm', e.target.value)}
                  className="w-full accent-[#8C4325] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#1E1B18]/55 tabular-nums">
                  <span>{VISUALIZER_BOUNDS.minHeightCm} cm</span>
                  <span>{VISUALIZER_BOUNDS.maxHeightCm} cm</span>
                </div>
              </div>
            </div>

            {/* 3. Acabado del marco (Provisional) */}
            <fieldset className="pt-2 border-t border-[#1E1B18]/10">
              <legend className="text-sm font-bold text-[#1E1B18] mb-1">
                3. Color o acabado del marco
              </legend>
              <p className="text-xs text-[#1E1B18]/65 mb-3">
                Muestras provisionales sujetas a confirmación según carta de acabados de
                Eurotermochiloe.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {FINISH_OPTIONS.map((finishOption) => {
                  const selected = config.finish === finishOption.id;
                  return (
                    <button
                      key={finishOption.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onChange({ ...config, finish: finishOption.id })}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-xs font-medium text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145A36] ${
                        selected
                          ? 'border-[#145A36] bg-[#E8F5E9] text-[#1E1B18] font-semibold'
                          : 'border-[#1E1B18]/15 bg-white text-[#1E1B18]/85 hover:border-[#1B7547]'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded border border-[#1E1B18]/25 shrink-0"
                        style={{ backgroundColor: finishOption.frameHex }}
                        aria-hidden="true"
                      />
                      <span className="truncate">{finishOption.label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* 4. Distribución de hojas y divisiones */}
            <fieldset className="pt-2 border-t border-[#1E1B18]/10">
              <legend className="text-sm font-bold text-[#1E1B18] mb-1">
                4. Distribución de hojas y divisiones
              </legend>
              <p className="text-xs text-[#1E1B18]/65 mb-3">
                Alternativas referenciales sujetas a evaluación y factibilidad técnica.
              </p>
              <div className="space-y-2">
                {DISTRIBUTION_OPTIONS.map((dist) => {
                  const selected = config.distribution === dist.id;
                  return (
                    <button
                      key={dist.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onChange({ ...config, distribution: dist.id })}
                      className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg border text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145A36] ${
                        selected
                          ? 'border-[#145A36] bg-[#E8F5E9] text-[#1E1B18]'
                          : 'border-[#1E1B18]/15 bg-white text-[#1E1B18] hover:border-[#1B7547]'
                      }`}
                    >
                      <span className="text-sm font-medium">{dist.label}</span>
                      <span className="text-[11px] text-[#1E1B18]/65 hidden sm:inline">
                        {selected ? 'Seleccionada' : 'Elegir'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>
        </div>

        {/* Mandatory Visible Disclaimer */}
        <div
          role="note"
          aria-label="Advertencia sobre configuración referencial"
          className="mt-8 bg-[#FBF7F4] border border-[#8C4325]/30 rounded-xl p-4 sm:p-5 flex items-start gap-3"
        >
          <Info className="w-5 h-5 text-[#8C4325] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs sm:text-sm text-[#1E1B18]/85 leading-relaxed">
            Este visualizador permite explorar configuraciones referenciales. No constituye un
            plano técnico, una validación de fabricación ni una cotización. Las medidas,
            materiales, acabados y distribuciones deben ser revisados por Eurotermochiloe.
          </p>
        </div>
      </div>
    </section>
  );
};
