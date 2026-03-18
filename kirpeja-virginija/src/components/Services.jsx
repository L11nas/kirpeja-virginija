import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { useEffect, useMemo } from 'react';
import Button from '../components/ui/Button';

export default function Services() {
  const { lang } = useLanguage();

  const treatwellUrl = 'https://book.treatwell.lt/salonas/kirpeja-virginija/';
  const siteUrl = 'https://kirpeja-virginija.lt/';
  const pageTitle =
    lang === 'LT'
      ? 'Kirpimo paslaugos Kaune – moterų, vyrų ir vaikų kirpimas | Kirpėja Virginija'
      : 'Hair services in Kaunas – women’s, men’s and children’s haircuts | Hairdresser Virginija';

  const pageDescription =
    lang === 'LT'
      ? 'Kirpėja Virginija Kaune teikia moterų, vyrų ir vaikų kirpimo, barzdos modeliavimo, plaukų pynimo, bangavimo ir cheminio sušukavimo paslaugas. Patogi registracija internetu per Treatwell.'
      : 'Hairdresser Virginija in Kaunas offers women’s, men’s and children’s haircuts, beard styling, braiding, express styling and perms. Easy online booking via Treatwell.';

  // --- SERVICES LIST ---
  const services = [
    {
      id: 'women-haircut',
      name: { lt: 'Moterų kirpimas', en: "Women's haircut" },
      desc: {
        lt: 'Individualus kirpimas ir formavimas pagal veido bruožus, plaukų tipą ir gyvenimo būdą.',
        en: 'Personalised haircut and styling based on face shape, hair type and lifestyle.',
      },
      price: { amount: '15 €', from: true },
    },
    {
      id: 'mens-haircut',
      name: { lt: 'Vyrų kirpimas', en: 'Men’s haircut' },
      desc: {
        lt: 'Tvarkingas kasdienis arba modernesnis kirpimas, pritaikytas Jūsų stiliui.',
        en: 'Clean everyday or more modern cut tailored to your style.',
      },
      price: { amount: '15 €', from: false },
    },
    {
      id: 'haircut-beard',
      name: {
        lt: 'Plaukų kirpimas ir barzdos modeliavimas',
        en: 'Haircut & beard styling',
      },
      desc: {
        lt: 'Pilnas vyriškas įvaizdis: kirpimas, kontūrai ir kruopštus barzdos formavimas.',
        en: 'Complete men’s look with haircut, contours and precise beard shaping.',
      },
      price: { amount: '25 €', from: false },
    },
    {
      id: 'kids-haircut',
      name: { lt: 'Vaikų kirpimas', en: 'Children’s haircut' },
      desc: {
        lt: 'Švelnus ir greitas kirpimas mažiesiems, kad vizitas būtų kuo malonesnis.',
        en: 'Gentle and quick haircut for kids to keep the visit pleasant.',
      },
      price: { amount: '15 €', from: false },
    },
    {
      id: 'express-styling',
      name: {
        lt: 'Express bangavimas / šukuosena',
        en: 'Express styling / waves',
      },
      desc: {
        lt: 'Greita, elegantiška šukuosena arba bangavimas šventei ar ypatingai progai.',
        en: 'Quick and elegant styling or waves for special occasions.',
      },
      price: { amount: '25 €', from: true },
    },
    {
      id: 'braiding',
      name: {
        lt: 'Plaukų pynimas su pluoštu',
        en: 'Braiding with fiber',
      },
      desc: {
        lt: 'Ilgai išliekantys kūrybiški pynimai, naudojant kokybišką pluoštą.',
        en: 'Long-lasting, creative braids using quality fiber.',
      },
      price: { amount: '20 €', from: false },
    },
    {
      id: 'perm',
      name: {
        lt: 'Cheminis sušukavimas',
        en: 'Perm (chemical styling)',
      },
      desc: {
        lt: 'Ilgalaikis garbanų ir apimties formavimas tiesiems ar ploniems plaukams.',
        en: 'Long-lasting curls and volume for straight or fine hair.',
      },
      price: { amount: '40 €', from: false },
    },
  ];

  const formatPrice = (price) => {
    if (!price) return '';
    if (typeof price === 'string') return price;
    const prefix = price.from ? (lang === 'LT' ? 'nuo ' : 'from ') : '';
    return `${prefix}${price.amount}`;
  };

  const structuredData = useMemo(() => {
    const itemList = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name:
        lang === 'LT' ? 'Kirpimo paslaugos Kaune' : 'Hair services in Kaunas',
      itemListElement: services.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: lang === 'LT' ? item.name.lt : item.name.en,
          description: lang === 'LT' ? item.desc.lt : item.desc.en,
          provider: {
            '@type': 'HairSalon',
            name: 'Kirpėja Virginija',
            url: siteUrl,
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Pramonės pr. 15A',
              addressLocality: 'Kaunas',
              addressCountry: 'LT',
            },
          },
          areaServed: {
            '@type': 'City',
            name: 'Kaunas',
          },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'EUR',
            price: item.price.amount.replace(' €', ''),
            url: treatwellUrl,
            availability: 'https://schema.org/InStock',
          },
        },
      })),
    };

    return JSON.stringify(itemList);
  }, [lang, services]);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById('paslaugos');
      if (!section) return;

      const rect = section.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.6) {
        window.gtag?.('event', 'scroll_services', {
          event_category: 'scroll',
          event_label: 'Reached Services Section',
        });
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id='paslaugos'
      className='py-20 bg-white'
      aria-labelledby='services-heading'
    >
      <Helmet>
        <html lang={lang === 'LT' ? 'lt' : 'en'} />
        <title>{pageTitle}</title>
        <meta name='description' content={pageDescription} />
        <meta name='robots' content='index,follow' />

        {/* Canonical – be #hash */}
        <link rel='canonical' href={siteUrl} />

        {/* Open Graph */}
        <meta property='og:type' content='website' />
        <meta
          property='og:locale'
          content={lang === 'LT' ? 'lt_LT' : 'en_GB'}
        />
        <meta property='og:site_name' content='Kirpėja Virginija' />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={pageDescription} />
        <meta property='og:url' content={siteUrl} />
        <meta property='og:image' content={`${siteUrl}logo.png`} />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={pageTitle} />
        <meta name='twitter:description' content={pageDescription} />
        <meta name='twitter:image' content={`${siteUrl}logo.png`} />

        {/* Structured data */}
        <script type='application/ld+json'>{structuredData}</script>
      </Helmet>

      <div className='max-w-5xl mx-auto px-6 text-center'>
        <h2
          id='services-heading'
          className='text-3xl font-serif mb-10 text-[#3E3B38]'
        >
          {lang === 'LT'
            ? 'Kirpimo paslaugos Kaune'
            : 'Hair services in Kaunas'}
        </h2>

        <p className='max-w-2xl mx-auto text-sm md:text-base text-[#6B6966] mb-10'>
          {lang === 'LT'
            ? 'Kirpėja Virginija teikia moterų, vyrų ir vaikų kirpimo paslaugas Kaune. Taip pat atliekamas barzdos modeliavimas, plaukų pynimas, šukuosenos ir cheminis sušukavimas. Paslaugos atliekamos jaukioje aplinkoje, patogiai pasiekiamoje iš Dainavos, Petrašiūnų, Šančių, Eigulių ir Žaliakalnio.'
            : 'Hairdresser Virginija offers women’s, men’s and children’s haircuts in Kaunas, as well as beard styling, braiding, special occasion styling and perms. Services are provided in a cosy salon, easily reachable from nearby districts.'}
        </p>

        <div
          className='grid md:grid-cols-2 gap-6'
          aria-label={
            lang === 'LT'
              ? 'Kirpimo ir plaukų priežiūros paslaugų sąrašas'
              : 'List of hair services'
          }
        >
          {services.map((item) => (
            <a
              key={item.id}
              href={treatwellUrl}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${
                lang === 'LT' ? item.name.lt : item.name.en
              } – ${formatPrice(item.price)}. ${
                lang === 'LT' ? 'Registruotis internetu' : 'Book online'
              }`}
              onClick={() => {
                window.gtag?.('event', 'service_click', {
                  event_category: 'engagement',
                  event_label: item.id,
                });

                window.gtag?.('event', 'outbound_treatwell', {
                  event_category: 'outbound',
                  event_label: item.id,
                });
              }}
              className='p-6 border border-[#e5e4e1] rounded-xl hover:shadow-md transition flex justify-between items-start bg-[#F8F7F4] hover:bg-[#f1efeb] text-left'
            >
              <div className='pr-4'>
                <h3 className='font-medium text-[#3E3B38] text-lg'>
                  {lang === 'LT' ? item.name.lt : item.name.en}
                </h3>
                <p className='text-sm text-[#6B6966] mt-1 leading-snug'>
                  {lang === 'LT' ? item.desc.lt : item.desc.en}
                </p>
              </div>

              <span className='font-semibold text-[#C1A173] text-lg whitespace-nowrap'>
                {formatPrice(item.price)}
              </span>
            </a>
          ))}
        </div>

        <Button
          as='a'
          href={treatwellUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-10 px-8 py-3'
          onClick={() => {
            window.gtag?.('event', 'booking_click', {
              event_category: 'engagement',
              event_label: 'services_cta',
            });
            window.gtag?.('event', 'outbound_treatwell', {
              event_category: 'outbound',
              event_label: 'services_cta',
            });
          }}
        >
          {lang === 'LT'
            ? 'Registruok vizitą internetu'
            : 'Book your visit online'}
        </Button>
      </div>
    </section>
  );
}
