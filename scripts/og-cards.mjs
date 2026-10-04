// One share card (1200x630) per page, drawn by scripts/og-card.html:
//   public/images/og-card.png          home (no params)
//   public/images/og/<slug>.png        service pages and static pages
//   public/images/og/a-<slug>.png      articles
// Run after adding a page or an article: node scripts/og-cards.mjs
// Needs Chrome and the global Playwright CLI (npm i -g @playwright/cli); it is
// not a project dependency because nothing else here drives a browser.
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import { SERVICE_PAGES } from '../src/data/servicePages.js';
import { articleIndex } from '../src/data/articleIndex.js';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const globalRoot = execSync('npm root -g').toString().trim();
const { chromium } = createRequire(import.meta.url)(path.join(globalRoot, '@playwright/cli/node_modules/playwright-core'));

// "keyword: promise" / "problem? promise" → light line + bold line, as on the page
const split = (title) => {
  const m = title.match(/^(.+?[:?])\s+(.+)$/);
  return m ? { l: m[1], t: m[2] } : { t: title };
};

const cards = [
  { file: 'og-card.png' },
  ...SERVICE_PAGES.map((p) => ({ file: `og/${p.slug}.png`, k: p.keyword, ...split(p.title) })),
  ...articleIndex.map((a) => ({ file: `og/a-${a.slug}.png`, k: `מדריך · ${a.category}`, ...split(a.displayTitle || a.title) })),
  { file: 'og/faq.png', k: 'שאלות נפוצות', l: 'כל התשובות', t: 'על שחזור חשבונות' },
  { file: 'og/testimonials.png', k: 'תוצאות', l: 'ביקורות', t: 'לקוחות' },
  { file: 'og/press.png', k: 'כפי שסוקרנו בתקשורת', l: 'IsraelTechForce', t: 'בתקשורת' },
  { file: 'og/articles.png', k: 'שחזור ואבטחת חשבונות', l: 'מאמרים', t: 'ומדריכים' },
  { file: 'og/newsletter.png', k: 'The Safety Signal · ניוזלטר חודשי', l: 'מה מטא משנה בפועל,', t: 'ומה כדאי לבדוק אצלך' },
  { file: 'og/author.png', k: 'מייסד IsraelTechForce', l: 'אושר רווח', t: 'מומחה שחזור חשבונות' },
];

mkdirSync(path.join(root, 'public/images/og'), { recursive: true });
const template = pathToFileURL(path.join(root, 'scripts/og-card.html')).href;
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
for (const { file, ...params } of cards) {
  await page.goto(`${template}?${new URLSearchParams(params)}`);
  await page.evaluate(() => document.fonts.ready);
  // 2x screenshot, downscaled: sharper text than a 1x capture
  await sharp(await page.screenshot()).resize(1200, 630).png({ palette: true }).toFile(path.join(root, 'public/images', file));
  console.log(file);
}
await browser.close();
