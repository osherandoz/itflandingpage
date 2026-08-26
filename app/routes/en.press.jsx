import Press from '../../src/pages/Press';
import { pressItemsEn } from '../../src/data/press';
import { buildNewsArticleSchema } from '../../src/data/pressSchemas.js';
import { hreflangLinks } from '../../src/i18n/index.js';

export const meta = () => [
  { title: 'As Covered in the Media | IsraelTechForce' },
  {
    name: 'description',
    content:
      'IsraelTechForce in the media: coverage by N12, Ynet, ice and Facebook communities about recovering disabled social media accounts.',
  },
  { property: 'og:title', content: 'IsraelTechForce in the Media' },
  {
    property: 'og:description',
    content: 'Articles and coverage about the IsraelTechForce account recovery service.',
  },
  { property: 'og:url', content: 'https://www.israeltechforce.com/en/press' },
  { property: 'og:type', content: 'website' },
  { property: 'og:locale', content: 'en_US' },
  {
    property: 'og:image',
    content: 'https://www.israeltechforce.com/images/og-card.png',
  },
  { tagName: 'link', rel: 'canonical', href: 'https://www.israeltechforce.com/en/press' },
  ...hreflangLinks('/press', '/en/press'),
];

export default function EnPressRoute() {
  return (
    <>
      {pressItemsEn.map((item) => (
        <script
          key={item.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildNewsArticleSchema(item, 'en')) }}
        />
      ))}
      <Press />
    </>
  );
}
