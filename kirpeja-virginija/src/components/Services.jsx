import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { useEffect } from 'react';
import Button from '../components/ui/Button';

export default function Services() {
  const { lang } = useLanguage();

  const treatwellUrl = 'https://book.treatwell.lt/salonas/kirpeja-virginija/';

  // --- SERVICES LIST ---
  // Kaina: { amount: '15 €', from: true } -> LT: "nuo 15 €", EN: "from 15 €"
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
      price: { amount: '20 €', from: false },
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
    if (typeof price === 'string') return price; // jei kažkur liktų senas formatas
    const prefix = price.from ? (lang === 'LT' ? 'nuo ' : 'from ') : '';
    return `${prefix}${price.amount}`;
  };

  // SCROLL TRACKING → fiksuoja, kada useris pasiekia paslaugų sekciją
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
      {/* SEO META */}
      <Helmet>
        <title>
          {lang === 'LT'
            ? 'Kirpėja Virginija – Kirpimo paslaugos ir kainos Kaune'
            : 'Hairdresser Virginija – Hair services and prices in Kaunas'}
        </title>

        <meta
          name='description'
          content={
            lang === 'LT'
              ? 'Kirpėja Virginija Kaune (Gričiupis) teikia moterų, vyrų ir vaikų kirpimo, bangavimo, barzdos modeliavimo, pynimų ir cheminio sušukavimo paslaugas. Patogus registravimas internetu per Treatwell.'
              : 'Hairdresser Virginija in Kaunas offers women’s, men’s and children’s haircuts, express styling, braiding, beard grooming and perms. Easy online booking via Treatwell.'
          }
        />

        <link rel='canonical' href='https://kirpeja-virginija.lt/#paslaugos' />
      </Helmet>

      <div className='max-w-5xl mx-auto px-6 text-center'>
        <h2
          id='services-heading'
          className='text-3xl font-serif mb-10 text-[#3E3B38]'
        >
          {lang === 'LT' ? 'Teikiamos paslaugos' : 'Available services'}
        </h2>

        <p className='max-w-2xl mx-auto text-sm md:text-base text-[#6B6966] mb-10'>
          {lang === 'LT'
            ? 'Paslaugos atliekamos jaukioje aplinkoje Gričiupio mikrorajone, lengvai pasiekiamoje iš Dainavos, Petrašiūnų, Šančių, Eigulių ir Žaliakalnio. Rinkitės paslaugą ir registruokitės internetu.'
            : 'Services are provided in a cosy salon in Kaunas (Gričiupis district), easily reachable from nearby areas. Choose a service and book your visit online.'}
        </p>

        {/* Services Grid */}
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

        {/* CTA */}
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
