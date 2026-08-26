import React from 'react';
import { Link, useLocation } from 'react-router';
import { useLang, togglePath } from '../i18n';
import './Privacy.css';

const LAST_UPDATED_HE = 'מאי 2026';
const LAST_UPDATED_EN = 'May 2026';

const TOC_SECTIONS_HE = [
  { id: 'who-we-are', label: 'מי אנחנו' },
  { id: 'what-we-collect', label: 'איזה מידע אנו אוספים' },
  { id: 'why', label: 'למה אנחנו אוספים את זה' },
  { id: 'third-parties', label: 'מי עוד רואה את המידע' },
  { id: 'cookies', label: 'עוגיות ופיקסל מעקב' },
  { id: 'retention', label: 'כמה זמן אנו שומרים מידע' },
  { id: 'security', label: 'איך אנחנו שומרים על המידע' },
  { id: 'your-rights', label: 'הזכויות שלך' },
  { id: 'international', label: 'העברת מידע מחוץ לישראל' },
  { id: 'minors', label: 'משתמשים מתחת לגיל 18' },
  { id: 'changes', label: 'שינויים במדיניות' },
  { id: 'contact', label: 'יצירת קשר' },
];

const TOC_SECTIONS_EN = [
  { id: 'who-we-are', label: 'Who we are' },
  { id: 'what-we-collect', label: 'What information we collect' },
  { id: 'why', label: 'Why we collect it' },
  { id: 'third-parties', label: 'Who else sees the information' },
  { id: 'cookies', label: 'Cookies and tracking pixel' },
  { id: 'retention', label: 'How long we keep information' },
  { id: 'security', label: 'How we protect the information' },
  { id: 'your-rights', label: 'Your rights' },
  { id: 'international', label: 'Transfers of data outside Israel' },
  { id: 'minors', label: 'Users under 18' },
  { id: 'changes', label: 'Changes to this policy' },
  { id: 'contact', label: 'Contact' },
];

