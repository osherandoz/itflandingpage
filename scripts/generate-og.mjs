// Generates favicon-64.png and apple-touch-icon.png from the white logo.
// Run: node scripts/generate-og.mjs
// og-card.png is no longer drawn here: it is a 2x browser screenshot of
// scripts/og-card.html (real fonts, real layout), downscaled to 1200x630.
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const img = (p) => path.join(root, 'public', 'images', p);

const LOGO = img('israeltechforce-logo-white.png');

// ── Favicons (opaque dark bg so white logo is visible) ───
async function icon(size, out, pad) {
  const inner = size - pad * 2;
  const logo = await sharp(LOGO).resize({ width: inner, height: inner, fit: 'inside' }).png().toBuffer();
  const m = await sharp(logo).metadata();
  const base = Buffer.from(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect width="${size}" height="${size}" rx="${Math.round(size * 0.18)}" fill="#0d1526"/></svg>`);
  await sharp(base)
    .composite([{ input: logo, left: Math.round((size - m.width) / 2), top: Math.round((size - m.height) / 2) }])
    .png()
    .toFile(img(out));
}
await icon(64, 'favicon-64.png', 8);
await icon(180, 'apple-touch-icon.png', 22);

console.log('done');
