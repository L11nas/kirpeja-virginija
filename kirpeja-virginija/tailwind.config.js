// Svetainės spalvų paletė. Keiskite spalvas tik čia.
// Kontrastas tikrintas pagal WCAG AA (tekstui ≥ 4,5:1).
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C1A173', // dekoracijoms: ikonos, žvaigždutės, rėmeliai, logotipas
          dark: '#7D6844', // mygtukai (su baltu tekstu), kainos, nuorodos
          darker: '#6A5738', // mygtukų hover
        },
        ink: {
          DEFAULT: '#3E3B38', // pagrindinis tekstas ir antraštės
          deep: '#2E2B29', // tamsios skiltys
        },
        muted: '#6B6966', // antraeilis tekstas
        sand: {
          DEFAULT: '#F4F0EA', // šiltas skilčių fonas
          deep: '#EAE4DA', // hover, nuotraukų vietos rezervavimas
        },
        line: '#E5E1DA', // rėmeliai ir skirtukai
      },
    },
  },
  plugins: [],
};
