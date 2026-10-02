/**
 * The English site (/en/*) was removed on 2026-10-01. Every old English URL
 * must keep resolving via a permanent redirect to its Hebrew equivalent, and no
 * /en route may come back by accident.
 * Run: npm test
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const read = (relative) =>
  readFileSync(fileURLToPath(new URL(`../../${relative}`, import.meta.url)), 'utf8');

const vercel = JSON.parse(read('vercel.json'));
const redirects = vercel.redirects ?? [];
const routesSource = read('app/routes.js');

// The former PATH_PAIRS from src/i18n/index.js: [Hebrew path, old English path].
const FORMER_PATH_PAIRS = [
  ['/', '/en'],
  ['/שחזור-חשבון-פייסבוק', '/en/facebook-account-recovery'],
  ['/שחזור-חשבון-אינסטגרם', '/en/instagram-account-recovery'],
  ['/שחזור-חשבון-וואטסאפ', '/en/whatsapp-account-recovery'],
  ['/חשבון-פייסבוק-מושבת', '/en/facebook-account-disabled'],
  ['/חשבון-אינסטגרם-נפרץ', '/en/instagram-account-hacked'],
  ['/שחזור-מנהל-מודעות', '/en/ads-manager-recovery'],
  ['/faq', '/en/faq'],
  ['/testimonials', '/en/testimonials'],
  ['/articles', '/en/articles'],
  ['/press', '/en/press'],
  ['/newsletter', '/en/newsletter'],
  ['/privacy', '/en/privacy'],
  ['/אושר-רווח', '/en/osher-revach'],
];

describe('English site removal — /en redirects', () => {
  it.each(FORMER_PATH_PAIRS)('%s is the permanent redirect target of %s', (he, en) => {
    const rule = redirects.find((r) => r.source === en);
    expect(rule, `no redirect for ${en}`).toBeTruthy();
    expect(rule.permanent).toBe(true);
    expect(rule.destination).toBe(encodeURI(he));
  });

  it('stores every destination percent-encoded (ASCII only)', () => {
    for (const { destination } of redirects) {
      // eslint-disable-next-line no-control-regex
      expect(destination).toMatch(/^[\x00-\x7F]+$/);
    }
  });

  it('redirects English articles to the same slug in Hebrew', () => {
    const rule = redirects.find((r) => r.source === '/en/articles/:slug');
    expect(rule).toMatchObject({ destination: '/articles/:slug', permanent: true });
  });

  it('ends with a catch-all that sends any other /en URL to the home page', () => {
    const last = redirects[redirects.length - 1];
    expect(last).toMatchObject({ source: '/en/:path*', destination: '/', permanent: true });
    // specific rules must come before the catch-all, or they would never match
    const catchAllIndex = redirects.findIndex((r) => r.source === '/en/:path*');
    for (const [, en] of FORMER_PATH_PAIRS.filter(([, en]) => en !== '/en')) {
      expect(redirects.findIndex((r) => r.source === en)).toBeLessThan(catchAllIndex);
    }
    expect(redirects.findIndex((r) => r.source === '/en/articles/:slug')).toBeLessThan(catchAllIndex);
  });

  it('every Hebrew destination is a route the app still serves', () => {
    for (const [he] of FORMER_PATH_PAIRS) {
      if (he === '/') continue;
      expect(routesSource, `route for ${he}`).toContain(`route("${he.slice(1)}"`);
    }
  });
});

describe('English site removal — routing table', () => {
  it('app/routes.js registers no en/ route', () => {
    expect(routesSource).not.toMatch(/route\(\s*["']en(\/|["'])/);
    expect(routesSource).not.toMatch(/routes\/en\./);
  });
});
