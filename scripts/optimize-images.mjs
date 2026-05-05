/**
 * Optimize VSL-BMS images: PNG → WebP at multiple sizes.
 * Generates: filename.webp (full size), filename-md.webp (mid), filename-sm.webp (mobile)
 *
 * Usage: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';

const SOURCE_DIR = 'public/images/vsl-bms';
const SIZES = {
  sm: 480,   // mobile
  md: 960,   // tablet/desktop
  // full = original width
};
const QUALITY = 82;

async function processFile(file) {
  const { name, ext } = parse(file);
  if (ext.toLowerCase() !== '.png') return null;

  const inputPath = join(SOURCE_DIR, file);
  const original = sharp(inputPath);
  const meta = await original.metadata();
  const originalSize = (await stat(inputPath)).size;

  const results = [];

  // Full-size WebP
  const fullPath = join(SOURCE_DIR, `${name}.webp`);
  await sharp(inputPath).webp({ quality: QUALITY, effort: 5 }).toFile(fullPath);
  results.push({ size: 'full', path: fullPath, bytes: (await stat(fullPath)).size });

  // Resized WebPs
  for (const [label, width] of Object.entries(SIZES)) {
    if (meta.width && width >= meta.width) continue; // skip upscaling
    const outPath = join(SOURCE_DIR, `${name}-${label}.webp`);
    await sharp(inputPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(outPath);
    results.push({ size: label, path: outPath, bytes: (await stat(outPath)).size });
  }

  return { file, originalSize, originalDims: `${meta.width}x${meta.height}`, outputs: results };
}

const files = await readdir(SOURCE_DIR);
console.log(`\nFound ${files.length} files in ${SOURCE_DIR}\n`);

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const result = await processFile(file);
  if (!result) continue;
  totalBefore += result.originalSize;
  console.log(`📷 ${file} (${result.originalDims}, ${(result.originalSize / 1024).toFixed(0)} KB)`);
  for (const out of result.outputs) {
    const ratio = ((1 - out.bytes / result.originalSize) * 100).toFixed(0);
    totalAfter += out.bytes;
    console.log(`   ${out.size.padEnd(5)} → ${(out.bytes / 1024).toFixed(0).padStart(4)} KB  (-${ratio}%)`);
  }
}

console.log(`\n📊 Total before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
console.log(`📊 Total after:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
console.log(`📊 Savings:      ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0)}%\n`);
