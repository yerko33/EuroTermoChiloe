import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SERVICES_WHATSAPP_MESSAGE, buildWhatsAppUrl } from '../constants/business';

const SERVICES = [
  {
    number: '01',
    title: 'Fabricación',
    description:
      'Fabricación de ventanas de PVC de acuerdo con las necesidades y medidas de cada proyecto.',
    detail: 'Definición de tipología, proporciones y terminaciones en conjunto contigo.',
  },
  {
    number: '02',
    title: 'Instalación',
    description: 'Servicio de instalación de ventanas de PVC.',
    detail: 'Coordinación previa para revisar el vano y ejecutar la instalación en terreno.',
  },
  {
    number: '03',
    title: 'Reparación',
    description: 'Atención de consultas relacionadas con reparación de ventanas.',
    detail: 'Evaluación directa de cada caso para orientarte sobre la alternativa adecuada.',
  },
] as const;

export const ServicesSection: React.FC = () => {
  const whatsappUrl = buildWhatsAppUrl(SERVICES_WHATSAPP_MESSAGE);

  return (
    <section id="servicios" aria-labelledby="servicios-heading" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Editorial Intro Column */}
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-[#8C4325] mb-2">Servicios</p>
            <h2
              id="servicios-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1E1B18] text-balance"
            >
              Soluciones para tus ventanas PVC
            </h2>
            <p className="mt-4 text-base text-[#1E1B18]/80 leading-relaxed">
              Acompañamos tu proyecto desde la revisión inicial de medidas hasta la instalación o
              atención por reparación en toda la isla de Chiloé.
            </p>

            <div className="mt-7">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#145A36] hover:bg-[#1B7547] text-white text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145A36]"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Consultar por mi proyecto</span>
              </a>
            </div>
          </div>

          {/* Numbered Services List */}
          <div className="lg:col-span-7 divide-y divide-[#8C4325]/20 border-y border-[#8C4325]/20">
            {SERVICES.map((service) => (
              <div
                key={service.number}
                className="py-6 sm:py-7 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8"
              >
                <span className="text-sm font-bold text-[#8C4325] tabular-nums shrink-0">
                  {service.number}.
                </span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#1E1B18]">{service.title}</h3>
                  <p className="mt-2 text-base text-[#1E1B18]/85 leading-relaxed">
                    {service.description}
                  </p>
                  <p className="mt-1.5 text-sm text-[#1E1B18]/65">{service.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
