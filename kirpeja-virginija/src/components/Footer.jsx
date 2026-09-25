import { Facebook } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { OPEN_CONSENT_EVENT } from './CookieConsent';
import {
  BUSINESS,
  FACEBOOK_URL,
  GOOGLE_MAPS_URL,
} from '../data/business';

export default function Footer() {
  const { lang, page, pathFor } = useLanguage();

  const isPrivacy = page === 'privacy';

  const creatorUrl = 'https://linaswebdev.lt/';
  const googleMapUrl = GOOGLE_MAPS_URL;
  const facebookUrl = FACEBOOK_URL;
  const phoneRaw = BUSINESS.phone;

  const trackEvent = (eventName, params = {}) => {
    window.gtag?.('event', eventName, {
      language: lang,
      page_path: window.location.pathname,
      page_location: window.location.href,
      ...params,
    });
  };

  const t = {
    LT: {
      brandTop: 'Kirpėja',
      brandBottom: 'Virginija',
      addressLabel: 'Adresas:',
      address: 'Pramonės pr. 15A, 51327 Kaunas',
      phoneLabel: 'Telefonas:',
      phone: BUSINESS.phoneDisplay,
      hoursLabel: 'Darbo laikas:',
      hours: BUSINESS.hours.lt,
      cookies:
        'Statistiniai slapukai (Google Analytics) naudojami tik gavus Jūsų sutikimą.',
      cookieSettings: 'Slapukų nustatymai',
      servicesTitle: 'Paslaugos',
      servicePages: [
        ['women', 'Moterų kirpimas Kaune'],
        ['men', 'Vyrų kirpimas Kaune'],
        ['kids', 'Vaikų kirpimas Kaune'],
      ],
      privacy: 'Privatumo politika',
      backHome: 'Grįžti į pradžią',
      fb: 'Sekite mus Facebook',
      rights: 'Svetainę sukūrė ',
      creator: 'linaswebdev.lt',
      addressAria: 'Atidaryti adresą Google žemėlapiuose',
      phoneAria: 'Skambinti kirpėjai Virginijai',
      facebookAria: 'Atidaryti Kirpėjos Virginijos Facebook puslapį',
      privacyAria: 'Atidaryti privatumo politikos puslapį',
      creatorAria: 'Atidaryti svetainės kūrėjo puslapį linaswebdev.lt',
    },

    EN: {
      brandTop: 'Hairdresser',
      brandBottom: 'Virginija',
      addressLabel: 'Address:',
      address: 'Pramonės Ave. 15A, 51327 Kaunas',
      phoneLabel: 'Phone:',
      phone: BUSINESS.phoneDisplay,
      hoursLabel: 'Working hours:',
      hours: BUSINESS.hours.en,
      cookies:
        'Statistical cookies (Google Analytics) are used only with your consent.',
      cookieSettings: 'Cookie settings',
      servicesTitle: 'Services',
      servicePages: [
        ['women', 'Women’s haircut in Kaunas'],
        ['men', 'Men’s haircut in Kaunas'],
        ['kids', 'Children’s haircut in Kaunas'],
      ],
      privacy: 'Privacy Policy',
      backHome: 'Back to home',
      fb: 'Follow us on Facebook',
      rights: 'Website created by ',
      creator: 'linaswebdev.lt',
      addressAria: 'Open address in Google Maps',
      phoneAria: 'Call hairdresser Virginija',
      facebookAria: 'Open Hairdresser Virginija Facebook page',
      privacyAria: 'Open privacy policy page',
      creatorAria: 'Open website creator site linaswebdev.lt',
    },
  };

  const telHref = `tel:${phoneRaw}`;

  const trackPrivacy = () => {
    trackEvent('privacy_click', {
      link_location: 'footer',
    });
  };

  return (
    <footer
      id='kontaktai'
      role='contentinfo'
      className='bg-sand py-12 border-t border-line'
    >
      <div className='max-w-5xl mx-auto text-center text-ink space-y-4 px-6'>
        <div className='leading-tight font-serif'>
          <span className='block text-xl'>{t[lang].brandTop}</span>
          <span className='block -mt-1 text-gold text-lg'>
            {t[lang].brandBottom}
          </span>
        </div>

        <p>
          <span className='font-medium'>{t[lang].addressLabel}</span>{' '}
          <a
            href={googleMapUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='underline hover:text-gold-dark transition'
            aria-label={t[lang].addressAria}
            onClick={() =>
              trackEvent('maps_click', {
                link_location: 'footer',
                destination: 'google_maps',
              })
            }
          >
            {t[lang].address}
          </a>
        </p>

        <p>
          <span className='font-medium'>{t[lang].phoneLabel}</span>{' '}
          <a
            href={telHref}
            className='underline hover:text-gold-dark transition'
            aria-label={t[lang].phoneAria}
            onClick={() =>
              trackEvent('phone_click', {
                link_location: 'footer',
                device_type: 'unknown',
                event_label: 'footer_phone',
              })
            }
          >
            {t[lang].phone}
          </a>
        </p>

        <p>
          <span className='font-medium'>{t[lang].hoursLabel}</span>{' '}
          <span>{t[lang].hours}</span>
        </p>

        <div className='flex justify-center'>
          <a
            href={facebookUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 hover:text-gold-dark transition'
            aria-label={t[lang].facebookAria}
            onClick={() =>
              trackEvent('facebook_click', {
                link_location: 'footer',
                destination: 'facebook',
              })
            }
          >
            <Facebook size={20} />
            <span className='text-sm'>{t[lang].fb}</span>
          </a>
        </div>

        <nav aria-label={t[lang].servicesTitle} className='flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm'>
          {t[lang].servicePages.map(([key, label]) => (
            <Link key={key} to={pathFor(key)} className='underline hover:text-gold-dark'>
              {label}
            </Link>
          ))}
        </nav>

        <p className='text-sm text-muted'>
          {t[lang].cookies}{' '}
          <button
            type='button'
            className='underline hover:text-gold-dark'
            onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
          >
            {t[lang].cookieSettings}
          </button>
        </p>

        {!isPrivacy && (
          <Link
            to={pathFor('privacy')}
            className='underline hover:text-gold-dark transition text-sm'
            aria-label={t[lang].privacyAria}
            onClick={trackPrivacy}
          >
            {t[lang].privacy}
          </Link>
        )}

        <p className='text-sm text-muted'>
          © {new Date().getFullYear()} Kirpėja Virginija. {t[lang].rights}
          <a
            href={creatorUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='underline hover:text-gold-dark'
            aria-label={t[lang].creatorAria}
            onClick={() =>
              trackEvent('creator_click', {
                link_location: 'footer',
                destination: 'linaswebdev',
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
