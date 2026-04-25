import './thank-you-purchase.css';

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

export default function ThankYouPurchase() {
  // Fire purchase events on mount
  if (typeof window !== 'undefined') {
    trackFb('Purchase', { value: 197, currency: 'ILS' });
    trackGa('purchase', { value: 197, currency: 'ILS', transaction_id: `bms-${Date.now()}` });
  }

  return (
    <main className="ty-purchase-page" dir="rtl">
      <div className="ty-purchase-card">
        <span className="ty-purchase-icon" aria-hidden="true">🎉</span>
        <div className="ty-purchase-badge">
          <span aria-hidden="true">✓</span>
          <span>הרכישה אושרה</span>
        </div>

        <h1 className="ty-purchase-title">הרכישה אושרה — כל הכבוד שהחלטת ✓</h1>
        <p className="ty-purchase-subtitle">
          פרטי הגישה לקורס בדרך אליך למייל — בדקי תוך 5 דקות.
          <br />
          לא קיבלת? בדקי בתיקיית הספאם.
        </p>

        <hr className="ty-purchase-divider" />

        <div className="ty-purchase-actions">
          <a
            href="https://www.instagram.com/osherrevach"
            target="_blank"
            rel="noopener noreferrer"
            className="ty-purchase-btn ty-purchase-btn--instagram"
            aria-label="עקבי אחריי באינסטגרם"
          >
            <span aria-hidden="true">📸</span>
            בינתיים — עקבי אחריי באינסטגרם לתכנים נוספים
          </a>
          <a href="/bms-sm" className="ty-purchase-btn ty-purchase-btn--primary">
            לעמוד הקורס ←
          </a>
        </div>

        <p className="ty-purchase-note">
          יש שאלה? שלחי הודעה ישירות דרך אינסטגרם או למייל osher@israeltechforce.com
        </p>
      </div>
    </main>
  );
}
