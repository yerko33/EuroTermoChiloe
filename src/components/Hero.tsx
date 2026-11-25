import React, { useState } from 'react';
import { ArrowDownRight, MessageCircle } from 'lucide-react';
import { HERO_WHATSAPP_MESSAGE, buildWhatsAppUrl } from '../constants/business';

const HERO_IMAGE_SRC = '/src/assets/images/hero_casa_ventanas_1795571708769.jpg';

export const Hero: React.FC = () => {
  const whatsappUrl = buildWhatsAppUrl(HERO_WHATSAPP_MESSAGE);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section id="inicio" aria-labelledby="hero-heading" className="bg-white">
      {/* Full-Bleed Hero Banner */}
      <div className="relative w-full min-h-[500px] sm:min-h-[540px] lg:min-h-[610px] flex items-center overflow-hidden bg-[#E8F5E9] border-b border-[#8C4325]/15">
        {/* Background House Photograph */}
        {!imageFailed && (
          <img
            src={HERO_IMAGE_SRC}
            alt="Fotografía referencial de casa residencial en paisaje costero del sur con ventanas PVC instaladas en ambos pisos"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className="absolute inset-0 w-full h-full object-cover object-[72%_center] md:object-center"
          />
        )}

        {/* Measured Light Scrim for High Contrast of Dark H1 (#1E1B18) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/45 lg:from-white/95 lg:via-white/78 lg:to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-white/75 via-transparent to-white/25 lg:hidden"
        />

        {/* Foreground Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-[#8C4325] mb-3">
              Castro · Cobertura en toda la isla de Chiloé
            </p>

            <h1
              id="hero-heading"
              className="font-bold tracking-tight text-[#1E1B18] leading-[1.08] text-balance"
              style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.5rem)' }}
            >
              Ventanas PVC a medida para tus espacios
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#1E1B18]/85 leading-relaxed">
              Fabricamos, instalamos y reparamos ventanas de PVC. Te asesoramos para definir una
              solución de acuerdo con las necesidades y medidas de tu proyecto.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#145A36] hover:bg-[#1B7547] text-white text-sm sm:text-base font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145A36]"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Cotizar por WhatsApp</span>
              </a>

              <a
                href="#productos"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-[#8C4325]/55 bg-white/90 hover:bg-[#8C4325] text-[#8C4325] hover:text-white text-sm sm:text-base font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C4325]"
              >
                <span>Explorar ventanas</span>
                <ArrowDownRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Subtle Referential Photo Notice */}
        <div className="absolute bottom-3 right-4 z-10 hidden sm:block">
          <p className="text-[11px] font-medium text-[#1E1B18]/80 bg-white/85 backdrop-blur-xs px-2.5 py-1 rounded">
            Fotografía referencial · Espacio preparado para fotografía real de Eurotermochiloe
          </p>
        </div>
      </div>

      {/* Full-Width Architectural Value Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm font-bold text-[#8C4325]">Precisión que se ve</p>
            <p className="mt-1 text-xs text-[#1E1B18]/75">
              Asesoría para definir la solución adecuada según tus medidas.
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-[#1E1B18]">Fabricación a medida</p>
            <p className="mt-1 text-xs text-[#1E1B18]/75">
              Ventanas de PVC fabricadas según los requerimientos de cada proyecto.
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-[#1E1B18]">Instalación y reparación</p>
            <p className="mt-1 text-xs text-[#1E1B18]/75">
              Servicio directo en vivienda particular y proyectos comerciales.
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-[#1E1B18]">Isla de Chiloé</p>
            <p className="mt-1 text-xs text-[#1E1B18]/75">
              Atención desde Castro con cobertura en toda la isla.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
