/**
 * POST /api/bms-lead
 * Secure BMS landing-page lead capture — proxies to Smoove API.
 * Captures firstName + email (required) + phone (optional), tags contacts by source.
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[֐-׿ a-zA-Z\s\-']{1,50}$/;

const recentEmails = new Map();
function isDuplicate(email) {
  const now = Date.now();
  const expiry = recentEmails.get(email);
  if (expiry && now < expiry) return true;
  recentEmails.set(email, now + RATE_LIMIT_WINDOW_MS);
  return false;
}

function normalizePhone(raw) {
  const digits = String(raw || '').replace(/[^\d+]/g, '');
  if (!digits) return null;
  // Accept Israeli formats: 05xxxxxxxx / +9725xxxxxxxx / 9725xxxxxxxx
  if (/^05\d{8}$/.test(digits)) return digits;
  if (/^\+9725\d{8}$/.test(digits)) return '0' + digits.slice(4);
  if (/^9725\d{8}$/.test(digits)) return '0' + digits.slice(3);
  return null;
}

function sanitize(str) {
  return String(str).trim().replace(/[<>"']/g, '').substring(0, 200);
}

export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
    .split(',')[0]
    .trim();
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'יותר מדי בקשות. נסי שוב מאוחר יותר.' });
  }

  // Vercel can sometimes deliver the body as a raw JSON string instead of an object
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const { firstName, email, phone, website } = body || {};

  // Honeypot
  if (website) {
    return res.status(200).json({ success: true });
  }

  if (!firstName || !NAME_RE.test(String(firstName).trim())) {
    return res.status(400).json({ error: 'שם לא תקין' });
  }

  if (!email || !EMAIL_RE.test(String(email).trim())) {
    return res.status(400).json({ error: 'כתובת מייל לא תקינה' });
  }

  const safeName = sanitize(firstName);
  const safeEmail = sanitize(email).toLowerCase();

  // Phone is optional — null means not provided / not valid Israeli format
  const safePhone = phone ? normalizePhone(phone) : null;
  if (phone && !safePhone) {
    return res.status(400).json({ error: 'מספר טלפון לא תקין' });
  }

  if (isDuplicate(safeEmail)) {
    return res.status(200).json({ success: true });
  }

  const apiKey = process.env.SMOOVE_API_KEY;
  const listId = parseInt(process.env.SMOOVE_SM_LIST_ID || '1131098', 10);

  if (!apiKey) {
    console.error('SMOOVE_API_KEY env var is not set');
    return res.status(500).json({ error: 'שגיאת שרת. נסי שוב מאוחר יותר.' });
  }

  const contactPayload = {
    email: safeEmail,
    firstName: safeName,
    lists_ToSubscribe: [listId],
  };
  if (safePhone) contactPayload.cellPhone = safePhone;

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
        body: JSON.stringify(contactPayload),
      }
    );

    const responseText = await smooveRes.text();
    if (smooveRes.ok || smooveRes.status === 409) {
      return res.status(200).json({ success: true });
    }
    console.error('Smoove error:', smooveRes.status, responseText);
    return res.status(502).json({ error: 'שגיאה בהרשמה. נסי שוב מאוחר יותר.' });
  } catch (err) {
    console.error('BMS lead fetch error:', err);
    return res.status(500).json({ error: 'שגיאת שרת. נסי שוב מאוחר יותר.' });
  }
}
