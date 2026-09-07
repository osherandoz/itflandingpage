/**
 * POST /api/webhook-payment
 * Receives payment events from Green Invoice / Morning (חשבונית ירוקה).
 *
 * Flow:
 *   1. Verify HMAC-SHA256 signature.
 *   2. Validate the event: paid status, expected amount + currency, optional product match.
 *   3. Claim a durable idempotency key on the provider event/transaction id.
 *   4. Add buyer to Smoove BMS purchase list 1123232 (transactional access email only —
 *      buyers are NOT auto-added to the marketing newsletter list).
 *   5. Mark the key done. On Smoove failure the key is released so the provider retry works.
 *
 * Env vars:
 *   SMOOVE_API_KEY        — Smoove REST API key (required)
 *   WEBHOOK_SECRET        — Green Invoice webhook signing secret (required)
 *   BMS_PRICE_ILS         — expected charge, default 197
 *   PAYMENT_OK_STATUSES   — comma list of provider status values that mean "paid"
 *                           (default: paid,success,succeeded,completed,approved,1,true)
 *   BMS_PRODUCT_MATCH     — optional substring that must appear in the item/description
 *   REDIS_URL             — durable idempotency store, ioredis (see api/_lib/store.js)
 *   WEBHOOK_TEST_MODE     — "true" skips signature verification (never in production)
 *   SMOOVE_DRY_RUN        — "true" logs the payload but does not call Smoove
 *   META_CAPI_ACCESS_TOKEN — optional; sends a server-side Purchase event to Meta
 *                            (see api/_lib/metaCapi.js). Skipped silently if unset.
 */

import crypto from 'crypto';
import { claim, set, del, get } from './_lib/store.js';
import { sendMetaPurchase } from './_lib/metaCapi.js';

const BMS_PURCHASE_LIST_ID = 1123232;
const DEDUP_TTL_SEC = 60 * 60 * 24 * 90; // 90 days
const TRACK_URL = process.env.TRACK_URL || 'https://itf-crm.vercel.app/api/site-event';

const DEFAULT_OK = ['paid', 'success', 'succeeded', 'completed', 'approved', '1', 'true'];
const CANCEL_STATUSES = ['refund', 'refunded', 'cancelled', 'canceled', 'chargeback', 'reversed', 'void'];

