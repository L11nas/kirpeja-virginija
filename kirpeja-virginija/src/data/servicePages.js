// Atskirų paslaugų puslapių turinys (SEO nusileidimo puslapiai).
// Kainos imamos iš services.js pagal `services` id sąrašą.

export const SERVICE_PAGES = {
  women: {
    services: [
      'women-haircut',
      'hair-tips',
      'model-haircut',
      'express-styling',
      'hair-color-consultation',
      'damaged-hair-treatment',
    ],
    gallery: [
      ['women', 3],
      ['styling', 6],
    ],
    lt: {
      title: 'Moterų kirpimas Kaune nuo 15 € | Kirpėja Virginija',
      description:
        'Moterų kirpimas Kaune, Pramonės pr. 15A: kirpimas nuo 15 €, galiukų kirpimas 15 €, modelinis kirpimas 25 €, šukuosenos ir bangavimas. Registracija internetu.',
      breadcrumb: 'Moterų kirpimas',
      h1: 'Moterų kirpimas Kaune',
      lead: 'Kirpimas, kuris tinka Jūsų veido formai, plaukų tipui ir kasdieniam gyvenimui – be skubėjimo ir su aiškiais patarimais, kaip šukuoseną prižiūrėti namuose.',
      body: [
        'Kiekvienas vizitas prasideda trumpu pokalbiu: aptariame, ko norite, kaip dažniausiai susišukuojate plaukus ir kiek laiko jiems skiriate ryte. Tik tada parenkama kirpimo forma ir ilgis. Klientės atsiliepimuose dažnai mini, kad kirpėja įdėmiai išklauso ir duoda daug naudingų patarimų.',
        'Jei norite tik atnaujinti formą – rinkitės plaukų galiukų kirpimą. Jei norisi ryškesnio pokyčio – modelinį kirpimą, kurio metu sukuriama nauja forma. Šventei ar fotosesijai atliekamas express bangavimas ar šukuosena, o pažeistiems plaukams – atstatomoji procedūra.',
        'Virginija yra baigusi kelias kirpimo akademijas, tarp jų – Ro Ro kursus, ir nuolat tobulinasi kirpimo bei plaukų dažymo seminaruose, todėl pasiūlys ir klasikinius, ir šiuolaikinius sprendimus.',
      ],
      benefits: [
        'Individuali konsultacija prieš kirpimą',
        'Patarimai, kaip prižiūrėti ir šukuoti plaukus namuose',
        'Profesionalios plaukų priežiūros priemonės',
        'Jauki, rami aplinka – be eilių ir skubėjimo',
      ],
      faq: [
        {
          q: 'Kiek trunka moterų kirpimas?',
          a: 'Priklausomai nuo plaukų ilgio ir kirpimo sudėtingumo – nuo 45 min. iki 1 val. 15 min. Galiukų kirpimas trunka apie 45 min., modelinis – apie 1 val. 15 min.',
        },
        {
          q: 'Ar reikia ateiti plautais plaukais?',
          a: 'Nebūtina – ateikite taip, kaip Jums patogu. Jei turite klausimų prieš vizitą, paskambinkite +370 654 60937.',
        },
        {
          q: 'Kiek kainuoja šukuosena ar bangavimas?',
          a: 'Express bangavimas / šukuosena trumpiems plaukams – 25 €, vidutinio ilgio – 30 €, ilgiems – 35 €.',
        },
      ],
    },
    en: {
      title: 'Women’s haircut in Kaunas from 15 € | Hairdresser Virginija',
      description:
        'Women’s haircuts in Kaunas, Pramonės pr. 15A: haircut from 15 €, ends trim 15 €, restyle 25 €, occasion styling and waves. Book online.',
      breadcrumb: 'Women’s haircut',
      h1: 'Women’s haircut in Kaunas',
      lead: 'A haircut that suits your face shape, hair type and everyday routine – unhurried, with clear advice on how to style it at home.',
      body: [
        'Every visit starts with a short chat about what you want, how you usually style your hair and how much time you spend on it. Only then do we choose the shape and length. Clients often mention in reviews that Virginija listens carefully and gives lots of useful tips.',
        'Choose an ends trim to refresh your shape, or a restyle haircut for a more noticeable change. Quick waves or styling are available for events and photoshoots, and a restorative treatment for damaged hair.',
        'Virginija has completed several hairdressing academies, including Ro Ro courses, and keeps learning at haircutting and colouring seminars.',
      ],
      benefits: [
        'Personal consultation before every haircut',
        'Tips on caring for and styling your hair at home',
        'Professional hair care products',
        'A calm, cosy salon – no queues, no rush',
      ],
      faq: [
        {
          q: 'How long does a women’s haircut take?',
          a: 'Between 45 minutes and 1 hour 15 minutes depending on length and complexity.',
        },
        {
          q: 'How much is occasion styling?',
          a: 'Express waves / styling: short hair 25 €, medium 30 €, long 35 €.',
        },
      ],
    },
  },

  men: {
    services: ['mens-haircut', 'haircut-beard'],
    gallery: [['men', 9]],
    lt: {
      title: 'Vyrų kirpimas Kaune nuo 20 € | Kirpėja Virginija',
      description:
        'Vyrų kirpimas Kaune, Pramonės pr. 15A: kirpimas nuo 20 €, su galvos plovimu 23 €, kirpimas ir barzdos modeliavimas 25 €. Įvertinimas 5,0. Registracija internetu.',
      breadcrumb: 'Vyrų kirpimas',
      h1: 'Vyrų kirpimas ir barzdos modeliavimas Kaune',
      lead: 'Tvarkingas klasikinis ar modernus vyriškas kirpimas, švarūs kontūrai ir prižiūrėta barzda – be skubėjimo ir su dėmesiu detalėms.',
      body: [
        'Vyrų kirpimas pritaikomas Jūsų stiliui, plaukų augimo krypčiai ir tam, kiek laiko norite skirti šukavimui ryte. Galima rinktis kirpimą su galvos plovimu arba kirpimą kartu su barzdos modeliavimu – tada pasirūpinama ir kontūrais, ir barzdos forma.',
        'Klientai atsiliepimuose vertina, kad Virginija yra „tikra savo srities specialistė“, įdėmiai išklauso ir duoda naudingų patarimų, kaip plaukus prižiūrėti iki kito vizito.',
        'Kirpykla įsikūrusi Dainavoje, Pramonės pr. 15A – patogu atvykti iš Petrašiūnų, Šančių, Eigulių ar Žaliakalnio, netoliese stoja 33 ir 41 maršruto autobusai.',
      ],
      benefits: [
        'Klasikiniai ir modernūs vyriški kirpimai',
        'Barzdos modeliavimas ir kontūrų sutvarkymas',
        'Galimybė rinktis kirpimą su galvos plovimu',
        'Registracija internetu bet kuriuo paros metu',
      ],
      faq: [
        {
          q: 'Kiek kainuoja vyrų kirpimas?',
          a: 'Vyrų kirpimas – 20 €, su galvos plovimu – 23 €, plaukų kirpimas su barzdos modeliavimu – 25 €.',
        },
        {
          q: 'Kiek laiko trunka vyrų kirpimas?',
          a: 'Apie 1 val., su galvos plovimu – 1 val. 15 min., kartu su barzdos modeliavimu – apie 1 val. 30 min.',
        },
      ],
    },
    en: {
      title: 'Men’s haircut in Kaunas from 20 € | Hairdresser Virginija',
      description:
        'Men’s haircuts in Kaunas, Pramonės pr. 15A: haircut from 20 €, with wash 23 €, haircut and beard styling 25 €. Rated 5.0. Book online.',
      breadcrumb: 'Men’s haircut',
      h1: 'Men’s haircut and beard styling in Kaunas',
      lead: 'Neat classic or modern men’s haircuts, clean contours and a well-kept beard – unhurried and with attention to detail.',
      body: [
        'Your haircut is tailored to your style, hair growth pattern and how much time you want to spend styling. Choose a haircut with a hair wash or a haircut with beard styling.',
        'Clients describe Virginija as “a true specialist in her field” who listens carefully and gives useful advice.',
        'The salon is in Dainava, Pramonės pr. 15A, with buses 33 and 41 stopping nearby.',
      ],
      benefits: [
        'Classic and modern men’s haircuts',
        'Beard styling and contour clean-up',
        'Haircut with hair wash available',
        'Online booking 24/7',
      ],
      faq: [
        {
          q: 'How much is a men’s haircut?',
          a: 'Men’s haircut 20 €, with hair wash 23 €, haircut with beard styling 25 €.',
        },
      ],
    },
  },

  kids: {
    services: ['kids-haircut'],
    gallery: [['kids', 12]],
    lt: {
      title: 'Vaikų kirpimas Kaune – 15 € | Kirpėja Virginija',
      description:
        'Vaikų kirpimas Kaune, Pramonės pr. 15A: 15 €, apie 45 min. Ramus, kantrus ir greitas kirpimas mažiesiems. Registracija internetu arba telefonu.',
      breadcrumb: 'Vaikų kirpimas',
      h1: 'Vaikų kirpimas Kaune',
      lead: 'Ramus, kantrus ir greitas kirpimas, kad apsilankymas kirpykloje vaikui būtų maloni patirtis, o ne išbandymas.',
      body: [
        'Vaikų kirpimas trunka apie 45 minutes ir kainuoja 15 €. Stengiamės, kad mažieji jaustųsi saugiai: kalbamės, paaiškiname, kas bus daroma, ir dirbame taip, kad kirpimas neužtruktų ilgiau nei reikia.',
        'Galerijoje matysite daugybę vaikų kirpimų – nuo trumpų berniukų kirpimų iki mergaičių plaukų galiukų patrumpinimo.',
        'Patogiausia užsiregistruoti internetu ir pasirinkti laiką, kai vaikas būna žvalus ir ramus – pvz., po miego ar ne iš karto po mokyklos.',
      ],
      benefits: [
        'Kantrus ir švelnus bendravimas su vaiku',
        'Greitas kirpimas – apie 45 min.',
        'Berniukų ir mergaičių kirpimai',
        'Galima kirptis kartu su tėvais',
      ],
      faq: [
        {
          q: 'Nuo kokio amžiaus kerpate vaikus?',
          a: 'Kerpami įvairaus amžiaus vaikai. Jei vaikas kerpasi pirmą kartą, parašykite tai registruodamiesi arba paskambinkite +370 654 60937.',
        },
        {
          q: 'Ar galima registruoti kelis vaikus iš eilės?',
          a: 'Taip – užsiregistruokite kelis vizitus iš eilės internetu arba paskambinkite, ir laiką suderinsime.',
        },
      ],
    },
    en: {
      title: 'Children’s haircut in Kaunas – 15 € | Hairdresser Virginija',
      description:
        'Children’s haircuts in Kaunas, Pramonės pr. 15A: 15 €, about 45 minutes. A calm, patient and quick haircut for little ones. Book online or by phone.',
      breadcrumb: 'Children’s haircut',
      h1: 'Children’s haircut in Kaunas',
      lead: 'A calm, patient and quick haircut so a visit to the salon is a pleasant experience for your child.',
      body: [
        'A children’s haircut takes about 45 minutes and costs 15 €. We talk to the child, explain what will happen and keep it short.',
        'The gallery shows many children’s haircuts – from short boys’ cuts to girls’ trims.',
        'Book online and pick a time when your child is rested and calm.',
      ],
      benefits: [
        'Patient, gentle approach',
        'Quick – about 45 minutes',
        'Boys’ and girls’ haircuts',
        'Parents and children can book back-to-back',
      ],
      faq: [
        {
          q: 'Can I book several children in a row?',
          a: 'Yes – book consecutive slots online or call us and we will arrange the time.',
        },
      ],
    },
  },
};
