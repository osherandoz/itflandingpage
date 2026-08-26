import Privacy from '../../src/pages/Privacy';
import { hreflangLinks } from '../../src/i18n/index.js';

export const meta = () => [
  { title: 'Privacy Policy | IsraelTechForce' },
  {
    name: 'description',
    content:
      'The IsraelTechForce privacy policy - what information is collected, why, who else sees it, and what your rights are. Updated 2026.',
  },
  { tagName: 'link', rel: 'canonical', href: 'https://www.israeltechforce.com/en/privacy' },
  ...hreflangLinks('/privacy', '/en/privacy'),
];

export default Privacy;
