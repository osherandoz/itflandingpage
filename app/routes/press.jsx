import Press from '../../src/pages/Press';
import { pressItems } from '../../src/data/press';
import { buildNewsArticleSchema } from '../../src/data/pressSchemas.js';

export const meta = () => [
  { title: 'כפי שסוקרנו בתקשורת | IsraelTechForce' },
  {
    name: 'description',
    content:
      'IsraelTechForce בתקשורת — כתבות בYnet, ערוץ הכלכלה וקהילות פייסבוק על שחזור חשבונות מושבתים ברשתות החברתיות.',
  },
  { property: 'og:title', content: 'IsraelTechForce בתקשורת' },
  {
    property: 'og:description',
    content: 'כתבות וסיקורים על שירות שחזור חשבונות IsraelTechForce.',
  },
  { property: 'og:url', content: 'https://israeltechforce.com/press' },
  { property: 'og:type', content: 'website' },
  {
    property: 'og:image',
    content: 'https://israeltechforce.com/images/israeltechforce-logo-white.png',
  },
  { tagName: 'link', rel: 'canonical', href: 'https://israeltechforce.com/press' },
];

export default function PressRoute() {
  return (
    <>
      {pressItems.map((item) => (
        <script
          key={item.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildNewsArticleSchema(item)) }}
        />
      ))}
      <Press />
    </>
  );
}
