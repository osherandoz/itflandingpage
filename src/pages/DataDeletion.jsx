import React from 'react';
import { Link } from 'react-router';
import './Privacy.css';

// Meta "User data deletion" URL. Same layout as /privacy and /terms.
const DataDeletion = () => (
  <div dir="rtl" className="privp">
    <main id="main" className="container privp__main">
      <Link to="/" className="privp__back link link--arrow small">חזרה לעמוד הראשי</Link>

      <header className="privp__header">
        <h1>מחיקת נתונים</h1>
      </header>

      <div className="privp__body">
        <section className="privp__section">
          <h2>איזה מידע נשמר</h2>
          <p>
            IsraelTechForce שומרת מינימום מידע על מי שמגיב/ה בפוסטים שלנו באינסטגרם ומשתמש/ת באוטומציית ההודעות:
            מזהה המשתמש באינסטגרם, שם המשתמש, ותוכן תגובה שהפעילה כלל (רק כשהיא תאמה מילת מפתח). לא נשמרים
            סיסמאות, ולא תוכן של שיחות פרטיות מעבר להודעות שנשלחו על ידינו. פירוט ב
            <Link to="/privacy#instagram" className="privp__link">מדיניות הפרטיות</Link>.
          </p>
        </section>

        <section className="privp__section">
          <h2>איך מבקשים למחוק</h2>
          <p>
            שלחו מייל אל{' '}
            <a href="mailto:osher@israeltechforce.com" className="privp__link">osher@israeltechforce.com</a> עם שם
            המשתמש באינסטגרם שלכם ובקשה למחוק את המידע. נאשר קבלה ונמחק את כל המידע שמקושר לחשבון, בדרך כלל תוך 14
            יום ולכל היותר תוך 30 יום.
          </p>
        </section>

        <section className="privp__section" dir="ltr" lang="en">
          <h2>Data deletion</h2>
          <p>
            We store the minimum: your Instagram user ID, username and, only when it triggered an automation, the
            text of your comment. To have it deleted, email{' '}
            <a href="mailto:osher@israeltechforce.com" className="privp__link">osher@israeltechforce.com</a> with
            your Instagram username. We confirm receipt and delete everything linked to the account, normally within
            14 days and at most 30 days.
          </p>
        </section>
      </div>
    </main>
  </div>
);

export default DataDeletion;
