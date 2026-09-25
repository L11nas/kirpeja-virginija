// Galerijos nuotraukų optimizavimas ir socialinių tinklų paveikslėlio generavimas.
// Paleisti pridėjus naujų nuotraukų: `npm run images`
// Failai perrašomi tik tada, kai optimizuota versija mažesnė.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const GALLERY = 'public/gallery';
const SIZES = {
  thumbs: { width: 450, quality: 72 },
  full: { width: 1400, quality: 78 },
  posters: { width: 400, quality: 72 },
};

let before = 0;
let after = 0;

async function optimize(file, { width, quality }) {
  const input = fs.readFileSync(file);
  const output = await sharp(input)
    .rotate() // pagal EXIF orientaciją
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer();

  before += input.length;
  if (output.length < input.length) {
    fs.writeFileSync(file, output);
    after += output.length;
  } else {
    after += input.length;
  }
}

for (const category of fs.readdirSync(GALLERY)) {
  const catDir = path.join(GALLERY, category);
  for (const sub of fs.readdirSync(catDir)) {
    const opts = SIZES[sub];
    if (!opts) continue;
    const dir = path.join(catDir, sub);
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.webp'))) {
      await optimize(path.join(dir, f), opts);
    }
  }
}

console.log(
  `gallery: ${Math.round(before / 1024)} KB -> ${Math.round(after / 1024)} KB`,
);

// Open Graph paveikslėlis (Facebook, Messenger, Viber): JPG 1200x630
await sharp('public/img/hero-bg.webp')
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/img/og-image.jpg');
console.log('public/img/og-image.jpg created');
