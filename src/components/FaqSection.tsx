import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'tipos',
    question: '¿Qué tipos de ventanas fabrican?',
    answer:
      'Fabricamos ventanas de PVC en cuatro tipologías principales: abatibles, correderas, paño fijo y oscilobatientes, adaptadas a las medidas de cada proyecto.',
  },
  {
    id: 'instalacion',
    question: '¿Realizan instalación?',
    answer:
      'Sí, ofrecemos el servicio de instalación de ventanas de PVC, coordinando previamente la revisión de medidas y condiciones de tu proyecto.',
  },
  {
    id: 'reparacion',
    question: '¿Realizan reparaciones?',
    answer:
      'Sí, atendemos consultas relacionadas con la reparación de ventanas. Puedes escribirnos por WhatsApp para contarnos tu caso y evaluar la solución.',
  },
  {
    id: 'cobertura',
    question: '¿Trabajan en toda la isla de Chiloé?',
    answer:
      'Sí. Estamos ubicados en Castro y contamos con cobertura en toda la isla de Chiloé.',
  },
  {
    id: 'presupuesto',
    question: '¿Cómo puedo solicitar un presupuesto?',
    answer:
      'Puedes escribirnos por WhatsApp para conversar sobre tu proyecto y coordinar una visita de revisión.',
  },
  {
    id: 'tiempo',
    question: '¿Cuánto tiempo demora la fabricación?',
    answer:
      'El tiempo depende de las características y requerimientos de cada proyecto. Para recibir una orientación, puedes contactarnos y coordinar una evaluación.',
  },
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-16 md:py-24 bg-[#E8F5E9]/35 border-t border-[#145A36]/10"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-medium text-[#8C4325] mb-2">Preguntas frecuentes</p>
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1E1B18]"
          >
            Dudas habituales sobre nuestros servicios
          </h2>
        </div>

        <div className="divide-y divide-[#1E1B18]/12 border-y border-[#1E1B18]/12 bg-white rounded-xl border border-[#1E1B18]/12 px-5 sm:px-7">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <div key={item.id} className="py-4 sm:py-5">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between gap-4 text-left py-1 text-base sm:text-lg font-semibold text-[#1E1B18] hover:text-[#145A36] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145A36]"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-[#145A36] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="mt-2.5 pr-8 text-sm sm:text-base text-[#1E1B18]/80 leading-relaxed"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
