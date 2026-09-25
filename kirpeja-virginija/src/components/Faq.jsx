import { useLanguage } from '../context/LanguageContext';
import { FAQ } from '../data/faq';

export default function Faq() {
  const { lang } = useLanguage();
  const l = lang === 'LT' ? 'lt' : 'en';

  return (
    <section
      id='duk'
      className='py-20 bg-white'
      aria-labelledby='faq-heading'
    >
      <div className='max-w-3xl mx-auto px-6'>
        <h2
          id='faq-heading'
          className='text-3xl font-serif text-center mb-10 text-ink'
        >
          {lang === 'LT' ? 'Dažniausiai užduodami klausimai' : 'Frequently asked questions'}
        </h2>

        <div className='space-y-3'>
          {FAQ.map((item, i) => (
            <details
              key={i}
              className='group p-5 border border-line rounded-xl bg-sand open:bg-white transition'
              onToggle={(e) => {
                if (e.currentTarget.open) {
                  window.gtag?.('event', 'faq_open', {
                    event_category: 'engagement',
                    event_label: `faq_${i + 1}`,
                  });
                }
              }}
            >
              <summary className='flex justify-between items-center gap-4 cursor-pointer list-none font-medium text-ink'>
                <h3 className='text-base md:text-lg'>{item.q[l]}</h3>
                <span
                  className='text-gold text-2xl leading-none transition-transform group-open:rotate-45'
                  aria-hidden='true'
                >
                  +
                </span>
              </summary>
              <p className='mt-3 text-sm md:text-base text-muted leading-relaxed'>
                {item.a[l]}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
