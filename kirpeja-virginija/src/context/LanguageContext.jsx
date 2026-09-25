import { createContext, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PAGES, isEnPath, pageFromPath } from '../data/routes';

const LanguageContext = createContext();

// Kalba nustatoma pagal URL (/en/... – anglų), todėl kiekviena kalba turi
// savo adresą, kurį Google gali indeksuoti, o pasirinkimas išlieka perkrovus.
export function LanguageProvider({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const lang = isEnPath(pathname) ? 'EN' : 'LT';
  const l = lang === 'LT' ? 'lt' : 'en';
  const page = pageFromPath(pathname);

  const pathFor = (key, targetLang = l) => PAGES[key][targetLang];

  const toggleLang = () => {
    const target = l === 'lt' ? 'en' : 'lt';
    navigate(PAGES[page ?? 'home'][target]);
  };

  return (
    <LanguageContext.Provider value={{ lang, l, page, pathFor, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
