/**
 * Meta Conversions API — server-side event submission.
 * Used for the one event a browser pixel can no longer be trusted to report
 * honestly: Purchase. (The client-side Purchase pixel was removed — see
 * thank-you-purchase.jsx — because a page visit proves nothing; this is the
 * provider-confirmed replacement.)
 *
 * Env vars:
 *   META_CAPI_ACCESS_TOKEN — required. Generate at Events Manager > Data
 *                            Sources > (pixel) > Settings > Conversions API >
 *                            "Generate access token".
 *   META_PIXEL_ID          — optional, defaults to the site's pixel id
 *                            (must match the id in app/root.jsx so events
 *                            attribute to the same dataset).
 *
 * ponytail: no fbc/fbp click-id — the buyer leaves this site to pay on an
 * external checkout (mrng.to/Green Invoice) and the webhook fires from there,
 * with no browser cookie access. Matching relies on hashed email/phone
 * (Meta's "Advanced Matching"), which is solid but not click-id-level. If a
 * future checkout keeps the visitor in-page, thread fbc/fbp through instead.
 */
import crypto from 'crypto';

const DEFAULT_PIXEL_ID = '1911202046942044'; // matches app/root.jsx
const GRAPH_VERSION = 'v21.0';

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

/** Meta requires lowercase, trimmed, SHA-256-hashed PII in user_data. */
function hashEmail(email) {
  return email ? sha256(email.trim().toLowerCase()) : undefined;
}

function hashPhone(phone) {
  // E.164-ish digits only, no leading zero dropped for the country code —
  // Israeli mobiles here are already normalized to 05XXXXXXXX; Meta wants
  // digits with country code, so swap the leading 0 for 972.
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return undefined;
  const withCountry = digits.startsWith('0') ? `972${digits.slice(1)}` : digits;
  return sha256(withCountry);
}

/**
 * Send a server-side Purchase event. Fire-and-forget by convention (caller
 * doesn't await the network round-trip into the request's critical path),
 * but returns the promise so a caller that wants to await/log failures can.
 *
 * @param {{eventId: string|null, amount: number, currency: string, email: string, phone: string}} v
 */
export async function sendMetaPurchase(v) {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!accessToken) {
    console.log('[metaCapi] META_CAPI_ACCESS_TOKEN not set — skipping Purchase event');
    return { skipped: true };
  }
  const pixelId = process.env.META_PIXEL_ID || DEFAULT_PIXEL_ID;

  const userData = {};
  const em = hashEmail(v.email);
  const ph = hashPhone(v.phone);
  if (em) userData.em = [em];
  if (ph) userData.ph = [ph];

  const payload = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        // Stable per provider transaction — a webhook retry sends the exact
        // same event_id, so Meta dedups it instead of double-counting revenue.
        event_id: v.eventId || `bms-${v.email || v.phone}`,
        action_source: 'website',
        user_data: userData,
        custom_data: { value: v.amount, currency: v.currency, content_name: 'BMS Course' },
      },
    ],
  };

  try {
    const r = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error('[metaCapi] Meta rejected the event', r.status, JSON.stringify(data).slice(0, 300));
      return { ok: false, status: r.status };
    }
    console.log('[metaCapi] Purchase sent', { eventId: payload.data[0].event_id, received: data.events_received });
    return { ok: true, data };
  } catch (err) {
    console.error('[metaCapi] request failed', err?.message);
    return { ok: false, error: err?.message };
  }
}
