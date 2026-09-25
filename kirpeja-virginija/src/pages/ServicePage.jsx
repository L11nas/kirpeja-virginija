import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import Seo from '../components/Seo';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { SERVICE_PAGES } from '../data/servicePages';
import { SERVICES } from '../data/services';
import { PAGES } from '../data/routes';
import { SITE_URL, TREATWELL_BOOK_URL, BUSINESS } from '../data/business';

const OTHER_LABELS = {
  women: { lt: 'Moterų kirpimas', en: 'Women’s haircut' },
  men: { lt: 'Vyrų kirpimas', en: 'Men’s haircut' },
  kids: { lt: 'Vaikų kirpimas', en: 'Children’s haircut' },
};

const formatPrice = (price, l) =>
  `${price.from ? (l === 'lt' ? 'nuo ' : 'from ') : ''}${price.amount} €`;

export default function ServicePage({ pageKey }) {
  const { l, pathFor } = useLanguage();
  const data = SERVICE_PAGES[pageKey];
  const c = data[l];
  const services = data.services.map((id) => SERVICES.find((s) => s.id === id));
  const homeLabel = l === 'lt' ? 'Pradžia' : 'Home';

  const photos = data.gallery.flatMap(([cat, count]) =>
    Array.from({ length: count }, (_, i) => ({
      cat,
      src: `/gallery/${cat}/thumbs/${i + 1}.webp`,
    })),
  ).slice(0, 9);

  const pageUrl = `${SITE_URL}${PAGES[pageKey][l]}`;
  const schema = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: homeLabel, item: `${SITE_URL}${PAGES.home[l]}` },
        { '@type': 'ListItem', position: 2, name: c.breadcrumb, item: pageUrl },
      ],
    },
    {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: c.h1,
      description: c.description,
      serviceType: c.breadcrumb,
      provider: { '@id': `${SITE_URL}/#salon` },
      areaServed: { '@type': 'City', name: 'Kaunas' },
      offers: services.map((s) => ({
        '@type': 'Offer',
        name: s.name[l],
        priceCurrency: 'EUR',
        price: Number(s.price.amount),
        url: TREATWELL_BOOK_URL,
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: c.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  const track = (label) =>
    window.gtag?.('event', 'booking_click', {
      link_location: `service_page_${pageKey}`,
      destination: 'treatwell',
      event_label: label,
    });

  return (
    <article className='pt-24 pb-20 bg-sand'>
      <Seo page={pageKey} title={c.title} description={c.description} schema={schema} />

      <div className='max-w-4xl mx-auto px-6'>
        <nav aria-label={l === 'lt' ? 'Naršymo kelias' : 'Breadcrumb'} className='text-sm text-muted mb-6'>
          <ol className='flex flex-wrap gap-2'>
            <li>
              <Link to={pathFor('home')} className='underline hover:text-gold-dark'>
                {homeLabel}
              </Link>
            </li>
            <li aria-hidden='true'>/</li>
            <li aria-current='page' className='text-ink'>
              {c.breadcrumb}
            </li>
          </ol>
        </nav>

        <h1 className='text-3xl md:text-4xl font-serif text-ink mb-4'>{c.h1}</h1>
        <p className='text-lg text-ink leading-relaxed mb-8'>{c.lead}</p>

        <div className='flex flex-col sm:flex-row gap-3 mb-12'>
          <Button
            as='a'
            href={TREATWELL_BOOK_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='px-8 py-3'
            onClick={() => track('service_page_top')}
          >
            {l === 'lt' ? 'Registruokis internetu' : 'Book online'}
          </Button>
          <a
            href={`tel:${BUSINESS.phone}`}
            className='inline-flex items-center justify-center px-8 py-3 rounded-full border border-gold text-ink hover:bg-white transition'
          >
            {l === 'lt' ? 'Skambinti' : 'Call'} {BUSINESS.phoneDisplay}
          </a>
        </div>

        <section aria-labelledby='prices-heading' className='mb-12'>
          <h2 id='prices-heading' className='text-2xl font-serif text-ink mb-4'>
            {l === 'lt' ? 'Kainos ir trukmė' : 'Prices and duration'}
          </h2>
          <ul className='divide-y divide-line border border-line rounded-xl bg-white'>
            {services.map((s) => (
              <li key={s.id} className='flex justify-between gap-4 p-4'>
                <div>
                  <h3 className='font-medium text-ink'>{s.name[l]}</h3>
                  {s.duration && (
                    <p className='text-sm text-muted'>{s.duration[l]}</p>
                  )}
                </div>
                <span className='font-semibold text-gold-dark whitespace-nowrap'>
                  {formatPrice(s.price, l)}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className='mb-12 space-y-4 text-ink leading-relaxed'>
          {c.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        <section aria-labelledby='benefits-heading' className='mb-12'>
          <h2 id='benefits-heading' className='text-2xl font-serif text-ink mb-4'>
            {l === 'lt' ? 'Ko galite tikėtis' : 'What to expect'}
          </h2>
          <ul className='grid sm:grid-cols-2 gap-3'>
            {c.benefits.map((b) => (
              <li key={b} className='flex gap-2 items-start text-ink'>
                <Check size={20} className='text-gold shrink-0 mt-0.5' aria-hidden='true' />
                {b}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby='works-heading' className='mb-12'>
          <h2 id='works-heading' className='text-2xl font-serif text-ink mb-4'>
            {l === 'lt' ? 'Atlikti darbai' : 'Recent work'}
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
            {photos.map((p, i) => (
              <img
                key={p.src}
                src={p.src}
                alt={`${c.h1} – ${l === 'lt' ? 'darbas' : 'work'} ${i + 1}`}
                loading='lazy'
                decoding='async'
                width='400'
                height='400'
                className='w-full h-40 md:h-52 object-cover rounded-xl bg-sand-deep'
              />
            ))}
          </div>
          <a
            href={`${pathFor('home')}#galerija`}
            className='inline-block mt-4 text-sm underline text-ink hover:text-gold-dark'
          >
            {l === 'lt' ? 'Visa darbų galerija →' : 'Full gallery →'}
          </a>
        </section>

        <section aria-labelledby='page-faq-heading' className='mb-12'>
          <h2 id='page-faq-heading' className='text-2xl font-serif text-ink mb-4'>
            {l === 'lt' ? 'Dažni klausimai' : 'FAQ'}
          </h2>
          <div className='space-y-3'>
            {c.faq.map((f) => (
              <details key={f.q} className='group p-5 border border-line rounded-xl bg-white'>
                <summary className='flex justify-between items-center gap-4 cursor-pointer list-none font-medium text-ink'>
                  <h3>{f.q}</h3>
                  <span className='text-gold text-2xl leading-none transition-transform group-open:rotate-45' aria-hidden='true'>
                    +
                  </span>
                </summary>
                <p className='mt-3 text-muted leading-relaxed'>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className='p-6 md:p-8 rounded-2xl bg-white border border-line text-center'>
          <p className='text-xl font-serif text-ink mb-2'>
            {BUSINESS.street}, {BUSINESS.city}
          </p>
          <p className='text-muted mb-6'>{BUSINESS.hours[l]}</p>
          <Button
            as='a'
            href={TREATWELL_BOOK_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='px-8 py-3'
            onClick={() => track('service_page_bottom')}
          >
            {l === 'lt' ? 'Pasirinkti laiką internetu' : 'Choose a time online'}
          </Button>
        </section>

        <nav aria-label={l === 'lt' ? 'Kitos paslaugos' : 'Other services'} className='mt-10 text-center'>
          <p className='text-sm text-muted mb-3'>
            {l === 'lt' ? 'Kitos paslaugos:' : 'Other services:'}
          </p>
          <div className='flex flex-wrap justify-center gap-3'>
            {Object.keys(OTHER_LABELS)
              .filter((k) => k !== pageKey)
              .map((k) => (
                <Link
                  key={k}
                  to={pathFor(k)}
                  className='px-4 py-2 rounded-full border border-black/10 bg-white text-sm text-ink hover:border-gold'
                >
                  {OTHER_LABELS[k][l]}
                </Link>
              ))}
          </div>
        </nav>
      </div>
    </article>
  );
}
