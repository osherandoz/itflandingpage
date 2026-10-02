/**
 * VSL-BMS regression checks for the 2026-09-15 landing page audit.
 * Run: npm test
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { withCampaignParams } from '../utils/track.js';

const page = readFileSync(new URL('../pages/VslBms.jsx', import.meta.url), 'utf8');
const v2 = readFileSync(new URL('../pages/VslBmsV2.jsx', import.meta.url), 'utf8');

describe('checkout attribution', () => {
  it('forwards the ad creative utm_content and keeps the page variant separate', () => {
    const out = new URL(withCampaignParams('https://mrng.to/x?variant=v1', '?utm_source=facebook&utm_content=ad-17'));
    expect(out.searchParams.get('utm_content')).toBe('ad-17');
    expect(out.searchParams.get('utm_source')).toBe('facebook');
    expect(out.searchParams.get('variant')).toBe('v1');
  });

  it('never overrides params the checkout link already carries', () => {
    const out = new URL(withCampaignParams('https://mrng.to/x?utm_source=fixed', '?utm_source=other'));
    expect(out.searchParams.get('utm_source')).toBe('fixed');
  });

  it('both VSL variants tag themselves with variant=, not utm_content=', () => {
    expect(page).toMatch(/mrng\.to\/engo98ytvh\?variant=/);
    expect(page).not.toMatch(/utm_content=v1/);
    expect(v2).toMatch(/variant=v2-loss-headline/);
    expect(v2).not.toMatch(/utm_content=v2/);
  });
});

describe('offer copy', () => {
  it('has no expired price-increase deadline', () => {
    expect(page).not.toMatch(/1\.8\.2026|המחיר עולה/);
  });

  it('purchase button sits at the top of the offer section, before the value breakdown', () => {
    const offer = page.indexOf('id="final-cta"');
    const button = page.indexOf("checkout('pricing')", offer);
    const valueBox = page.indexOf('className="value-box"', offer);
    expect(button).toBeGreaterThan(offer);
    expect(button).toBeLessThan(valueBox);
  });

  it('does not promise unbreakable or guaranteed protection', () => {
    expect(page).not.toMatch(/אי אפשר לשבור|בכל סיטואציה|היה מציל את|לא הייתה מגיעה למצב|היה נמנע/);
  });
});
