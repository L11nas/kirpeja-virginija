import { Award, GraduationCap, Star, Scissors } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS } from '../data/business';

const T = {
  lt: {
    eyebrow: 'Apie kirpėją',
    title: 'Susipažinkite – kirpėja Virginija',
    motto: '„Grožis susideda iš detalių.“',
    paragraphs: [
      'Virginija – kirpėja Kaune, baigusi kelias kirpimo akademijas, tarp jų – Ro Ro kursus, ir išklausiusi daugybę plaukų kirpimo bei dažymo seminarų. Mokytis ji nenustoja ir šiandien, todėl klientams gali pasiūlyti tiek klasikinius, tiek šiuolaikinius sprendimus.',
      'Klientai ją vadina „tikra savo srities specialiste“ – įdėmia ir įsiklausančia, kuri ne tik gražiai apkerpa, bet ir duoda daug patarimų, kaip plaukus prižiūrėti namuose. Atsiliepimuose dažnai minima ir jauki atmosfera: išėję iš kirpyklos žmonės sako besijaučiantys laimingi.',
      'Jei mėgstate šiltus pokalbius ir tvarkingas šukuosenas – užsukite, smagiai praleisime laiką.',
    ],
    facts: [
      { icon: GraduationCap, text: 'Kelios kirpimo akademijos, tarp jų – Ro Ro kursai' },
      { icon: Award, text: 'Daugybė plaukų kirpimo ir dažymo seminarų' },
      { icon: Star, text: `Įvertinimas ${BUSINESS.rating.toFixed(1).replace('.', ',')} iš ${BUSINESS.reviewCount} atsiliepimų Treatwell` },
      { icon: Scissors, text: 'Moterų, vyrų ir vaikų kirpimai, šukuosenos' },
    ],
  },
  en: {
    eyebrow: 'About',
    title: 'Meet your hairdresser – Virginija',
    motto: '“Beauty is in the details.”',
    paragraphs: [
      'Virginija is a hairdresser in Kaunas who has completed several hairdressing academies, including Ro Ro courses, and attended many haircutting and hair colouring seminars. She keeps learning, so she can offer both classic and modern looks.',
      'Clients call her “a true specialist in her field” – attentive and a great listener who not only cuts beautifully but also shares plenty of tips on caring for your hair at home. Reviews often mention the cosy atmosphere: people say they leave the salon feeling happy.',
      'If you enjoy a warm chat and a neat hairstyle – drop by, we’ll have a good time.',
    ],
    facts: [
      { icon: GraduationCap, text: 'Several hairdressing academies, including Ro Ro courses' },
      { icon: Award, text: 'Many haircutting and colouring seminars' },
      { icon: Star, text: `Rated ${BUSINESS.rating.toFixed(1)} from ${BUSINESS.reviewCount} reviews on Treatwell` },
      { icon: Scissors, text: 'Women’s, men’s and children’s haircuts, styling' },
    ],
  },
};

export default function About() {
  const { l } = useLanguage();
  const t = T[l];

  return (
    <section id='apie' className='py-20 bg-sand' aria-labelledby='about-heading'>
      <div className='max-w-5xl mx-auto px-6 grid md:grid-cols-5 gap-10 items-start'>
        <div className='md:col-span-3'>
          <p className='text-gold-dark text-sm uppercase tracking-[0.2em] mb-3'>{t.eyebrow}</p>
          <h2 id='about-heading' className='text-3xl font-serif text-ink mb-4'>
            {t.title}
          </h2>
          <p className='font-serif text-xl text-gold-dark mb-6'>{t.motto}</p>
          <div className='space-y-4 text-ink leading-relaxed'>
            {t.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <ul className='md:col-span-2 space-y-4'>
          {t.facts.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className='flex gap-3 items-start p-4 rounded-xl bg-white border border-line text-ink'
            >
              <Icon size={22} className='text-gold shrink-0' aria-hidden='true' />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
