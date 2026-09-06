/**
 * Single source of truth for public business claims (evidence register).
 * Every number the site shows should come from here, with its definition and
 * source, so hero / service pages / schema never disagree with each other.
 *
 * Last verified: 2026-09-06 — Osher to confirm each `source` line.
 */
export const FACTS = {
  accountsRecovered: {
    value: 2500,
    display: '2,500+',
    he: '2,500+ חשבונות שוחזרו',
    en: '2,500+ accounts recovered',
    definition: 'Accounts (not businesses) recovered since 2020. One business can be several accounts.',
    source: 'Internal case log — TODO: attach count + date range',
  },
  rating: {
    value: 4.9,
    display: '4.9',
    he: 'דירוג 4.9/5',
    en: 'Rated 4.9/5',
    definition: 'Average client rating.',
    source: 'TODO: link the review source + review count before quoting a count',
  },
  successRate: {
    value: 95,
    display: '95%+',
    definition: 'Share of cases accepted after diagnosis that ended in recovery.',
    source: 'TODO: attach denominator + period',
  },
  typicalTurnaround: {
    display: '24-48',
    definition: 'Typical hours for simple cases; complex cases (hacked, BM, permanent) take longer.',
  },
  // Matches LocalBusiness.openingHours in src/data/schemas.js ('Su-Fr 08:00-22:00').
  // If the real schedule is different, change BOTH here and in schemas.js.
  hours: {
    he: 'א׳–ו׳ 08:00–22:00',
    en: 'Sun–Fri 08:00–22:00',
    schema: 'Su-Fr 08:00-22:00',
  },
  priceRange: {
    he: '₪500–3,000',
    en: '₪500–3,000 (about $150–$900)',
    definition: 'Typical fee range; exact quote after free diagnosis; paid only after success.',
  },
  phone: '+972509823235',
  phoneDisplay: '050-982-3235',
};
