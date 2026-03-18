import { Facebook } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
  const { lang } = useLanguage();

  const navigate = useNavigate();
  const location = useLocation();

  const isPrivacy = location.pathname === '/privatumo-politika';

  const creatorUrl = 'https://www.linkedin.com/in/linas-ulevicius/';
  const googleMapUrl = 'https://maps.google.com/?q=Pramonės+pr.+15A,+Kaunas';
  const facebookUrl =
    'https://www.facebook.com/people/Kirp%C4%97ja-Virginija/61582796560584/';
  const siteUrl = 'https://kirpeja-virginija.lt/';
  const phoneRaw = '+37065460937';

  const t = {
    LT: {
      brandTop: 'Kirpėja',
      brandBottom: 'Virginija',

      addressLabel: 'Adresas:',
      address: 'Pramonės pr. 15A, Kaunas',

      phoneLabel: 'Telefonas:',
      phone: '+37065460937',

      hoursLabel: 'Darbo laikas:',
      hours: 'I–V 9:00–19:00, VI 9:00–15:00',

      cookies:
        'Ši svetainė naudoja tik statistinius slapukus (Google Analytics), kurie padeda gerinti svetainės veikimą.',

      privacy: 'Privatumo politika',
      backHome: 'Grįžti į pradžią',

      fb: 'Sekite mus Facebook',

      rights: 'Svetainę sukūrė ',
      creator: 'Linas Ulevičius',

      addressAria: 'Atidaryti adresą Google žemėlapiuose',
      phoneAria: 'Skambinti kirpėjai Virginijai',
      facebookAria: 'Atidaryti Kirpėjos Virginijos Facebook puslapį',
      privacyAria: 'Atidaryti privatumo politikos puslapį',
      creatorAria: 'Atidaryti svetainės kūrėjo profilį',
    },

    EN: {
      brandTop: 'Hairdresser',
      brandBottom: 'Virginija',

      addressLabel: 'Address:',
      address: 'Pramonės Ave. 15A, Kaunas',

      phoneLabel: 'Phone:',
      phone: '+37065460937',

      hoursLabel: 'Working hours:',
      hours: 'Mon–Fri 9:00–19:00, Sat 9:00–15:00',

      cookies:
        'This website uses only statistical cookies (Google Analytics) to improve performance.',

      privacy: 'Privacy Policy',
      backHome: 'Back to home',

      fb: 'Follow us on Facebook',

      rights: 'Website created by ',
      creator: 'Linas Ulevičius',

      addressAria: 'Open address in Google Maps',
      phoneAria: 'Call hairdresser Virginija',
      facebookAria: 'Open Hairdresser Virginija Facebook page',
      privacyAria: 'Open privacy policy page',
      creatorAria: 'Open website creator profile',
    },
  };

  const telHref = `tel:${phoneRaw}`;

  const scrollTopSmooth = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goPrivacyTop = () => {
    window.gtag?.('event', 'privacy_click', {
      event_category: 'engagement',
      event_label: 'footer_privacy',
    });

    navigate('/privatumo-politika', { replace: true });
    setTimeout(scrollTopSmooth, 50);
  };

  return (
    <footer
      id='kontaktai'
      role='contentinfo'
      className='bg-white py-12 border-t border-[#e5e4e1]'
      itemScope
      itemType='https://schema.org/HairSalon'
    >
      {/* SEO microdata */}
      <meta itemProp='name' content='Kirpėja Virginija' />
      <meta itemProp='url' content={siteUrl} />
      <meta itemProp='telephone' content={phoneRaw} />
      <meta itemProp='priceRange' content='€€' />
      <meta itemProp='sameAs' content={facebookUrl} />

      <div
        itemProp='address'
        itemScope
        itemType='https://schema.org/PostalAddress'
      >
        <meta itemProp='streetAddress' content='Pramonės pr. 15A' />
        <meta itemProp='addressLocality' content='Kaunas' />
        <meta itemProp='addressCountry' content='LT' />
      </div>

      <meta itemProp='openingHours' content='Mo-Fr 09:00-19:00' />
      <meta itemProp='openingHours' content='Sa 09:00-15:00' />

      <div className='max-w-5xl mx-auto text-center text-[#3E3B38] space-y-4 px-6'>
        {/* Brand */}
        <div className='leading-tight font-serif'>
          <span className='block text-xl'>{t[lang].brandTop}</span>
          <span className='block -mt-1 text-[#C1A173] text-lg'>
            {t[lang].brandBottom}
          </span>
        </div>

        {/* Address */}
        <p>
          <span className='font-medium'>{t[lang].addressLabel}</span>{' '}
          <a
            href={googleMapUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='underline hover:text-[#8A744F] transition'
            aria-label={t[lang].addressAria}
            onClick={() =>
              window.gtag?.('event', 'click_map', {
                event_category: 'engagement',
                event_label: 'footer_map',
              })
            }
          >
            <span itemProp='address'>{t[lang].address}</span>
          </a>
        </p>

        {/* Phone */}
        <p>
          <span className='font-medium'>{t[lang].phoneLabel}</span>{' '}
          <a
            href={telHref}
            className='underline hover:text-[#8A744F] transition'
            itemProp='telephone'
            aria-label={t[lang].phoneAria}
            onClick={() =>
              window.gtag?.('event', 'call_click', {
                event_category: 'engagement',
                event_label: 'footer_call',
              })
            }
          >
            {t[lang].phone}
          </a>
        </p>

        {/* Hours */}
        <p>
          <span className='font-medium'>{t[lang].hoursLabel}</span>{' '}
          <span>{t[lang].hours}</span>
        </p>

        {/* Facebook */}
        <div className='flex justify-center'>
          <a
            href={facebookUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 hover:text-[#8A744F] transition'
            aria-label={t[lang].facebookAria}
            onClick={() =>
              window.gtag?.('event', 'click_facebook', {
                event_category: 'social',
                event_label: 'footer_facebook',
              })
            }
          >
            <Facebook size={20} />
            <span className='text-sm'>{t[lang].fb}</span>
          </a>
        </div>

        {/* Cookies */}
        <p className='text-sm text-[#6C6C6C]'>{t[lang].cookies}</p>

        {/* Privacy */}
        {!isPrivacy && (
          <button
            type='button'
            className='underline hover:text-[#8A744F] transition text-sm'
            aria-label={t[lang].privacyAria}
            onClick={goPrivacyTop}
          >
            {t[lang].privacy}
          </button>
        )}

        {/* Creator */}
        <p className='text-sm text-[#6C6C6C]'>
          © {new Date().getFullYear()} Kirpėja Virginija. {t[lang].rights}
          <a
            href={creatorUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='underline hover:text-[#8A744F]'
            aria-label={t[lang].creatorAria}
            onClick={() =>
              window.gtag?.('event', 'creator_click', {
                event_category: 'engagement',
                event_label: 'footer_creator',
              })
            }
          >
            {t[lang].creator}
          </a>
        </p>
      </div>
    </footer>
  );
}
