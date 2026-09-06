/**
 * POST /api/subscribe
 * Newsletter subscription — proxies to Smoove list 1078775 (The Safety Signal).
 * API key stays server-side only.
 *
 * Security layers: CORS, POST only, honeypot, input validation, durable rate limit
 * (3 req / IP / hour), idempotency per email. Success is reported only after Smoove
 * confirmed the write; failed attempts never block a retry.
 */
import { ALLOWED_ORIGINS, EMAIL_RE, NAME_RE, applyCors, readJsonBody, sanitize, upsertContact } from './_lib/smoove.js';
import { claim, clientIp, del, rateLimit, set } from './_lib/store.js';

const HOUR = 60 * 60;

export function validateInputs(firstName, lastName, email) {
  if (!NAME_RE.test(firstName.trim())) return 'שם פרטי לא תקין';
  // lastName is optional: /newsletter asks for first name only to cut form friction
  if (lastName.trim() && !NAME_RE.test(lastName.trim())) return 'שם משפחה לא תקין';
  if (!EMAIL_RE.test(email.trim()) || email.length > 254) return 'כתובת מייל לא תקינה';
  return null;
}

export default async function handler(req, res) {
  if (applyCors(req, res, ALLOWED_ORIGINS)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!(await rateLimit('news', clientIp(req), 3, HOUR))) {
    return res.status(429).json({ error: 'יותר מדי בקשות. נסה שוב מאוחר יותר.' });
  }

  const body = readJsonBody(req);
  if (!body) return res.status(400).json({ error: 'בקשה לא תקינה' });
  const { firstName, lastName, email, website } = body;

  // Honeypot — bots fill the hidden "website" field; humans don't
  if (website) return res.status(200).json({ success: true });

  const validationError = validateInputs(String(firstName || ''), String(lastName || ''), String(email || ''));
  if (validationError) return res.status(400).json({ error: validationError });

  const safeFirst = sanitize(firstName);
  const safeLast = sanitize(lastName || '');
  const safeEmail = sanitize(email).toLowerCase();

  const key = `news:${safeEmail}`;
  const fresh = await claim(key, HOUR, 'pending').catch(() => true);
  if (!fresh) return res.status(200).json({ success: true, duplicate: true });

  const listId = parseInt(process.env.SMOOVE_LIST_ID || '1078775', 10);
  try {
    const r = await upsertContact({
      email: safeEmail,
      firstName: safeFirst,
      lastName: safeLast,
      lists_ToSubscribe: [listId],
    });
    if (r.ok) {
      await set(key, 'completed', HOUR).catch(() => {});
      return res.status(200).json({ success: true });
    }
    await del(key).catch(() => {});
    return res.status(502).json({ error: 'שגיאה בהרשמה. נסה שוב מאוחר יותר.' });
  } catch (err) {
    console.error('Subscribe error:', err?.message);
    await del(key).catch(() => {});
    return res.status(500).json({ error: 'שגיאת שרת. נסה שוב מאוחר יותר.' });
  }
}
