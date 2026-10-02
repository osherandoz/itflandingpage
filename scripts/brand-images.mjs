/**
 * Derives the Signal redesign's image set from the originals in public/images.
 * Usage: node scripts/brand-images.mjs
 */
import sharp from 'sharp';
import { stat } from 'node:fs/promises';

const OUT = 'public/images/brand';
const jobs = [
  // Standing portrait on white: blended onto a coloured card with multiply
  { src: 'public/images/osher-photo-2.jpg', name: 'osher-stand', crop: { left: 0, top: 60, width: 800, height: 1000 }, widths: [480, 800] },
  // Open-arms studio shot on dark
  { src: 'public/images/osher-photo-1.jpg', name: 'osher-open', crop: { left: 0, top: 0, width: 800, height: 1000 }, widths: [480, 800] },
  // Close portrait on black
  { src: 'public/images/vsl-bms/osher_auth.webp', name: 'osher-portrait', widths: [400, 800] },
  { src: 'public/images/israeltechforce-logo-white.png', name: 'logo-white', trim: true, widths: [320, 960], lossless: true },
];

for (const job of jobs) {
  for (const width of job.widths) {
    let img = sharp(job.src);
    if (job.crop) img = img.extract(job.crop);
    if (job.trim) img = img.trim();
    const out = `${OUT}/${job.name}-${width}.webp`;
    await img
      .resize({ width, withoutEnlargement: true })
      .webp(job.lossless ? { lossless: true, effort: 6 } : { quality: 78, effort: 6 })
      .toFile(out);
    const meta = await sharp(out).metadata();
    console.log(`${out}  ${meta.width}x${meta.height}  ${((await stat(out)).size / 1024).toFixed(1)} KB`);
  }
}
