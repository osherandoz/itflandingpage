// /akamol: the three-guide PDF bundle. Everything Osher still has to supply
// lives here, so the page itself never needs touching.

export const AKAMOL_PRICE = 19.9;

// TODO (Osher): the Grow payment link. While empty, every "buy" button opens a
// WhatsApp message to Osher instead, so no button on the live page is dead.
export const GROW_AKAMOL_URL = '';

// TODO (Osher): the three PDF covers, staggered in the hero. Each entry is
// { src, alt, width, height }. While empty the hero shows no visual at all.
export const AKAMOL_COVERS = [];

// TODO (Osher): the real WhatsApp screenshot (blurred name, photo and any
// identifying detail) and the client's consent. Keep `enabled` false until both
// are in; the proof block is not rendered at all while it is off.
export const CHAT_PROOF = { enabled: false, src: '', alt: '', width: 0, height: 0 };

// Prefilled message of the "my account is blocked right now" link. Deliberately
// different from every other WhatsApp message on the site, so leads from this page can be told apart.
export const AKAMOL_BLOCKED_MSG = 'היי אושר, הגעתי מדף האקמול. החשבון שלי חסום עכשיו';
export const AKAMOL_BUY_MSG = 'היי אושר, הגעתי מדף האקמול ואשמח לקבל את המדריכים';

// Buy-button link: Grow + the attribution params, or the WhatsApp fallback.
export function akamolCheckoutUrl(content) {
  if (!GROW_AKAMOL_URL) return null;
  const url = new URL(GROW_AKAMOL_URL);
  url.searchParams.set('utm_source', 'site');
  url.searchParams.set('utm_medium', 'landing');
  url.searchParams.set('utm_campaign', 'akamol');
  url.searchParams.set('utm_content', content);
  return url.toString();
}