export function verifySignature(rawBody, signature, secret) {
  if (!signature || !secret) return false;
  try {
    const hmac = crypto.createHmac('sha256', secret);
    // ponytail: Vercel hands us the parsed body, so we re-serialise. If the provider
    // signs exact bytes and a real callback fails here, switch to raw-body capture.
    hmac.update(typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody));
    const digest = hmac.digest('hex');
    const a = Buffer.from(digest, 'hex');
    const b = Buffer.from(String(signature).replace(/^sha256=/, ''), 'hex');
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function pick(...vals) {
  return vals.find((v) => v !== undefined && v !== null && v !== '');
}

/**
 * Pure: normalise + validate a provider payload.
 * Returns { ok, reason, ignore, eventId, amount, currency, name, email, phone }.
 * `ignore: true` means "acknowledge but do nothing" (refund/cancel/unknown status).
 */
export function validatePayment(body, env = process.env) {
  const okStatuses = (env.PAYMENT_OK_STATUSES || DEFAULT_OK.join(','))
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const expectedAmount = Number(env.BMS_PRICE_ILS || 197);
  const productMatch = (env.BMS_PRODUCT_MATCH || '').trim().toLowerCase();

  const eventId = pick(
    body.eventId,
    body.event_id,
    body.transactionId,
    body.transaction_id,
    body.transaction?.id,
    body.paymentId,
    body.payment?.id,
    body.id
  );
  const rawStatus = pick(
    body.status,
    body.paymentStatus,
    body.payment?.status,
    body.transaction?.status,
    body.paid === true ? 'paid' : undefined,
    body.success === true ? 'success' : undefined
  );
  const status = String(rawStatus ?? '').toLowerCase();
  const eventType = String(pick(body.type, body.event, body.eventType) ?? '').toLowerCase();

  const amount = Number(pick(body.amount, body.total, body.sum, body.payment?.amount, body.transaction?.amount));
  const currency = String(pick(body.currency, body.currencyCode, body.payment?.currency, body.transaction?.currency, 'ILS')).toUpperCase();

  const name = pick(body.payer?.name, body.customerName, body.customer_name, body.firstName, body.first_name, body.name, body.client?.name) ?? '';
  const email = String(pick(body.payer?.email, body.customerEmail, body.customer_email, body.email, body.client?.emails?.[0]) ?? '').toLowerCase().trim();
  const phone = String(pick(body.payer?.phone, body.customerPhone, body.customer_phone, body.phone, body.client?.phone) ?? '').trim();

  const base = { eventId: eventId ? String(eventId) : null, amount, currency, name: String(name), email, phone };

  if (CANCEL_STATUSES.includes(status) || CANCEL_STATUSES.some((s) => eventType.includes(s))) {
    return { ...base, ok: false, ignore: true, reason: `cancel/refund event (${status || eventType})` };
  }
  if (!okStatuses.includes(status)) {
    return { ...base, ok: false, ignore: true, reason: `status not paid (${status || 'missing'})` };
  }
  if (!Number.isFinite(amount)) return { ...base, ok: false, reason: 'amount missing' };
  if (amount !== expectedAmount) return { ...base, ok: false, reason: `amount ${amount} != ${expectedAmount}` };
  if (currency !== 'ILS') return { ...base, ok: false, reason: `currency ${currency} != ILS` };
  if (productMatch) {
    const hay = JSON.stringify(pick(body.items, body.income, body.description, body.product, body.items_description, '')).toLowerCase();
    if (!hay.includes(productMatch)) return { ...base, ok: false, reason: 'product mismatch' };
  }
  if (!email && !phone) return { ...base, ok: false, reason: 'missing contact data' };
  return { ...base, ok: true };
}

function trackPurchase(v) {
  // Fire-and-forget CRM event. No contact details — only the verified order facts.
  fetch(TRACK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'purchase_verified',
      path: '/api/webhook-payment',
      orderId: v.eventId,
      value: v.amount,
      currency: v.currency,
      ts: new Date().toISOString(),
    }),
    signal: AbortSignal.timeout(4000),
  }).catch(() => {});
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Test mode can never disable signature checks in production
  const isProd = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
  const isTestMode = process.env.WEBHOOK_TEST_MODE === 'true' && !isProd;
  const isDryRun = process.env.SMOOVE_DRY_RUN === 'true';

  const secret = process.env.WEBHOOK_SECRET;
  const signature =
    req.headers['x-webhook-signature'] ||
    req.headers['x-signature'] ||
    req.headers['x-hub-signature-256'];

  if (!isTestMode) {
    if (!secret) {
      console.error('[webhook-payment] WEBHOOK_SECRET env var not set — rejecting all webhooks');
      return res.status(500).json({ error: 'Server misconfigured' });
    }
    if (!verifySignature(req.body, signature, secret)) {
      console.warn('[webhook-payment] signature verification failed');
      return res.status(401).json({ error: 'Invalid signature' });
    }
  }

  let body = req.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  if (typeof body !== 'object' || Array.isArray(body)) body = {};

  const v = validatePayment(body);
  // Keys only — never log contact details
  console.log('[webhook-payment] event', { eventId: v.eventId, ok: v.ok, reason: v.reason, keys: Object.keys(body) });

  if (v.ignore) return res.status(200).json({ success: true, ignored: true, reason: v.reason });
  if (!v.ok) return res.status(422).json({ error: 'Payment not verified', reason: v.reason });

  const apiKey = process.env.SMOOVE_API_KEY;
  if (!apiKey && !isDryRun) {
    console.error('[webhook-payment] SMOOVE_API_KEY env var not set');
    return res.status(500).json({ error: 'Server error' });
  }

  // Idempotency: provider transaction id, else a hash of the paid facts.
  const dedupId =
    v.eventId || crypto.createHash('sha256').update(`${v.email}|${v.phone}|${v.amount}|${body.date || ''}`).digest('hex').slice(0, 24);
  const key = `pay:${dedupId}`;
  let fresh;
  try {
    fresh = await claim(key, DEDUP_TTL_SEC, 'pending');
  } catch (err) {
    console.error('[webhook-payment] store unavailable', err?.message);
    return res.status(503).json({ error: 'Retry later' });
  }
  if (!fresh) {
    const state = await get(key).catch(() => 'unknown');
    console.log('[webhook-payment] duplicate event', dedupId, state);
    return res.status(200).json({ success: true, duplicate: true });
  }

  const firstName = v.name.split(' ')[0] || v.name;
  const contactPayload = { email: v.email, firstName, lists_ToSubscribe: [BMS_PURCHASE_LIST_ID] };
  if (v.phone) contactPayload.cellPhone = v.phone;

  if (isDryRun) {
    await set(key, 'done', DEDUP_TTL_SEC);
    console.log('[webhook-payment] DRY RUN — Smoove call skipped', { listId: BMS_PURCHASE_LIST_ID });
    return res.status(200).json({ success: true, dryRun: true });
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
        signal: AbortSignal.timeout(10000),
      }
    );

    if (smooveRes.ok) {
      await set(key, 'done', DEDUP_TTL_SEC);
      trackPurchase(v);
      sendMetaPurchase(v).catch(() => {}); // fire-and-forget: a Meta outage must never fail fulfillment
      console.log('[webhook-payment] buyer enrolled', { eventId: dedupId, listId: BMS_PURCHASE_LIST_ID });
      return res.status(200).json({ success: true });
    }

    const text = await smooveRes.text();
    console.error('[webhook-payment] Smoove error', smooveRes.status, text.slice(0, 300));
    await del(key); // release so the provider retry can succeed
    return res.status(502).json({ error: 'Fulfillment failed, retry' });
  } catch (err) {
    console.error('[webhook-payment] handler error', err?.message);
    await del(key).catch(() => {});
    return res.status(500).json({ error: 'Server error' });
  }
}
