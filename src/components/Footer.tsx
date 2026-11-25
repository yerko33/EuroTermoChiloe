import React from 'react';
import { BUSINESS_INFO, HERO_WHATSAPP_MESSAGE, NAV_LINKS, buildWhatsAppUrl } from '../constants/business';

export const Footer: React.FC = () => {
  const whatsappUrl = buildWhatsAppUrl(HERO_WHATSAPP_MESSAGE);

  return (
    <footer className="bg-white border-t border-[#1E1B18]/12 py-12 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#1E1B18]/10">
          {/* Brand Summary */}
          <div className="md:col-span-5 space-y-3">
            <img
              src={BUSINESS_INFO.logoPath}
              alt="Logo de Eurotermochiloe"
              className="h-10 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <p className="text-sm font-bold text-[#1E1B18] pt-1">{BUSINESS_INFO.name}</p>
            <p className="text-sm text-[#1E1B18]/75 max-w-sm leading-relaxed">
              Fabricación, instalación y reparación de ventanas de PVC a medida en Castro y toda la
              isla de Chiloé.
            </p>
          </div>

          {/* Anchor Links */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold text-[#1E1B18] mb-3">Navegación</h3>
            <ul className="space-y-2 text-sm text-[#1E1B18]/75">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-[#8C4325] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Coverage */}
          <div className="md:col-span-4 space-y-2 text-sm text-[#1E1B18]/80">
            <h3 className="text-sm font-bold text-[#1E1B18] mb-3">Contacto y cobertura</h3>
            <p>
              WhatsApp:{' '}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#145A36] hover:underline tabular-nums"
              >
                {BUSINESS_INFO.whatsappDisplay}
              </a>
            </p>
            <p>
              Correo:{' '}
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="font-semibold text-[#1E1B18] hover:text-[#145A36] hover:underline"
              >
                {BUSINESS_INFO.email}
              </a>
            </p>
            <p className="text-[#1E1B18]/70">
              {BUSINESS_INFO.city} · Cobertura en {BUSINESS_INFO.coverage.toLowerCase()}.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#1E1B18]/65">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. Todos los derechos reservados.</p>
          <p>{BUSINESS_INFO.concept}</p>
        </div>
      </div>
    </footer>
  );
};
