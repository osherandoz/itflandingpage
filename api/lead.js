/**
 * POST /api/lead
 * Proxies contact-form + WhatsApp-popup leads straight into the CRM (itf-crm),
 * which creates the client + case there. No Google Sheets / Apps Script anymore.
 * Body: { name, phone, consent, source: 'contact-form' | 'service-form' | 'service-hero-callback', platform?, note?, src?, path?, company?: honeypot }
 *
 * - Server-to-server POST with a shared secret (Authorization: Bearer) — never
 *   exposed to the browser. Set LEAD_WEBHOOK_SECRET here AND in the CRM project
 *   (same value, same env var name).
 * - `src` is marketing attribution (utm_source, e.g. 'facebook'/'instagram'); it
 *   becomes the CRM's `source` (shown in /settings > lead sources). Falls back
 *   to 'website' when the visit carries no utm_source.
 * - `platform` (which product the visitor's issue is about) maps to the CRM's
 *   own `platforms` field (lib/constants.ts PLATFORMS) — shown as its own line
 *   there, not mixed into notes.
 * - `notes` sent to the CRM is exactly what the visitor typed/selected — no
 *   internal routing info (which on-site form, which page) gets mixed in
 *   (Osher, 2026-09-15: that mix read as garbled noise in the CRM's "extra
 *   details"). `path` is accepted for forward-compatibility but unused.
 * - Returns the CRM's own case id as leadId, so click events and the CRM
 *   record can be joined.
 * - Consent is required on the server too (the client already requires it).
 * - CRM_PROTECTION_BYPASS (optional): only for testing against a Vercel-
 *   protected CRM preview deployment. Never needed in production — the CRM's
 *   production domain isn't behind Deployment Protection.
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
// Must match ContactForm.jsx's PLATFORM_OPTIONS and the CRM's PLATFORMS keys (lib/constants.ts).
const VALID_PLATFORMS = new Set(['facebook', 'instagram', 'whatsapp', 'ads_manager']);

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

  if (!(await rateLimit('lead', clientIp(req), 2, 60 * 60))) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  const name = sanitize(body.name || '');
  const phone = normalizePhone(body.phone);
  const consent = body.consent === true || body.consent === 'true';
  const source = String(body.source || 'contact-form');
  const platform = VALID_PLATFORMS.has(body.platform) ? body.platform : null;
  const note = sanitize(body.note || '').slice(0, 120);
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

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` };
  if (process.env.CRM_PROTECTION_BYPASS) headers['x-vercel-protection-bypass'] = process.env.CRM_PROTECTION_BYPASS;

  try {
    const r = await fetch(CRM_LEAD_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        fullName: name,
        phone,
        source: src,
        platforms: platform ? [platform] : [],
        notes: note || null,
      }),
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
