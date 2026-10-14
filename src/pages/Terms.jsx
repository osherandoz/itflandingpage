import React from 'react';
import { Link } from 'react-router';
import './Privacy.css';

const LAST_UPDATED = 'אוקטובר 2026';

// Same reading layout as /privacy: its stylesheet is reused on purpose.
const Terms = () => (
  <div dir="rtl" className="privp">
    <main id="main" className="container privp__main">
      <Link to="/" className="privp__back link link--arrow small">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
        חזרה לעמוד הראשי
      </Link>

      <header className="privp__header">
        <h1>תנאי שימוש</h1>
        <p className="privp__meta">
          <span className="privp__meta-label">עודכן לאחרונה:</span> {LAST_UPDATED}
        </p>
      </header>

      <div className="privp__body">
        <section className="privp__section">
          <h2>1. מי אנחנו והשירות</h2>
          <p>
            IsraelTechForce הוא עסק עצמאי של אושר רווח. השירות: שחזור נכסים דיגיטליים, ייעוץ והדרכה, ותוכן
            ואוטומציות באינסטגרם ובמייל.
          </p>
        </section>

        <section className="privp__section">
          <h2>2. מי רשאי להשתמש</h2>
          <p>
            מגיל 18, או בהסכמת הורה/אפוטרופוס. פרטים נוספים בסעיף "משתמשים מתחת לגיל 18" ב
            <Link to="/privacy#minors" className="privp__link">מדיניות הפרטיות</Link>.
          </p>
        </section>

        <section className="privp__section">
          <h2>3. אוטומציית הודעות</h2>
          <p>
            תגובה בפוסט שלנו עם מילת מפתח עשויה להפעיל הודעה אוטומטית אליך. אפשר לא להגיב, או לבקש להפסיק בכל עת:
            כתוב/י לנו "הסר" בהודעה הפרטית או במייל.
          </p>
        </section>

        <section className="privp__section">
          <h2>4. שימוש נאות</h2>
          <p>
            אסור להגיב בספאם, בתוכן פוגעני או לנסות לתמרן את המערכת. אנחנו רשאים להפסיק לשלוח הודעות ולחסום
            משתמש.
          </p>
        </section>

        <section className="privp__section">
          <h2>5. קישורים וצדדים שלישיים</h2>
          <p>
            הקישורים בהודעות מובילים לאתרים שלנו או של צד שלישי. אנחנו לא אחראים לתוכן של אתרים חיצוניים. השימוש
            באינסטגרם כפוף לתנאי Meta.
          </p>
        </section>

        <section className="privp__section">
          <h2>6. אין התחייבות לזמינות</h2>
          <p>
            השירות ניתן "כמות שהוא". ייתכנו עיכובים או הפסקות, למשל בגלל Meta. אין בתכנים באתר ייעוץ מקצועי או
            משפטי, אלא מידע כללי בלבד.
          </p>
        </section>

        <section className="privp__section">
          <h2>7. קניין רוחני</h2>
          <p>
            התכנים שלנו (מדריכים, הדרכות, וידאו, עיצובים ולוגו) שייכים לנו או לגורמים שהעניקו לנו רישיון, ואסור
            להעתיק או להפיץ אותם בלי רשות מראש ובכתב.
          </p>
        </section>

        <section className="privp__section">
          <h2>8. הגבלת אחריות</h2>
          <p>האחריות שלנו מוגבלת במידה המותרת לפי הדין.</p>
        </section>

        <section className="privp__section">
          <h2>9. פרטיות</h2>
          <p>
            איך אנחנו אוספים ומשתמשים במידע מפורט ב<Link to="/privacy" className="privp__link">מדיניות הפרטיות</Link>.
          </p>
        </section>

        <section className="privp__section">
          <h2>10. שינויים</h2>
          <p>
            נעדכן את העמוד ואת תאריך העדכון. המשך שימוש לאחר העדכון הוא הסכמה לתנאים המעודכנים.
          </p>
        </section>

        <section className="privp__section">
          <h2>11. דין וסמכות שיפוט</h2>
          <p>על תנאים אלה יחול הדין הישראלי, וסמכות השיפוט נתונה לבתי המשפט המוסמכים בישראל.</p>
        </section>

        <section className="privp__section privp__contact-section">
          <h2>12. יצירת קשר</h2>
          <p>
            <a href="mailto:osher@israeltechforce.com" className="privp__link">osher@israeltechforce.com</a>
          </p>
        </section>
      </div>
    </main>
  </div>
);

export default Terms;
