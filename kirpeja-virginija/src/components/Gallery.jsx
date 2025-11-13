import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../context/LanguageContext";

const TOTAL_IMAGES = 34;
const DIR_THUMBS = "/gallery/thumbs";
const DIR_FULL = "/gallery/full";
const EXT = "webp";

const images = Array.from({ length: TOTAL_IMAGES }, (_, i) => {
  const n = i + 1;
  return {
    thumb: `${DIR_THUMBS}/${n}.${EXT}`,
    full: `${DIR_FULL}/${n}.${EXT}`,
    index: n,
  };
});

export default function Gallery() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(12);
  const [selected, setSelected] = useState(null);

  const t = {
    LT: {
      title: "Galerija",
      desc: "Kirpėja Virginija – darbų galerija, profesionalūs moterų ir vyrų kirpimai, šukuosenos, dažymai Kaune.",
      alt: (i) => `Kirpėja Virginija – nuotrauka ${i}`,
      more: "Rodyti daugiau",
    },
    EN: {
      title: "Gallery",
      desc: "Hairdresser Virginija – professional haircut & hairstyle gallery in Kaunas, Lithuania.",
      alt: (i) => `Hairdresser Virginija – photo ${i}`,
      more: "Show more",
    },
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="galerija" className="py-20 bg-[#F8F7F4]">
      {/* SEO Head */}
      <Helmet>
        <title>{`${t[lang].title} | Kirpėja Virginija Kaunas`}</title>
        <meta name="description" content={t[lang].desc} />
        <link rel="canonical" href="https://kirpeja-virginija.lt/#galerija" />

        {/* Preload first 3 thumbnails */}
        {images.slice(0, 3).map((img) => (
          <link key={img.index} rel="preload" as="image" href={img.thumb} />
        ))}

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: t[lang].title,
            description: t[lang].desc,
            url: "https://kirpeja-virginija.lt/#galerija",
            hasPart: images.slice(0, 10).map((img) => ({
              "@type": "ImageObject",
              contentUrl: `https://kirpeja-virginija.lt${img.full}`,
              thumbnailUrl: `https://kirpeja-virginija.lt${img.thumb}`,
            })),
          })}
        </script>
      </Helmet>

      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-serif text-center mb-10 text-[#3E3B38]">
          {t[lang].title}
        </h2>

        {/* Thumbnail grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.slice(0, visible).map((img) => (
            <button
              key={img.index}
              onClick={() => setSelected(img.full)}
              className="relative overflow-hidden rounded-xl group"
              aria-label={t[lang].alt(img.index)}
            >
              <img
                src={img.thumb}
                alt={t[lang].alt(img.index)}
                className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105 bg-[#EDEBE8]"
                loading="lazy"
                decoding="async"
                width="400"
                height="400"
              />
            </button>
          ))}
        </div>

        {/* Load more */}
        {visible < images.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisible((v) => v + 9)}
              className="px-6 py-2 bg-[#C1A173] hover:bg-[#a88b5f] text-white rounded-md transition"
            >
              {t[lang].more}
            </button>
          </div>
        )}
      </div>

      {/* Full image modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <img
            src={selected}
            alt="Full size"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
            loading="eager"
          />
        </div>
      )}
    </section>
  );
}