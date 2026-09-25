// Po `vite build` sugeneruoja statinį HTML kiekvienam puslapiui (abiem kalbomis),
// 404 puslapį ir sitemap.xml, kad Google ir kitos sistemos matytų visą turinį
// ir SEO žymas be JavaScript vykdymo.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';

const SITE_URL = 'https://kirpeja-virginija.lt';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrOut = path.join(root, 'node_modules', '.prerender');

// 1. Serverinis (SSR) bundle – visos priklausomybės subundlinamos,
//    todėl CommonJS paketai (react-helmet-async, react-router) veikia be problemų.
await build({
  root,
  logLevel: 'warn',
  ssr: { noExternal: true },
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: ssrOut,
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } },
  },
});

const { render, PAGES } = await import(
  pathToFileURL(path.join(ssrOut, 'entry-server.mjs')).href
);

// URL -> failas. Katalogo indeksas tik šaknims (/ ir /en/), kiti – `kelias.html`,
// kurį Netlify ir vite preview grąžina be peradresavimo.
const fileFor = (url) =>
  url.endsWith('/')
    ? path.join(dist, url, 'index.html')
    : path.join(dist, `${url.slice(1)}.html`);

// 2. Kiekvienam maršrutui įrašome sugeneruotą HTML į kliento build šabloną.
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

function writePage(url, outFile) {
  const { html, head, htmlAttributes } = render(url);
  const page = template
    .replace(/<html[^>]*>/, `<html ${htmlAttributes}>`)
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, page);
  console.log(`prerendered ${url} -> ${path.relative(root, outFile)}`);
}

const urls = Object.values(PAGES).flatMap((p) => [p.lt, p.en]);
for (const url of urls) writePage(url, fileFor(url));
writePage('/404', path.join(dist, '404.html'));

// 3. sitemap.xml su hreflang alternatyvomis.
const today = new Date().toISOString().slice(0, 10);
const priority = { home: '1.0', women: '0.8', men: '0.8', kids: '0.8', privacy: '0.2' };
const entries = Object.entries(PAGES).flatMap(([key, p]) =>
  [p.lt, p.en].map(
    (url) => `  <url>
    <loc>${SITE_URL}${url}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority[key] ?? '0.5'}</priority>
    <xhtml:link rel="alternate" hreflang="lt" href="${SITE_URL}${p.lt}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${p.en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${p.lt}"/>
  </url>`,
  ),
);

fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`,
);
console.log(`sitemap.xml: ${entries.length} URLs`);
