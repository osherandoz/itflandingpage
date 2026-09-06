/**
 * POST /api/lead
 * Proxies contact-form + WhatsApp-popup leads to Google Apps Script → Google Sheets.
 * Body: { name, phone, consent, source: 'contact' | 'whatsapp-popup', note?, company?: honeypot }
 *
 * - Server-side POST (form-encoded, so the currently deployed script keeps working)
 *   with a shared secret in the body. Set LEAD_WEBHOOK_SECRET here AND as the
 *   LEAD_SECRET script property in Apps Script (see google-apps-script-code.js).
 * - Generates a server lead id, stores it in the sheet, and returns it to the browser
 *   so click events and the lead row can be joined in the CRM.
 * - Consent is required on the server too (the client already requires it).
 */
import crypto from 'crypto';
import { NAME_RE, normalizePhone, readJsonBody, sanitize } from './_lib/smoove.js';
import { clientIp, rateLimit } from './_lib/store.js';

const APPS_SCRIPT_URLS = {
  contact:
    'https://script.google.com/macros/s/AKfycbzziLRW7EWKO43zDdihAPneBF6aAd6aiXp4HyMIa5an3vOxJKHIr9xIJo-KdLTi2AYpmQ/exec',
  'whatsapp-popup':
    'https://script.google.com/macros/s/AKfycbyFbqdWOAObMBAFHLaA0wR8OJMHgju2qTAq3WvNAq9VL67nXKhdTtKRO5g96d4ruE_ttQ/exec',
};

const ALLOWED_ORIGINS = [
  'https://www.israeltechforce.com',
  'https://israeltechforce.com',
  ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:5173', 'http://localhost:3000'] : []),
];

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = readJsonBody(req);
  if (!body) return res.status(400).json({ error: 'Bad request' });

  // Honeypot — bots fill every field
  if (body.company) return res.status(200).json({ success: true });

  if (!(await rateLimit('lead', clientIp(req), 5, 60 * 60))) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  const name = sanitize(body.name || '');
  const phone = normalizePhone(body.phone);
  const consent = body.consent === true || body.consent === 'true';
  const source = String(body.source || 'contact');
  const note = sanitize(body.note || '').slice(0, 120);

  const target = APPS_SCRIPT_URLS[source];
  if (!target) return res.status(400).json({ error: 'Invalid source' });
  if (!NAME_RE.test(name)) return res.status(400).json({ error: 'Invalid name' });
  if (!phone) return res.status(400).json({ error: 'Invalid phone' });
  if (!consent) return res.status(400).json({ error: 'Consent required' });

  const leadId = crypto.randomUUID();
  const form = new URLSearchParams({ name, phone, consent: 'true', leadId, source, note });
  if (process.env.LEAD_WEBHOOK_SECRET) form.set('secret', process.env.LEAD_WEBHOOK_SECRET);

  try {
    // Apps Script answers a POST with a 302 to the result page; fetch follows it.
    const r = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
    });
    const text = await r.text().catch(() => '');
    // New script returns JSON {ok:true}; the legacy script returns plain "Success".
    let ok = r.ok && /^\s*Success/i.test(text);
    try {
      const j = JSON.parse(text);
      ok = r.ok && j.ok === true;
    } catch {
      /* legacy plain-text response */
    }
    if (!ok) {
      console.error('[lead] Apps Script rejected', source, r.status, text.slice(0, 120));
      return res.status(502).json({ error: 'Upstream error' });
    }
    return res.status(200).json({ success: true, leadId });
  } catch (err) {
    console.error('[lead] handler error', err?.message);
    return res.status(500).json({ error: 'Server error' });
  }
}
