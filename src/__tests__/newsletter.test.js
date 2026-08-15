/**
 * The Safety Signal (/newsletter) unit tests.
 * Covers the subscribe validator (lastName is optional for this page)
 * and the FAQ content that feeds the FAQPage JSON-LD.
 * Run: npm test
 */
import { describe, it, expect } from 'vitest';
import { validateInputs } from '../../api/subscribe.js';
import { FAQS } from '../pages/Newsletter.jsx';

describe('subscribe validator', () => {
  it('accepts a first name and email with no last name', () => {
    expect(validateInputs('אושר', '', 'osher@example.co.il')).toBeNull();
  });

  it('still validates a last name when one is supplied', () => {
    expect(validateInputs('אושר', 'רווח', 'osher@example.co.il')).toBeNull();
    expect(validateInputs('אושר', '<script>', 'osher@example.co.il')).toBe('שם משפחה לא תקין');
  });

  it('rejects a missing first name and a malformed email', () => {
    expect(validateInputs('', '', 'osher@example.co.il')).toBe('שם פרטי לא תקין');
    expect(validateInputs('אושר', '', 'not-an-email')).toBe('כתובת מייל לא תקינה');
  });
});

describe('newsletter FAQ content', () => {
  it('every entry has a question and an answer', () => {
    expect(FAQS.length).toBeGreaterThan(0);
    for (const f of FAQS) {
      expect(f.q.trim().length).toBeGreaterThan(0);
      expect(f.a.trim().length).toBeGreaterThan(0);
    }
  });
});
