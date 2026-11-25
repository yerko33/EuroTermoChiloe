import React from 'react';
import { BUSINESS_INFO } from '../constants/business';

const PILLARS = [
  {
    title: 'Ubicación en Castro',
    description: 'Atención desde Castro para proyectos habitacionales y comerciales.',
  },
  {
    title: 'Cobertura en toda la isla de Chiloé',
    description: 'Disponibilidad para evaluar e instalar en distintos sectores de la isla.',
  },
  {
    title: 'Responsabilidad',
    description: 'Compromiso en la revisión de medidas y seguimiento de cada solicitud.',
  },
  {
    title: 'Eficiencia',
    description: 'Orientación clara para definir una solución acorde con el proyecto.',
  },
  {
    title: 'Calidad de servicio',
    description: 'Trato cercano en fabricación, instalación y atención de reparaciones.',
  },
] as const;

export const AboutSection: React.FC = () => {
  return (
    <section
      id="nosotros"
      aria-labelledby="nosotros-heading"
      className="py-16 md:py-24 bg-white border-t border-[#1E1B18]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-6">
            <p className="text-sm font-medium text-[#8C4325] mb-2">Sobre la empresa</p>
            <h2
              id="nosotros-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1E1B18]"
            >
              {BUSINESS_INFO.name}
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[#1E1B18]/85 leading-relaxed">
              Somos una empresa dedicada a la fabricación, instalación y reparación de ventanas de
              PVC en Chiloé. Trabajamos para orientar a cada cliente en la definición de una
              solución acorde con las necesidades y medidas de su proyecto.
            </p>
            <p className="mt-4 text-sm font-medium text-[#145A36]">
              {BUSINESS_INFO.concept} · {BUSINESS_INFO.tagline}
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 border-t lg:border-t-0 lg:border-l border-[#8C4325]/20 pt-8 lg:pt-0 lg:pl-10">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="pb-4 border-b border-[#8C4325]/15 last:border-b-0">
                <h3 className="text-base font-bold text-[#1E1B18]">{pillar.title}</h3>
                <p className="mt-1.5 text-sm text-[#1E1B18]/75 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
