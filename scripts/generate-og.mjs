// Generates og-card.png (1200x630), favicon-32.png, apple-touch-icon.png
// from the white logo. Run: node scripts/generate-og.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const img = (p) => path.join(root, 'public', 'images', p);

const LOGO = img('israeltechforce-logo-white.png');

// ── OG card ──────────────────────────────────────────────
const bg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a0e1a"/>
      <stop offset="0.55" stop-color="#0d1526"/>
      <stop offset="1" stop-color="#05070d"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.75" cy="0.2" r="0.8">
      <stop offset="0" stop-color="#2563eb" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#2563eb" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <text x="600" y="415" text-anchor="middle" direction="rtl" font-family="Arial, 'Segoe UI', sans-serif" font-size="52" font-weight="bold" fill="#ffffff">שחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ</text>
  <text x="600" y="490" text-anchor="middle" direction="rtl" font-family="Arial, 'Segoe UI', sans-serif" font-size="36" fill="#93c5fd">2,500+ חשבונות שוחזרו · תשלום רק אחרי הצלחה</text>
  <rect x="0" y="622" width="1200" height="8" fill="#2563eb"/>
</svg>`);

const logoResized = await sharp(LOGO).resize({ width: 480 }).png().toBuffer();
const logoMeta = await sharp(logoResized).metadata();
await sharp(bg)
  .composite([{ input: logoResized, left: Math.round((1200 - 480) / 2), top: Math.round(40 + (280 - logoMeta.height) / 2) }])
  .png()
  .toFile(img('og-card.png'));

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
