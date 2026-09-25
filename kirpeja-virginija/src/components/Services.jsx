import { useLanguage } from '../context/LanguageContext';
import { useEffect } from 'react';
import Button from '../components/ui/Button';
import { SERVICES } from '../data/services';
import { TREATWELL_BOOK_URL } from '../data/business';
import { Link } from 'react-router-dom';

const DETAIL_PAGES = [
  ['women', { lt: 'Moterų kirpimas', en: 'Women’s haircut' }],
  ['men', { lt: 'Vyrų kirpimas', en: 'Men’s haircut' }],
  ['kids', { lt: 'Vaikų kirpimas', en: 'Children’s haircut' }],
];

export default function Services() {
  const { lang, l, pathFor } = useLanguage();

  const treatwellUrl = TREATWELL_BOOK_URL;
  const services = SERVICES;

  const formatPrice = (price) => {
    if (!price) return '';
    if (typeof price === 'string') return price;
    const prefix = price.from ? (lang === 'LT' ? 'nuo ' : 'from ') : '';
    return `${prefix}${price.amount} €`;
  };

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
      <div className='max-w-5xl mx-auto px-6 text-center'>
        <h2
          id='services-heading'
          className='text-3xl font-serif mb-10 text-ink'
        >
          {lang === 'LT'
            ? 'Kirpimo ir plaukų priežiūros paslaugos Kaune'
            : 'Hair and grooming services in Kaunas'}
        </h2>

        <p className='max-w-3xl mx-auto text-sm md:text-base text-muted mb-10 leading-relaxed'>
          {lang === 'LT'
            ? 'Kirpėja Virginija Kaune teikia moterų, vyrų ir vaikų kirpimo paslaugas, plaukų dažymo konsultacijas bei plaukų procedūras pažeistiems plaukams. Taip pat atliekamas barzdos modeliavimas, šukuosenos ir bangavimas. Patogi vieta Kaune, lengvai pasiekiama iš Dainavos, Petrašiūnų, Šančių, Eigulių ir Žaliakalnio.'
            : 'Hairdresser Virginija in Kaunas offers women’s, men’s and children’s haircuts, hair colouring consultations and treatments for damaged hair. Beard styling, special occasion styling and waves are also available in a convenient Kaunas location.'}
        </p>

        <div
          className='grid md:grid-cols-2 gap-6'
          aria-label={
            lang === 'LT'
              ? 'Kirpimo, dažymo konsultacijų ir plaukų procedūrų sąrašas'
              : 'List of haircut, colour consultation and hair treatment services'
          }
        >
          {services.map((item, i) => (
            <a
              key={item.id}
              href={treatwellUrl}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${
                lang === 'LT' ? item.name.lt : item.name.en
              } – ${formatPrice(item.price)}. ${
                item.duration
                  ? `${lang === 'LT' ? 'Trukmė' : 'Duration'}: ${
                      lang === 'LT' ? item.duration.lt : item.duration.en
                    }. `
                  : ''
              }${lang === 'LT' ? 'Registruotis internetu' : 'Book online'}`}
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
              className={`p-6 border border-line rounded-xl hover:shadow-md transition flex justify-between items-start bg-sand hover:bg-sand-deep text-left ${
                // nelyginis kiekis – paskutinę kortelę centruojame
                services.length % 2 === 1 && i === services.length - 1
                  ? 'md:col-span-2 md:w-[calc(50%-0.75rem)] md:mx-auto'
                  : ''
              }`}
            >
              <div className='pr-4'>
                <h3 className='font-medium text-ink text-lg'>
                  {lang === 'LT' ? item.name.lt : item.name.en}
                </h3>

                <p className='text-sm text-muted mt-1 leading-snug'>
                  {lang === 'LT' ? item.desc.lt : item.desc.en}
                </p>

                {item.duration && (
                  <p className='text-xs text-muted mt-3'>
                    {lang === 'LT' ? 'Trukmė:' : 'Duration:'}{' '}
                    {lang === 'LT' ? item.duration.lt : item.duration.en}
                  </p>
                )}
              </div>

              <span className='font-semibold text-gold-dark text-lg whitespace-nowrap'>
                {formatPrice(item.price)}
              </span>
            </a>
          ))}
        </div>

        <div className='mt-8 flex flex-wrap justify-center items-center gap-3 text-sm'>
          <span className='text-muted'>{lang === 'LT' ? 'Plačiau apie:' : 'More about:'}</span>
          {DETAIL_PAGES.map(([key, label]) => (
            <Link
              key={key}
              to={pathFor(key)}
              className='px-4 py-2 rounded-full border border-black/10 bg-sand text-ink hover:border-gold transition'
            >
              {label[l]}
            </Link>
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
