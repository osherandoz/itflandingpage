/**
 * POST /api/lead
 * Proxies contact-form + WhatsApp-popup leads straight into the CRM (itf-crm),
 * which creates the client + case there. No Google Sheets / Apps Script anymore.
 * Body: { name, phone, consent, source: 'contact-form' | 'service-form' | 'service-hero-callback', note?, src?, path?, company?: honeypot }
 *
 * - Server-to-server POST with a shared secret (Authorization: Bearer) — never
 *   exposed to the browser. Set LEAD_WEBHOOK_SECRET here AND in the CRM project
 *   (same value, same env var name).
 * - `src` is marketing attribution (utm_source, e.g. 'facebook'/'instagram'); it
 *   becomes the CRM's `source` (shown in /settings > lead sources). Falls back
 *   to 'website' when the visit carries no utm_source.
 * - `source` (which on-site form/CTA) and `path` (page) are folded into the
 *   CRM case notes so a lead is traceable to the exact spot it came from.
 * - Returns the CRM's own case id as leadId, so click events and the CRM
 *   record can be joined.
 * - Consent is required on the server too (the client already requires it).
 */
import { NAME_RE, normalizePhone, readJsonBody, sanitize } from './_lib/smoove.js';
import { clientIp, rateLimit } from './_lib/store.js';

const CRM_LEAD_URL = process.env.CRM_LEAD_URL || 'https://itf-crm.vercel.app/api/public-lead';

const ALLOWED_ORIGINS = [
  'https://www.israeltechforce.com',
  'https://israeltechforce.com',
  ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:5173', 'http://localhost:3000'] : []),
];

// Must match every `location` prop ContactForm.jsx is rendered with.
const VALID_SOURCES = new Set(['contact-form', 'service-form', 'service-hero-callback']);

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
  const source = String(body.source || 'contact-form');
  const note = sanitize(body.note || '').slice(0, 120);
  const path = sanitize(body.path || '').slice(0, 80);
  // Marketing attribution (utm_source read client-side from the URL). Free text
  // on the CRM side (lead_sources is a manageable list, not a fixed enum).
  const src = sanitize(body.src || '').slice(0, 60) || 'website';

  if (!VALID_SOURCES.has(source)) return res.status(400).json({ error: 'Invalid source' });
  if (!NAME_RE.test(name)) return res.status(400).json({ error: 'Invalid name' });
  if (!phone) return res.status(400).json({ error: 'Invalid phone' });
  if (!consent) return res.status(400).json({ error: 'Consent required' });

  const secret = process.env.LEAD_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[lead] LEAD_WEBHOOK_SECRET env var not set');
    return res.status(500).json({ error: 'Server error' });
  }

  const notesParts = [`טופס: ${source}`];
  if (path) notesParts.push(`עמוד: ${path}`);
  if (note) notesParts.push(note);

  try {
    const r = await fetch(CRM_LEAD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` },
      body: JSON.stringify({ fullName: name, phone, source: src, notes: notesParts.join(' · ') }),
      signal: AbortSignal.timeout(8000),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok || !data.success) {
      console.error('[lead] CRM rejected', r.status, JSON.stringify(data).slice(0, 200));
      return res.status(502).json({ error: 'Upstream error' });
    }
    return res.status(200).json({ success: true, leadId: data.leadId || null });
  } catch (err) {
    console.error('[lead] handler error', err?.message);
    return res.status(500).json({ error: 'Server error' });
  }
}
