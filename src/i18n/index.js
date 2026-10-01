// Site-wide constants and helpers. The site is Hebrew-only (RTL): the English
// site (/en/*) was removed on 2026-10-01 and its URLs 308-redirect to the Hebrew
// equivalents (see "redirects" in vercel.json).

export const SITE_ORIGIN = 'https://www.israeltechforce.com';

// Date display: dd/mm/yyyy
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB');
}

// Service pages keyed by slug, so a slug rename happens in exactly one place.
// Keys match SERVICE_PAGES[].slug; values are the (raw, un-encoded) site paths.
export const SERVICE_PATHS = {
  'facebook-recovery': '/שחזור-חשבון-פייסבוק',
  'instagram-recovery': '/שחזור-חשבון-אינסטגרם',
  'whatsapp-recovery': '/שחזור-חשבון-וואטסאפ',
  'facebook-disabled': '/חשבון-פייסבוק-מושבת',
  'instagram-hacked': '/חשבון-אינסטגרם-נפרץ',
  'ads-manager': '/שחזור-מנהל-מודעות',
};
