import './thank-you-lead.css';

// Tracking helpers
function trackFb(event, params) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, params);
  }
}
function trackGa(event, params) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, params);
  }
}

export default function ThankYouLead() {
  // Fire tracking on mount
  if (typeof window !== 'undefined') {
    trackFb('CompleteRegistration', { content_name: 'bms-sm-checklist' });
    trackGa('form_submit_lead', { page: 'bms-sm' });
  }

  return (
    <main className="ty-page" dir="rtl">
      <div className="ty-card">
        <span className="ty-icon" aria-hidden="true">📋</span>
        <h1 className="ty-title">הצ׳קליסט בדרך אלייך — בדקי את המייל</h1>
        <p className="ty-subtitle">
          שלחנו לך את הצ׳קליסט ישירות למייל. אם לא קיבלת תוך כמה דקות — בדקי תיבת הספאם.
        </p>

        <hr className="ty-divider" />

        {/* Mini Survey */}
        <p className="ty-survey__label">בזמן שאת מחכה — שאלה אחת</p>
        <p className="ty-survey__label" style={{ fontWeight: 400, fontSize: '0.95rem', color: '#b0b0b0', margin: '0 0 20px' }}>
          האם יש לך לקוח שמחכה לך עכשיו?
        </p>
        <div className="ty-survey__buttons">
          <a href="/bms-sm#offer" className="ty-survey__btn ty-survey__btn--primary">
            כן, יש לי לקוח
          </a>
          <a href="/bms-sm#offer" className="ty-survey__btn ty-survey__btn--secondary">
            לא עדיין
          </a>
        </div>

        <div className="ty-upsell">
          🎓 קורס BMS יענה לך על כל שאלה בצ׳קליסט — ויכין אותך לכל אונבורדינג.{' '}
          <a href="/bms-sm#offer">להצטרפות ב-197₪ ←</a>
        </div>
      </div>
    </main>
  );
}
