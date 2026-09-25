import { Helmet } from 'react-helmet-async';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import BackToTop from './components/BackToTop';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyBookingBar from './components/StickyBookingBar';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
  BUSINESS,
  SITE_URL,
  TREATWELL_BOOK_URL,
  TREATWELL_PROFILE_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  GOOGLE_MAPS_URL,
} from './data/business';
import { SERVICES } from './data/services';
import { PAGES } from './data/routes';

// Visai svetainei bendra schema: salonas, kirpėja ir svetainė.
function buildSiteSchema(l) {
  const salonId = `${SITE_URL}/#salon`;

  const salon = {
    '@type': 'HairSalon',
    '@id': salonId,
    name: BUSINESS.name,
    alternateName: 'Kirpėja Kaune Virginija',
    description:
      l === 'lt'
        ? 'Kirpėja Kaune: moterų, vyrų ir vaikų kirpimas, šukuosenos, barzdos modeliavimas, plaukų dažymo konsultacijos ir plaukų procedūros.'
        : 'Hairdresser in Kaunas: women’s, men’s and children’s haircuts, styling, beard styling, colour consultations and hair treatments.',
    url: `${SITE_URL}/`,
    image: [`${SITE_URL}/img/og-image.jpg`, `${SITE_URL}/img/hero-bg.webp`],
    logo: `${SITE_URL}/logo.png`,
    telephone: BUSINESS.phone,
    priceRange: '5 € – 35 €',
    currenciesAccepted: 'EUR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      postalCode: BUSINESS.postalCode,
      addressRegion: 'Kauno apskritis',
      addressCountry: BUSINESS.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    hasMap: GOOGLE_MAPS_URL,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: BUSINESS.hours.days,
        opens: BUSINESS.hours.opens,
        closes: BUSINESS.hours.closes,
      },
    ],
    areaServed: ['Kaunas', 'Dainava', 'Petrašiūnai', 'Šančiai', 'Eiguliai', 'Žaliakalnis'].map(
      (name) => ({ '@type': 'Place', name }),
    ),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS.rating,
      reviewCount: BUSINESS.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    employee: { '@id': `${SITE_URL}/#virginija` },
    potentialAction: {
      '@type': 'ReserveAction',
      target: TREATWELL_BOOK_URL,
      name: l === 'lt' ? 'Registracija internetu' : 'Book online',
    },
    sameAs: [TREATWELL_PROFILE_URL, FACEBOOK_URL, INSTAGRAM_URL],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: l === 'lt' ? 'Kirpimo ir plaukų priežiūros paslaugos' : 'Hair services',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        url: TREATWELL_BOOK_URL,
        priceCurrency: 'EUR',
        ...(s.price.from
          ? {
              priceSpecification: {
                '@type': 'PriceSpecification',
                minPrice: Number(s.price.amount),
                priceCurrency: 'EUR',
              },
            }
          : { price: Number(s.price.amount) }),
        itemOffered: {
          '@type': 'Service',
          name: s.name[l],
          description: s.desc[l],
          provider: { '@id': salonId },
          areaServed: { '@type': 'City', name: 'Kaunas' },
        },
      })),
    },
  };

  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#virginija`,
    name: 'Virginija',
    jobTitle: l === 'lt' ? 'Kirpėja' : 'Hairdresser',
    worksFor: { '@id': salonId },
    knowsAbout: ['Plaukų kirpimas', 'Plaukų dažymas', 'Šukuosenos', 'Barzdos modeliavimas'],
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: BUSINESS.name,
    inLanguage: ['lt-LT', 'en'],
    publisher: { '@id': salonId },
  };

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [website, salon, person] });
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function AppContent() {
  const { l } = useLanguage();
  const { pathname } = useLocation();

  useEffect(() => {
    window.gtag?.('event', 'page_view', {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title,
    });
  }, [pathname]);

  const routes = [
    ['home', <Home />],
    ['women', <ServicePage pageKey='women' />],
    ['men', <ServicePage pageKey='men' />],
    ['kids', <ServicePage pageKey='kids' />],
    ['privacy', <Privacy />],
  ];

  return (
    <div className='bg-sand text-ink-deep font-sans pb-20 md:pb-0'>
      <Helmet>
        <meta name='theme-color' content='#C1A173' />
        <meta name='geo.region' content='LT-KU' />
        <meta name='geo.placename' content='Kaunas' />
        <meta name='geo.position' content={`${BUSINESS.geo.lat};${BUSINESS.geo.lng}`} />
        <meta name='ICBM' content={`${BUSINESS.geo.lat}, ${BUSINESS.geo.lng}`} />
        <script type='application/ld+json'>{buildSiteSchema(l)}</script>
      </Helmet>

      <ScrollToTop />
      <Header />

      {/* MAIN LANDMARK (PageSpeed requirement) */}
      <main id='content' role='main'>
        <Routes>
          {routes.flatMap(([key, element]) =>
            ['lt', 'en'].map((lang) => (
              <Route key={`${key}-${lang}`} path={PAGES[key][lang]} element={element} />
            )),
          )}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <StickyBookingBar />
      <CookieConsent />
      <BackToTop />
    </div>
  );
}

// Router ir HelmetProvider pateikiami iš main.jsx (naršyklė)
// arba entry-server.jsx (statinis puslapių generavimas build metu).
export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
