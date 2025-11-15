import { Facebook } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();

  const t = {
    LT: {
      addressLabel: '📍 Adresas:',
      address: 'Pramonės pr. 15A, Kaunas',
      phoneLabel: '📞 Telefonas:',
      phone: '+37065460937',
      hoursLabel: '🕒 Darbo laikas:',
      hours: 'I–V 9:00–19:00, VI 9:00–15:00',
      rights: 'Svetainę sukūrė Linas Ulevičius.',
      fb: 'Sekite mus Facebook',
    },
    EN: {
      addressLabel: '📍 Address:',
      address: 'Pramonės Ave. 15A, Kaunas',
      phoneLabel: '📞 Phone:',
      phone: '+37065460937',
      hoursLabel: '🕒 Working hours:',
      hours: 'Mon–Fri 9:00–19:00, Sat 9:00–15:00',
      rights: 'Website created by Linas Ulevičius.',
      fb: 'Follow us on Facebook',
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
      <meta itemProp='name' content='Kirpėja Virginija' />

      {/* ADDRESS SCHEMA */}
      <div
        itemProp='address'
        itemScope
        itemType='https://schema.org/PostalAddress'
      >
        <meta itemProp='streetAddress' content='Pramonės pr. 15A' />
        <meta itemProp='addressLocality' content='Kaunas' />
        <meta itemProp='addressCountry' content='LT' />
      </div>

      <div className='max-w-5xl mx-auto text-center text-[#3E3B38] space-y-2'>
        {/* Pavadinimas */}
        <p className='font-serif text-xl text-[#2E2B29]'>Kirpėja Virginija</p>

        {/* Adresas */}
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

        {/* Telefonas */}
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

        {/* Darbo laikas */}
        <p>
          <span className='font-medium'>{t[lang].hoursLabel}</span>{' '}
          <span itemProp='openingHours'>{t[lang].hours}</span>
        </p>

        {/* Facebook */}
        <div className='flex justify-center items-center gap-2 mt-3'>
          <a
            href={facebookUrl}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={t[lang].fb}
            className='text-[#3E3B38] hover:text-[#8A744F] transition flex items-center gap-1'
          >
            <Facebook size={20} strokeWidth={1.6} />
            <span className='text-sm'>{t[lang].fb}</span>
          </a>
        </div>

        {/* Copyright */}
        <p className='text-sm text-[#6C6C6C] mt-4'>
          © {new Date().getFullYear()} Kirpėja Virginija. {t[lang].rights}
        </p>
      </div>
    </footer>
  );
}
