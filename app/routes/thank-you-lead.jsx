import ThankYouLead from '../../src/pages/thank-you-lead';

export const meta = () => [
  { title: 'הצ׳קליסט בדרך אלייך | אושר רווח' },
  { name: 'description', content: 'הצ׳קליסט לאיתור תשתית פרסום בעייתית נשלח אלייך. תודה!' },
  { name: 'robots', content: 'noindex, nofollow' },
];

export default function ThankYouLeadRoute() {
  return <ThankYouLead />;
}
