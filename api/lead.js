/**
 * POST /api/lead
 * Proxies homepage contact-form + WhatsApp-popup leads to Google Apps Script.
 * Keeps PII out of client-side GET URLs, adds validation, honeypot and rate limiting.
 * Body: { name, phone, consent, source: 'contact' | 'whatsapp-popup', company?: honeypot }
 */

const APPS_SCRIPT_URLS = {
  contact:
    'https://script.google.com/macros/s/AKfycbzziLRW7EWKO43zDdihAPneBF6aAd6aiXp4HyMIa5an3vOxJKHIr9xIJo-KdLTi2AYpmQ/exec',
  'whatsapp-popup':
    'https://script.google.com/macros/s/AKfycbyFbqdWOAObMBAFHLaA0wR8OJMHgju2qTAq3WvNAq9VL67nXKhdTtKRO5g96d4ruE_ttQ/exec',
};

const ALLOWED_ORIGINS = [
  'https://www.israeltechforce.com',
  'https://israeltechforce.com',
  ...(process.env.NODE_ENV !== 'production'
    ? ['http://localhost:5173', 'http://localhost:3000']
    : []),
];

const rateLimitStore = new Map();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

// ponytail: in-memory limit resets per cold start — Vercel Firewall rule is the real backstop
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

const NAME_RE = /^[֐-׿ a-zA-Z\s\-']{1,50}$/;
const PHONE_RE = /^[\d+\-\s()]{7,20}$/;

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = req.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  // Honeypot — bots fill every field
  if (body.company) return res.status(200).json({ success: true });

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  const name = String(body.name || '').trim();
  const phone = String(body.phone || '').trim();
  const consent = body.consent === true || body.consent === 'true';
  const source = String(body.source || 'contact');

  const target = APPS_SCRIPT_URLS[source];
  if (!target) return res.status(400).json({ error: 'Invalid source' });
  if (!NAME_RE.test(name)) return res.status(400).json({ error: 'Invalid name' });
  if (!PHONE_RE.test(phone)) return res.status(400).json({ error: 'Invalid phone' });

  try {
    const params = new URLSearchParams({ name, phone, consent: String(consent) });
    const r = await fetch(`${target}?${params.toString()}`, { method: 'GET', redirect: 'follow' });
    if (!r.ok) {
      console.error('[lead] Apps Script error', source, r.status);
      return res.status(502).json({ error: 'Upstream error' });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[lead] handler error', err?.message);
    return res.status(500).json({ error: 'Server error' });
  }
}
