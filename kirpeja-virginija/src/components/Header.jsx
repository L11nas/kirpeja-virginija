import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const PHONE_TEL = 'tel:+37065460937';
const TREATWELL_URL = 'https://book.treatwell.lt/salonas/kirpeja-virginija/';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { lang, toggleLang, page, pathFor } = useLanguage();
  const navigate = useNavigate();
  const home = pathFor('home');

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
      services: 'Paslaugos',
      about: 'Apie',
      reviews: 'Atsiliepimai',
      gallery: 'Galerija',
      contact: 'Kontaktai',
      book: 'Registruokis',
      call: 'Skambinti',
      mainNav: 'Pagrindinė navigacija',
      backToTop: 'Grįžti į pradžią',
      openMenu: 'Atidaryti meniu',
      closeMenu: 'Uždaryti meniu',
      logoLabel: 'Kirpėja Virginija',
      bookAria: 'Registruotis vizitui internetu per Treatwell',
      callAria: 'Skambinti kirpėjai Virginijai',
      servicesAria: 'Pereiti į paslaugų skiltį',
      aboutAria: 'Pereiti į skiltį apie kirpėją',
      reviewsAria: 'Pereiti į atsiliepimų skiltį',
      galleryAria: 'Pereiti į galerijos skiltį',
      contactAria: 'Pereiti į kontaktų skiltį',
      switchLang: 'Pakeisti svetainės kalbą',
    },
    EN: {
      services: 'Services',
      about: 'About',
      reviews: 'Reviews',
      gallery: 'Gallery',
      contact: 'Contact',
      book: 'Book now',
      call: 'Call',
      mainNav: 'Main navigation',
      backToTop: 'Back to top',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      logoLabel: 'Hairdresser Virginija',
      bookAria: 'Book an appointment online via Treatwell',
      callAria: 'Call hairdresser Virginija',
      servicesAria: 'Go to services section',
      aboutAria: 'Go to about section',
      reviewsAria: 'Go to reviews section',
      galleryAria: 'Go to gallery section',
      contactAria: 'Go to contact section',
      switchLang: 'Change website language',
    },
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 20);
      setHidden(current > lastScrollY && current > 80);
      lastScrollY = current;
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-line'
          : 'bg-white/90 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className='max-w-6xl mx-auto flex justify-between items-center py-3 px-6'>
        <a
          href={home}
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            if (page !== 'home') navigate(home);
            trackEvent('nav_click', {
              link_location: 'header',
              target_section: 'hero',
              device_type: window.innerWidth >= 768 ? 'desktop' : 'mobile',
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className='flex items-center gap-2 hover:opacity-90 transition'
          aria-label={t[lang].backToTop}
          title={t[lang].logoLabel}
        >
          <div className='leading-tight font-serif text-ink'>
            <span className='block text-lg'>Kirpėja</span>
            <span className='block -mt-1 text-gold'>Virginija</span>
          </div>
        </a>

        <nav
          className='hidden md:flex items-center gap-6 text-ink'
          aria-label={t[lang].mainNav}
        >
          <a
            href={`${home}#paslaugos`}
            className='hover:text-gold-dark transition'
            aria-label={t[lang].servicesAria}
            onClick={() => {
              trackEvent('nav_click', {
                link_location: 'header',
                target_section: 'services',
                device_type: 'desktop',
              });
            }}
          >
            {t[lang].services}
          </a>

          <a
            href={`${home}#apie`}
            className='hover:text-gold-dark transition'
            aria-label={t[lang].aboutAria}
            onClick={() => {
              trackEvent('nav_click', {
                link_location: 'header',
                target_section: 'about',
                device_type: 'desktop',
              });
            }}
          >
            {t[lang].about}
          </a>

          <a
            href={`${home}#atsiliepimai`}
            className='hover:text-gold-dark transition'
            aria-label={t[lang].reviewsAria}
            onClick={() => {
              trackEvent('nav_click', {
                link_location: 'header',
                target_section: 'reviews',
                device_type: 'desktop',
              });
            }}
          >
            {t[lang].reviews}
          </a>

          <a
            href={`${home}#galerija`}
            className='hover:text-gold-dark transition'
            aria-label={t[lang].galleryAria}
            onClick={() => {
              trackEvent('nav_click', {
                link_location: 'header',
                target_section: 'gallery',
                device_type: 'desktop',
              });
            }}
          >
            {t[lang].gallery}
          </a>

          <a
            href={`${home}#kaip-atvykti`}
            className='hover:text-gold-dark transition'
            aria-label={t[lang].contactAria}
            onClick={() => {
              trackEvent('nav_click', {
                link_location: 'header',
                target_section: 'contact',
                device_type: 'desktop',
              });
            }}
          >
            {t[lang].contact}
          </a>

          <a
            href={PHONE_TEL}
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sand text-ink border border-black/10 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-gold/60'
            onClick={() => {
              trackEvent('phone_click', {
                link_location: 'header',
                device_type: 'desktop',
                event_label: 'header_desktop_call',
              });
            }}
            aria-label={t[lang].callAria}
            title={t[lang].call}
          >
            <Phone size={18} className='text-gold' />
            <span className='text-sm font-medium'>{t[lang].call}</span>
          </a>

          <div
            className='hidden md:flex items-center'
            aria-label={t[lang].switchLang}
          >
            <div className='flex items-center bg-sand rounded-full px-1 py-[3px]'>
              {['LT', 'EN'].map((code) => (
                <button
                  key={code}
                  type='button'
                  onClick={() => {
                    if (lang === code) return;

                    trackEvent('language_switch', {
                      link_location: 'header',
                      from_language: lang,
                      to_language: code,
                    });

                    toggleLang();
                  }}
                  aria-pressed={lang === code}
                  aria-label={`${t[lang].switchLang}: ${code}`}
                  className={`px-4 py-1 text-sm font-medium rounded-full transition-all ${
                    lang === code
                      ? 'bg-gold-dark text-white shadow-sm'
                      : 'text-gold-dark hover:bg-sand-deep'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          <Button
            as='a'
            href={TREATWELL_URL}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={t[lang].bookAria}
            className='px-5 py-2'
            onClick={() => {
              trackEvent('booking_click', {
                link_location: 'header',
                device_type: 'desktop',
                destination: 'treatwell',
                event_label: 'header_desktop_booking',
              });
            }}
          >
            {t[lang].book}
          </Button>
        </nav>

        <div className='md:hidden flex items-center gap-2'>
          <a
            href={PHONE_TEL}
            className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-sand text-ink border border-black/10 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-gold/60'
            onClick={() => {
              trackEvent('phone_click', {
                link_location: 'header',
                device_type: 'mobile',
                event_label: 'header_mobile_call',
              });
            }}
            aria-label={t[lang].callAria}
            title={t[lang].call}
          >
            <Phone size={18} className='text-gold' />
          </a>

          <button
            type='button'
            onClick={() => setMenuOpen((v) => !v)}
            className='text-ink'
            aria-label={menuOpen ? t[lang].closeMenu : t[lang].openMenu}
            aria-expanded={menuOpen}
            aria-controls='mobile-menu'
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id='mobile-menu'
          className='md:hidden bg-white border-t border-line text-center py-4 space-y-3'
          aria-label={t[lang].mainNav}
        >
          <a
            href={`${home}#paslaugos`}
            className='block hover:text-gold-dark'
            aria-label={t[lang].servicesAria}
            onClick={() => {
              trackEvent('nav_click', {
                link_location: 'mobile_menu',
                target_section: 'services',
                device_type: 'mobile',
              });
              setMenuOpen(false);
            }}
          >
            {t[lang].services}
          </a>

          <a
            href={`${home}#apie`}
            className='block hover:text-gold-dark'
            aria-label={t[lang].aboutAria}
            onClick={() => {
              trackEvent('nav_click', {
                link_location: 'mobile_menu',
                target_section: 'about',
                device_type: 'mobile',
              });
              setMenuOpen(false);
            }}
          >
            {t[lang].about}
          </a>

          <a
            href={`${home}#atsiliepimai`}
            className='block hover:text-gold-dark'
            aria-label={t[lang].reviewsAria}
            onClick={() => {
              trackEvent('nav_click', {
                link_location: 'mobile_menu',
                target_section: 'reviews',
                device_type: 'mobile',
              });
              setMenuOpen(false);
            }}
          >
            {t[lang].reviews}
          </a>

          <a
            href={`${home}#galerija`}
            className='block hover:text-gold-dark'
            aria-label={t[lang].galleryAria}
            onClick={() => {
              trackEvent('nav_click', {
                link_location: 'mobile_menu',
                target_section: 'gallery',
                device_type: 'mobile',
              });
              setMenuOpen(false);
            }}
          >
            {t[lang].gallery}
          </a>

          <a
            href={`${home}#kaip-atvykti`}
            className='block hover:text-gold-dark'
            aria-label={t[lang].contactAria}
            onClick={() => {
              trackEvent('nav_click', {
                link_location: 'mobile_menu',
                target_section: 'contact',
                device_type: 'mobile',
              });
              setMenuOpen(false);
            }}
          >
            {t[lang].contact}
          </a>

          <Button
            as='a'
            href={TREATWELL_URL}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={t[lang].bookAria}
            className='mx-auto px-6 py-2'
            onClick={() => {
              trackEvent('booking_click', {
                link_location: 'mobile_menu',
                device_type: 'mobile',
                destination: 'treatwell',
                event_label: 'header_mobile_booking',
              });
              setMenuOpen(false);
            }}
          >
            {t[lang].book}
          </Button>

          <div
            className='flex justify-center pt-2'
            aria-label={t[lang].switchLang}
          >
            <div className='flex items-center bg-sand rounded-full px-1 py-[3px]'>
              {['LT', 'EN'].map((code) => (
                <button
                  key={code}
                  type='button'
                  onClick={() => {
                    if (lang === code) return;

                    trackEvent('language_switch', {
                      link_location: 'mobile_menu',
                      from_language: lang,
                      to_language: code,
                    });

                    toggleLang();
                    setMenuOpen(false);
                  }}
                  aria-pressed={lang === code}
                  aria-label={`${t[lang].switchLang}: ${code}`}
                  className={`px-4 py-1 text-sm font-medium rounded-full ${
                    lang === code
                      ? 'bg-gold-dark text-white'
                      : 'text-gold-dark hover:bg-sand-deep'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