const HebrewPrivacy = () => (
  <>
    <header className="privacy-header">
      <h1>מדיניות פרטיות</h1>
      <p className="privacy-meta">
        <span className="privacy-meta-label">עודכן לאחרונה:</span> {LAST_UPDATED_HE}
      </p>
    </header>

    {/* TL;DR */}
    <section className="privacy-tldr" aria-labelledby="tldr-heading">
      <h2 id="tldr-heading">השורה התחתונה</h2>
      <ul>
        <li>אנחנו אוספים רק מה שצריך כדי לתת לך את השירות, לא יותר.</li>
        <li>אנחנו לא מוכרים את המידע שלך לאף אחד. בשום מצב.</li>
        <li>תמיד יש לך זכות מלאה לראות, לתקן או למחוק את המידע שלך.</li>
        <li>מייל, טלפון ושם נשמרים אצלנו בסמוב (Smoove). חשבוניות נשמרות בחשבונית ירוקה (Morning).</li>
      </ul>
    </section>

    {/* TOC */}
    <nav className="privacy-toc" aria-label="תוכן עניינים">
      <h2>תוכן עניינים</h2>
      <ol>
        {TOC_SECTIONS_HE.map((s, i) => (
          <li key={s.id}>
            <a href={`#${s.id}`}>
              <span className="toc-num">{i + 1}.</span> {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>

    {/* 1. Who we are */}
    <section id="who-we-are" className="privacy-section">
      <h2>1. מי אנחנו</h2>
      <p>
        IsraelTechForce (להלן: <strong>"אנחנו"</strong>, <strong>"החברה"</strong> או <strong>"האתר"</strong>) הוא
        עסק עצמאי המופעל על ידי אושר רווח. אנו מספקים שירותי שחזור נכסים דיגיטליים, ייעוץ והדרכה לעסקים ולמנהלי
        סושיאל בישראל.
      </p>
      <p>
        <strong>בעל המידע (Data Controller):</strong> אושר רווח, בעל IsraelTechForce.<br />
        <strong>צור קשר:</strong> <a href="mailto:osher@israeltechforce.com" className="privacy-link">osher@israeltechforce.com</a>
      </p>
    </section>

    {/* 2. What we collect */}
    <section id="what-we-collect" className="privacy-section">
      <h2>2. איזה מידע אנו אוספים</h2>
      <p>אנחנו אוספים רק את המידע המינימלי שנחוץ כדי לספק את השירות. הכל מפורט בטבלה למטה:</p>

      <div className="privacy-table-wrapper">
        <table className="privacy-table">
          <thead>
            <tr>
              <th>סוג מידע</th>
              <th>מתי נאסף</th>
              <th>איפה נשמר</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>שם פרטי, מייל, טלפון</td>
              <td>הרשמה לרשימת תפוצה / טופס לידים בדפי הנחיתה</td>
              <td>Smoove (ישראל)</td>
            </tr>
            <tr>
              <td>שם, מייל, טלפון, פרטי תשלום</td>
              <td>רכישת קורס BMS דרך מערכת התשלום</td>
              <td>Morning / חשבונית ירוקה (ישראל)</td>
            </tr>
            <tr>
              <td>כתובת IP, סוג דפדפן, מערכת הפעלה</td>
              <td>אוטומטית בכל ביקור (לוגי שרת)</td>
              <td>Vercel (ארה״ב, EU)</td>
            </tr>
            <tr>
              <td>התנהגות גלישה באתר (פיקסל)</td>
              <td>אם אישרת עוגיות שיווק</td>
              <td>Meta / Facebook (ארה״ב, אירלנד)</td>
            </tr>
            <tr>
              <td>תוכן הודעות וואטסאפ</td>
              <td>פניות יזומות בלבד מצידך</td>
              <td>WhatsApp / Meta</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="privacy-note">
        <strong>מה אנחנו לא אוספים:</strong> פרטי כרטיסי אשראי לא נשמרים אצלנו אף פעם. הכל עובר ישירות דרך מערכת
        התשלום המאובטחת של Morning ולא נחשף לנו.
      </p>
    </section>

    {/* 3. Why */}
    <section id="why" className="privacy-section">
      <h2>3. למה אנחנו אוספים את זה</h2>
      <p>כל פיסת מידע נאספת למטרה ספציפית. אין איסוף "ליתר ביטחון":</p>
      <ul className="privacy-purpose-list">
        <li>
          <strong>מתן השירות:</strong> אם רכשת קורס, אנחנו צריכים את המייל שלך כדי לשלוח לך גישה ל־LMS וסיסמה.
        </li>
        <li>
          <strong>תמיכה ויצירת קשר:</strong> אם פנית אלינו דרך וואטסאפ או טופס, אנחנו עונים לך.
        </li>
        <li>
          <strong>שיווק ועדכונים:</strong> אם הסכמת לקבל עדכונים, נשלח לך תוכן מקצועי וטיפים. תמיד תוכל/י להסיר את עצמך
          בלחיצה אחת.
        </li>
        <li>
          <strong>חיוב והפקת חשבוניות:</strong> חשבוניות מס מופקות אוטומטית בעת רכישה (זה דרישה חוקית).
        </li>
        <li>
          <strong>שיפור האתר:</strong> אנחנו מסתכלים על נתונים אנונימיים (כמה אנשים נכנסו, איזה דפים פופולריים) כדי
          לשפר את החוויה.
        </li>
      </ul>
      <p>
        <strong>בסיס חוקי:</strong> אנחנו פועלים על בסיס הסכמתך המפורשת (כשאת/ה ממלא/ת טופס או מסכים/ה לעוגיות),
        על בסיס חוזי (כשרכשת קורס), או על בסיס דרישה חוקית (חיובים, חשבוניות).
      </p>
    </section>

    {/* 4. Third parties */}
    <section id="third-parties" className="privacy-section">
      <h2>4. מי עוד רואה את המידע</h2>
      <p>
        אנחנו לא מוכרים, לא מחליפים ולא משתפים את המידע שלך עם מפרסמים או צדדים שלישיים. עם זאת, יש מספר מצומצם של
        ספקי שירות שעוזרים לנו להפעיל את העסק, ויש להם גישה למידע מסוים <strong>רק כדי לבצע את העבודה שלהם</strong>:
      </p>
      <ul className="privacy-vendor-list">
        <li>
          <strong>Smoove</strong> (ישראל), מערכת לניהול רשימות תפוצה ושליחת מיילים אוטומטיים. רואה: שם, מייל, טלפון.
          <a href="https://www.smoove.io/privacy-policy" target="_blank" rel="noopener noreferrer" className="privacy-link"> מדיניות פרטיות</a>
        </li>
        <li>
          <strong>Morning (חשבונית ירוקה)</strong> (ישראל), סליקה והפקת חשבוניות. רואה: שם, מייל, טלפון, פרטי תשלום.
          <a href="https://www.greeninvoice.co.il/privacy" target="_blank" rel="noopener noreferrer" className="privacy-link"> מדיניות פרטיות</a>
        </li>
        <li>
          <strong>Vercel</strong> (ארה״ב), אחסון ושירותי ענן עבור האתר. רואה: לוגי שרת אנונימיים.
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="privacy-link"> מדיניות פרטיות</a>
        </li>
        <li>
          <strong>Meta / Facebook</strong> (ארה״ב, אירלנד), פיקסל לפרסום ממוקד. רואה: התנהגות גלישה אנונימית, רק אם
          הסכמת לעוגיות שיווק.
          <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="privacy-link"> מדיניות פרטיות</a>
        </li>
      </ul>
      <p>
        כל הספקים האלו מחויבים לשמור על המידע באבטחה זהה או טובה יותר משלנו, וחתומים על תנאי DPA (Data Processing
        Agreement) מתאימים.
      </p>
    </section>

    {/* 5. Cookies */}
    <section id="cookies" className="privacy-section">
      <h2>5. עוגיות (Cookies) ופיקסל מעקב</h2>
      <p>אנחנו משתמשים בשני סוגי עוגיות:</p>
      <ul>
        <li>
          <strong>עוגיות חיוניות:</strong> נדרשות כדי שהאתר יעבוד (לדוגמה: זכירת העדפת שפה). לא ניתן לבטל אותן.
        </li>
        <li>
          <strong>עוגיות שיווק (Meta Pixel):</strong> עוקבות אחרי איזה דפים גולשים, כדי שנוכל להציג מודעות
          רלוונטיות בפייסבוק ובאינסטגרם. ניתן לחסום אותן בהגדרות הדפדפן או דרך{' '}
          <a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer" className="privacy-link">
            הגדרות הפרסום של פייסבוק
          </a>.
        </li>
      </ul>
    </section>

    {/* 6. Retention */}
    <section id="retention" className="privacy-section">
      <h2>6. כמה זמן אנו שומרים מידע</h2>
      <ul>
        <li>
          <strong>רשימת תפוצה:</strong> כל עוד את/ה מנוי/ה, או עד שתבקש/י להסיר את עצמך (ביצוע מיידי).
        </li>
        <li>
          <strong>רשימת רוכשי קורסים:</strong> כל עוד יש גישה לקורס. ניתן לבקש מחיקה בכל עת (אך תאבד גישה לקורס).
        </li>
        <li>
          <strong>חשבוניות מס:</strong> נשמרות 7 שנים על פי דרישת רשות המסים בישראל. אי אפשר למחוק אותן לפי החוק.
        </li>
        <li>
          <strong>לוגי שרת:</strong> 30 יום, ואז נמחקים אוטומטית.
        </li>
      </ul>
    </section>

    {/* 7. Security */}
    <section id="security" className="privacy-section">
      <h2>7. איך אנחנו שומרים על המידע</h2>
      <p>אבטחת המידע שלך בראש סדר העדיפויות:</p>
      <ul>
        <li>תקשורת מוצפנת (HTTPS/TLS) בכל מקום באתר.</li>
        <li>פרטי תשלום נסלקים דרך תשתית PCI-DSS של Morning. לא נוגעים אצלנו.</li>
        <li>גישה למידע מוגבלת רק לאנשים שזקוקים לה לצורך עבודתם.</li>
        <li>מערכות הספקים שלנו (Smoove, Morning, Vercel) עומדות בתקני אבטחה בינלאומיים.</li>
        <li>חתימות HMAC על כל webhook כדי למנוע זיוף בקשות.</li>
      </ul>
      <p className="privacy-note">
        למרות כל זאת, אף מערכת לא אטומה ב־100%. במקרה של פריצה, נודיע לך תוך 72 שעות מהרגע שגילינו, כפי שמחייב החוק.
      </p>
    </section>

    {/* 8. Your rights */}
    <section id="your-rights" className="privacy-section privacy-rights-section">
      <h2>8. הזכויות שלך</h2>
      <p>החוק נותן לך שליטה מלאה על המידע שלך. בכל עת ניתן:</p>
      <div className="privacy-rights-grid">
        <div className="privacy-right-card">
          <h3>זכות לעיון</h3>
          <p>לבקש עותק מהמידע שאנחנו מחזיקים עליך.</p>
        </div>
        <div className="privacy-right-card">
          <h3>זכות לתיקון</h3>
          <p>לתקן מידע שגוי או חלקי.</p>
        </div>
        <div className="privacy-right-card">
          <h3>זכות למחיקה</h3>
          <p>לבקש שנמחק את המידע שלך (למעט מידע שאנחנו מחויבים לשמור לפי חוק).</p>
        </div>
        <div className="privacy-right-card">
          <h3>זכות להסרה מתפוצה</h3>
          <p>בלחיצה אחת על קישור "הסרה" בתחתית כל מייל. מיידי.</p>
        </div>
        <div className="privacy-right-card">
          <h3>זכות לניידות</h3>
          <p>לקבל את המידע שלך בפורמט שניתן להעביר לשירות אחר.</p>
        </div>
        <div className="privacy-right-card">
          <h3>זכות להתלונן</h3>
          <p>
            לפנות לרשות להגנת הפרטיות בישראל אם את/ה חושב/ת שזכויותייך נפגעו.
            <br />
            <a
              href="https://www.gov.il/he/departments/the_privacy_protection_authority"
              target="_blank"
              rel="noopener noreferrer"
              className="privacy-link"
            >
              לאתר הרשות
            </a>
          </p>
        </div>
      </div>
      <p>
        כדי לממש כל אחת מהזכויות האלו, פשוט שלח/י מייל ל־
        <a href="mailto:osher@israeltechforce.com" className="privacy-link">osher@israeltechforce.com</a>. נחזיר תשובה
        תוך 14 יום.
      </p>
    </section>

    {/* 9. International */}
    <section id="international" className="privacy-section">
      <h2>9. העברת מידע מחוץ לישראל</h2>
      <p>
        חלק מהספקים שלנו (Vercel, Meta) פועלים בארה״ב ובאיחוד האירופי. כשמידע עובר אליהם, ההעברה מתבצעת תחת הסכמים
        המבטיחים רמת הגנה זהה או גבוהה יותר מהדין הישראלי, לרבות סעיפי SCC (Standard Contractual Clauses) של
        האיחוד האירופי.
      </p>
    </section>

    {/* 10. Minors */}
    <section id="minors" className="privacy-section">
      <h2>10. משתמשים מתחת לגיל 18</h2>
      <p>
        השירות שלנו מיועד לבעלי עסקים, מנהלי סושיאל וקמפיינרים מקצועיים בלבד. אם הינך מתחת לגיל 18, אנא אל תרשם/י
        לשירות. אם הגיע לידיעתנו שמידע נאסף מקטין/ה ללא הסכמת ההורים, נמחק אותו מיידית.
      </p>
    </section>

    {/* 11. Changes */}
    <section id="changes" className="privacy-section">
      <h2>11. שינויים במדיניות</h2>
      <p>
        המדיניות הזו עשויה להתעדכן מעת לעת (למשל, אם נתחיל לעבוד עם ספק חדש, או אם החוק ישתנה). תאריך העדכון
        האחרון יופיע תמיד בראש הדף. אם השינויים מהותיים, נשלח לך מייל יזום עם הסבר.
      </p>
    </section>

    {/* 12. Contact */}
    <section id="contact" className="privacy-section privacy-contact-section">
      <h2>12. יצירת קשר</h2>
      <p>שאלות, בקשות או תלונות בנושא פרטיות:</p>
      <p>
        <strong>אושר רווח</strong>
        <br />
        IsraelTechForce
        <br />
        <a href="mailto:osher@israeltechforce.com" className="privacy-link">osher@israeltechforce.com</a>
      </p>
      <p className="privacy-response-time">זמן מענה: עד 14 יום (בדרך כלל הרבה יותר מהר).</p>
    </section>
  </>
);

const EnglishPrivacy = () => (
  <>
    <header className="privacy-header">
      <h1>Privacy Policy</h1>
      <p className="privacy-meta">
        <span className="privacy-meta-label">Last updated:</span> {LAST_UPDATED_EN}
      </p>
    </header>

    {/* TL;DR */}
    <section className="privacy-tldr" aria-labelledby="tldr-heading">
      <h2 id="tldr-heading">The Bottom Line</h2>
      <ul>
        <li>We collect only what we need to provide you the service, nothing more.</li>
        <li>We never sell your information to anyone. Under any circumstances.</li>
        <li>You always have the full right to view, correct, or delete your information.</li>
        <li>Email, phone, and name are stored with Smoove. Invoices are stored with Green Invoice (Morning).</li>
      </ul>
    </section>

    {/* TOC */}
    <nav className="privacy-toc" aria-label="Table of contents">
      <h2>Table of Contents</h2>
      <ol>
        {TOC_SECTIONS_EN.map((s, i) => (
          <li key={s.id}>
            <a href={`#${s.id}`}>
              <span className="toc-num">{i + 1}.</span> {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>

    {/* 1. Who we are */}
    <section id="who-we-are" className="privacy-section">
      <h2>1. Who We Are</h2>
      <p>
        IsraelTechForce (hereinafter: <strong>"we"</strong>, <strong>"the company"</strong> or <strong>"the site"</strong>) is
        an independent business operated by Osher Revach. We provide digital asset recovery services, consulting, and
        training for businesses and social media managers in Israel.
      </p>
      <p>
        <strong>Data Controller:</strong> Osher Revach, owner of IsraelTechForce.<br />
        <strong>Contact:</strong> <a href="mailto:osher@israeltechforce.com" className="privacy-link">osher@israeltechforce.com</a>
      </p>
    </section>

    {/* 2. What we collect */}
    <section id="what-we-collect" className="privacy-section">
      <h2>2. What Information We Collect</h2>
      <p>We collect only the minimal information required to provide the service. Everything is detailed in the table below:</p>

      <div className="privacy-table-wrapper">
        <table className="privacy-table">
          <thead>
            <tr>
              <th>Type of information</th>
              <th>When it is collected</th>
              <th>Where it is stored</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>First name, email, phone</td>
              <td>Newsletter signup / lead form on landing pages</td>
              <td>Smoove (Israel)</td>
            </tr>
            <tr>
              <td>Name, email, phone, payment details</td>
              <td>BMS course purchase through the payment system</td>
              <td>Morning / Green Invoice (Israel)</td>
            </tr>
            <tr>
              <td>IP address, browser type, operating system</td>
              <td>Automatically on every visit (server logs)</td>
              <td>Vercel (US, EU)</td>
            </tr>
            <tr>
              <td>Browsing behavior on the site (pixel)</td>
              <td>If you approved marketing cookies</td>
              <td>Meta / Facebook (US, Ireland)</td>
            </tr>
            <tr>
              <td>WhatsApp message content</td>
              <td>Only when you reach out to us yourself</td>
              <td>WhatsApp / Meta</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="privacy-note">
        <strong>What we do not collect:</strong> Credit card details are never stored with us. Everything goes directly
        through Morning's secure payment system and is never exposed to us.
      </p>
    </section>

    {/* 3. Why */}
    <section id="why" className="privacy-section">
      <h2>3. Why We Collect It</h2>
      <p>Every piece of information is collected for a specific purpose. There is no "just in case" collection:</p>
      <ul className="privacy-purpose-list">
        <li>
          <strong>Providing the service:</strong> If you purchased a course, we need your email to send you LMS access and a password.
        </li>
        <li>
          <strong>Support and contact:</strong> If you contacted us via WhatsApp or a form, we reply to you.
        </li>
        <li>
          <strong>Marketing and updates:</strong> If you agreed to receive updates, we send you professional content and tips.
          You can always remove yourself with a single click.
        </li>
        <li>
          <strong>Billing and invoicing:</strong> Tax invoices are generated automatically upon purchase (a legal requirement).
        </li>
        <li>
          <strong>Improving the site:</strong> We look at anonymous data (how many people visited, which pages are popular)
          to improve the experience.
        </li>
      </ul>
      <p>
        <strong>Legal basis:</strong> We operate on the basis of your explicit consent (when you fill out a form or accept
        cookies), on a contractual basis (when you purchased a course), or on the basis of a legal requirement (billing,
        invoices).
      </p>
    </section>

    {/* 4. Third parties */}
    <section id="third-parties" className="privacy-section">
      <h2>4. Who Else Sees the Information</h2>
      <p>
        We do not sell, trade, or share your information with advertisers or third parties. That said, a small number of
        service providers help us run the business and have access to certain information <strong>only in order to do their job</strong>:
      </p>
      <ul className="privacy-vendor-list">
        <li>
          <strong>Smoove</strong> (Israel), a mailing list management and automated email system. Sees: name, email, phone.
          <a href="https://www.smoove.io/privacy-policy" target="_blank" rel="noopener noreferrer" className="privacy-link"> Privacy policy</a>
        </li>
        <li>
          <strong>Morning (Green Invoice)</strong> (Israel), payment processing and invoicing. Sees: name, email, phone, payment details.
          <a href="https://www.greeninvoice.co.il/privacy" target="_blank" rel="noopener noreferrer" className="privacy-link"> Privacy policy</a>
        </li>
        <li>
          <strong>Vercel</strong> (US), hosting and cloud services for the site. Sees: anonymous server logs.
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="privacy-link"> Privacy policy</a>
        </li>
        <li>
          <strong>Meta / Facebook</strong> (US, Ireland), pixel for targeted advertising. Sees: anonymous browsing behavior,
          only if you agreed to marketing cookies.
          <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="privacy-link"> Privacy policy</a>
        </li>
      </ul>
      <p>
        All of these providers are required to protect the information with security equal to or better than ours, and have
        signed appropriate DPA (Data Processing Agreement) terms.
      </p>
    </section>

    {/* 5. Cookies */}
    <section id="cookies" className="privacy-section">
      <h2>5. Cookies and Tracking Pixel</h2>
      <p>We use two types of cookies:</p>
      <ul>
        <li>
          <strong>Essential cookies:</strong> Required for the site to work (for example: remembering your language preference).
          They cannot be disabled.
        </li>
        <li>
          <strong>Marketing cookies (Meta Pixel):</strong> Track which pages are visited, so we can show relevant ads on
          Facebook and Instagram. You can block them in your browser settings or through{' '}
          <a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer" className="privacy-link">
            Facebook's ad settings
          </a>.
        </li>
      </ul>
    </section>

    {/* 6. Retention */}
    <section id="retention" className="privacy-section">
      <h2>6. How Long We Keep Information</h2>
      <ul>
        <li>
          <strong>Mailing list:</strong> As long as you are subscribed, or until you ask to be removed (done immediately).
        </li>
        <li>
          <strong>Course purchaser list:</strong> As long as course access exists. You can request deletion at any time
          (but you will lose access to the course).
        </li>
        <li>
          <strong>Tax invoices:</strong> Kept for 7 years as required by the Israel Tax Authority. They cannot be deleted by law.
        </li>
        <li>
          <strong>Server logs:</strong> 30 days, then deleted automatically.
        </li>
      </ul>
    </section>

    {/* 7. Security */}
    <section id="security" className="privacy-section">
      <h2>7. How We Protect the Information</h2>
      <p>The security of your information is a top priority:</p>
      <ul>
        <li>Encrypted communication (HTTPS/TLS) everywhere on the site.</li>
        <li>Payment details are processed through Morning's PCI-DSS infrastructure. They never touch our systems.</li>
        <li>Access to information is limited to people who need it for their work.</li>
        <li>Our providers' systems (Smoove, Morning, Vercel) meet international security standards.</li>
        <li>HMAC signatures on every webhook to prevent request forgery.</li>
      </ul>
      <p className="privacy-note">
        Despite all of this, no system is 100% impenetrable. In the event of a breach, we will notify you within 72 hours
        of discovery, as required by law.
      </p>
    </section>

    {/* 8. Your rights */}
    <section id="your-rights" className="privacy-section privacy-rights-section">
      <h2>8. Your Rights</h2>
      <p>The law gives you full control over your information. At any time you can:</p>
      <div className="privacy-rights-grid">
        <div className="privacy-right-card">
          <h3>Right of access</h3>
          <p>Request a copy of the information we hold about you.</p>
        </div>
        <div className="privacy-right-card">
          <h3>Right to rectification</h3>
          <p>Correct inaccurate or incomplete information.</p>
        </div>
        <div className="privacy-right-card">
          <h3>Right to erasure</h3>
          <p>Ask us to delete your information (except information we are legally required to keep).</p>
        </div>
        <div className="privacy-right-card">
          <h3>Right to unsubscribe</h3>
          <p>One click on the "unsubscribe" link at the bottom of every email. Immediate.</p>
        </div>
        <div className="privacy-right-card">
          <h3>Right to portability</h3>
          <p>Receive your information in a format that can be transferred to another service.</p>
        </div>
        <div className="privacy-right-card">
          <h3>Right to complain</h3>
          <p>
            Contact the Israeli Privacy Protection Authority if you believe your rights have been violated.
            <br />
            <a
              href="https://www.gov.il/he/departments/the_privacy_protection_authority"
              target="_blank"
              rel="noopener noreferrer"
              className="privacy-link"
            >
              Authority website
            </a>
          </p>
        </div>
      </div>
      <p>
        To exercise any of these rights, simply send an email to{' '}
        <a href="mailto:osher@israeltechforce.com" className="privacy-link">osher@israeltechforce.com</a>. We will respond
        within 14 days.
      </p>
    </section>

    {/* 9. International */}
    <section id="international" className="privacy-section">
      <h2>9. Transfers of Data Outside Israel</h2>
      <p>
        Some of our providers (Vercel, Meta) operate in the US and the European Union. When data is transferred to them,
        the transfer takes place under agreements guaranteeing a level of protection equal to or higher than Israeli law,
        including the EU's SCC (Standard Contractual Clauses).
      </p>
    </section>

    {/* 10. Minors */}
    <section id="minors" className="privacy-section">
      <h2>10. Users Under 18</h2>
      <p>
        Our service is intended for business owners, social media managers, and professional campaign managers only.
        If you are under 18, please do not sign up for the service. If we become aware that information was collected
        from a minor without parental consent, we will delete it immediately.
      </p>
    </section>

    {/* 11. Changes */}
    <section id="changes" className="privacy-section">
      <h2>11. Changes to This Policy</h2>
      <p>
        This policy may be updated from time to time (for example, if we start working with a new provider, or if the law
        changes). The last update date will always appear at the top of the page. If the changes are material, we will
        proactively email you an explanation.
      </p>
    </section>

    {/* 12. Contact */}
    <section id="contact" className="privacy-section privacy-contact-section">
      <h2>12. Contact</h2>
      <p>Questions, requests, or complaints regarding privacy:</p>
      <p>
        <strong>Osher Revach</strong>
        <br />
        IsraelTechForce
        <br />
        <a href="mailto:osher@israeltechforce.com" className="privacy-link">osher@israeltechforce.com</a>
      </p>
      <p className="privacy-response-time">Response time: up to 14 days (usually much faster).</p>
    </section>
  </>
);

const Privacy = () => {
  const { isEn, dir, prefix } = useLang();
  const { pathname } = useLocation();

  return (
    <div dir={dir} className="privacy-page">
      <div className="privacy-container">
        <Link to={prefix || '/'} className="privacy-back-link">
          <span aria-hidden="true">←</span> {isEn ? 'Back to home page' : 'חזרה לעמוד הראשי'}
        </Link>
        <Link to={togglePath(pathname)} className="privacy-back-link privacy-lang-toggle">
          {isEn ? 'עברית' : 'English'}
        </Link>

        {isEn ? <EnglishPrivacy /> : <HebrewPrivacy />}
      </div>
    </div>
  );
};

export default Privacy;
