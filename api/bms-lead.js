/**
 * POST /api/bms-lead
 * Secure lead submission for BMS-SM landing page.
 * Collects firstName + phone, adds to Smoove list 1078775.
 *
 * Security layers:
 *  1. CORS — only israeltechforce.com origins
 *  2. Method guard — POST only
 *  3. Honeypot — bot detection
 *  4. Input validation — name/phone format
 *  5. Rate limiting — max 5 req / IP / hour
 *  6. Duplicate prevention — same phone silent no-op within 1h
 */

const ALLOWED_ORIGINS = [
  'https://www.israeltechforce.com',
  'https://israeltechforce.com',
  ...(process.env.NODE_ENV !== 'production'
    ? ['http://localhost:5173', 'http://localhost:3000']
    : []),
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

// ─── Rate Limiting ────────────────────────────────────────────────────────────
const rateLimitStore = new Map();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

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

// ─── Duplicate Prevention ─────────────────────────────────────────────────────
const recentPhones = new Map();

function isDuplicate(phone) {
  const now = Date.now();
  const expiry = recentPhones.get(phone);
  if (expiry && now < expiry) return true;
  recentPhones.set(phone, now + RATE_LIMIT_WINDOW_MS);
  return false;
}

// ─── Validation ───────────────────────────────────────────────────────────────
const PHONE_RE = /^[\d\s\-+()]{7,20}$/;
const NAME_RE = /^[\u0590-\u05FF\u0020a-zA-Z\s\-']{1,50}$/;

function sanitize(str) {
  return String(str).trim().replace(/[<>"]/g, '').substring(0, 200);
}

// ─── Main Handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
    .split(',')[0]
    .trim();
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'יותר מדי בקשות. נסה שוב מאוחר יותר.' });
  }

  const { firstName, phone, website } = req.body || {};

  // Honeypot
  if (website) {
    return res.status(200).json({ success: true });
  }

  // Validation
  if (!firstName || !NAME_RE.test(String(firstName).trim())) {
    return res.status(400).json({ error: 'שם לא תקין' });
  }
  if (!phone || !PHONE_RE.test(String(phone).trim())) {
    return res.status(400).json({ error: 'מספר טלפון לא תקין' });
  }

  const safeName = sanitize(firstName);
  const safePhone = sanitize(phone).replace(/\s/g, '');

  if (isDuplicate(safePhone)) {
    return res.status(200).json({ success: true });
  }

  const apiKey = process.env.SMOOVE_API_KEY;
  if (!apiKey) {
    console.error('SMOOVE_API_KEY env var is not set');
    return res.status(500).json({ error: 'שגיאת שרת. נסה שוב מאוחר יותר.' });
  }

  try {
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
          FirstName: safeName,
          Phone: safePhone,
          Lists: [{ Id: 1078775 }],
          CustomFields: [{ Key: 'source', Value: 'bms-sm-landing' }],
        }),
      }
    );

    const responseText = await smooveRes.text();
    if (smooveRes.ok || smooveRes.status === 409) {
      return res.status(200).json({ success: true });
    }
    console.error('Smoove bms-lead error:', smooveRes.status, responseText);
    return res.status(502).json({ error: 'שגיאה בהרשמה. נסה שוב מאוחר יותר.' });
  } catch (err) {
    console.error('BMS lead handler error:', err);
    return res.status(500).json({ error: 'שגיאת שרת. נסה שוב מאוחר יותר.' });
  }
}
