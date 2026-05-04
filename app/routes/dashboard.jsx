import Dashboard from '../../src/pages/Dashboard';

export const meta = () => [
  { title: 'לוח מעקב — IsraelTechForce (פנימי)' },
  { name: 'robots', content: 'noindex, nofollow' },
];

export default function DashboardRoute() {
  return <Dashboard />;
}
