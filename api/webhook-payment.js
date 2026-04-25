/**
 * POST /api/webhook-payment
 * Receives payment confirmation from חשבונית ירוקה.
 * Verifies HMAC-SHA256 signature, then adds buyer to Smoove BMS purchases list.
 *
 * Environment Variables required:
 *   WEBHOOK_SECRET  — from חשבונית ירוקה webhook settings
 *   SMOOVE_API_KEY  — Smoove REST API key
 */

import crypto from 'crypto';

// ─── Signature Verification ───────────────────────────────────────────────────
function verifySignature(rawBody, signature, secret) {
  if (!signature || !secret) return false;
  try {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody));
    const digest = hmac.digest('hex');
    // timingSafeEqual requires same-length buffers
    const a = Buffer.from(digest, 'hex');
    const b = Buffer.from(signature.replace(/^sha256=/, ''), 'hex');
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// ─── Main Handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.WEBHOOK_SECRET;
  const signature =
    req.headers['x-webhook-signature'] ||
    req.headers['x-signature'] ||
    req.headers['x-hub-signature-256'];

  // Only enforce signature when secret is configured
  if (secret && !verifySignature(req.body, signature, secret)) {
    console.warn('Webhook: signature verification failed');
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const body = req.body || {};

  // Normalise field names from חשבונית ירוקה payload
  const name =
    body.customerName ||
    body.customer_name ||
    body.firstName ||
    body.first_name ||
    body.name ||
    '';
  const email =
    body.customerEmail ||
    body.customer_email ||
    body.email ||
    '';
  const phone =
    body.customerPhone ||
    body.customer_phone ||
    body.phone ||
    '';

  if (!email && !phone) {
    console.error('Webhook: missing contact data in payload', JSON.stringify(body));
    return res.status(400).json({ error: 'Missing contact data' });
  }

  const apiKey = process.env.SMOOVE_API_KEY;
  if (!apiKey) {
    console.error('SMOOVE_API_KEY env var is not set');
    return res.status(500).json({ error: 'Server error' });
  }

  const firstName = name.split(' ')[0] || name;

  try {
    const payload = {
      Lists: [{ Id: 1078775 }],
      CustomFields: [
        { Key: 'source', Value: 'bms-purchase' },
        { Key: 'purchase_date', Value: new Date().toISOString() },
      ],
    };
    if (firstName) payload.FirstName = firstName;
    if (email) payload.Email = email;
    if (phone) payload.Phone = phone;

    const smooveRes = await fetch(
      'https://rest.smoove.io/v1/Contacts?updateIfExists=true&restoreIfDeleted=true&restoreIfUnsubscribed=true',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (smooveRes.ok || smooveRes.status === 409) {
      console.log('Webhook: contact added to Smoove BMS purchases list');
      return res.status(200).json({ success: true });
    }

    const responseText = await smooveRes.text();
    console.error('Webhook Smoove error:', smooveRes.status, responseText);
    return res.status(502).json({ error: 'Smoove API error' });
  } catch (err) {
    console.error('Webhook payment handler error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
