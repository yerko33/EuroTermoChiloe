import React from 'react';
import { ArrowDownRight, MessageCircle } from 'lucide-react';
import { HERO_WHATSAPP_MESSAGE, buildWhatsAppUrl } from '../constants/business';

export const Hero: React.FC = () => {
  const whatsappUrl = buildWhatsAppUrl(HERO_WHATSAPP_MESSAGE);

  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 md:pt-16 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-sm font-medium text-[#8C4325] mb-4">
              Castro · Cobertura en toda la isla de Chiloé
            </p>

            <h1
              id="hero-heading"
              className="font-bold tracking-tight text-[#1E1B18] leading-[1.1] text-balance"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.4rem)' }}
            >
              Ventanas PVC a medida para tus espacios
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#1E1B18]/80 leading-relaxed max-w-xl">
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-[#1E1B18]/20 bg-white hover:bg-[#E8F5E9] text-[#1E1B18] text-sm sm:text-base font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145A36]"
              >
                <span>Explorar ventanas</span>
                <ArrowDownRight className="w-4 h-4 shrink-0 text-[#145A36]" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Conceptual Architectural Window Composition (Placeholder for real client photo) */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 rounded-xl border border-[#1E1B18]/12 bg-[#E8F5E9]/45 p-5 sm:p-8 flex flex-col justify-between min-h-[300px] lg:min-h-[390px]">
              {/* Architectural daylight window scene SVG */}
              <div className="flex-1 flex items-center justify-center">
                <svg
                  viewBox="0 0 520 340"
                  className="w-full h-auto max-w-[490px]"
                  role="img"
                  aria-label="Ilustración arquitectónica conceptual de una ventana PVC residencial con luz natural"
                >
                  <defs>
                    <linearGradient id="chiloe-sky" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#DCEFE0" />
                      <stop offset="65%" stopColor="#E8F5E9" />
                      <stop offset="100%" stopColor="#C8E6C9" />
                    </linearGradient>
                    <linearGradient id="daylight-beam" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Architectural wall frame */}
                  <rect
                    x="18"
                    y="16"
                    width="484"
                    height="292"
                    fill="#FFFFFF"
                    stroke="#1E1B18"
                    strokeOpacity="0.14"
                    strokeWidth="1"
                  />

                  {/* Landscape horizon inside window */}
                  <rect x="64" y="42" width="392" height="226" fill="url(#chiloe-sky)" />
                  <path
                    d="M64 214 Q145 186 240 202 T456 196 L456 268 L64 268 Z"
                    fill="#1B7547"
                    fillOpacity="0.16"
                  />
                  <path
                    d="M64 236 Q180 218 295 234 T456 226 L456 268 L64 268 Z"
                    fill="#145A36"
                    fillOpacity="0.22"
                  />

                  {/* Subtle daylight sweep */}
                  <polygon points="64,42 290,42 180,268 64,268" fill="url(#daylight-beam)" />

                  {/* Outer PVC Window Frame */}
                  <rect
                    x="56"
                    y="34"
                    width="408"
                    height="242"
                    fill="none"
                    stroke="#1E1B18"
                    strokeWidth="14"
                  />
                  <rect
                    x="56"
                    y="34"
                    width="408"
                    height="242"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="10"
                  />
                  <rect
                    x="56"
                    y="34"
                    width="408"
                    height="242"
                    fill="none"
                    stroke="#1E1B18"
                    strokeOpacity="0.28"
                    strokeWidth="1"
                  />

                  {/* Vertical Mullions (3-bay architectural composition) */}
                  <rect x="190" y="40" width="10" height="230" fill="#FFFFFF" stroke="#1E1B18" strokeOpacity="0.25" strokeWidth="1" />
                  <rect x="330" y="40" width="10" height="230" fill="#FFFFFF" stroke="#1E1B18" strokeOpacity="0.25" strokeWidth="1" />

                  {/* Upper Transom Bar */}
                  <rect x="62" y="102" width="396" height="8" fill="#FFFFFF" stroke="#1E1B18" strokeOpacity="0.25" strokeWidth="1" />

                  {/* Subtle opening hint on right lower sash */}
                  <polyline
                    points="344,114 446,188 344,264"
                    fill="none"
                    stroke="#145A36"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                    strokeOpacity="0.55"
                  />

                  {/* Window Handles */}
                  <rect x="182" y="182" width="4" height="16" rx="1.5" fill="#1E1B18" />
                  <rect x="344" y="182" width="4" height="16" rx="1.5" fill="#1E1B18" />

                  {/* Architectural Sill */}
                  <rect
                    x="44"
                    y="276"
                    width="432"
                    height="10"
                    fill="#8C4325"
                    fillOpacity="0.88"
                  />

                  {/* Subtle precision dimension tick lines */}
                  <g stroke="#8C4325" strokeOpacity="0.55" strokeWidth="1">
                    <line x1="56" y1="18" x2="464" y2="18" />
                    <line x1="56" y1="13" x2="56" y2="23" />
                    <line x1="464" y1="13" x2="464" y2="23" />
                  </g>
                </svg>
              </div>

              <p className="mt-4 pt-3 border-t border-[#145A36]/15 text-xs text-[#1E1B18]/70 text-center">
                Composición arquitectónica conceptual · Espacio reservado para fotografía real de
                Eurotermochiloe
              </p>
            </div>
          </div>
        </div>

        {/* Full-Width Architectural Value Strip */}
        <div className="mt-10 md:mt-14 pt-6 border-t border-[#1E1B18]/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
