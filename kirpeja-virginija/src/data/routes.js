// Visi svetainės puslapiai ir jų adresai abiem kalbomis.
// Naudojama maršrutams, kalbos perjungimui, hreflang, sitemap ir prerender.

export const PAGES = {
  home: { lt: '/', en: '/en/' },
  women: { lt: '/moteru-kirpimas-kaune', en: '/en/womens-haircut-kaunas' },
  men: { lt: '/vyru-kirpimas-kaune', en: '/en/mens-haircut-kaunas' },
  kids: { lt: '/vaiku-kirpimas-kaune', en: '/en/kids-haircut-kaunas' },
  privacy: { lt: '/privatumo-politika', en: '/en/privacy-policy' },
};

const normalize = (p) => (p.length > 1 ? p.replace(/\/+$/, '') : p);

export const isEnPath = (pathname) =>
  pathname === '/en' || pathname.startsWith('/en/');

export function pageFromPath(pathname) {
  const p = normalize(pathname);
  for (const [key, paths] of Object.entries(PAGES)) {
    if (normalize(paths.lt) === p || normalize(paths.en) === p) return key;
  }
  return null;
}

// Visi URL, kuriems build metu generuojamas statinis HTML.
export const ALL_PATHS = Object.values(PAGES).flatMap((p) => [p.lt, p.en]);
