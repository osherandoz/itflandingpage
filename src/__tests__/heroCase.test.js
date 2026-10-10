import { describe, it, expect } from 'vitest';
import { caseMessage } from '../utils/whatsapp';

describe('hero case picker message', () => {
  it('falls back to the generic message with nothing picked', () => {
    expect(caseMessage(null, null)).toBe('היי, החשבון שלי חסום, אשמח לעזרה');
  });
  it('writes the picked platform and problem into the message', () => {
    expect(caseMessage({ say: 'חשבון האינסטגרם שלי' }, { say: 'נפרץ' })).toBe('היי, חשבון האינסטגרם שלי נפרץ, אשמח לאבחון');
    expect(caseMessage({ say: 'הביזנס מנג׳ר שלי' }, null)).toBe('היי, הביזנס מנג׳ר שלי חסום, אשמח לאבחון');
  });
});
