import { useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductsSection } from './components/ProductsSection';
import { ServicesSection } from './components/ServicesSection';
import { DEFAULT_WINDOW_CONFIG } from './visualizer/constants';
import { WindowVisualizer } from './visualizer/WindowVisualizer';
import { WindowConfiguration, WindowType } from './visualizer/types';

export default function App() {
  const [windowConfig, setWindowConfig] = useState<WindowConfiguration>(DEFAULT_WINDOW_CONFIG);

  const handleSelectWindowTypeFromCatalog = (windowType: WindowType) => {
    setWindowConfig((prev) => ({
      ...prev,
      windowType,
    }));

    const visualizerEl = document.getElementById('visualizador');
    if (visualizerEl) {
      visualizerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResetVisualizer = () => {
    setWindowConfig(DEFAULT_WINDOW_CONFIG);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E1B18]">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#145A36] focus:text-white focus:rounded-md"
      >
        Ir al contenido principal
      </a>

      <Header />

      <main id="contenido-principal" className="flex-1">
        <Hero />
        <ProductsSection onSelectWindowType={handleSelectWindowTypeFromCatalog} />
        <WindowVisualizer
          config={windowConfig}
          onChange={setWindowConfig}
          onReset={handleResetVisualizer}
        />
        <ServicesSection />
        <GallerySection />
        <AboutSection />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
