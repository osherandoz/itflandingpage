import ThankYouLead from '../../src/pages/thank-you-lead';

export const meta = () => [
  { title: 'הצ׳קליסט בדרך אליכם | אושר רווח' },
  { name: 'description', content: 'הצ׳קליסט לאיתור תשתית פרסום בעייתית נשלח אליכם. תודה!' },
  { name: 'robots', content: 'noindex, nofollow' },
];

export default function ThankYouLeadRoute() {
  return <ThankYouLead />;
}
