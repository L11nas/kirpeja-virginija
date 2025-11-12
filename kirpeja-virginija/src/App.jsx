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

  // JSON-LD struktūrizuoti duomenys (vietinis verslas)
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: 'Kirpėja Virginija',
    image: `${baseUrl}/img/hero-bg.webp`,
    url: baseUrl,
    telephone: '+37060000000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Savanorių pr. 100',
      addressLocality: 'Kaunas',
      addressRegion: 'Kauno apskritis',
      postalCode: '44250',
      addressCountry: 'LT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 54.8985,
      longitude: 23.9036,
    },
    openingHours: 'Mo-Fr 09:00-19:00',
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
        {/* === HTML setup === */}
        <html lang={isLT ? 'lt' : 'en'} />
        <link rel='canonical' href={baseUrl} />
        <meta name='robots' content='index, follow' />
        <meta name='author' content='Kirpėja Virginija' />
        <meta name='theme-color' content='#C1A173' />

        {/* === Primary SEO === */}
        <title>
          {isLT
            ? 'Kirpėja Virginija | Kirpimas ir plaukų priežiūra Kaune'
            : 'Hairdresser Virginija | Haircuts and care in Kaunas'}
        </title>
        <meta
          name='description'
          content={
            isLT
              ? 'Kirpėja Virginija – profesionalus moterų ir vyrų kirpimas, dažymas, barzdos modeliavimas bei plaukų priežiūra Kaune. Jauki atmosfera ir dėmesys detalėms.'
              : 'Hairdresser Virginija – professional men’s and women’s haircuts, coloring, beard styling and care in Kaunas. Cozy atmosphere and attention to detail.'
          }
        />
        <meta
          name='keywords'
          content={
            isLT
              ? 'kirpėja Kaune, vyriškas kirpimas, moterų kirpimas, kirpykla Kaunas, plaukų dažymas, barzdos modeliavimas, grožio salonas Kaunas'
              : 'hairdresser Kaunas, men haircut, women haircut, barbershop Kaunas, hair coloring, beauty salon Lithuania'
          }
        />

        {/* === Open Graph (Facebook, Messenger, etc.) === */}
        <meta property='og:type' content='website' />
        <meta property='og:url' content={baseUrl} />
        <meta
          property='og:title'
          content={
            isLT
              ? 'Kirpėja Virginija – kirpimo ir grožio paslaugos Kaune'
              : 'Hairdresser Virginija – haircuts and beauty services in Kaunas'
          }
        />
        <meta
          property='og:description'
          content={
            isLT
              ? 'Vyriškas, moteriškas ir vaikų kirpimas, dažymas, barzdos modeliavimas ir plaukų priežiūra Kaune.'
              : 'Men’s, women’s and children’s haircuts, beard styling, coloring and care in Kaunas.'
          }
        />
        <meta property='og:image' content={`${baseUrl}/img/hero-bg.webp`} />
        <meta property='og:locale' content={isLT ? 'lt_LT' : 'en_GB'} />
        <meta property='og:site_name' content='Kirpėja Virginija' />

        {/* === Twitter / X Card === */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='Kirpėja Virginija – kirpimo paslaugos Kaune'
        />
        <meta
          name='twitter:description'
          content='Profesionalus kirpimas ir barzdos modeliavimas Kaune.'
        />
        <meta name='twitter:image' content={`${baseUrl}/img/hero-bg.webp`} />

        {/* === Hreflang alternatyvos === */}
        <link rel='alternate' hrefLang='lt' href={`${baseUrl}/`} />
        <link rel='alternate' hrefLang='en' href={`${baseUrl}/en/`} />

        {/* === GEO META === */}
        <meta name='geo.region' content='LT-KU' />
        <meta name='geo.placename' content='Kaunas' />
        <meta name='geo.position' content='54.8985;23.9036' />
        <meta name='ICBM' content='54.8985, 23.9036' />

        {/* === JSON-LD struktūrizuotas duomenų blokas === */}
        <script type='application/ld+json'>
          {JSON.stringify(localBusinessSchema)}
        </script>
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
