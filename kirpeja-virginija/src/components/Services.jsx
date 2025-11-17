import Button from '../components/ui/Button';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { lang } = useLanguage();

  const treatwellUrl = 'https://book.treatwell.lt/salonas/kirpeja-virginija/';

  // --- Paslaugos ---
  const services = [
    {
      id: 'mens-haircut',
      name: { lt: 'Vyriškas kirpimas', en: 'Men’s haircut' },
      desc: {
        lt: 'Klasikinis arba modernus stilius pagal kliento pageidavimus.',
        en: 'Classic or modern style tailored to client preferences.',
      },
      price: '13 €',
    },
    {
      id: 'haircut-beard',
      name: {
        lt: 'Plaukų kirpimas ir barzdos modeliavimas',
        en: 'Haircut & beard styling',
      },
      desc: {
        lt: 'Pilnas vyriškas įvaizdis su kruopščiu modeliavimu.',
        en: 'Complete grooming service with precise beard shaping.',
      },
      price: '17 €',
    },
    {
      id: 'women-haircut',
      name: { lt: 'Moterų kirpimas', en: 'Women’s haircut' },
      desc: {
        lt: 'Nuo klasikinių iki šiuolaikinių kirpimų, atsižvelgiant į plaukų tipą.',
        en: 'From classic to modern haircuts tailored to hair type.',
      },
      price: '15 €',
    },
    {
      id: 'kids-haircut',
      name: { lt: 'Vaikų kirpimas', en: 'Children’s haircut' },
      desc: {
        lt: 'Greitai, švelniai ir su šypsena mažiesiems klientams.',
        en: 'Quick and gentle haircut for kids.',
      },
      price: '13 €',
    },
    {
      id: 'braiding',
      name: {
        lt: 'Plaukų pynimas su pluoštu',
        en: 'Braiding with fiber',
      },
      desc: {
        lt: 'Kūrybiškas ir ilgaamžis plaukų pynimas naudojant pluoštą.',
        en: 'Creative and expressive fiber braiding.',
      },
      price: '20 €',
    },
    {
      id: 'perm',
      name: {
        lt: 'Cheminis sušukavimas',
        en: 'Chemical styling (perm)',
      },
      desc: {
        lt: 'Ilgaamžiai garbanų formavimo sprendimai.',
        en: 'Long-lasting curling and volume.',
      },
      price: '40 €',
    },
  ];

  return (
    <section
      id='paslaugos'
      className='py-20 bg-white'
      aria-labelledby='services-heading'
    >
      {/* --- SEO META --- */}
      <Helmet>
        <title>
          {lang === 'LT'
            ? 'Kirpėja Virginija – Paslaugos ir kainos Kaune'
            : 'Hairdresser Virginija – Services and Prices in Kaunas'}
        </title>

        <meta
          name='description'
          content={
            lang === 'LT'
              ? 'Kirpėja Virginija teikia vyriškus, moteriškus ir vaikų kirpimus, barzdos modeliavimą, plaukų dažymą bei pynimus Kaune. Registruokitės internetu Treatwell platformoje.'
              : "Hairdresser Virginija offers men's, women's and children's haircuts, beard styling, braiding and more in Kaunas. Book online via Treatwell."
          }
        />

        <link rel='canonical' href='https://kirpeja-virginija.lt/#paslaugos' />

        {/* Dinaminis OG title pagal kalbą */}
        <meta
          property='og:title'
          content={
            lang === 'LT'
              ? 'Kirpėja Virginija – Paslaugos'
              : 'Hairdresser Virginija – Services'
          }
        />

        <meta
          property='og:description'
          content={
            lang === 'LT'
              ? 'Profesionalios kirpimo ir grožio paslaugos Kaune.'
              : 'Professional hairdressing and beauty services in Kaunas.'
          }
        />

        <meta property='og:type' content='service' />
        <meta
          property='og:locale'
          content={lang === 'LT' ? 'lt_LT' : 'en_GB'}
        />

        {/* JSON-LD struktūrizuoti duomenys */}
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Kirpėja Virginija',
            image: 'https://kirpeja-virginija.lt/img/hero-bg.webp',
            url: 'https://kirpeja-virginija.lt',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Pramonės pr. 15A',
              addressLocality: 'Kaunas',
              addressCountry: 'LT',
            },
            priceRange: '€13–€40',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name:
                lang === 'LT'
                  ? 'Kirpimo ir grožio paslaugos'
                  : 'Hairdressing and beauty services',
              itemListElement: services.map((s) => ({
                '@type': 'Offer',
                url: treatwellUrl,
                priceCurrency: 'EUR',
                price: s.price.replace('€', '').trim(),
                itemOffered: {
                  '@type': 'Service',
                  name: lang === 'LT' ? s.name.lt : s.name.en,
                  description: lang === 'LT' ? s.desc.lt : s.desc.en,
                },
              })),
            },
          })}
        </script>
      </Helmet>

      <div className='max-w-5xl mx-auto px-6 text-center'>
        <h2
          id='services-heading'
          className='text-3xl font-serif mb-10 text-[#3E3B38]'
        >
          {lang === 'LT' ? 'Teikiamos paslaugos' : 'Available Services'}
        </h2>

        {/* --- Paslaugų tinklelis --- */}
        <div
          className='grid md:grid-cols-2 gap-6'
          role='list'
          aria-label={
            lang === 'LT' ? 'Kirpimo paslaugų sąrašas' : 'Service list'
          }
        >
          {services.map((item) => (
            <a
              key={item.id}
              href={treatwellUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='p-6 border border-[#e5e4e1] rounded-xl hover:shadow-md transition flex justify-between items-start bg-[#F8F7F4] hover:bg-[#f1efeb] text-left'
              aria-label={`${lang === 'LT' ? item.name.lt : item.name.en} – ${
                item.price
              }`}
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
                {item.price}
              </span>
            </a>
          ))}
        </div>

        {/* CTA – Apple style */}
        <Button
          as='a'
          href={treatwellUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-10 px-8 py-3'
        >
          {lang === 'LT' ? 'Registruokis internetu' : 'Book your visit online'}
        </Button>
      </div>
    </section>
  );
}
