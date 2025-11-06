import { Helmet, HelmetProvider } from 'react-helmet-async';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

// Atskiriame vidinę dalį, kad galėtume naudoti hook'ą
function AppContent() {
  const { lang } = useLanguage();

  return (
    <div className='bg-[#F8F7F4] text-[#2E2B29] font-sans'>
      <Helmet>
        <html lang={lang.toLowerCase()} />
        <title>
          {lang === 'LT'
            ? 'Kirpėja Virginija | Kirpimas ir plaukų priežiūra Kaune'
            : 'Hairdresser Virginija | Haircuts and care in Kaunas'}
        </title>
        <meta
          name='description'
          content={
            lang === 'LT'
              ? 'Kirpėja Virginija – profesionalus moterų ir vyrų kirpimas, dažymas, barzdos modeliavimas bei plaukų priežiūra Kaune. Jauki atmosfera ir dėmesys detalėms.'
              : 'Hairdresser Virginija – professional men’s and women’s haircuts, coloring, beard styling and care in Kaunas. Cozy atmosphere and attention to detail.'
          }
        />
        <meta
          name='keywords'
          content={
            lang === 'LT'
              ? 'kirpėja Kaune, vyriškas kirpimas, moterų kirpimas, plaukų dažymas, kirpykla, Kaunas'
              : 'hairdresser Kaunas, men haircut, women haircut, hair coloring, barbershop, Lithuania'
          }
        />
      </Helmet>

      <Header />
      <Hero />
      <Services />
      <Gallery />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </HelmetProvider>
  );
}
