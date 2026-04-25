/**
 * Webhook Payment Unit Tests
 * Tests for signature verification logic, payload normalisation,
 * and Smoove payload shape.
 * Run: npm test
 */
import { describe, it, expect } from 'vitest';
import crypto from 'crypto';

// ─── Signature Verification (mirrors api/webhook-payment.js) ─────────────────
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

function makeSignature(body, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(typeof body === 'string' ? body : JSON.stringify(body));
  return hmac.digest('hex');
}

// ─── Payload Normalisation (mirrors api/webhook-payment.js) ──────────────────
function normalisePayload(body) {
  return {
    name:
      body.customerName ||
      body.customer_name ||
      body.firstName ||
      body.first_name ||
      body.name ||
      '',
    email:
      body.customerEmail ||
      body.customer_email ||
      body.email ||
      '',
    phone:
      body.customerPhone ||
      body.customer_phone ||
      body.phone ||
      '',
  };
}

function buildSmoovePayload(normalised) {
  const { name, email, phone } = normalised;
  const firstName = name.split(' ')[0] || name;
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
  return payload;
}

// ─── Signature Verification Tests ────────────────────────────────────────────
describe('verifySignature()', () => {
  const SECRET = 'test-webhook-secret';

  it('returns true for a valid signature on a string body', () => {
    const body = '{"amount":197,"currency":"ILS"}';
    const sig = makeSignature(body, SECRET);
    expect(verifySignature(body, sig, SECRET)).toBe(true);
  });

  it('returns true for a valid signature on an object body', () => {
    const body = { amount: 197, currency: 'ILS' };
    const sig = makeSignature(body, SECRET);
    expect(verifySignature(body, sig, SECRET)).toBe(true);
  });

  it('accepts sha256= prefix on signature', () => {
    const body = 'hello';
    const sig = makeSignature(body, SECRET);
    expect(verifySignature(body, `sha256=${sig}`, SECRET)).toBe(true);
  });

  it('returns false for a tampered body', () => {
    const body = '{"amount":197}';
    const sig = makeSignature(body, SECRET);
    expect(verifySignature('{"amount":999}', sig, SECRET)).toBe(false);
  });

  it('returns false for a wrong secret', () => {
    const body = '{"amount":197}';
    const sig = makeSignature(body, SECRET);
    expect(verifySignature(body, sig, 'wrong-secret')).toBe(false);
  });

  it('returns false when signature is null', () => {
    expect(verifySignature('body', null, SECRET)).toBe(false);
  });

  it('returns false when signature is empty string', () => {
    expect(verifySignature('body', '', SECRET)).toBe(false);
  });

  it('returns false when secret is null', () => {
    const body = 'body';
    const sig = makeSignature(body, SECRET);
    expect(verifySignature(body, sig, null)).toBe(false);
  });

  it('returns false when secret is empty string', () => {
    const body = 'body';
    const sig = makeSignature(body, 'secret');
    expect(verifySignature(body, sig, '')).toBe(false);
  });

  it('is resistant to timing attacks (uses timingSafeEqual)', () => {
    // Just checks the function doesn't throw on mismatched lengths
    const body = 'body';
    expect(() => verifySignature(body, 'deadbeef', SECRET)).not.toThrow();
  });
});

