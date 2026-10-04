import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { SERVICE_PAGES } from '../data/servicePages.js';
import { articleIndex } from '../data/articleIndex.js';

// The routes point og:image at these files. A new page or article without a
// card would share as a broken image: run `node scripts/og-cards.mjs`.
describe('share cards', () => {
  const files = [
    ...SERVICE_PAGES.map((p) => `og/${p.slug}.png`),
    ...articleIndex.map((a) => `og/a-${a.slug}.png`),
    ...['faq', 'testimonials', 'press', 'articles', 'newsletter', 'author'].map((n) => `og/${n}.png`),
  ];
  it.each(files)('%s exists', (file) => {
    expect(existsSync(`public/images/${file}`)).toBe(true);
  });
});
