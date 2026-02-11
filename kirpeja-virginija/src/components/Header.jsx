import { useEffect, useId, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { lang, toggleLang } = useLanguage();

  const mobileNavId = useId();

  const phoneNumber = '+37065460937';
  const phoneHref = `tel:${phoneNumber.replace(/\s+/g, '')}`;

  const bookingUrl =
    'https://book.treatwell.lt/salonas/kirpeja-virginija/';

  const t = {
    LT: {
      services: 'Paslaugos',
      gallery: 'Galerija',
      contact: 'Kontaktai',
      book: 'Rezervuok laiką',
      call: 'Skambinti',
      ariaCall: 'Skambinti kirpėjai Virginijai',
      ariaMenuOpen: 'Atidaryti meniu',
      ariaMenuClose: 'Uždaryti meniu',
      ariaPrimaryNav: 'Pagrindinė navigacija',
      skip: 'Pereiti prie turinio',
      brandHome: 'Kirpėja Virginija — į pradžią',
    },
    EN: {
      services: 'Services',
      gallery: 'Gallery',
      contact: 'Contact',
      book: 'Book an appointment',
      call: 'Call',
      ariaCall: 'Call Hairdresser Virginija',
      ariaMenuOpen: 'Open menu',
      ariaMenuClose: 'Close menu',
      ariaPrimaryNav: 'Primary navigation',
      skip: 'Skip to content',
      brandHome: 'Hairdresser Virginija — back to top',
    },
  };

  // Scroll behavior (sticky header hide/show)
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 20);
      setHidden(current > lastScrollY && current > 80);
      lastScrollY = current;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu with ESC + lock body scroll
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    if (menuOpen) {
      document.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const smoothScrollTo = (hash) => (e) => {
    e.preventDefault();
    const el = document.querySelector(hash);
    setMenuOpen(false);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // fallback
      window.location.hash = hash;
    }
  };

  const track = (event, label) => {
    if (window.gtag) {
      window.gtag('event', event, {
        event_category: 'engagement',
        event_label: label,
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#e5e4e1]'
          : 'bg-white/90 backdrop-blur-md border-b border-transparent'
      }`}
    >
      {/* Skip link (accessibility + UX) */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:shadow"
      >
        {t[lang].skip}
      </a>

      <div className="max-w-6xl mx-auto flex justify-between items-center py-3 px-6">
        {/* BRAND (not H1 – H1 should live in Hero) */}
        <a
          href="#hero"
          onClick={smoothScrollTo('#hero')}
          className="flex items-center gap-2 hover:opacity-90 transition"
          aria-label={t[lang].brandHome}
        >
          <div className="leading-tight font-serif text-[#3E3B38]">
            <p className="block text-lg">Kirpėja</p>
            <p className="block -mt-1 text-[#C1A173]">Virginija</p>
          </div>
        </a>

        {/* DESKTOP NAV */}
        <nav
          className="hidden md:flex items-center gap-6 text-[#3E3B38]"
          aria-label={t[lang].ariaPrimaryNav}
        >
          <a href="#paslaugos" onClick={smoothScrollTo('#paslaugos')} className="hover:text-[#C1A173] transition">
            {t[lang].services}
          </a>
          <a href="#galerija" onClick={smoothScrollTo('#galerija')} className="hover:text-[#C1A173] transition">
            {t[lang].gallery}
          </a>
          <a href="#kontaktai" onClick={smoothScrollTo('#kontaktai')} className="hover:text-[#C1A173] transition">
            {t[lang].contact}
          </a>

          {/* LANGUAGE */}
          <div className="flex items-center bg-[#F5F3EF] rounded-full px-1 py-[3px]">
            {['LT', 'EN'].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  track('language_switch', `${lang} → ${code}`);
                  toggleLang();
                }}
                className={`px-4 py-1 text-sm font-medium rounded-full transition-all ${
                  lang === code
                    ? 'bg-[#C1A173] text-white shadow-sm'
                    : 'text-[#6B5A40] hover:bg-[#E8E2D8]'
                }`}
                aria-pressed={lang === code}
              >
                {code}
              </button>
            ))}
          </div>

          {/* CALL BUTTON (DESKTOP) */}
          <Button
            as="a"
            href={phoneHref}
            className="px-5 py-2 bg-transparent border border-[#e5e4e1] text-[#3E3B38] hover:bg-[#F5F3EF]"
            aria-label={t[lang].ariaCall}
            onClick={() => track('click_phone', 'Header Desktop Phone')}
          >
            {t[lang].call}
          </Button>

          {/* BOOKING (PRIMARY CTA) */}
          <Button
            as="a"
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2"
            onClick={() => track('click_booking', 'Header Desktop Booking')}
          >
            {t[lang].book}
          </Button>
        </nav>

        {/* MOBILE ACTIONS */}
        <div className="md:hidden flex items-center gap-2">
          {/* CALL */}
          <a
            href={phoneHref}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#e5e4e1] bg-white/80 backdrop-blur-md text-[#3E3B38]"
            aria-label={t[lang].ariaCall}
            onClick={() => track('click_phone', 'Header Mobile Phone')}
          >
            <Phone size={20} strokeWidth={1.8} />
          </a>

          {/* MENU */}
          <button
            type="button"
            onClick={() => setMenuOpen((s) => !s)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#e5e4e1] bg-white/80 backdrop-blur-md text-[#3E3B38]"
            aria-label={menuOpen ? t[lang].ariaMenuClose : t[lang].ariaMenuOpen}
            aria-expanded={menuOpen}
            aria-controls={mobileNavId}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <nav
          id={mobileNavId}
          className="md:hidden bg-white border-t border-[#e5e4e1] text-center py-4 space-y-3 px-6"
          aria-label={t[lang].ariaPrimaryNav}
        >
          <a href="#paslaugos" onClick={smoothScrollTo('#paslaugos')} className="block py-2">
            {t[lang].services}
          </a>
          <a href="#galerija" onClick={smoothScrollTo('#galerija')} className="block py-2">
            {t[lang].gallery}
          </a>
          <a href="#kontaktai" onClick={smoothScrollTo('#kontaktai')} className="block py-2">
            {t[lang].contact}
          </a>

          {/* LANGUAGE (mobile) */}
          <div className="flex justify-center items-center bg-[#F5F3EF] rounded-full px-1 py-[3px] w-fit mx-auto">
            {['LT', 'EN'].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  track('language_switch', `${lang} → ${code}`);
                  toggleLang();
                }}
                className={`px-4 py-1 text-sm font-medium rounded-full transition-all ${
                  lang === code
                    ? 'bg-[#C1A173] text-white shadow-sm'
                    : 'text-[#6B5A40] hover:bg-[#E8E2D8]'
                }`}
                aria-pressed={lang === code}
              >
                {code}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <Button
              as="a"
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto px-6 py-2 w-full max-w-xs"
              onClick={() => track('click_booking', 'Header Mobile Booking')}
            >
              {t[lang].book}
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}