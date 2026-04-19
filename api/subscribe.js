/**
 * POST /api/subscribe
 * Secure newsletter subscription — proxies to Smoove API.
 * API key stays server-side only (never shipped to the browser).
 *
 * Security layers:
 *  1. CORS — only israeltechforce.com origins
 *  2. Method guard — POST only
 *  3. Honeypot — bot detection
 *  4. Input validation — name/email format
 *  5. In-memory rate limit — max 3 req / IP / hour
 *  6. Duplicate prevention — same email silent no-op within 1h window
 */

// ─── CORS ────────────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'https://www.israeltechforce.com',
  'https://israeltechforce.com',
  ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:5173', 'http://localhost:3000'] : []),
];

function applyCors(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}

// ─── RATE LIMITING (in-memory, resets on cold start) ─────────────────────────
const rateLimitStore = new Map(); // ip → { count, resetAt }
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

// ─── DUPLICATE PREVENTION (in-memory) ────────────────────────────────────────
const recentEmails = new Map(); // email → expiry timestamp

function isDuplicate(email) {
  const now = Date.now();
  const expiry = recentEmails.get(email);
  if (expiry && now < expiry) return true;
  recentEmails.set(email, now + RATE_LIMIT_WINDOW_MS);
  return false;
}

// ─── VALIDATION ──────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Hebrew + Latin letters, spaces, hyphens, apostrophes — 1-50 chars
const NAME_RE = /^[\u0590-\u05FF\u0020a-zA-Z\s\-']{1,50}$/;

function sanitize(str) {
  return String(str).trim().replace(/[<>"']/g, '').substring(0, 200);
}

function validateInputs(firstName, lastName, email) {
  if (!NAME_RE.test(firstName.trim()))  return 'שם פרטי לא תקין';
  if (!NAME_RE.test(lastName.trim()))   return 'שם משפחה לא תקין';
  if (!EMAIL_RE.test(email.trim()) || email.length > 254) return 'כתובת מייל לא תקינה';
  return null;
}

// ─── MAIN HANDLER ────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // 1. CORS
  if (applyCors(req, res)) return;

  // 2. Method guard
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 3. Rate limit
  const ip = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
    .split(',')[0].trim();
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'יותר מדי בקשות. נסה שוב מאוחר יותר.' });
  }

  const { firstName, lastName, email, website } = req.body || {};

  // 4. Honeypot — bots fill the hidden "website" field; humans don't
  if (website) {
    return res.status(200).json({ success: true }); // silent no-op
  }

  // 5. Input validation
  const validationError = validateInputs(
    String(firstName || ''),
    String(lastName  || ''),
    String(email     || ''),
  );
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const safeFirst = sanitize(firstName);
  const safeLast  = sanitize(lastName);
  const safeEmail = sanitize(email).toLowerCase();

  // 6. Duplicate prevention
  if (isDuplicate(safeEmail)) {
    return res.status(200).json({ success: true }); // silent no-op
  }

  // 7. Call Smoove API (key is server-side only)
  const apiKey  = process.env.SMOOVE_API_KEY;
  const listId  = process.env.SMOOVE_LIST_ID || '1078775';

  if (!apiKey) {
    console.error('SMOOVE_API_KEY env var is not set');
    return res.status(500).json({ error: 'שגיאת שרת. נסה שוב מאוחר יותר.' });
  }

  try {
    // Smoove expects lists_ToSubscribe as an array of integer list IDs
    const smooveRes = await fetch(
      'https://rest.smoove.io/v1/Contacts?updateIfExists=true&restoreIfDeleted=true&restoreIfUnsubscribed=true',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: safeEmail,
          firstName: safeFirst,
          lastName: safeLast,
          lists_ToSubscribe: [parseInt(listId, 10)],
        }),
      }
    );

    const responseText = await smooveRes.text();
    if (smooveRes.ok) {
      return res.status(200).json({ success: true });
    }
    if (smooveRes.status === 409) {
      return res.status(200).json({ success: true }); // already subscribed — silent
    }
    console.error('Smoove error:', smooveRes.status, responseText);
    return res.status(502).json({ error: 'שגיאה בהרשמה. נסה שוב מאוחר יותר.' });
  } catch (err) {
    console.error('Subscribe fetch error:', err);
    return res.status(500).json({ error: 'שגיאת שרת. נסה שוב מאוחר יותר.' });
  }
}
