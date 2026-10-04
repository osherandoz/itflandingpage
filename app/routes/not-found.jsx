import { data } from 'react-router';
import NotFound from '../../src/pages/NotFound';

// Catch-all: a real 404 status, so search engines drop dead URLs instead of
// indexing a soft-404.
export const loader = () => data(null, { status: 404 });

export const meta = () => [
  { title: 'הדף לא נמצא | IsraelTechForce' },
  { name: 'robots', content: 'noindex' },
];

export default function NotFoundRoute() {
  return <NotFound code={404} />;
}
