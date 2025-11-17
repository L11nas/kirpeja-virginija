import { Helmet, HelmetProvider } from 'react-helmet-async';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

function AppContent() {
  const { lang } = useLanguage();

  const isLT = lang === 'LT';
  const baseUrl = 'https://kirpeja-virginija.lt';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: 'Kirpėja Virginija',
    image: `${baseUrl}/img/hero-bg.webp`,
    url: baseUrl,
    telephone: '+37065460937',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pramonės pr. 15A',
      addressLocality: 'Kaunas',
      addressCountry: 'LT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 54.8985,
      longitude: 23.9036,
    },
    openingHours: ['Mo-Fr 09:00-19:00', 'Sa 09:00-15:00'],
    priceRange: '€€',
    sameAs: [
      'https://book.treatwell.lt/salonas/kirpeja-virginija/',
      'https://www.facebook.com/people/Kirp%C4%97ja-Virginija/61582796560584/',
      'https://www.instagram.com/kirpejavirginija',
    ],
  };

  return (
    <div className='bg-[#F8F7F4] text-[#2E2B29] font-sans'>
      <Helmet>
        {/* Correct HTML lang */}
        <html lang={isLT ? 'lt' : 'en'} />

        {/* Canonical */}
        <link rel='canonical' href={baseUrl} />
        <meta name='robots' content='index, follow' />
        <meta name='theme-color' content='#C1A173' />

        {/* SEO Title + Desc */}
        <title>
          {isLT
            ? 'Kirpėja Virginija | Kirpimas ir plaukų priežiūra Kaune'
            : 'Hairdresser Virginija | Haircuts and care in Kaunas'}
        </title>

        <meta
          name='description'
          content={
            isLT
              ? 'Kirpėja Virginija – profesionalus kirpimas, dažymas, barzdos modeliavimas ir plaukų priežiūra Kaune.'
              : 'Hairdresser Virginija – professional haircuts, coloring, beard styling and care in Kaunas.'
          }
        />

        {/* Open Graph */}
        <meta property='og:type' content='website' />
        <meta property='og:url' content={baseUrl} />
        <meta
          property='og:title'
          content={
            isLT
              ? 'Kirpėja Virginija – kirpimo paslaugos Kaune'
              : 'Hairdresser Virginija – hairdressing services in Kaunas'
          }
        />
        <meta
          property='og:description'
          content={
            isLT
              ? 'Vyriškas, moteriškas ir vaikų kirpimas, dažymas ir barzdos modeliavimas.'
              : 'Men’s, women’s, children’s haircuts, coloring and beard styling.'
          }
        />
        <meta property='og:image' content={`${baseUrl}/img/hero-bg.webp`} />
        <meta property='og:locale' content={isLT ? 'lt_LT' : 'en_GB'} />

        {/* Hreflang (tik tos kalbos kurias turi!) */}
        <link rel='alternate' hrefLang='lt' href={baseUrl} />

        {/* GEO */}
        <meta name='geo.region' content='LT-KU' />
        <meta name='geo.placename' content='Kaunas' />
        <meta name='geo.position' content='54.8985;23.9036' />

        {/* JSON-LD */}
        <script type='application/ld+json'>
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <Header />

      {/* MAIN LANDMARK (PageSpeed requirement) */}
      <main id='content' role='main'>
        <Hero />
        <Services />
        <Gallery />
      </main>

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
