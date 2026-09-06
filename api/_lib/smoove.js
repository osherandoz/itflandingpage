/**
 * Shared Smoove contact upsert used by /api/subscribe and /api/bms-lead.
 * Returns { ok, status }. Never returns the raw Smoove body to callers.
 */
export async function upsertContact(contactPayload, { restore = true } = {}) {
  const apiKey = process.env.SMOOVE_API_KEY;
  if (!apiKey) throw new Error('SMOOVE_API_KEY env var is not set');
  // restoreIfUnsubscribed only for an explicit re-opt-in by the visitor (form submit).
  const qs = `updateIfExists=true&restoreIfDeleted=true&restoreIfUnsubscribed=${restore ? 'true' : 'false'}`;
  const r = await fetch(`https://rest.smoove.io/v1/Contacts?${qs}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(contactPayload),
    signal: AbortSignal.timeout(10000),
  });
  if (r.ok) return { ok: true, status: r.status };
  const text = await r.text().catch(() => '');
  // ponytail: 409 assumed to mean "contact exists in list". Unverified against Smoove
  // docs — if signups go missing, log below shows it. Remove the 409 branch to be strict.
  if (r.status === 409) {
    console.warn('[smoove] 409 treated as already-subscribed', text.slice(0, 200));
    return { ok: true, status: 409 };
  }
  console.error('[smoove] error', r.status, text.slice(0, 300));
  return { ok: false, status: r.status };
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const NAME_RE = /^[֐-׿ a-zA-Z\s\-']{1,50}$/;

export function sanitize(str) {
  return String(str).trim().replace(/[<>"']/g, '').substring(0, 200);
}

/** Israeli mobile → 05XXXXXXXX, or null when not plausible. */
export function normalizePhone(raw) {
  const digits = String(raw || '').replace(/[^\d+]/g, '');
  if (!digits) return null;
  if (/^05\d{8}$/.test(digits)) return digits;
  if (/^\+9725\d{8}$/.test(digits)) return '0' + digits.slice(4);
  if (/^9725\d{8}$/.test(digits)) return '0' + digits.slice(3);
  // Non-Israeli (English site): plain international number, 8-15 digits, optional +
  if (/^\+?\d{8,15}$/.test(digits)) return digits;
  return null;
}

/** Parse + type-check a JSON body. Rejects oversized or non-object payloads. */
export function readJsonBody(req, maxBytes = 4096) {
  let body = req.body;
  if (typeof body === 'string') {
    if (body.length > maxBytes) return null;
    try {
      body = JSON.parse(body);
    } catch {
      return null;
    }
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  if (JSON.stringify(body).length > maxBytes) return null;
  for (const v of Object.values(body)) {
    if (v !== null && typeof v === 'object') return null; // flat strings/bools/numbers only
  }
  return body;
}

export function applyCors(req, res, allowed) {
  const origin = req.headers.origin;
  if (allowed.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}

export const ALLOWED_ORIGINS = [
  'https://www.israeltechforce.com',
  'https://israeltechforce.com',
  ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:5173', 'http://localhost:3000'] : []),
];
