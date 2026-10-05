import ThankYouPurchase from '../../src/pages/thank-you-purchase';

export const meta = () => [
  { title: 'הרכישה אושרה, ברוכים הבאים לקורס BMS | אושר רווח' },
  { name: 'description', content: 'הרכישה אושרה! פרטי הגישה לקורס BMS בדרך אליכם למייל.' },
  { name: 'robots', content: 'noindex, nofollow' },
];

export default function ThankYouPurchaseRoute() {
  return <ThankYouPurchase />;
}
