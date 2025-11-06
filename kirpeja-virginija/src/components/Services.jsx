import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { lang } = useLanguage();

  const treatwellUrl = 'https://book.treatwell.lt/salonas/kirpeja-virginija/';

  // Atnaujintas sąrašas pagal Treatwell struktūrą
  const services = [
    {
      lt: 'Vyriškas kirpimas',
      en: 'Men’s haircut',
      price: '13 €',
    },
    {
      lt: 'Plaukų kirpimas ir barzdos modeliavimas',
      en: 'Haircut & beard styling',
      price: '17 €',
    },
    {
      lt: 'Moterų kirpimas',
      en: 'Women’s haircut',
      price: '15 €',
    },
    {
      lt: 'Vaikų kirpimas',
      en: 'Children’s haircut',
      price: '13 €',
    },
    {
      lt: 'Plaukų pynimas su pluoštu',
      en: 'Braiding with fiber',
      price: '20 €',
    },
    {
      lt: 'Cheminis sušukavimas',
      en: 'Chemical styling (perm)',
      price: '40 €',
    },
  ];

  return (
    <section className='py-20 bg-white' id='paslaugos'>
      <div className='max-w-5xl mx-auto px-6 text-center'>
        {/* Antraštė */}
        <h2 className='text-3xl font-serif mb-10'>
          {lang === 'LT' ? 'Teikiamos paslaugos' : 'Available services'}
        </h2>

        {/* Paslaugų tinklelis */}
        <div className='grid md:grid-cols-2 gap-6'>
          {services.map((item, i) => (
            <a
              key={i}
              href={treatwellUrl}
              target='_blank'
              rel='noreferrer'
              className='p-6 border border-[#e5e4e1] rounded-xl hover:shadow-md transition flex justify-between items-center bg-[#F8F7F4] hover:bg-[#f1efeb]'
            >
              <span>{lang === 'LT' ? item.lt : item.en}</span>
              <span className='font-semibold text-[#C1A173]'>{item.price}</span>
            </a>
          ))}
        </div>

        {/* Bendras mygtukas */}
        <a
          href={treatwellUrl}
          target='_blank'
          rel='noreferrer'
          className='inline-block mt-10 px-8 py-3 bg-[#C1A173] text-white font-medium rounded-md hover:bg-[#a88b5f] transition'
        >
          {lang === 'LT' ? 'Registruokis internetu' : 'Book your visit online'}
        </a>
      </div>
    </section>
  );
}
