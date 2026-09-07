import './thank-you-purchase.css';

// No Purchase pixel/GA event here on purpose: this page can be opened directly,
// so a browser visit proves nothing. The verified purchase event is sent
// server-side from api/webhook-payment.js after the provider confirmed payment.
export default function ThankYouPurchase() {
  return (
    <main className="ty-purchase-page" dir="rtl">
      <div className="ty-purchase-card">
        <span className="ty-purchase-icon" aria-hidden="true">🎉</span>
        <div className="ty-purchase-badge">
          <span aria-hidden="true">✓</span>
          <span>התשלום בטיפול</span>
        </div>

        <h1 className="ty-purchase-title">תודה! כל הכבוד שהחלטת ✓</h1>
        <p className="ty-purchase-subtitle">
          ברגע שחשבונית ירוקה מאשרת את התשלום, פרטי הגישה לקורס נשלחים למייל (בדרך כלל תוך 5 דקות).
          <br />
          לא קיבלת תוך 15 דקות? בדקי בתיקיית הספאם, ואם עדיין אין, כתבי לי.
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
            בינתיים, עקבי אחריי באינסטגרם לתכנים נוספים
          </a>
          <a href="/VSL-BMS" className="ty-purchase-btn ty-purchase-btn--primary">
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
