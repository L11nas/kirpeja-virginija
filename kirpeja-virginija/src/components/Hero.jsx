import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { lang } = useLanguage();

  const t = {
    LT: {
      title: "Kai kirpimas tampa ritualu",
      subtitle:
        "Jaukioje aplinkoje skiriamas laikas ne tik kirpimui, bet ir poilsiui. Dėmesys detalėms, švara ir pagarba kiekvienam klientui.",
      button: "Rezervuok laiką",
      alt: "Kirpyklos įrankiai ant medinio stalo",
      aria: "Kirpyklos įžanginė skiltis su foniniu darbo įrankių paveikslu",
    },
    EN: {
      title: "When a haircut becomes a ritual",
      subtitle:
        "In a cozy atmosphere, time is devoted not only to haircuts but also to relaxation. Attention to detail, cleanliness and respect for every client.",
      button: "Book an appointment",
      alt: "Hairdressing tools on a wooden table",
      aria: "Salon introduction section with background image of hairdressing tools",
    },
  };

  return (
    <section
      id="hero"
      className="relative h-[75vh] flex items-center justify-center overflow-hidden"
      aria-label={t[lang].aria}
    >
      {/* Background image */}
      <div
        role="img"
        aria-label={t[lang].alt}
        className="absolute inset-0"
      >
        <img
          src="/img/hero-bg.webp"
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover hero-animate"
        />
      </div>

      {/* Gradient fade for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-white/90 pointer-events-none" />

      {/* Text content */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-serif text-white drop-shadow-xl mb-4 tracking-wide leading-tight">
          {t[lang].title}
        </h1>

        <p className="text-white/95 text-lg md:text-xl leading-relaxed drop-shadow-md">
          {t[lang].subtitle}
        </p>

        <a
          href="https://book.treatwell.lt/salonas/kirpeja-virginija/"
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby="hero-cta-description"
          className="
            inline-block mt-8 px-10 py-3 
            bg-[#C1A173] hover:bg-[#a88b5f] 
            text-white font-medium rounded-md
            transition-all duration-300 shadow-md hover:shadow-xl
            focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C1A173]/70 focus-visible:ring-offset-2
          "
        >
          {t[lang].button}
        </a>

        <span id="hero-cta-description" className="sr-only">
          {lang === "LT"
            ? "Mygtukas nukreipia į registracijos sistemą Treatwell"
            : "Button leads to Treatwell booking system"}
        </span>
      </div>
    </section>
  );
}