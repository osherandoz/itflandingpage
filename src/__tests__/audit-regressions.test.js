/**
 * Regression tests for the 2026-09-06 audit fixes (S1, S2, S3).
 * These import the REAL handlers/helpers, not mirrors.
 * Run: npm test
 */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import crypto from 'crypto';
import { validatePayment, verifySignature } from '../../api/webhook-payment.js';
import webhookHandler from '../../api/webhook-payment.js';
import bmsHandler from '../../api/bms-lead.js';
import subscribeHandler from '../../api/subscribe.js';
import leadHandler from '../../api/lead.js';
import { normalizePhone, readJsonBody } from '../../api/_lib/smoove.js';
import { _resetMemory } from '../../api/_lib/store.js';

function mockRes() {
  const res = { statusCode: 200, body: null, headers: {} };
  res.status = (c) => { res.statusCode = c; return res; };
  res.json = (b) => { res.body = b; return res; };
  res.end = () => res;
  res.setHeader = (k, v) => { res.headers[k] = v; };
  return res;
}
const SECRET = 'test-secret';
const sign = (body) => crypto.createHmac('sha256', SECRET).update(JSON.stringify(body)).digest('hex');
const paidEvent = (over = {}) => ({
  id: 'tx-1', status: 'paid', amount: 197, currency: 'ILS',
  payer: { name: 'שרה כהן', email: 'sarah@example.com', phone: '0501234567' }, ...over,
});
function webhookReq(body) {
  return { method: 'POST', headers: { 'x-webhook-signature': sign(body) }, body };
}

// ─── S1: payment validation ───────────────────────────────────────────────
describe('validatePayment()', () => {
  it('accepts a paid 197 ILS event', () => {
    expect(validatePayment(paidEvent()).ok).toBe(true);
  });
  it('ignores failed / pending status (acknowledge, do not enroll)', () => {
    const v = validatePayment(paidEvent({ status: 'failed' }));
    expect(v.ok).toBe(false);
    expect(v.ignore).toBe(true);
  });
  it('ignores refunds and cancellations', () => {
    expect(validatePayment(paidEvent({ status: 'refunded' })).ignore).toBe(true);
    expect(validatePayment(paidEvent({ type: 'payment.cancelled' })).ignore).toBe(true);
  });
  it('rejects wrong amount', () => {
    const v = validatePayment(paidEvent({ amount: 1 }));
    expect(v.ok).toBe(false);
    expect(v.reason).toMatch(/amount/);
  });
  it('rejects wrong currency', () => {
    expect(validatePayment(paidEvent({ currency: 'USD' })).ok).toBe(false);
  });
  it('rejects missing amount', () => {
    expect(validatePayment(paidEvent({ amount: undefined })).reason).toBe('amount missing');
  });
  it('rejects wrong product when BMS_PRODUCT_MATCH is set', () => {
    const env = { BMS_PRODUCT_MATCH: 'bms' };
    expect(validatePayment(paidEvent({ description: 'קורס BMS' }), env).ok).toBe(true);
    expect(validatePayment(paidEvent({ description: 'something else' }), env).ok).toBe(false);
  });
  it('honours PAYMENT_OK_STATUSES / BMS_PRICE_ILS overrides', () => {
    const env = { PAYMENT_OK_STATUSES: 'settled', BMS_PRICE_ILS: '250' };
    expect(validatePayment(paidEvent({ status: 'settled', amount: 250 }), env).ok).toBe(true);
    expect(validatePayment(paidEvent(), env).ok).toBe(false);
  });
  it('rejects when no contact data', () => {
    expect(validatePayment(paidEvent({ payer: {} })).reason).toBe('missing contact data');
  });
  it('verifySignature still round-trips', () => {
    const body = paidEvent();
    expect(verifySignature(body, sign(body), SECRET)).toBe(true);
    expect(verifySignature({ ...body, amount: 1 }, sign(body), SECRET)).toBe(false);
  });
});

