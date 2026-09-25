// Paslaugos ir kainos – sutikrinta su Treatwell profiliu.
// Keičiant kainas, atnaujinti tik šį failą (UI ir SEO schema imama iš čia).

export const SERVICES = [
  {
    id: 'women-haircut',
    category: 'haircut',
    name: { lt: 'Moterų kirpimas', en: "Women's haircut" },
    desc: {
      lt: 'Individualus moterų kirpimas ir lengvas suformavimas pagal veido bruožus, plaukų tipą ir kasdienius poreikius.',
      en: 'Personalised women’s haircut and light styling based on face shape, hair type and daily routine.',
    },
    price: { amount: '15', from: true },
    duration: { lt: '45 min. – 1 val. 15 min.', en: '45 min – 1 hr 15 min' },
  },
  {
    id: 'hair-tips',
    category: 'haircut',
    name: { lt: 'Plaukų galiukų kirpimas', en: 'Hair ends trim' },
    desc: {
      lt: 'Greitas plaukų galiukų patrumpinimas, kad plaukai atrodytų tvarkingi ir sveiki.',
      en: 'Quick trim of the ends to keep hair neat and healthy.',
    },
    price: { amount: '15', from: false },
    duration: { lt: '45 min.', en: '45 min' },
  },
  {
    id: 'model-haircut',
    category: 'haircut',
    name: { lt: 'Modelinis kirpimas', en: 'Restyle haircut' },
    desc: {
      lt: 'Naujos formos kirpimas, kai norisi ryškesnio įvaizdžio pokyčio.',
      en: 'A new-shape haircut for a more noticeable change of look.',
    },
    price: { amount: '25', from: false },
    duration: { lt: '1 val. 15 min.', en: '1 hr 15 min' },
  },
  {
    id: 'mens-haircut',
    category: 'haircut',
    name: { lt: 'Vyrų kirpimas', en: 'Men’s haircut' },
    desc: {
      lt: 'Tvarkingas klasikinis arba modernesnis vyriškas kirpimas, pritaikytas Jūsų stiliui. Su galvos plovimu – 23 €.',
      en: 'Classic or modern men’s haircut tailored to your style. With hair wash – 23 €.',
    },
    price: { amount: '20', from: true },
    duration: { lt: '1 val. – 1 val. 15 min.', en: '1 hr – 1 hr 15 min' },
  },
  {
    id: 'haircut-beard',
    category: 'haircut',
    name: {
      lt: 'Plaukų kirpimas ir barzdos modeliavimas',
      en: 'Haircut & beard styling',
    },
    desc: {
      lt: 'Pilnas vyriškas įvaizdis: plaukų kirpimas, kontūrų sutvarkymas ir barzdos modeliavimas.',
      en: 'Complete men’s grooming: haircut, contour cleanup and beard styling.',
    },
    price: { amount: '25', from: false },
    duration: { lt: '1 val. 30 min.', en: '1 hr 30 min' },
  },
  {
    id: 'kids-haircut',
    category: 'haircut',
    name: { lt: 'Vaikų kirpimas', en: 'Children’s haircut' },
    desc: {
      lt: 'Švelnus ir greitas vaikų kirpimas, kad vizitas būtų kuo patogesnis mažiesiems.',
      en: 'Gentle and quick haircut for children for a more comfortable visit.',
    },
    price: { amount: '15', from: false },
    duration: { lt: '45 min.', en: '45 min' },
  },
  {
    id: 'hair-color-consultation',
    category: 'color',
    name: {
      lt: 'Plaukų dažymo konsultacija',
      en: 'Hair colouring consultation',
    },
    desc: {
      lt: 'Konsultacija prieš dažymą: plaukų būklės įvertinimas, spalvos krypties parinkimas ir rekomendacijos pagal plaukų ilgį bei storį.',
      en: 'Pre-colour consultation including hair condition assessment, colour direction planning and recommendations based on hair length and density.',
    },
    price: { amount: '5', from: false },
    duration: { lt: '30 min.', en: '30 min' },
  },
  {
    id: 'express-styling',
    category: 'styling',
    name: {
      lt: 'Express bangavimas / šukuosena',
      en: 'Express styling / waves',
    },
    desc: {
      lt: 'Greitas bangavimas arba lengva šukuosena šventei, progai ar fotosesijai. Trumpiems plaukams – 25 €, vidutinio ilgio – 30 €, ilgiems – 35 €.',
      en: 'Quick waves or light occasion styling for events, celebrations or photoshoots. Short hair – 25 €, medium – 30 €, long – 35 €.',
    },
    price: { amount: '25', from: true },
    duration: { lt: '1 val. – 1 val. 40 min.', en: '1 hr – 1 hr 40 min' },
  },
  {
    id: 'damaged-hair-treatment',
    category: 'treatment',
    name: {
      lt: 'Procedūra pažeistiems plaukams',
      en: 'Treatment for damaged hair',
    },
    desc: {
      lt: 'Atstatomoji plaukų procedūra pažeistiems, išsausėjusiems ar nualintiems plaukams, siekiant suteikti daugiau glotnumo ir gyvybingumo.',
      en: 'Restorative hair treatment for damaged, dry or weakened hair to improve smoothness and vitality.',
    },
    price: { amount: '30', from: false },
    duration: { lt: '1 val.', en: '1 hr' },
  },
];
