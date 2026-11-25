import React, { useState } from 'react';

type GalleryCategory = 'todos' | 'productos' | 'perfiles' | 'instaladas';

interface GallerySlot {
  id: string;
  category: Exclude<GalleryCategory, 'todos'>;
  categoryLabel: string;
  title: string;
  caption: string;
  imageSrc: string;
  imageAlt: string;
  aspectClass: string;
  mediaHeightClass: string;
}

const FILTER_OPTIONS: Array<{ id: GalleryCategory; label: string }> = [
  { id: 'todos', label: 'Todos' },
  { id: 'productos', label: 'Productos' },
  { id: 'perfiles', label: 'Detalles de perfiles' },
  { id: 'instaladas', label: 'Ventanas instaladas' },
];

const GALLERY_SLOTS: GallerySlot[] = [
  {
    id: 'slot-1',
    category: 'instaladas',
    categoryLabel: 'Ventanas instaladas',
    title: 'Ventana en vano residencial',
    caption: 'Fotografía referencial · Espacio preparado para fotografía real de Eurotermochiloe',
    imageSrc: '/src/assets/images/gallery_vano_residencial_1795569683782.jpg',
    imageAlt: 'Fotografía referencial de ventanal PVC blanco instalado en vivienda de madera con vista costera',
    aspectClass: 'md:col-span-2',
    mediaHeightClass: 'aspect-[16/9] md:aspect-[21/10]',
  },
  {
    id: 'slot-2',
    category: 'perfiles',
    categoryLabel: 'Detalles de perfiles',
    title: 'Encuentro de marco y hoja PVC',
    caption: 'Fotografía referencial · Espacio preparado para fotografía real de Eurotermochiloe',
    imageSrc: '/src/assets/images/gallery_perfil_pvc_1795569683773.jpg',
    imageAlt: 'Fotografía referencial de corte transversal de perfil PVC multicámara con sellos y esquina soldada',
    aspectClass: '',
    mediaHeightClass: 'aspect-[4/3]',
  },
  {
    id: 'slot-3',
    category: 'productos',
    categoryLabel: 'Productos',
    title: 'Ventana abatible de dos hojas',
    caption: 'Fotografía referencial · Espacio preparado para fotografía real de Eurotermochiloe',
    imageSrc: '/src/assets/images/gallery_abatible_doble_1795569684618.jpg',
    imageAlt: 'Fotografía referencial de ventana PVC abatible simétrica de dos hojas en habitación luminosa',
    aspectClass: '',
    mediaHeightClass: 'aspect-[4/3]',
  },
  {
    id: 'slot-4',
    category: 'productos',
    categoryLabel: 'Productos',
    title: 'Ventana corredera horizontal',
    caption: 'Fotografía referencial · Espacio preparado para fotografía real de Eurotermochiloe',
    imageSrc: '/src/assets/images/gallery_corredera_terraza_1795569684729.jpg',
    imageAlt: 'Fotografía referencial de ventana PVC corredera en comedor iluminado con vista al jardín',
    aspectClass: '',
    mediaHeightClass: 'aspect-[4/3]',
  },
  {
    id: 'slot-5',
    category: 'perfiles',
    categoryLabel: 'Detalles de perfiles',
    title: 'Terminación de esquina y junquillo',
    caption: 'Fotografía referencial · Espacio preparado para fotografía real de Eurotermochiloe',
    imageSrc: '/src/assets/images/gallery_esquina_junquillo_1795569685067.jpg',
    imageAlt: 'Fotografía referencial de detalle de unión a 45 grados y junquillo en perfil PVC tono madera',
    aspectClass: '',
    mediaHeightClass: 'aspect-[4/3]',
  },
  {
    id: 'slot-6',
    category: 'instaladas',
    categoryLabel: 'Ventanas instaladas',
    title: 'Paño fijo con vista exterior',
    caption: 'Fotografía referencial · Espacio preparado para fotografía real de Eurotermochiloe',
    imageSrc: '/src/assets/images/gallery_pano_fijo_exterior_1795569686063.jpg',
    imageAlt: 'Fotografía referencial de fachada residencial en madera con ventanas PVC oscuras de paño fijo',
    aspectClass: '',
    mediaHeightClass: 'aspect-[4/3]',
  },
];

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('todos');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const visibleItems =
    activeCategory === 'todos'
      ? GALLERY_SLOTS
      : GALLERY_SLOTS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="galeria"
      aria-labelledby="galeria-heading"
      className="py-16 md:py-24 bg-[#FBF7F4] border-t border-[#8C4325]/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#8C4325] mb-2">Galería preparada</p>
            <h2
              id="galeria-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1E1B18]"
            >
              Trabajos y ventanas
            </h2>
            <p className="mt-3 text-base text-[#1E1B18]/80 leading-relaxed">
              Muestra visual referencial preparada para reemplazar por las fotografías reales de
              productos, detalles de perfiles y ventanas instaladas por Eurotermochiloe.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="group"
            aria-label="Filtrar galería por categoría"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-[#1E1B18]/12 rounded-lg self-start lg:self-auto"
          >
            {FILTER_OPTIONS.map((filter) => {
              const active = activeCategory === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveCategory(filter.id)}
                  className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C4325] ${
                    active
                      ? 'bg-[#8C4325] text-white'
                      : 'text-[#1E1B18]/75 hover:text-[#8C4325] hover:bg-[#FBF7F4]'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleItems.map((slot) => {
            const isFeatured = activeCategory === 'todos' && slot.aspectClass === 'md:col-span-2';
            const hasFailed = Boolean(failedImages[slot.id]);

            return (
              <figure
                key={slot.id}
                className={`bg-white border border-[#8C4325]/15 rounded-xl overflow-hidden flex flex-col justify-between ${
                  activeCategory === 'todos' ? slot.aspectClass : ''
                }`}
              >
                <div
                  className={`w-full bg-[#E8F5E9]/45 overflow-hidden border-b border-[#1E1B18]/10 ${
                    isFeatured ? slot.mediaHeightClass : 'aspect-[4/3]'
                  }`}
                >
                  {hasFailed ? (
                    <div className="w-full h-full flex items-center justify-center p-6 text-center text-xs text-[#145A36] font-medium">
                      {slot.title}
                    </div>
                  ) : (
                    <img
                      src={slot.imageSrc}
                      alt={slot.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [slot.id]: true }))
                      }
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <figcaption className="p-5">
                  <p className="text-xs font-medium text-[#145A36]">{slot.categoryLabel}</p>
                  <h3 className="mt-1 text-base font-bold text-[#1E1B18]">{slot.title}</h3>
                  <p className="mt-1 text-xs text-[#1E1B18]/65">{slot.caption}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
};
