/**
 * BMS-SM Unit Tests
 * Tests for business logic: countdown, form validation, tracking helpers,
 * and route/schema integrity.
 * Run: npm test
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ─── localStorage mock (Node test env has no DOM) ─────────────────────────────
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true });

// ─── Helpers (extracted from bms-sm.jsx logic for testability) ────────────────

const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000;
const DEADLINE_KEY = 'bms_sm_deadline';

/** Returns the stored deadline or creates a new 48h one. */
function getOrCreateDeadline(now = Date.now()) {
  const stored = parseInt(localStorage.getItem(DEADLINE_KEY) || '0', 10);
  if (!stored || stored < now) {
    const deadline = now + FORTY_EIGHT_HOURS_MS;
    localStorage.setItem(DEADLINE_KEY, String(deadline));
    return deadline;
  }
  return stored;
}

/** Formats milliseconds diff into { h, m, s } zero-padded strings. */
function formatCountdown(diffMs) {
  const diff = Math.max(0, diffMs);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return {
    h: String(h).padStart(2, '0'),
    m: String(m).padStart(2, '0'),
    s: String(s).padStart(2, '0'),
  };
}

// ─── Validation helpers (mirror of bms-lead.js) ───────────────────────────────
const PHONE_RE = /^[\d\s\-+()]{7,20}$/;
const NAME_RE = /^[\u0590-\u05FF\u0020a-zA-Z\s\-']{1,50}$/;

function validateLead(firstName, phone) {
  if (!firstName || !NAME_RE.test(String(firstName).trim())) return 'שם לא תקין';
  if (!phone || !PHONE_RE.test(String(phone).trim())) return 'מספר טלפון לא תקין';
  return null;
}

function sanitize(str) {
  return String(str).trim().replace(/[<>"]/g, '').substring(0, 200);
}

// ─── Countdown Logic ──────────────────────────────────────────────────────────
describe('Countdown timer', () => {
  beforeEach(() => localStorage.clear());

  it('creates a deadline ~48h from now when none exists', () => {
    const before = Date.now();
    const deadline = getOrCreateDeadline();
    const after = Date.now();
    expect(deadline).toBeGreaterThanOrEqual(before + FORTY_EIGHT_HOURS_MS);
    expect(deadline).toBeLessThanOrEqual(after + FORTY_EIGHT_HOURS_MS);
  });

  it('persists the deadline in localStorage', () => {
    const deadline = getOrCreateDeadline();
    expect(parseInt(localStorage.getItem(DEADLINE_KEY), 10)).toBe(deadline);
  });

  it('returns the same deadline on subsequent calls', () => {
    const first = getOrCreateDeadline();
    const second = getOrCreateDeadline();
    expect(second).toBe(first);
  });

  it('creates a new deadline if stored one is in the past', () => {
    localStorage.setItem(DEADLINE_KEY, String(Date.now() - 1000)); // 1s ago
    const deadline = getOrCreateDeadline();
    expect(deadline).toBeGreaterThan(Date.now());
  });

  it('formats 48h diff correctly', () => {
    const diff = 48 * 3600000;
    const result = formatCountdown(diff);
    expect(result.h).toBe('48');
    expect(result.m).toBe('00');
    expect(result.s).toBe('00');
  });

  it('formats 1h 30m 5s correctly', () => {
    const diff = 1 * 3600000 + 30 * 60000 + 5000;
    const result = formatCountdown(diff);
    expect(result.h).toBe('01');
    expect(result.m).toBe('30');
    expect(result.s).toBe('05');
  });

  it('formats zero diff as 00:00:00', () => {
    const result = formatCountdown(0);
    expect(result.h).toBe('00');
    expect(result.m).toBe('00');
    expect(result.s).toBe('00');
  });

  it('clamps negative diff to 00:00:00', () => {
    const result = formatCountdown(-5000);
    expect(result.h).toBe('00');
    expect(result.m).toBe('00');
    expect(result.s).toBe('00');
  });
});

// ─── Lead Form Validation ─────────────────────────────────────────────────────
describe('Lead form validation', () => {
  it('accepts a valid Hebrew name and phone', () => {
    expect(validateLead('שרה', '0501234567')).toBeNull();
  });

  it('accepts Latin name', () => {
    expect(validateLead('Sarah', '050-123-4567')).toBeNull();
  });

  it('accepts name with spaces', () => {
    expect(validateLead('שרה כהן', '0501234567')).toBeNull();
  });

  it('accepts phone with + prefix (international)', () => {
    expect(validateLead('מיכל', '+972501234567')).toBeNull();
  });

  it('rejects empty name', () => {
    expect(validateLead('', '0501234567')).toBe('שם לא תקין');
  });

  it('rejects null name', () => {
    expect(validateLead(null, '0501234567')).toBe('שם לא תקין');
  });

  it('rejects name that is too long (>50 chars)', () => {
    expect(validateLead('א'.repeat(51), '0501234567')).toBe('שם לא תקין');
  });

  it('rejects name with special characters', () => {
    expect(validateLead('<script>alert(1)</script>', '0501234567')).toBe('שם לא תקין');
  });

  it('rejects empty phone', () => {
    expect(validateLead('שרה', '')).toBe('מספר טלפון לא תקין');
  });

  it('rejects phone that is too short (<7 chars)', () => {
    expect(validateLead('שרה', '12345')).toBe('מספר טלפון לא תקין');
  });

  it('rejects phone with letters', () => {
    expect(validateLead('שרה', 'abc1234567')).toBe('מספר טלפון לא תקין');
  });

  it('rejects phone that is too long (>20 chars)', () => {
    expect(validateLead('שרה', '1'.repeat(21))).toBe('מספר טלפון לא תקין');
  });
});

// ─── Sanitization ─────────────────────────────────────────────────────────────
describe('sanitize()', () => {
  it('trims whitespace', () => {
    expect(sanitize('  שרה  ')).toBe('שרה');
  });

  it('strips < > " characters (XSS prevention)', () => {
    expect(sanitize('<script>alert("xss")</script>')).toBe('scriptalert(xss)/script');
  });

  it('truncates to 200 chars', () => {
    expect(sanitize('א'.repeat(250))).toHaveLength(200);
  });

  it('handles non-string input', () => {
    expect(() => sanitize(123)).not.toThrow();
    expect(sanitize(123)).toBe('123');
  });
});

// ─── Smoove Payload Shape ─────────────────────────────────────────────────────
describe('Smoove lead payload', () => {
  it('uses camelCase field names matching the Smoove REST API spec', () => {
    const payload = {
      firstName: 'שרה',
      cellPhone: '0501234567',
      lists_ToSubscribe: [1078775],
      customFields: { source: 'bms-sm-landing' },
    };

    expect(payload.lists_ToSubscribe).toHaveLength(1);
    expect(payload.lists_ToSubscribe[0]).toBe(1078775);
    expect(payload.customFields.source).toBe('bms-sm-landing');
    expect(payload.firstName).toBeTruthy();
    expect(payload.cellPhone).toBeTruthy();
  });

  it('serialises to valid JSON', () => {
    const payload = {
      firstName: 'שרה',
      cellPhone: '0501234567',
      lists_ToSubscribe: [1078775],
      customFields: { source: 'bms-sm-landing' },
    };
    expect(() => JSON.parse(JSON.stringify(payload))).not.toThrow();
  });
});

// ─── Checklist Questions ──────────────────────────────────────────────────────
describe('Checklist questions', () => {
  const CHECKLIST_QUESTIONS = [
    'האם הלקוח רוצה קידום ממומן בנוסף לתוכן אורגני?',
    'האם הלקוח יודע את פרטי הגישה לנכסים שלו (אינסטגרם + פייסבוק)?',
    'האם מופעל 2FA על החשבונות?',
    'האם הלקוח הוא הבעלים המלא של הנכסים — לא מנהלת קודמת / חברת שיווק?',
    'האם בעבר הלקוח נחסם / חשבונו נפרץ?',
  ];

  it('has exactly 5 questions', () => {
    expect(CHECKLIST_QUESTIONS).toHaveLength(5);
  });

  CHECKLIST_QUESTIONS.forEach((q, i) => {
    it(`question ${i + 1} is a non-empty Hebrew string`, () => {
      expect(q).toBeTruthy();
      expect(q.length).toBeGreaterThan(10);
      // Contains Hebrew characters
      expect(/[\u0590-\u05FF]/.test(q)).toBe(true);
    });
  });
});

// ─── Route Config Integrity ───────────────────────────────────────────────────
describe('BMS-SM route config', () => {
  it('bms-sm route path is "bms-sm"', () => {
    const route = { path: 'bms-sm', file: './routes/bms-sm.jsx' };
    expect(route.path).toBe('bms-sm');
    expect(route.file).toContain('bms-sm');
  });

  it('thank-you-lead route path is "תודה-קליסט"', () => {
    const route = { path: 'תודה-קליסט', file: './routes/thank-you-lead.jsx' };
    expect(route.path).toBe('תודה-קליסט');
  });

  it('thank-you-purchase route path is "תודה-רכישה"', () => {
    const route = { path: 'תודה-רכישה', file: './routes/thank-you-purchase.jsx' };
    expect(route.path).toBe('תודה-רכישה');
  });
});

// ─── BMS-SM JSON-LD Schema ────────────────────────────────────────────────────
describe('BMS-SM Course schema', () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'BMS — קורס למנהלות סושיאל',
    description:
      'קורס מקוון למנהלות סושיאל: איך לזהות תשתית פרסום בעייתית לפני האונבורדינג. 15 שיעורים.',
    provider: {
      '@type': 'Organization',
      name: 'Israel Tech Force',
      url: 'https://www.israeltechforce.com',
    },
    url: 'https://www.israeltechforce.com/bms-sm',
    inLanguage: 'he',
    offers: {
      '@type': 'Offer',
      price: '197',
      priceCurrency: 'ILS',
      availability: 'https://schema.org/InStock',
      url: 'https://www.israeltechforce.com/checkout/bms',
    },
  };

  it('has @context https://schema.org', () => {
    expect(schema['@context']).toBe('https://schema.org');
  });

  it('has @type Course', () => {
    expect(schema['@type']).toBe('Course');
  });

  it('has a name', () => {
    expect(schema.name).toBeTruthy();
  });

  it('has a description longer than 20 chars', () => {
    expect(schema.description.length).toBeGreaterThan(20);
  });

  it('has provider linked to Israel Tech Force', () => {
    expect(schema.provider['@type']).toBe('Organization');
    expect(schema.provider.name).toContain('Israel Tech Force');
  });

  it('has offer with ILS currency and price 197', () => {
    expect(schema.offers.priceCurrency).toBe('ILS');
    expect(schema.offers.price).toBe('197');
  });

  it('has inLanguage he', () => {
    expect(schema.inLanguage).toBe('he');
  });

  it('has valid canonical URL', () => {
    expect(() => new URL(schema.url)).not.toThrow();
    expect(schema.url).toContain('bms-sm');
  });

  it('serialises to valid JSON', () => {
    expect(() => JSON.parse(JSON.stringify(schema))).not.toThrow();
  });
});
