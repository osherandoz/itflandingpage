/**
 * POST /api/bms-lead
 * BMS checklist lead capture — proxies to Smoove list 1131098.
 * Captures firstName + email (required) + phone (optional).
 *
 * Success is reported to the browser ONLY after Smoove confirmed the write.
 * A failed attempt is never remembered as "done", so the visitor can retry.
 */
import { ALLOWED_ORIGINS, EMAIL_RE, NAME_RE, applyCors, normalizePhone, readJsonBody, sanitize, upsertContact } from './_lib/smoove.js';
import { claim, clientIp, del, rateLimit, set } from './_lib/store.js';

const LIST_ID = 1131098;
const HOUR = 60 * 60;

export default async function handler(req, res) {
  if (applyCors(req, res, ALLOWED_ORIGINS)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!(await rateLimit('bms', clientIp(req), 5, HOUR))) {
    return res.status(429).json({ error: 'יותר מדי בקשות. נסי שוב מאוחר יותר.' });
  }

  const body = readJsonBody(req);
  if (!body) return res.status(400).json({ error: 'בקשה לא תקינה' });
  const { firstName, email, phone, website } = body;

  // Honeypot
  if (website) return res.status(200).json({ success: true });

  if (!firstName || !NAME_RE.test(String(firstName).trim())) {
    return res.status(400).json({ error: 'שם לא תקין' });
  }
  if (!email || !EMAIL_RE.test(String(email).trim()) || String(email).length > 254) {
    return res.status(400).json({ error: 'כתובת מייל לא תקינה' });
  }
  const safeName = sanitize(firstName);
  const safeEmail = sanitize(email).toLowerCase();
  const safePhone = phone ? normalizePhone(phone) : null;
  if (phone && !safePhone) return res.status(400).json({ error: 'מספר טלפון לא תקין' });

  // Idempotency: pending → completed. Released on failure so a retry reaches Smoove.
  const key = `bms:${safeEmail}`;
  const fresh = await claim(key, HOUR, 'pending').catch(() => true);
  if (!fresh) return res.status(200).json({ success: true, duplicate: true });

  const contactPayload = { email: safeEmail, firstName: safeName, lists_ToSubscribe: [LIST_ID] };
  if (safePhone) contactPayload.cellPhone = safePhone;

  try {
    const r = await upsertContact(contactPayload);
    if (r.ok) {
      await set(key, 'completed', HOUR).catch(() => {});
      return res.status(200).json({ success: true });
    }
    await del(key).catch(() => {}); // release: the visitor's retry must reach Smoove
    return res.status(502).json({ error: 'שגיאה בהרשמה. נסי שוב מאוחר יותר.' });
  } catch (err) {
    console.error('BMS lead error:', err?.message);
    await del(key).catch(() => {});
    return res.status(500).json({ error: 'שגיאת שרת. נסי שוב מאוחר יותר.' });
  }
}
