// /בדיקת-אבטחה-אינסטגרם: the checks, the click paths and the scoring.
// Brief: docs/security-check-brief.md. Instagram changes its menus often:
// re-check every path against the current app once a quarter and bump UPDATED.
//
// Path sources: `2fa`, `devices` and `apps` come from the site's own guide
// (articles.js, protect-instagram-account). Every path marked
// TODO(verify path) is unconfirmed and must be checked in the app before launch.

export const PATH = '/בדיקת-אבטחה-אינסטגרם';
export const UPDATED = 'אוקטובר 2026';

export const PHISHING_TIP =
  'אם קיבלת מייל שמתיימר להיות מאינסטגרם, אל תלחץ על הקישור שבו. היכנס לאפליקציה ובדוק משם.';

// Array order = priority (first = most urgent). `agency` items show only to agency readers.
export const CHECKS = [
  {
    id: 'email',
    title: 'המייל המחובר שייך לך ופעיל',
    why: 'בלי גישה למייל המחובר, שחזור הופך לכמעט בלתי אפשרי. ופורץ שהחליף מייל נועל אותך בחוץ',
    // TODO(verify path)
    steps: ['הגדרות ופעילות', 'מרכז החשבונות', 'פרטים אישיים', 'פרטי יצירת קשר'],
    tip: PHISHING_TIP,
  },
  {
    id: 'phone',
    title: 'מספר הטלפון המחובר עדכני',
    why: 'טלפון ישן או מספר שכבר לא אצלך הוא הסיבה הנפוצה לכישלון שחזור',
    // TODO(verify path)
    steps: ['הגדרות ופעילות', 'מרכז החשבונות', 'פרטים אישיים', 'פרטי יצירת קשר'],
  },
  {
    id: '2fa',
    title: 'אימות דו-שלבי באפליקציית אימות (לא SMS)',
    why: 'הודעות SMS ניתנות ליירוט. אפליקציה היא הגנה חזקה בהרבה',
    steps: ['הגדרות ופעילות', 'מרכז החשבונות', 'סיסמה ואבטחה', 'אימות דו-שלבי'],
    tip: PHISHING_TIP,
  },
  {
    id: 'password',
    title: 'סיסמה ייחודית שלא משמשת בשום מקום אחר',
    why: 'סיסמה שדלפה מאתר אחר היא הדרך השכיחה ביותר להיפרץ',
    // TODO(verify path)
    steps: ['הגדרות ופעילות', 'מרכז החשבונות', 'סיסמה ואבטחה', 'שינוי סיסמה'],
    tip: 'אם אותה סיסמה משמשת אותך גם באתר אחר, החלף אותה כאן. אנחנו לא שואלים מה הסיסמה, ואף אחד לא צריך לדעת אותה.',
  },
  {
    id: 'devices',
    title: 'אין מכשיר מחובר שאתה לא מכיר',
    why: 'מכשיר זר ברשימה אומר שמישהו כבר נכנס. אפשר להתנתק ממנו מיד',
    steps: ['הגדרות ופעילות', 'מרכז החשבונות', 'סיסמה ואבטחה', 'היכן אתה מחובר'],
  },
  {
    id: 'backup_codes',
    title: 'קודי גיבוי של האימות הדו-שלבי שמורים במקום בטוח',
    why: 'טלפון אבד או הוחלף בלי הקודים = נעילה מהחשבון שלך',
    // TODO(verify path)
    steps: ['הגדרות ופעילות', 'מרכז החשבונות', 'סיסמה ואבטחה', 'אימות דו-שלבי', 'בחירת החשבון', 'שיטות נוספות', 'קודי גיבוי'],
  },
  {
    id: 'apps',
    title: 'אפליקציות ואתרים מחוברים: הסרת כל מה שלא מכירים',
    why: 'אפליקציית צד שלישי ישנה היא דלת פתוחה',
    steps: ['הגדרות ופעילות', 'הרשאות אתרים', 'אפליקציות ואתרים'],
  },
  {
    id: 'roles',
    agency: true,
    title: 'ברור מי בדיוק מנהל כל נכס של הלקוח',
    why: 'מנהל ישן או סוכנות שעזבה עדיין רשומים בנכס, וזה הסיכון הכי נפוץ אצל מי שמנהל חשבונות של אחרים',
    // TODO(verify path)
    steps: ['מנהל העסקים של מטא (business.facebook.com)', 'הגדרות', 'משתמשים', 'אנשים ושותפים'],
  },
  {
    id: 'ownership',
    agency: true,
    title: 'הלקוח הוא הבעלים של הנכס, לא אתה',
    why: 'אם הנכס רשום על החשבון האישי שלך, חסימה שלך חוסמת את הלקוח',
    // TODO(verify path)
    steps: ['מנהל העסקים של מטא (business.facebook.com)', 'הגדרות', 'חשבונות', 'חשבונות אינסטגרם', 'מי הבעלים של הנכס'],
  },
];

export const visibleChecks = (segment) => CHECKS.filter((c) => !c.agency || segment === 'agency');

// marks: { [id]: 'ok' | 'fix' }. Unmarked checks count as "not checked" (not ok).
export function score(segment, marks) {
  const list = visibleChecks(segment);
  const total = list.length;
  const ok = list.filter((c) => marks[c.id] === 'ok').length;
  const marked = list.filter((c) => marks[c.id]).length;
  const pct = ok / total;
  const level = pct >= 0.8 ? 'high' : pct >= 0.5 ? 'medium' : 'low';
  const urgent = list.filter((c) => marks[c.id] === 'fix').slice(0, 3);
  return { total, ok, marked, unchecked: total - marked, level, urgent };
}

export const LEVELS = {
  high: { label: 'רמת הגנה גבוהה', text: 'החשבון מוגן היטב. כדאי לחזור על הבדיקה פעם ברבעון.' },
  medium: { label: 'רמת הגנה בינונית', text: 'יש כמה פרצות שכדאי לסגור השבוע.' },
  low: { label: 'רמת הגנה נמוכה', text: 'החשבון חשוף. כדאי לתקן את הדחופים היום.' },
};

export const FAQS = [
  { q: 'האם אתם רואים מה אני מסמן?', a: 'לא. הכל נשאר בדפדפן שלך.' },
  { q: 'כמה זמן זה לוקח?', a: 'כחמש דקות. אפשר להפסיק ולחזור, והבחירות נשמרות בדפדפן.' },
  {
    q: 'למה אימות דו-שלבי באפליקציה ולא ב-SMS?',
    a: 'הודעות SMS אפשר ליירט או להעביר למספר אחר. אפליקציית אימות קשורה למכשיר שלך.',
  },
  {
    q: 'אני כבר חסום או שפרצו לי. זה יעזור?',
    a: 'לא בזמן אמת. הבדיקה בנויה למניעה. אם זה קורה עכשיו, כתוב לנו בוואטסאפ.',
  },
  { q: 'האם הבדיקה מתאימה גם לפייסבוק?', a: 'כרגע אינסטגרם בלבד. פייסבוק ווואטסאפ יתווספו.' },
];
