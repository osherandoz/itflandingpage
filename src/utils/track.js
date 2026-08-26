// Site → CRM click-event wire. Fire-and-forget; must never break the page.
// CRM endpoint expects POST JSON: { event, path, lang, referrer, utm, ts, ...extra }
// Override the target with VITE_TRACK_URL (e.g. for a staging CRM).
import { langFromPathname } from '../i18n/index.js';

const TRACK_URL =
  import.meta.env.VITE_TRACK_URL || 'https://itf-crm.vercel.app/api/site-event';

export function trackSiteEvent(event, extra = {}) {
  try {
    const params = new URLSearchParams(window.location.search);
    const utm = {};
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      if (params.get(key)) utm[key] = params.get(key);
    }
    const payload = JSON.stringify({
      event,
      path: window.location.pathname,
      lang: langFromPathname(window.location.pathname),
      referrer: document.referrer || null,
      utm,
      ts: new Date().toISOString(),
      ...extra,
    });
    const blob = new Blob([payload], { type: 'application/json' });
    if (!navigator.sendBeacon || !navigator.sendBeacon(TRACK_URL, blob)) {
      fetch(TRACK_URL, {
        method: 'POST',
        body: payload,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // tracking must never throw into the UI
  }
}
