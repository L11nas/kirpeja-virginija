import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const lastScrollY = useRef(0);
  const { lang, toggleLang } = useLanguage();

  const t = {
    LT: {
      services: "Paslaugos",
      gallery: "Galerija",
      contact: "Kontaktai",
      book: "Registruokis",
    },
    EN: {
      services: "Services",
      gallery: "Gallery",
      contact: "Contact",
      book: "Book now",
    },
  };

  // HEADER VISIBILITY ON SCROLL (premium behavior)
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 30);

      if (current > lastScrollY.current && current > 150) {
        setHidden(true);   // scrolling down → hide
      } else {
        setHidden(false);  // scrolling up → show
      }
      lastScrollY.current = current;
    };

    const throttled = () => {
      if (!handleScroll._throttle) {
        handleScroll();
        handleScroll._throttle = setTimeout(
          () => (handleScroll._throttle = null),
          80
        );
      }
    };

    window.addEventListener("scroll", throttled);
    return () => window.removeEventListener("scroll", throttled);
  }, []);

  // Smooth scroll with offset
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 85;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: y, behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = [
    { id: "paslaugos", key: "services" },
    { id: "galerija", key: "gallery" },
    { id: "kontaktai", key: "contact" },
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${hidden ? "-translate-y-full" : "translate-y-0"}
        ${scrolled ? "bg-white/90 backdrop-blur-xl shadow-md" : "bg-white/80"}
      `}
      role="banner"
      aria-label={lang === "LT" ? "Pagrindinė navigacija" : "Main navigation"}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center py-3 px-6">

        {/* LOGO */}
        <button
          onClick={() => scrollToId("hero")}
          className="flex items-center transition hover:opacity-80"
          aria-label={lang === "LT" ? "Į pradžią" : "Go to top"}
        >
          <h1 className="leading-tight font-serif text-[#3E3B38] text-left">
            <span className="block text-lg">Kirpėja</span>
            <span className="block -mt-1 text-[#C1A173]">Virginija</span>
          </h1>
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-[#3E3B38]" role="navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToId(item.id)}
              className="relative group transition"
            >
              {t[lang][item.key]}

              {/* Animated underline */}
              <span className="
                absolute left-0 -bottom-1 h-[2px] w-0 bg-[#C1A173] 
                transition-all duration-300 group-hover:w-full
              " />
            </button>
          ))}

          {/* LANGUAGE SWITCH */}
          <div className="flex items-center gap-1 border border-[#C1A173] rounded-md overflow-hidden">
            {["LT", "EN"].map((code) => (
              <button
                key={code}
                onClick={toggleLang}
                className={`px-3 py-1 text-sm transition ${
                  lang === code
                    ? "bg-[#C1A173] text-white"
                    : "text-[#C1A173] hover:bg-[#C1A173]/20"
                }`}
                aria-pressed={lang === code}
              >
                {code}
              </button>
            ))}
          </div>

          {/* CTA */}
          <a
            href="https://book.treatwell.lt/salonas/kirpeja-virginija/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C1A173] hover:bg-[#a88b5f] text-white px-4 py-2 rounded-md transition font-medium shadow-sm"
          >
            {t[lang].book}
          </a>
        </nav>

        {/* MOBILE ICON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#3E3B38]"
          aria-label={menuOpen ? "Uždaryti meniu" : "Atidaryti meniu"}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      <nav
        className={`
          md:hidden overflow-hidden transition-all duration-300 bg-white
          border-t border-[#e5e4e1] text-center
          ${menuOpen ? "max-h-96 py-4 opacity-100" : "max-h-0 opacity-0 py-0"}
        `}
        role="navigation"
      >
        <div className="space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToId(item.id)}
              className="block w-full text-[#3E3B38] hover:text-[#C1A173] transition"
            >
              {t[lang][item.key]}
            </button>
          ))}

          {/* CTA MOBILE */}
          <a
            href="https://book.treatwell.lt/salonas/kirpeja-virginija/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#C1A173] text-white mx-10 py-2 rounded-md hover:bg-[#a88b5f] transition shadow"
          >
            {t[lang].book}
          </a>
        </div>
      </nav>
    </header>
  );
}