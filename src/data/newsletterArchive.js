/**
 * The Safety Signal — published issue archive. One real issue so far;
 * add more objects here as they go out and this page (and the "archive")
 * grows on its own, no route changes needed.
 *
 * The case-of-the-month segment is grounded in a real closed CRM case
 * (see crmCaseId) — same sourcing rule as src/data/caseStudies.js.
 */
export const ISSUES = [
  {
    slug: 'issue-1',
    issueNumber: 1,
    month: { he: 'ספטמבר 2026', en: 'September 2026' },
    segments: {
      he: [
        {
          n: '01',
          title: 'עדכון מטא',
          body: 'מטא ממשיכה להחמיר את הבדיקות האוטומטיות סביב התנתקויות מכשיר. החלפת טלפון, עדכון מערכת גדול, או אפילו כיבוי-הדלקה במקרים מסוימים, יכולים לגרום לאפליקציה לדרוש אימות מחדש מלא. אם ההודעה במסך נראית תקועה, הבעיה כמעט תמיד בערוץ האימות עצמו, לא בחשבון.',
        },
        {
          n: '02',
          title: 'התיק של החודש',
          crmCaseId: '9d307989-26f8-43dd-8cb7-21c88fabdfea',
          body: 'לקוחה כיבתה והדליקה את הטלפון, ואינסטגרם התנתק. היא ביקשה איפוס סיסמה, קיבלה קוד לוואטסאפ, הזינה אותו, והמסך פשוט הראה "אישור" בלי להתקדם, שוב ושוב, גם למחרת. הבעיה לא הייתה בסיסמה או בחשבון עצמו, אלא בכך שתהליך האימות "נתקע" מול המכשיר החדש. עברנו על ערוץ אימות חלופי והשלמנו את ההתחברות באותו יום.',
        },
        {
          n: '03',
          title: 'בדיקה אחת',
          body: 'פתחו הגדרות > אבטחה > "היכן שאתם מחוברים" (Instagram/Facebook) ווודאו שאין מכשיר ישן שאתם לא מזהים. מכשיר ישן שנשאר מחובר הוא בדיוק מה שגורם למערכת להתייחס להתחברות הבאה שלכם כחשודה.',
        },
      ],
      en: [
        {
          n: '01',
          title: 'Meta Update',
          body: "Meta keeps tightening automatic checks around device sign-outs. A phone swap, a major OS update, or even a plain restart can in some cases force a full re-authentication. If the on-screen message looks stuck, the problem is almost always the verification channel itself, not the account.",
        },
        {
          n: '02',
          title: 'Case of the Month',
          crmCaseId: '9d307989-26f8-43dd-8cb7-21c88fabdfea',
          body: "A client restarted her phone and Instagram logged her out. She requested a password reset, got a code on WhatsApp, entered it, and the screen just showed 'OK' without moving forward, again and again, even the next day. The problem wasn't the password or the account, it was that the verification flow got stuck against the new device. We switched to an alternate verification channel and completed the sign-in the same day.",
        },
        {
          n: '03',
          title: 'One Check',
          body: 'Open Settings > Security > "Where you\'re logged in" (Instagram/Facebook) and confirm there\'s no old device you don\'t recognize. A stale logged-in device is exactly what makes the system treat your next login as suspicious.',
        },
      ],
    },
  },
];
