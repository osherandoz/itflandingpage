/**
 * POST /api/webhook-payment
 * Receives payment confirmation from Green Invoice (חשבונית ירוקה).
 * Verifies HMAC-SHA256 signature, then adds buyer to Smoove BMS purchase list 1123232.
 * That list triggers the post-purchase Smoove journey:
 *   1. set random password custom field
 *   2. remove from "נרשמו אך לא רכשו - BMS" list
 *   3. send LMS access email
 *
 * Env vars:
 *   SMOOVE_API_KEY     — Smoove REST API key (required)
 *   WEBHOOK_SECRET     — Green Invoice webhook signing secret (recommended)
 *   WEBHOOK_TEST_MODE  — when "true", skips signature verification (testing only)
 *   SMOOVE_DRY_RUN     — when "true", logs the payload but does not call Smoove
 */

import crypto from 'crypto';

const BMS_PURCHASE_LIST_ID = 1123232;
const NEWSLETTER_LIST_ID = 1078775;

function verifySignature(rawBody, signature, secret) {
  if (!signature || !secret) return false;
  try {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody));
    const digest = hmac.digest('hex');
    const a = Buffer.from(digest, 'hex');
    const b = Buffer.from(signature.replace(/^sha256=/, ''), 'hex');
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const isTestMode = process.env.WEBHOOK_TEST_MODE === 'true';
  const isDryRun = process.env.SMOOVE_DRY_RUN === 'true';

  console.log('[webhook-payment] incoming', {
    contentType: req.headers['content-type'],
    hasSignature: Boolean(
      req.headers['x-webhook-signature'] ||
        req.headers['x-signature'] ||
        req.headers['x-hub-signature-256']
    ),
    body: req.body,
    testMode: isTestMode,
    dryRun: isDryRun,
  });

  const secret = process.env.WEBHOOK_SECRET;
  const signature =
    req.headers['x-webhook-signature'] ||
    req.headers['x-signature'] ||
    req.headers['x-hub-signature-256'];

  if (!isTestMode && secret && !verifySignature(req.body, signature, secret)) {
    // Diagnostic dump — helps identify GI's actual signature format
    let computedHex = '';
    try {
      const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      computedHex = crypto.createHmac('sha256', secret).update(raw).digest('hex');
    } catch {}
    console.warn('[webhook-payment] signature verification failed', {
      receivedSignature: signature,
      computedSignatureHex: computedHex,
      allHeaders: req.headers,
      bodyPreview: typeof req.body === 'string' ? req.body.slice(0, 500) : JSON.stringify(req.body).slice(0, 500),
    });
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Vercel sometimes delivers the body as a raw JSON string
  let body = req.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  // Normalise field names across possible Green Invoice payload shapes.
  // Real Green Invoice / Morning webhook v2.1 uses body.payer.{name, email, phone}.
  const name =
    body.payer?.name ||
    body.customerName ||
    body.customer_name ||
    body.firstName ||
    body.first_name ||
    body.name ||
    body.client?.name ||
    '';
  const email =
    body.payer?.email ||
    body.customerEmail ||
    body.customer_email ||
    body.email ||
    body.client?.emails?.[0] ||
    '';
  const phone =
    body.payer?.phone ||
    body.customerPhone ||
    body.customer_phone ||
    body.phone ||
    body.client?.phone ||
    '';

  if (!email && !phone) {
    console.error('[webhook-payment] missing contact data', JSON.stringify(body));
    return res.status(400).json({ error: 'Missing contact data' });
  }

  const apiKey = process.env.SMOOVE_API_KEY;
  if (!apiKey) {
    console.error('[webhook-payment] SMOOVE_API_KEY env var not set');
    return res.status(500).json({ error: 'Server error' });
  }

  const firstName = String(name).split(' ')[0] || String(name);
  const safeEmail = String(email).toLowerCase().trim();

  // Exact payload format from the working bms-lead.js (which assigns to list 1131098)
  const contactPayload = {
    email: safeEmail,
    firstName,
    lists_ToSubscribe: [BMS_PURCHASE_LIST_ID, NEWSLETTER_LIST_ID],
  };
  if (phone) contactPayload.cellPhone = phone;

  if (isDryRun) {
    console.log('[webhook-payment] DRY RUN — Smoove call skipped', contactPayload);
    return res.status(200).json({ success: true, dryRun: true, payload: contactPayload });
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
        body: JSON.stringify(contactPayload),
      }
    );

    const responseText = await smooveRes.text();
    if (smooveRes.ok || smooveRes.status === 409) {
      console.log('[webhook-payment] BMS buyer added to list', BMS_PURCHASE_LIST_ID, safeEmail);
      return res.status(200).json({ success: true, smooveStatus: smooveRes.status, smooveResponse: responseText });
    }

    console.error('[webhook-payment] Smoove error', smooveRes.status, responseText);
    return res.status(502).json({ error: 'Smoove API error', detail: responseText });
  } catch (err) {
    console.error('[webhook-payment] handler error', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
