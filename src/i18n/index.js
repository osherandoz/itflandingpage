// i18n core — language is derived from the URL: /en/* is English, everything else Hebrew.
// No context/provider needed; useLang() reads the location directly.
import { useLocation } from 'react-router';

export const SITE_ORIGIN = 'https://www.israeltechforce.com';

export function langFromPathname(pathname) {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'he';
}

export function useLang() {
  const { pathname } = useLocation();
  const lang = langFromPathname(pathname);
  const isEn = lang === 'en';
  return {
    lang,
    isEn,
    dir: isEn ? 'ltr' : 'rtl',
    // Prepend to internal hrefs: `${prefix}/faq`, `${prefix}/articles/${slug}`
    prefix: isEn ? '/en' : '',
    // Home-page URL for the current language — use this, not `prefix` alone
    home: isEn ? '/en' : '/',
  };
}

// Locale-aware date display: dd/mm/yyyy for Hebrew, "Aug 10, 2026" for English
export function formatDate(dateString, lang) {
  const d = new Date(dateString);
  if (lang === 'en') {
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
  return d.toLocaleDateString('en-GB');
}

// Hebrew path ↔ English path pairs (English side includes the /en prefix).
// Used by the language toggle and by hreflang generation. Pages missing here
// (Hebrew-only funnels: VSL/BMS, thank-you, dashboard) toggle to the home page.
export const PATH_PAIRS = [
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
];

// Returns the equivalent URL in the other language, or the other language's
// home page when the current page has no counterpart.
export function togglePath(pathname) {
  let decoded;
  try {
    decoded = decodeURI(pathname).replace(/\/$/, '') || '/';
  } catch {
    // Malformed percent-encoding (bot requests) — fall back to the raw path
    decoded = pathname.replace(/\/$/, '') || '/';
  }
  const lang = langFromPathname(decoded);

  // Articles keep the same slug in both languages
  const articleMatch = decoded.match(/^(?:\/en)?\/articles\/(.+)$/);
  if (articleMatch) {
    return lang === 'en' ? `/articles/${articleMatch[1]}` : `/en/articles/${articleMatch[1]}`;
  }

  for (const [he, en] of PATH_PAIRS) {
    if (decoded === he) return en;
    if (decoded === en) return he;
  }
  return lang === 'en' ? '/' : '/en';
}

// Service pages keyed by slug — hrefs derived from PATH_PAIRS so a slug rename
// happens in exactly one place. Keys match SERVICE_PAGES[].slug.
export const SERVICE_PATHS = Object.fromEntries(
  [
    ['facebook-recovery', 0],
    ['instagram-recovery', 1],
    ['whatsapp-recovery', 2],
    ['facebook-disabled', 3],
    ['instagram-hacked', 4],
    ['ads-manager', 5],
  ].map(([key, i]) => [key, { he: PATH_PAIRS[i + 1][0], en: PATH_PAIRS[i + 1][1] }])
);

// Meta descriptors for <link rel="alternate" hreflang> — spread into a route's
// meta() return. Hebrew is x-default (primary language of the site).
export function hreflangLinks(hePath, enPath) {
  return [
    { tagName: 'link', rel: 'alternate', hrefLang: 'he', href: SITE_ORIGIN + encodeURI(hePath) },
    { tagName: 'link', rel: 'alternate', hrefLang: 'en', href: SITE_ORIGIN + enPath },
    { tagName: 'link', rel: 'alternate', hrefLang: 'x-default', href: SITE_ORIGIN + encodeURI(hePath) },
  ];
}
