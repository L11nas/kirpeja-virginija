import { useEffect, useMemo, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './index.css';

export default function App() {
  const TREATWELL_URL = 'https://book.treatwell.lt/salonas/kirpeja-virginija/';
  const ADDRESS_MAP_EMBED =
    'https://www.google.com/maps?q=Pramonės%20pr.%2015A,%20Kaunas&output=embed';

  // Kalba
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'lt');
  useEffect(() => localStorage.setItem('lang', lang), [lang]);

  // Tekstai
  const t = useMemo(
    () =>
      ({
        lt: {
          brand: 'Kirpėja Virginija',
          heroTitle: 'Kai kirpimas tampa ritualu',
          heroText:
            'Jaukioje aplinkoje skiriamas laikas ne tik kirpimui, bet ir poilsiui. Dėmesys detalėms, švara ir pagarba kiekvienam klientui.',
          cta: 'Rezervuok laiką',
          servicesTitle: 'Teikiamos paslaugos',
          services: [
            { name: 'Vyriškas kirpimas', price: 'nuo 10 €' },
            { name: 'Plaukų kirpimas ir barzdos modeliavimas', price: '15 €' },
            { name: 'Moterų kirpimas', price: '15 €' },
            { name: 'Vaikų kirpimas', price: '12 €' },
            { name: 'Plaukų dažymas ir tonavimas', price: '25 €' },
            { name: 'Plaukų pynimas su pluoštu', price: '20 €' },
            { name: 'Cheminis sušukavimas', price: '40 €' },
          ],
          aboutTitle: 'Apie',
          aboutText:
            '„Kirpėja Virginija“ – tai vieta, kur svarbiausia yra pojūtis. Kiekvienas klientas gauna individualų dėmesį, profesionalų kirpimą ir akimirką atsipalaiduoti.',
          contactTitle: 'Kontaktai',
          address: 'Pramonės pr. 15A, Kaunas',
          phoneLabel: 'Tel.',
          hours: 'Darbo laikas: I–V 9:00–19:00, VI 9:00–15:00',
          footer: 'Svetainę sukūrė Linas Ulevičius.',
          seoTitle: 'Kirpėja Virginija | Vyriškas ir moteriškas kirpimas Kaune',
          seoDesc:
            'Kirpėja Virginija – vieta, kur kirpimas tampa ritualu. Jauki atmosfera, dėmesys detalėms, vyriškas kirpimas, barzdos modeliavimas, dažymas ir šukuosenos Kaune.',
          testimonialsTitle: 'Atsiliepimai',
          testimonials: [
            {
              name: 'Mantas',
              text: 'Tikslus vyriškas kirpimas ir rami atmosfera. Malonu grįžti.',
            },
            {
              name: 'Tomas',
              text: 'Puiki patirtis – viskas kruopščiai ir be skubėjimo. Rekomenduoju.',
            },
            {
              name: 'Karolis',
              text: 'Barzdos modeliavimas super. Jaučiasi meistrystė ir dėmesys detalėms.',
            },
          ],
          faqTitle: 'Dažniausiai užduodami klausimai',
          faqs: [
            {
              q: 'Ar reikia iš anksto registruotis?',
              a: 'Taip, rekomenduojama rezervuoti laiką per Treatwell, kad gautumėte patogų laiką.',
            },
            {
              q: 'Kiek laiko trunka vyriškas kirpimas?',
              a: 'Paprastai apie 30–45 minutes, priklausomai nuo plaukų ir pageidavimų.',
            },
            {
              q: 'Ar galima atsiskaityti kortele?',
              a: 'Taip, priimami atsiskaitymai kortele ir grynais.',
            },
          ],
          book: 'Rezervuoti',
        },
        en: {
          brand: 'Hairdresser Virginija',
          heroTitle: 'When a haircut becomes a ritual',
          heroText:
            'A calm, welcoming space to enjoy the process. Attention to detail, cleanliness and genuine care.',
          cta: 'Book an appointment',
          servicesTitle: 'Services',
          services: [
            { name: 'Men’s haircut', price: 'from €10' },
            { name: 'Haircut & beard styling', price: '€15' },
            { name: 'Women’s haircut', price: '€15' },
            { name: 'Kids haircut', price: '€12' },
            { name: 'Root coloring / toning', price: '€25' },
            { name: 'Braids with fiber', price: '€20' },
            { name: 'Perm / chemical styling', price: '€40' },
          ],
          aboutTitle: 'About',
          aboutText:
            'A place where feeling matters. Unhurried attention, precise work and a moment to unwind.',
          contactTitle: 'Contacts',
          address: 'Pramonės Ave. 15A, Kaunas',
          phoneLabel: 'Phone',
          hours: 'Hours: Mon–Fri 9:00–19:00, Sat 9:00–15:00',
          footer: 'Website by Linas Ulevičius.',
          seoTitle:
            'Hairdresser Virginija | Men’s & Women’s haircuts in Kaunas',
          seoDesc:
            'A calm studio for men’s haircuts, beard styling, coloring and more in Kaunas.',
          testimonialsTitle: 'Testimonials',
          testimonials: [
            {
              name: 'Mantas',
              text: 'Precise men’s cut and a relaxing atmosphere. Easy to come back.',
            },
            {
              name: 'Tomas',
              text: 'Great experience – meticulous and unhurried. Recommend.',
            },
            {
              name: 'Karolis',
              text: 'Excellent beard work. Craftsmanship and attention to detail.',
            },
          ],
          faqTitle: 'Frequently asked questions',
          faqs: [
            {
              q: 'Do I need to book in advance?',
              a: 'Yes, it’s best to book via Treatwell to secure a convenient time.',
            },
            {
              q: 'How long does a men’s haircut take?',
              a: 'Typically 30–45 minutes depending on hair and preferences.',
            },
            {
              q: 'Do you accept card payments?',
              a: 'Yes, both card and cash are accepted.',
            },
          ],
          book: 'Book',
        },
      }[lang]),
    [lang]
  );

  const LangSwitch = () => (
    <div className='flex gap-2 items-center'>
      <button
        onClick={() => setLang('lt')}
        className={`px-3 py-1 rounded-md border transition ${
          lang === 'lt'
            ? 'bg-[#C1A173] text-white border-[#C1A173]'
            : 'border-[#e6e3de] text-[#2E2B29] hover:bg-[#f3efe8]'
        }`}
        aria-pressed={lang === 'lt'}
      >
        LT
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 rounded-md border transition ${
          lang === 'en'
            ? 'bg-[#C1A173] text-white border-[#C1A173]'
            : 'border-[#e6e3de] text-[#2E2B29] hover:bg-[#f3efe8]'
        }`}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  );

  // JSON-LD – FAQ schema
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <HelmetProvider>
      <Helmet>
        <html lang={lang} />
        <title>{t.seoTitle}</title>
        <meta name='description' content={t.seoDesc} />
        <script type='application/ld+json'>{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Header */}
      <header className='w-full py-5 bg-[#F8F7F4] shadow-sm'>
        <div className='max-w-6xl mx-auto px-6 flex justify-between items-center'>
          <h1 className='text-2xl font-serif text-[#2E2B29]'>{t.brand}</h1>
          <div className='flex items-center gap-4'>
            <LangSwitch />
            <a
              href={TREATWELL_URL}
              target='_blank'
              rel='noreferrer'
              className='px-5 py-2 rounded-md bg-[#C1A173] text-white font-medium hover:bg-[#a88b5f] transition'
            >
              {t.cta}
            </a>
          </div>
        </div>
      </header>

      {/* HERO su video fone */}
      <section className='relative h-[60svh] min-h-[420px] w-full overflow-hidden'>
        {/* Video fone (įkelk į /public/hero.mp4) */}
        <video
          className='absolute inset-0 h-full w-full object-cover'
          src='/hero.mp4'
          autoPlay
          muted
          playsInline
          loop
          poster='/hero-poster.jpg'
        />
        {/* Švelnus tamsinantis overlay + šiltas gradientas */}
        <div className='absolute inset-0 bg-black/30' />
        <div className='absolute inset-0 bg-gradient-to-t from-[#F8F7F4]/70 to-transparent' />
        {/* Tekstas */}
        <div className='relative z-10 h-full flex items-center'>
          <div className='max-w-4xl mx-auto px-6 text-center'>
            <h2 className='text-white drop-shadow text-4xl md:text-5xl font-serif mb-4'>
              {t.heroTitle}
            </h2>
            <p className='text-white/90 drop-shadow leading-relaxed text-lg mb-6'>
              {t.heroText}
            </p>
            <a
              href={TREATWELL_URL}
              target='_blank'
              rel='noreferrer'
              className='inline-block px-7 py-3 rounded-md bg-[#C1A173] text-white font-semibold hover:bg-[#a88b5f] transition'
            >
              {t.cta}
            </a>
          </div>
        </div>
      </section>

      {/* Paslaugos */}
      <section className='py-16 bg-white'>
        <div className='max-w-5xl mx-auto px-6'>
          <h3 className='text-3xl font-serif text-[#2E2B29] text-center mb-10'>
            {t.servicesTitle}
          </h3>
          <div className='grid md:grid-cols-2 gap-6'>
            {t.services.map((item) => (
              <div
                key={item.name}
                className='p-6 border border-[#e5e4e1] rounded-xl hover:shadow-md transition flex justify-between items-center'
              >
                <span className='text-lg text-[#2E2B29]'>{item.name}</span>
                <div className='flex items-center gap-4'>
                  <span className='font-semibold text-[#C1A173]'>
                    {item.price}
                  </span>
                  <a
                    href={TREATWELL_URL}
                    target='_blank'
                    rel='noreferrer'
                    className='text-sm px-3 py-1.5 bg-[#C1A173] text-white rounded-md hover:bg-[#a88b5f]'
                  >
                    {lang === 'lt' ? 'Rezervuoti' : 'Book'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atsiliepimai */}
      <section className='py-16 bg-[#F8F7F4]'>
        <div className='max-w-6xl mx-auto px-6'>
          <h3 className='text-3xl font-serif text-[#2E2B29] text-center mb-10'>
            {t.testimonialsTitle}
          </h3>
          <div className='grid md:grid-cols-3 gap-6'>
            {t.testimonials.map((r, i) => (
              <article
                key={i}
                className='rounded-xl border border-[#e5e4e1] bg-white p-6 shadow-sm'
              >
                <p className='text-[#3E3B38] leading-relaxed mb-4'>
                  “{r.text}”
                </p>
                <p className='text-[#2E2B29] font-semibold'>— {r.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Apie */}
      <section className='py-16 bg-white'>
        <div className='max-w-4xl mx-auto px-6 text-center'>
          <h3 className='text-3xl font-serif text-[#2E2B29] mb-6'>
            {t.aboutTitle}
          </h3>
          <p className='text-[#3E3B38] leading-relaxed text-lg'>
            {t.aboutText}
          </p>
        </div>
      </section>

      {/* DUK (accordion) */}
      <section className='py-16 bg-[#F8F7F4]'>
        <div className='max-w-4xl mx-auto px-6'>
          <h3 className='text-3xl font-serif text-[#2E2B29] text-center mb-8'>
            {t.faqTitle}
          </h3>
          <div className='space-y-4'>
            {t.faqs.map((f, i) => (
              <details
                key={i}
                className='group rounded-xl border border-[#e5e4e1] bg-white p-5 open:shadow-sm'
              >
                <summary className='cursor-pointer select-none text-[#2E2B29] font-medium list-none'>
                  {f.q}
                </summary>
                <div className='mt-3 text-[#3E3B38] leading-relaxed'>{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Kontaktai + žemėlapis */}
      <section className='py-16 bg-white'>
        <div className='max-w-5xl mx-auto px-6'>
          <h3 className='text-3xl font-serif text-[#2E2B29] text-center mb-8'>
            {t.contactTitle}
          </h3>
          <div className='text-center mb-10 text-[#3E3B38] space-y-1'>
            <p>📍 {t.address}</p>
            <p>📞 {t.phoneLabel}: +370 6xx xxx xx</p>
            <p>🕒 {t.hours}</p>
          </div>
          <div className='rounded-xl overflow-hidden shadow-md'>
            <iframe
              title='Kirpėja Virginija Kaune'
              src={ADDRESS_MAP_EMBED}
              width='100%'
              height='400'
              loading='lazy'
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-[#F8F7F4] py-6 text-center text-[#3E3B38] text-sm'>
        © {new Date().getFullYear()} {t.brand}. {t.footer}
      </footer>
    </HelmetProvider>
  );
}
