/**
 * /בדיקת-אבטחה-אינסטגרם: scoring, segment visibility, urgent order, and the
 * lead-source → Smoove list mapping used by its email signup.
 */
import { describe, it, expect } from 'vitest';
import { CHECKS, FAQS, score, visibleChecks } from '../data/securityCheck.instagram.js';
import { listsFor } from '../../api/subscribe.js';

const all = (ids, v) => Object.fromEntries(ids.map((id) => [id, v]));
const ids = (seg) => visibleChecks(seg).map((c) => c.id);

describe('security check scoring', () => {
  it('personal sees 7 checks, agency sees 9', () => {
    expect(visibleChecks('personal')).toHaveLength(7);
    expect(visibleChecks('agency')).toHaveLength(9);
  });

  it('levels: 80%+ high, 50-79% medium, under 50% low', () => {
    const p = ids('personal');
    expect(score('personal', all(p, 'ok')).level).toBe('high');
    expect(score('personal', all(p.slice(0, 6), 'ok')).level).toBe('high'); // 6/7 = 86%
    expect(score('personal', all(p.slice(0, 5), 'ok')).level).toBe('medium'); // 5/7 = 71%
    expect(score('personal', all(p.slice(0, 4), 'ok')).level).toBe('medium'); // 4/7 = 57%
    expect(score('personal', all(p.slice(0, 3), 'ok')).level).toBe('low'); // 3/7 = 43%
  });

  it('unmarked checks count as not checked, not as ok', () => {
    const r = score('agency', { email: 'ok', phone: 'fix' });
    expect(r).toMatchObject({ total: 9, ok: 1, marked: 2, unchecked: 7, level: 'low' });
  });

  it('agency-only marks are ignored for personal readers', () => {
    const r = score('personal', { roles: 'ok', ownership: 'ok' });
    expect(r).toMatchObject({ total: 7, ok: 0, marked: 0 });
  });

  it('urgent fixes: at most three, in priority order', () => {
    const r = score('agency', { ownership: 'fix', apps: 'fix', email: 'fix', '2fa': 'fix' });
    expect(r.urgent.map((c) => c.id)).toEqual(['email', '2fa', 'apps']);
  });

  it('every check has a title, a reason and a click path; ids are unique', () => {
    expect(new Set(CHECKS.map((c) => c.id)).size).toBe(CHECKS.length);
    for (const c of CHECKS) {
      expect(c.title && c.why && c.steps.length).toBeTruthy();
    }
    expect(FAQS).toHaveLength(5);
  });
});

describe('subscribe lead source', () => {
  const env = { SMOOVE_LIST_ID: '1078775', SMOOVE_SECURITY_CHECK_LIST_ID: '555' };
  it('newsletter and unknown sources go to the newsletter list only', () => {
    expect(listsFor(undefined, env)).toEqual([1078775]);
    expect(listsFor('evil', env)).toEqual([1078775]);
  });
  it('security-check adds its own list when configured', () => {
    expect(listsFor('security-check', env)).toEqual([1078775, 555]);
    expect(listsFor('security-check', { SMOOVE_LIST_ID: '1078775' })).toEqual([1078775]);
  });
});
