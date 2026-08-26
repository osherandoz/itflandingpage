import React, { useState } from 'react';
import { useLang } from '../i18n';
import Icon from './Icon';
import './FAQ.css';

const STR = {
  he: {
    title: 'שאלות נפוצות על שחזור חשבונות',
    subtitle: 'אם הספקת לשאול את עצמך, כנראה שיש כאן תשובה.',
    faqs: [
      {
        question: 'איך מתחילים תהליך שחזור חשבון?',
        answer: 'התהליך פשוט ומהיר! שולחים הודעה בוואטסאפ או במייל, אני עוזר לך לאבחן את הבעיה בצורה מדויקת ולמצוא את הפתרון הטוב ביותר. ברגע שתאשר/י את התחלת הטיפול - אני רץ על זה בצורה המקצועית והמהירה ביותר. התהליך כולל אבחון מקצועי, הצעת מחיר מדויקת, וטיפול מיידי.'
      },
      {
        question: 'החשבון נחסם כבר הרבה זמן, יש בכלל סיכוי?',
        answer: 'ברוב המקרים - כן. גם חשבונות שנחסמו לפני שבועות או חודשים, וגם מקרים שמטא כבר סימנה כ"סופיים", הצלחתי לשחזר. ככל שפונים מוקדם יותר קל יותר, אבל זמן שעבר לא פוסל אותך. באבחון החינמי אגיד לך בכנות מה הסיכוי הריאלי במקרה הספציפי שלך - כולל אם התשובה היא שקשה.'
      },
      {
        question: 'האם השירות דיסקרטי ומאובטח?',
        answer: 'בהחלט! כל הפרטים שאקבל ממך ישארו חסויים ומאובטחים ולא יועברו לאף גורם חיצוני. כל המידע נועד לטיפול בבעיה בלבד וימחק לאחר סיום הטיפול בהתאם לרצונך. לא יעלה שום תיעוד הצלחה לרשת ללא הסכמתך המפורשת כלקוח.'
      },
      {
        question: 'כמה זמן לוקח תהליך שחזור החשבון?',
        answer: 'זמן הטיפול משתנה בהתאם לסוג הבעיה ומורכבותה. בעיות פשוטות כמו שחזור סיסמה או הסרת חסימה זמנית נפתרות תוך 24-48 שעות. בעיות מורכבות יותר כמו חשבונות שנפרצו או נחסמו לצמיתות יכולות לקחת מספר ימים עד שבוע. אני תמיד מעדכן אותך על התקדמות התהליך.'
      },
      {
        question: 'מה המחירים לשירותי שחזור חשבונות?',
        answer: 'המחירים שלי הוגנים ותחרותיים. מתחילים מ-500 ש"ח (לא כולל מע"מ) לבעיות פשוטות ועד 2,500-3,000 ש"ח לבעיות מורכבות שמצריכות כלים מיוחדים או התערבות מתקדמת. המחיר נקבע בהתאם לסוג הבעיה ומורכבותה. חשוב לציין - תשלום רק אחרי הצלחה מוכחת!'
      },
      {
        question: 'למה אתה לוקח כסף רק אחרי הצלחה?',
        answer: 'זו הפילוסופיה שלי! אני כל כך בטוח ביכולות שלי ובניסיון שצברתי, שאני מוכן לקחת את הסיכון. אם לא הצלחתי לשחזר את החשבון - לא תשלם כלום. זה נותן לך ביטחון מלא ומראה על המקצועיות והאמינות שלי בתחום.'
      },
      {
        question: 'האם יש אחריות על השירות?',
        answer: 'כן! אני נותן אחריות של 24 שעות מרגע שחרור החשבון. זה הזמן הקריטי שבו בדרך כלל יכולות לקרות בעיות מצד מטא (Meta). לאחר 24 שעות, אין לי שליטה על התכנים והפעילות של המשתמש, ולכן לא אוכל לתת אחריות נוספת.'
      },
      {
        question: 'האם אתה מטפל בכל סוגי הבעיות?',
        answer: 'כן! אני מטפל בכל סוגי הבעיות הקשורות לחשבונות רשתות חברתיות: חשבונות חסומים, פרוצים, בעיות התחברות, בעיות פרסום, Business Manager, ועוד. יש לי ניסיון של שנים וכלים מתקדמים לפתרון בעיות מורכבות.'
      },
      {
        question: 'האם אתה זמין 24/6?',
        answer: 'אני זמין 24/6 (ראשון עד שישי) עם תמיכה מיידית. בשבת אני זמין למקרים דחופים בלבד. התמיכה שלי כוללת מענה מהיר, אבחון מקצועי, וטיפול מיידי בבעיות דחופות.'
      }
    ],
  },
  en: {
    title: 'Frequently Asked Questions About Account Recovery',
    subtitle: "If you've already asked yourself, the answer is probably here.",
    faqs: [
      {
        question: 'How do I start an account recovery process?',
        answer: "It's simple and fast. Send me a message on WhatsApp or by email, and I'll help you diagnose the problem precisely and find the best solution. The moment you approve, I get to work in the most professional and fastest way possible. The process includes a professional diagnosis, an exact price quote, and immediate handling."
      },
      {
        question: 'My account has been blocked for a long time. Is there any chance?',
        answer: "In most cases, yes. I've recovered accounts blocked weeks or months ago, and even cases Meta had already marked as \"final\". The earlier you reach out the easier it is, but time passed doesn't rule you out. In the free diagnosis I'll tell you honestly what the realistic chance is in your specific case, including if the answer is that it's hard."
      },
      {
        question: 'Is the service discreet and secure?',
        answer: 'Absolutely. Every detail you share with me stays confidential and secure, and is never passed to any third party. All information is used only to handle your case, and is deleted after the work is done if you wish. No success story goes online without your explicit consent as a client.'
      },
      {
        question: 'How long does the account recovery process take?',
        answer: 'It depends on the type and complexity of the problem. Simple issues like password recovery or lifting a temporary block are resolved within 24-48 hours. More complex issues, like hacked or permanently disabled accounts, can take several days up to a week. I always keep you updated on the progress.'
      },
      {
        question: 'What are the prices for account recovery services?',
        answer: 'My prices are fair and competitive. They start at ₪500 (about $150, VAT not included) for simple issues and go up to ₪2,500-3,000 (about $750-$900) for complex cases that require special tools or advanced intervention. The price depends on the type and complexity of the problem. Important: you only pay after proven success!'
      },
      {
        question: 'Why do you charge only after success?',
        answer: "That's my philosophy. I'm so confident in my abilities and the experience I've built that I'm willing to take the risk. If I don't recover your account, you pay nothing. That gives you full peace of mind and shows my professionalism and reliability in this field."
      },
      {
        question: 'Is there a warranty on the service?',
        answer: "Yes. I give a 24-hour warranty from the moment the account is released. That's the critical window when issues from Meta's side can usually occur. After 24 hours I have no control over the user's content and activity, so I can't extend the warranty beyond that."
      },
      {
        question: 'Do you handle all types of problems?',
        answer: 'Yes. I handle every type of social-media account problem: blocked accounts, hacked accounts, login issues, advertising issues, Business Manager, and more. I have years of experience and advanced tools for solving complex problems.'
      },
      {
        question: 'Are you available 24/6?',
        answer: "I'm available 24/6 (Sunday through Friday) with immediate support. On Saturday I'm available for urgent cases only. My support includes fast responses, professional diagnosis, and immediate handling of urgent issues."
      }
    ],
  },
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { lang } = useLang();
  const t = STR[lang];
  const faqs = t.faqs;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);

    // Google Analytics event tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'FAQ',
        event_label: faqs[index].question,
        value: 1
      });
    }
  };

  return (
    <section className="faq">
      <div className="container">
        <h2 className="section-title">{t.title}</h2>
        <p className="section-subtitle">
          {t.subtitle}
        </p>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${openIndex === index ? 'active' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <Icon name="chevronDown" className={openIndex === index ? 'rotated' : ''} />
              </button>
              <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
