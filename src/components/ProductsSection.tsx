import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { WINDOW_TYPE_OPTIONS } from '../visualizer/constants';
import { WindowType } from '../visualizer/types';

interface ProductsSectionProps {
  onSelectWindowType: (type: WindowType) => void;
}

const PRODUCT_IMAGES: Record<WindowType, { src: string; alt: string }> = {
  abatible: {
    src: '/src/assets/images/product_abatible_pvc_1795569681975.jpg',
    alt: 'Fotografía referencial de ventana PVC abatible abierta hacia el interior con paisaje verde exterior',
  },
  corredera: {
    src: '/src/assets/images/product_corredera_pvc_1795569682582.jpg',
    alt: 'Fotografía referencial de ventana PVC corredera horizontal en muro interior con marco de madera',
  },
  pano_fijo: {
    src: '/src/assets/images/product_panofijo_pvc_1795569683212.jpg',
    alt: 'Fotografía referencial de ventana PVC paño fijo de gran tamaño con vista panorámica costera',
  },
  oscilobatiente: {
    src: '/src/assets/images/product_oscilobatiente_pvc_1795569683069.jpg',
    alt: 'Fotografía referencial de ventana PVC oscilobatiente inclinada en su parte superior para ventilar',
  },
};

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onSelectWindowType }) => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section id="productos" aria-labelledby="productos-heading" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#8C4325] mb-2">Tipos de ventanas PVC</p>
            <h2
              id="productos-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1E1B18]"
            >
              Encuentra la ventana adecuada para tu espacio
            </h2>
          </div>
          <p className="text-sm text-[#1E1B18]/70 max-w-sm">
            Imágenes referenciales de cada tipología. Selecciona un modelo para configurarlo en el
            visualizador 2D.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WINDOW_TYPE_OPTIONS.map((product) => {
            const media = PRODUCT_IMAGES[product.id];
            const hasFailed = Boolean(failedImages[product.id]);

            return (
              <article
                key={product.id}
                className="flex flex-col justify-between bg-white border border-[#1E1B18]/12 rounded-xl overflow-hidden hover:border-[#145A36]/50 transition-colors"
              >
                <div>
                  <div className="aspect-[4/3] w-full bg-[#E8F5E9]/50 overflow-hidden border-b border-[#1E1B18]/10">
                    {hasFailed ? (
                      <div className="w-full h-full flex items-center justify-center p-4 text-center text-xs text-[#145A36] font-medium">
                        Ventana {product.label}
                      </div>
                    ) : (
                      <img
                        src={media.src}
                        alt={media.alt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [product.id]: true }))
                        }
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="p-5 pb-0">
                    <h3 className="text-lg font-bold text-[#1E1B18]">{product.label}</h3>
                    <p className="mt-2 text-sm text-[#1E1B18]/75 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-4 mt-5 border-t border-[#1E1B18]/10">
                  <button
                    type="button"
                    onClick={() => onSelectWindowType(product.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#145A36]/30 text-[#145A36] hover:bg-[#145A36] hover:text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145A36]"
                  >
                    <SlidersHorizontal className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Configurar en visualizador</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
