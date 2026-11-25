import React, { useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import {
  BUSINESS_INFO,
  HERO_WHATSAPP_MESSAGE,
  NAV_LINKS,
  buildWhatsAppUrl,
} from '../constants/business';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const whatsappUrl = buildWhatsAppUrl(HERO_WHATSAPP_MESSAGE);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#8C4325]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Logo */}
        <a
          href="#inicio"
          aria-label="Eurotermochiloe — Ir al inicio"
          className="shrink-0 flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#145A36] rounded-sm"
        >
          <img
            src={BUSINESS_INFO.logoPath}
            alt="Logo de Eurotermochiloe Ventanas"
            className="h-9 sm:h-10 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Zone 2: Desktop Anchor Navigation */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-4 lg:gap-7"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#1E1B18]/85 hover:text-[#8C4325] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#8C4325] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#145A36]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary WhatsApp CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg bg-[#145A36] hover:bg-[#1B7547] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145A36]"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Cotizar por WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#1E1B18]/15 text-[#1E1B18] hover:bg-[#E8F5E9] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145A36]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Navegación móvil"
          className="md:hidden bg-white border-t border-[#1E1B18]/10 px-4 py-4 space-y-1 shadow-md"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#1E1B18] hover:bg-[#E8F5E9] hover:text-[#145A36] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