describe('POST /api/webhook-payment (handler)', () => {
  let fetchMock;
  beforeEach(() => {
    _resetMemory();
    process.env.WEBHOOK_SECRET = SECRET;
    process.env.SMOOVE_API_KEY = 'k';
    delete process.env.SMOOVE_DRY_RUN;
    delete process.env.WEBHOOK_TEST_MODE;
    fetchMock = vi.fn(async (url) => {
      if (String(url).includes('smoove')) return { ok: true, status: 200, text: async () => '' };
      return { ok: true, status: 200, text: async () => '' };
    });
    vi.stubGlobal('fetch', fetchMock);
  });
  afterEach(() => vi.unstubAllGlobals());

  const smooveCalls = () => fetchMock.mock.calls.filter(([u]) => String(u).includes('smoove')).length;

  it('failed payment never enrolls', async () => {
    const res = mockRes();
    await webhookHandler(webhookReq(paidEvent({ status: 'failed' })), res);
    expect(res.statusCode).toBe(200);
    expect(res.body.ignored).toBe(true);
    expect(smooveCalls()).toBe(0);
  });
  it('wrong amount is rejected with 422 and never enrolls', async () => {
    const res = mockRes();
    await webhookHandler(webhookReq(paidEvent({ amount: 1 })), res);
    expect(res.statusCode).toBe(422);
    expect(smooveCalls()).toBe(0);
  });
  it('valid payment enrolls exactly once; the replay is a no-op', async () => {
    const r1 = mockRes();
    await webhookHandler(webhookReq(paidEvent()), r1);
    expect(r1.statusCode).toBe(200);
    expect(r1.body.success).toBe(true);
    const r2 = mockRes();
    await webhookHandler(webhookReq(paidEvent()), r2);
    expect(r2.body.duplicate).toBe(true);
    expect(smooveCalls()).toBe(1);
  });
  it('Smoove failure returns 502 and the provider retry can succeed', async () => {
    fetchMock.mockImplementationOnce(async () => ({ ok: false, status: 500, text: async () => 'boom' }));
    const r1 = mockRes();
    await webhookHandler(webhookReq(paidEvent()), r1);
    expect(r1.statusCode).toBe(502);
    const r2 = mockRes();
    await webhookHandler(webhookReq(paidEvent()), r2);
    expect(r2.statusCode).toBe(200);
    expect(smooveCalls()).toBe(2);
  });
  it('does not leak the Smoove response body or contact data', async () => {
    const res = mockRes();
    await webhookHandler(webhookReq(paidEvent()), res);
    expect(JSON.stringify(res.body)).not.toMatch(/sarah@example\.com|smooveResponse/);
  });
  it('rejects a bad signature', async () => {
    const res = mockRes();
    await webhookHandler({ method: 'POST', headers: { 'x-webhook-signature': 'deadbeef' }, body: paidEvent() }, res);
    expect(res.statusCode).toBe(401);
  });
  it('buyers go to the purchase list only, not the marketing newsletter', async () => {
    await webhookHandler(webhookReq(paidEvent()), mockRes());
    const [, opts] = fetchMock.mock.calls.find(([u]) => String(u).includes('smoove'));
    expect(JSON.parse(opts.body).lists_ToSubscribe).toEqual([1123232]);
  });
});

