import ThankYouPurchase from '../../src/pages/thank-you-purchase';

export const meta = () => [
  { title: 'הרכישה אושרה — ברוכה הבאה לקורס BMS | אושר רווח' },
  { name: 'description', content: 'הרכישה אושרה! פרטי הגישה לקורס BMS בדרך אלייך למייל.' },
  { name: 'robots', content: 'noindex, nofollow' },
];

export default function ThankYouPurchaseRoute() {
  return <ThankYouPurchase />;
}
