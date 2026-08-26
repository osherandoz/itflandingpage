import Privacy from '../../src/pages/Privacy';
import { hreflangLinks } from '../../src/i18n/index.js';

export const meta = () => [
  { title: 'מדיניות פרטיות | IsraelTechForce' },
  {
    name: 'description',
    content:
      'מדיניות הפרטיות של IsraelTechForce - איזה מידע נאסף, למה, מי עוד רואה אותו, ומה הזכויות שלך. עודכן 2026.',
  },
  { tagName: 'link', rel: 'canonical', href: 'https://www.israeltechforce.com/privacy' },
  ...hreflangLinks('/privacy', '/en/privacy'),
];

export default Privacy;