// ─── S2: retry after upstream failure must reach Smoove again ─────────────
describe.each([
  ['bms-lead', bmsHandler, { firstName: 'שרה', email: 'a@b.com' }],
  ['subscribe', subscribeHandler, { firstName: 'שרה', email: 'a@b.com' }],
])('POST /api/%s retry semantics', (_name, handler, body) => {
  let fetchMock;
  beforeEach(() => {
    _resetMemory();
    process.env.SMOOVE_API_KEY = 'k';
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });
  afterEach(() => vi.unstubAllGlobals());
  const req = () => ({ method: 'POST', headers: { origin: 'https://www.israeltechforce.com' }, body: { ...body } });

  it('first attempt 502, retry 200, both reach Smoove', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false, status: 500, text: async () => 'x' });
    const r1 = mockRes();
    await handler(req(), r1);
    expect(r1.statusCode).toBe(502);
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, text: async () => '' });
    const r2 = mockRes();
    await handler(req(), r2);
    expect(r2.statusCode).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
  it('a completed signup is not re-sent within the hour', async () => {
    fetchMock.mockResolvedValue({ ok: true, status: 200, text: async () => '' });
    await handler(req(), mockRes());
    const r2 = mockRes();
    await handler(req(), r2);
    expect(r2.body.duplicate).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

// ─── S3: lead proxy trust boundary ────────────────────────────────────────
describe('normalizePhone()', () => {
  it('accepts Israeli mobile in all common shapes', () => {
    expect(normalizePhone('050-123-4567')).toBe('0501234567');
    expect(normalizePhone('+972 50 123 4567')).toBe('0501234567');
    expect(normalizePhone('972501234567')).toBe('0501234567');
  });
  it('accepts a plain international number', () => {
    expect(normalizePhone('+14155551234')).toBe('+14155551234');
  });
  it('rejects punctuation-only and too-short input', () => {
    expect(normalizePhone('+-()  ')).toBeNull();
    expect(normalizePhone('12345')).toBeNull();
  });
});

describe('readJsonBody()', () => {
  it('rejects nested objects, arrays and oversized bodies', () => {
    expect(readJsonBody({ body: { a: { b: 1 } } })).toBeNull();
    expect(readJsonBody({ body: [1] })).toBeNull();
    expect(readJsonBody({ body: 'x'.repeat(5000) })).toBeNull();
    expect(readJsonBody({ body: { a: 'ok' } })).toEqual({ a: 'ok' });
  });
});

describe('POST /api/lead (proxies to the CRM)', () => {
  let fetchMock;
  beforeEach(() => {
    _resetMemory();
    process.env.LEAD_WEBHOOK_SECRET = 's3cret';
    fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ success: true, leadId: 'case-1' }) });
    vi.stubGlobal('fetch', fetchMock);
  });
  afterEach(() => vi.unstubAllGlobals());
  const req = (body) => ({ method: 'POST', headers: {}, body });

  it('requires consent on the server too', async () => {
    const res = mockRes();
    await leadHandler(req({ name: 'שרה', phone: '0501234567', consent: false, source: 'contact-form' }), res);
    expect(res.statusCode).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it('rejects an implausible phone', async () => {
    const res = mockRes();
    await leadHandler(req({ name: 'שרה', phone: '+-()+-(', consent: true, source: 'contact-form' }), res);
    expect(res.statusCode).toBe(400);
  });
  it('rejects an unknown source', async () => {
    const res = mockRes();
    await leadHandler(req({ name: 'שרה', phone: '0501234567', consent: true, source: 'made-up' }), res);
    expect(res.statusCode).toBe(400);
  });
  it('POSTs a signed request to the CRM and returns its leadId', async () => {
    const res = mockRes();
    await leadHandler(req({ name: 'שרה', phone: '050-123-4567', consent: true, source: 'contact-form', src: 'facebook' }), res);
    expect(res.statusCode).toBe(200);
    expect(res.body.leadId).toBe('case-1');
    const [url, opts] = fetchMock.mock.calls[0];
    expect(url).toMatch(/\/api\/public-lead$/);
    expect(opts.headers.Authorization).toBe('Bearer s3cret');
    const payload = JSON.parse(opts.body);
    expect(payload.phone).toBe('0501234567');
    expect(payload.source).toBe('facebook');
    expect(payload.notes).toMatch(/contact-form/);
  });
  it('defaults source to "website" when the visit has no utm_source', async () => {
    const res = mockRes();
    await leadHandler(req({ name: 'שרה', phone: '0501234567', consent: true, source: 'contact-form' }), res);
    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(payload.source).toBe('website');
  });
  it('treats a CRM-side rejection as failure, not success', async () => {
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ success: false, error: 'bad' }) });
    const res = mockRes();
    await leadHandler(req({ name: 'שרה', phone: '0501234567', consent: true, source: 'contact-form' }), res);
    expect(res.statusCode).toBe(502);
  });
});
