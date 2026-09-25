import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Sutikimas saugomas localStorage. index.html pagal jį nustato
// Google Consent Mode numatytąją reikšmę dar prieš įkeliant analitiką.
export const CONSENT_KEY = 'cookie-consent';
export const OPEN_CONSENT_EVENT = 'open-cookie-settings';

const readConsent = () => {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
};

export default function CookieConsent() {
  const { l, pathFor } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!readConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  const choose = (granted) => {
    try {
      localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied');
    } catch {
      // privačiame režime localStorage gali būti nepasiekiamas
    }
    window.gtag?.('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
    });
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role='dialog'
      aria-live='polite'
      aria-label={l === 'lt' ? 'Slapukų sutikimas' : 'Cookie consent'}
      className='fixed z-50 inset-x-3 bottom-24 md:bottom-6 md:left-6 md:right-auto md:max-w-md p-5 rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.18)] border border-line text-ink'
    >
      <p className='text-sm leading-relaxed mb-4'>
        {l === 'lt'
          ? 'Naudojame statistinius slapukus (Google Analytics), kad žinotume, kaip lankytojai naudojasi svetaine. Jie įjungiami tik gavus Jūsų sutikimą.'
          : 'We use statistical cookies (Google Analytics) to understand how visitors use the site. They are enabled only with your consent.'}{' '}
        <a href={pathFor('privacy')} className='underline hover:text-gold-dark'>
          {l === 'lt' ? 'Privatumo politika' : 'Privacy policy'}
        </a>
      </p>
      <div className='flex gap-3'>
        <button
          type='button'
          onClick={() => choose(true)}
          className='flex-1 px-4 py-2 rounded-full bg-gold-dark text-white font-medium hover:bg-gold-darker transition'
        >
          {l === 'lt' ? 'Sutinku' : 'Accept'}
        </button>
        <button
          type='button'
          onClick={() => choose(false)}
          className='flex-1 px-4 py-2 rounded-full border border-black/15 font-medium hover:bg-sand transition'
        >
          {l === 'lt' ? 'Atsisakau' : 'Decline'}
        </button>
      </div>
    </div>
  );
}
