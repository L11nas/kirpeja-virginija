import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';

export default function Services() {
  const { lang } = useLanguage();

  const treatwellUrl = 'https://book.treatwell.lt/salonas/kirpeja-virginija/';

  const services = [
    {
      lt: 'Vyriškas kirpimas – klasikinis arba modernus stilius pagal kliento pageidavimus.',
      en: 'Men’s haircut – classic or modern style tailored to client preferences.',
      price: '13 €',
      name: { lt: 'Vyriškas kirpimas', en: 'Men’s haircut' },
    },
    {
      lt: 'Plaukų kirpimas ir barzdos modeliavimas – pilnas vyriškas įvaizdis.',
      en: 'Haircut & beard styling – complete grooming service for men.',
      price: '17 €',
      name: {
        lt: 'Plaukų kirpimas ir barzdos modeliavimas',
        en: 'Haircut & beard styling',
      },
    },
    {
      lt: 'Moterų kirpimas – nuo klasikinių iki šiuolaikinių kirpimų.',
      en: 'Women’s haircut – from timeless classics to modern shapes.',
      price: '15 €',
      name: { lt: 'Moterų kirpimas', en: 'Women’s haircut' },
    },
    {
      lt: 'Vaikų kirpimas – greitai, švelniai ir su šypsena.',
      en: 'Children’s haircut – gentle and quick haircut for kids.',
      price: '13 €',
      name: { lt: 'Vaikų kirpimas', en: 'Children’s haircut' },
    },
    {
      lt: 'Plaukų pynimas su pluoštu – kūrybiškas ir išraiškingas stilius.',
      en: 'Braiding with fiber – creative and expressive hairstyle.',
      price: '20 €',
      name: { lt: 'Plaukų pynimas su pluoštu', en: 'Braiding with fiber' },
    },
    {
      lt: 'Cheminis sušukavimas – ilgaamžis plaukų pakėlimas ir forma.',
      en: 'Chemical styling (perm) – long-lasting curls and volume.',
      price: '40 €',
      name: { lt: 'Cheminis sušukavimas', en: 'Chemical styling (perm)' },
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
              ? 'Kirpėja Virginija teikia vyriškus, moteriškus ir vaikų kirpimus, barzdos modeliavimą, plaukų dažymą bei pynimus Kaune. Registracija internetu Treatwell platformoje.'
              : 'Hairdresser Virginija offers men’s, women’s and children’s haircuts, beard styling and braiding in Kaunas. Book online via Treatwell.'
          }
        />

        <link rel='canonical' href='https://kirpeja-virginija.lt/#paslaugos' />

        <meta
          property='og:title'
          content='Kirpėja Virginija – paslaugos ir kainos'
        />
        <meta
          property='og:description'
          content='Profesionalios kirpimo paslaugos Kaune – vyriški, moteriški, vaikų kirpimai ir barzdos modeliavimas.'
        />
        <meta property='og:type' content='service' />
        <meta
          property='og:locale'
          content={lang === 'LT' ? 'lt_LT' : 'en_GB'}
        />

        {/* JSON-LD struktūrizuotas duomenų objektas */}
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType:
              lang === 'LT'
                ? 'Kirpimo paslaugos Kaune'
                : 'Hairdressing services in Kaunas',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Kirpėja Virginija',
              url: 'https://kirpeja-virginija.lt',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Kaunas',
                addressCountry: 'LT',
              },
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name:
                lang === 'LT'
                  ? 'Kirpimo ir grožio paslaugos'
                  : 'Hairdressing and beauty services',
              itemListElement: services.map((s) => ({
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: lang === 'LT' ? s.name.lt : s.name.en,
                  description: lang === 'LT' ? s.lt : s.en,
                },
                price: s.price.replace('€', ''),
                priceCurrency: 'EUR',
                url: treatwellUrl,
              })),
            },
          })}
        </script>
      </Helmet>

      <div className='max-w-5xl mx-auto px-6 text-center'>
        {/* Heading with ID for accessibility */}
        <h2
          id='services-heading'
          className='text-3xl font-serif mb-10 text-[#3E3B38]'
        >
          {lang === 'LT' ? 'Teikiamos paslaugos' : 'Available Services'}
        </h2>

        {/* --- Paslaugų tinklelis --- */}
        <div
          className='grid md:grid-cols-2 gap-6'
          aria-label={lang === 'LT' ? 'Kirpimo paslaugos' : 'Hair services'}
        >
          {services.map((item, i) => (
            <a
              key={i}
              href={treatwellUrl}
              target='_blank'
              rel='noreferrer'
              className='p-6 border border-[#e5e4e1] rounded-xl hover:shadow-md transition flex justify-between items-start bg-[#F8F7F4] hover:bg-[#f1efeb] text-left'
              aria-label={`${lang === 'LT' ? item.name.lt : item.name.en} – ${
                item.price
              }`}
            >
              <div>
                <h3 className='font-medium text-[#3E3B38]'>
                  {lang === 'LT' ? item.name.lt : item.name.en}
                </h3>
                <p className='text-sm text-[#6B6966] mt-1 leading-snug'>
                  {lang === 'LT' ? item.lt : item.en}
                </p>
              </div>

              {/* Improved contrast */}
              <span className='font-semibold text-[#A1845F] text-lg whitespace-nowrap'>
                {item.price}
              </span>
            </a>
          ))}
        </div>

        {/* CTA */}
        <Button
          href={treatwellUrl}
          label={
            lang === 'LT' ? 'Registruokis internetu' : 'Book your visit online'
          }
          className='mt-10'
        />
      </div>
    </section>
  );
}
