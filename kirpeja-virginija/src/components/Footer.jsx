import { Facebook } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();

  const t = {
    LT: {
      brandTop: 'Kirpėja',
      brandBottom: 'Virginija',
      addressLabel: '📍 Adresas:',
      address: 'Pramonės pr. 15A, Kaunas',
      phoneLabel: '📞 Telefonas:',
      phone: '+37065460937',
      hoursLabel: '🕒 Darbo laikas:',
      hours: 'I–V 9:00–19:00, VI 9:00–15:00',

      cookies:
        'Ši svetainė naudoja tik statistinius slapukus (Google Analytics), kurie padeda gerinti svetainės veikimą. Jokie asmeniniai duomenys nerenkami.',

      privacy: 'Privatumo politika',
      fb: 'Sekite mus Facebook',
      rights: 'Svetainę sukūrė Linas Ulevičius.',
    },
    EN: {
      brandTop: 'Hairdresser',
      brandBottom: 'Virginija',
      addressLabel: '📍 Address:',
      address: 'Pramonės Ave. 15A, Kaunas',
      phoneLabel: '📞 Phone:',
      phone: '+37065460937',
      hoursLabel: '🕒 Working hours:',
      hours: 'Mon–Fri 9:00–19:00, Sat 9:00–15:00',

      cookies:
        'This website uses only statistical cookies (Google Analytics) to improve performance. No personal data is collected.',

      privacy: 'Privacy Policy',
      fb: 'Follow us on Facebook',
      rights: 'Website created by Linas Ulevičius.',
    },
  };

  const googleMapUrl = 'https://maps.google.com/?q=Pramonės+pr.+15A,+Kaunas';
  const facebookUrl =
    'https://www.facebook.com/people/Kirp%C4%97ja-Virginija/61582796560584/';

  return (
    <footer
      id='kontaktai'
      role='contentinfo'
      className='bg-white py-12 border-t border-[#e5e4e1]'
      itemScope
      itemType='https://schema.org/LocalBusiness'
    >
      {/* Schema.org */}
      <meta itemProp='name' content='Kirpėja Virginija' />
      <div
        itemProp='address'
        itemScope
        itemType='https://schema.org/PostalAddress'
      >
        <meta itemProp='streetAddress' content='Pramonės pr. 15A' />
        <meta itemProp='addressLocality' content='Kaunas' />
        <meta itemProp='addressCountry' content='LT' />
      </div>

      <div className='max-w-5xl mx-auto text-center text-[#3E3B38] space-y-3'>
        {/* LOGO kaip Header’e */}
        <p className='leading-tight font-serif text-[#3E3B38]'>
          <span className='block text-xl'>{t[lang].brandTop}</span>
          <span className='block -mt-1 text-[#C1A173] text-lg'>
            {t[lang].brandBottom}
          </span>
        </p>

        <p>
          <span className='font-medium'>{t[lang].addressLabel}</span>{' '}
          <a
            href={googleMapUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='underline hover:text-[#8A744F]'
          >
            {t[lang].address}
          </a>
        </p>

        <p>
          <span className='font-medium'>{t[lang].phoneLabel}</span>{' '}
          <a
            href={`tel:${t[lang].phone.replace(/\s+/g, '')}`}
            className='underline hover:text-[#8A744F]'
            itemProp='telephone'
          >
            {t[lang].phone}
          </a>
        </p>

        <p>
          <span className='font-medium'>{t[lang].hoursLabel}</span>{' '}
          <span itemProp='openingHours'>{t[lang].hours}</span>
        </p>

        {/* Facebook link */}
        <div className='flex justify-center items-center gap-2 mt-3'>
          <a
            href={facebookUrl}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={t[lang].fb}
            className='text-[#3E3B38] hover:text-[#8A744F] transition flex items-center gap-1'
            onClick={() => {
              // GA4 event
              if (window.gtag) {
                window.gtag('event', 'click_facebook', {
                  event_category: 'social',
                  event_label: 'footer_facebook',
                });
              }
            }}
          >
            <Facebook size={20} strokeWidth={1.6} />
            <span className='text-sm'>{t[lang].fb}</span>
          </a>
        </div>

        {/* Cookies notice */}
        <p className='text-xs text-[#6C6C6C] max-w-xl mx-auto mt-4 px-4'>
          {t[lang].cookies}{' '}
          <a
            href='https://policies.google.com/privacy'
            target='_blank'
            rel='noopener noreferrer'
            className='underline hover:text-[#BAA774]'
          >
            {t[lang].privacy}
          </a>
        </p>

        <p className='text-sm text-[#6C6C6C] mt-4'>
          © {new Date().getFullYear()} Kirpėja Virginija. {t[lang].rights}
        </p>
      </div>
    </footer>
  );
}
