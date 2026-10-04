import ThankYou from '../../src/pages/ThankYou';

export const meta = () => [
  { title: 'הפרטים התקבלו | IsraelTechForce' },
  { name: 'robots', content: 'noindex, nofollow' },
];

export default function ThankYouRoute() {
  return <ThankYou />;
}