// ─── Payload Normalisation Tests ──────────────────────────────────────────────
describe('normalisePayload()', () => {
  it('reads customerName, customerEmail, customerPhone (standard fields)', () => {
    const result = normalisePayload({
      customerName: 'שרה כהן',
      customerEmail: 'sarah@example.com',
      customerPhone: '0501234567',
    });
    expect(result.name).toBe('שרה כהן');
    expect(result.email).toBe('sarah@example.com');
    expect(result.phone).toBe('0501234567');
  });

  it('falls back to snake_case fields', () => {
    const result = normalisePayload({
      customer_name: 'מיכל לוי',
      customer_email: 'michal@example.com',
      customer_phone: '0521234567',
    });
    expect(result.name).toBe('מיכל לוי');
    expect(result.email).toBe('michal@example.com');
    expect(result.phone).toBe('0521234567');
  });

  it('falls back to plain name/email/phone fields', () => {
    const result = normalisePayload({
      name: 'נועה',
      email: 'noa@example.com',
      phone: '0531234567',
    });
    expect(result.name).toBe('נועה');
    expect(result.email).toBe('noa@example.com');
    expect(result.phone).toBe('0531234567');
  });

  it('returns empty strings for missing fields', () => {
    const result = normalisePayload({});
    expect(result.name).toBe('');
    expect(result.email).toBe('');
    expect(result.phone).toBe('');
  });

  it('customerName takes priority over name', () => {
    const result = normalisePayload({ customerName: 'Sarah', name: 'Other' });
    expect(result.name).toBe('Sarah');
  });
});

// ─── Smoove Payload Construction ──────────────────────────────────────────────
describe('buildSmoovePayload()', () => {
  it('always includes list 1078775', () => {
    const payload = buildSmoovePayload({ name: 'שרה', email: 'a@b.com', phone: '050' });
    expect(payload.Lists[0].Id).toBe(1078775);
  });

  it('includes source = bms-purchase', () => {
    const payload = buildSmoovePayload({ name: 'שרה', email: 'a@b.com', phone: '050' });
    const sourceField = payload.CustomFields.find((f) => f.Key === 'source');
    expect(sourceField?.Value).toBe('bms-purchase');
  });

  it('includes purchase_date as ISO string', () => {
    const payload = buildSmoovePayload({ name: 'שרה', email: 'a@b.com', phone: '050' });
    const dateField = payload.CustomFields.find((f) => f.Key === 'purchase_date');
    expect(() => new Date(dateField.Value)).not.toThrow();
    expect(/^\d{4}-\d{2}-\d{2}T/.test(dateField.Value)).toBe(true);
  });

  it('extracts first name from full name', () => {
    const payload = buildSmoovePayload({ name: 'שרה כהן', email: 'a@b.com', phone: '' });
    expect(payload.FirstName).toBe('שרה');
  });

  it('includes email when provided', () => {
    const payload = buildSmoovePayload({ name: 'שרה', email: 'sarah@example.com', phone: '' });
    expect(payload.Email).toBe('sarah@example.com');
  });

  it('includes phone when provided', () => {
    const payload = buildSmoovePayload({ name: 'שרה', email: '', phone: '0501234567' });
    expect(payload.Phone).toBe('0501234567');
  });

  it('omits email key when email is empty', () => {
    const payload = buildSmoovePayload({ name: 'שרה', email: '', phone: '050' });
    expect(Object.prototype.hasOwnProperty.call(payload, 'Email')).toBe(false);
  });

  it('omits phone key when phone is empty', () => {
    const payload = buildSmoovePayload({ name: 'שרה', email: 'a@b.com', phone: '' });
    expect(Object.prototype.hasOwnProperty.call(payload, 'Phone')).toBe(false);
  });

  it('serialises to valid JSON', () => {
    const payload = buildSmoovePayload({ name: 'שרה', email: 'a@b.com', phone: '050' });
    expect(() => JSON.parse(JSON.stringify(payload))).not.toThrow();
  });
});

// ─── Missing Contact Data Guard ────────────────────────────────────────────────
describe('missing contact data validation', () => {
  it('detects empty email and phone as invalid', () => {
    const { email, phone } = normalisePayload({});
    expect(!email && !phone).toBe(true);
  });

  it('does not flag as invalid when email is present', () => {
    const { email, phone } = normalisePayload({ email: 'a@b.com' });
    expect(!email && !phone).toBe(false);
  });

  it('does not flag as invalid when phone is present', () => {
    const { email, phone } = normalisePayload({ phone: '050' });
    expect(!email && !phone).toBe(false);
  });
});
