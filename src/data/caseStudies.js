/**
 * Case studies — grounded in real closed cases from the CRM (crmCaseId lets
 * Osher look each one up). Platform, initial complaint, price and time-to-
 * resolution are real. The "what we did" step is a generic, already-published
 * description of the process (matches HowItWorks.jsx / ServicePage.jsx) applied
 * to this case's real facts — it is NOT a verbatim account of that specific
 * ticket, because the CRM's own notes field doesn't record that level of detail.
 *
 * TODO (Osher, before publishing): read each entry against the real CRM case
 * (crmCaseId), correct "whatWeDid" and "limitations" to what actually happened,
 * confirm the client would be comfortable with even this redacted a mention,
 * and fill in case 3 — a WhatsApp case, since the CRM's own notes field never
 * captured one with enough narrative detail to draft from.
 */
export const CASE_STUDIES = [
  {
    id: 'facebook-suspected-hijack-lockout',
    crmCaseId: '19f13333-b902-4394-87f9-73f992e72cd1',
    platform: 'facebook',
    platformLabel: { he: 'פייסבוק', en: 'Facebook' },
    title: { he: 'חשבון פייסבוק ננעל אחרי חשד לפריצה', en: 'Facebook account locked after a suspected-hijack flag' },
    errorState: {
      he: 'החשבון הושעה על חשד לפריצה, ואז ננעל לגמרי אחרי תהליך איפוס סיסמה שהלקוח לא הצליח להשלים.',
      en: "The account was suspended on suspicion of being hijacked, then fully locked after a password-reset flow the client couldn't complete.",
    },
    alreadyTried: {
      he: 'הלקוח ניסה לאפס סיסמה בעצמו ונתקע בלולאה: המיילים ממטא דרשו פעולות אימות דרך ממשק שהגישה אליו הייתה חסומה.',
      en: "The client tried resetting the password alone and got stuck in a loop: Meta's emails demanded verification steps through an interface access to which was itself blocked.",
    },
    whatWeDid: {
      he: 'אימתנו בעלות מול מטא עם תיעוד מתאים, הגשנו את מסלול הערעור הנכון למקרי חשד-פריצה (שונה ממסלול חסימה רגילה), ועקבנו עד לפתיחה מחדש.',
      en: "Verified ownership with Meta using the right documentation, filed the specific appeal path for suspected-hijack cases (different from a routine suspension), and followed through to reopening.",
    },
    priceILS: 600,
    hoursToOutcome: 136,
    result: { he: 'הגישה לחשבון ולעמוד העסקי המחובר אליו שוחזרה.', en: 'Access to the account and its connected business page was restored.' },
    limitations: {
      he: 'לא היה מדובר בפתרון תוך יום. מקרי חשד-פריצה עוברים בדיקה קפדנית יותר ולוקחים זמן.',
      en: "This wasn't a same-day fix. Suspected-hijack cases go through stricter review and take longer.",
    },
  },
  {
    id: 'instagram-ads-disabled',
    crmCaseId: '91078cdc-7115-4a11-b60f-abb0eab26623',
    platform: 'instagram',
    platformLabel: { he: 'אינסטגרם', en: 'Instagram' },
    title: { he: 'חשבון עסקי באינסטגרם איבד גישה לפרסום מודעות', en: 'Instagram business account lost the ability to run ads' },
    errorState: {
      he: 'החשבון העסקי המשיך לפעול, אבל האפשרות להריץ מודעות נחסמה בלי הסבר ברור.',
      en: 'The business account kept working, but the ability to run ads was blocked with no clear explanation.',
    },
    alreadyTried: {
      he: 'הלקוח לא ידע אם הבעיה בחשבון הפרסום, בעמוד, או בביזנס מנג׳ר, וחשש שמדובר בחסימה כללית שתתפשט.',
      en: "The client didn't know whether the problem was the ad account, the page, or the Business Manager, and worried it was a general block that would spread.",
    },
    whatWeDid: {
      he: 'איתרנו את ההגבלה המדויקת (בעיית הרשאות מול חסימה כללית), תיקנו את השיוך בין הביזנס מנג׳ר לחשבון המודעות, והגשנו לבדיקה חוזרת.',
      en: "Pinpointed the exact restriction (a permissions issue, not a general block), fixed the link between the Business Manager and the ad account, and resubmitted for review.",
    },
    priceILS: 600,
    hoursToOutcome: 113,
    result: { he: 'היכולת לפרסם מודעות שוחזרה, החשבון העסקי לא נפגע.', en: "Ad publishing was restored; the business account itself was never at risk." },
    limitations: {
      he: 'זיהוי הסיבה המדויקת לקח את רוב הזמן. תיקון עצמו, ברגע שהאבחון ברור, מהיר.',
      en: 'Most of the time went into pinpointing the exact cause. The fix itself, once diagnosed, is quick.',
    },
  },
  // TODO(osher): a WhatsApp case, from memory — the CRM's notes field for
  // WhatsApp cases so far is logistics only ("campaign inactive", a phone
  // number), nothing to draft a real narrative from. Same shape as the two
  // above: errorState, alreadyTried, whatWeDid, priceILS, hoursToOutcome,
  // result, limitations.
];
