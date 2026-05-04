import './Dashboard.css';

/* ============================================================
   רשימה מרכזית של כל מה שעבדנו עליו.
   רוצה להוסיף משימה? פשוט ערוך את המערך המתאים פה למטה.
   סטטוסים: 'live' | 'wip' | 'todo' | 'idea' | 'blocked'
   ============================================================ */

const LANDING_PAGES = [
  {
    title: 'דף הבית הראשי',
    path: '/',
    desc: 'הדף הראשי של IsraelTechForce — שירותי שחזור חשבונות.',
    status: 'live',
  },
  {
    title: 'קורס BMS — דף לקהל מנהלות סושיאל',
    path: '/bms-sm',
    desc: 'דף מכירה לקורס BMS עם פוקוס על מנהלות סושיאל. ₪197.',
    status: 'live',
  },
  {
    title: 'קורס BMS — דף VSL חדש',
    path: '/VSL-BMS',
    desc: 'דף מכירה עם וידאו VSL בראש (3 מקרים אמיתיים). הדף שעבדנו עליו עכשיו.',
    status: 'wip',
    note: 'צריך: לינק וידאו, לינק תשלום, 4 תמונות, Pixel ID',
  },
  {
    title: 'שחזור חשבון פייסבוק',
    path: '/שחזור-חשבון-פייסבוק',
    desc: 'דף נחיתה ייעודי לשירות שחזור פייסבוק.',
    status: 'live',
  },
  {
    title: 'שחזור חשבון אינסטגרם',
    path: '/שחזור-חשבון-אינסטגרם',
    desc: 'דף נחיתה ייעודי לשירות שחזור אינסטגרם.',
    status: 'live',
  },
  {
    title: 'שחזור חשבון וואטסאפ',
    path: '/שחזור-חשבון-וואטסאפ',
    desc: 'דף נחיתה ייעודי לשירות שחזור וואטסאפ.',
    status: 'live',
  },
  {
    title: 'חשבון פייסבוק מושבת',
    path: '/חשבון-פייסבוק-מושבת',
    desc: 'דף נחיתה למישהו שהחשבון שלו הושבת.',
    status: 'live',
  },
  {
    title: 'חשבון אינסטגרם נפרץ',
    path: '/חשבון-אינסטגרם-נפרץ',
    desc: 'דף נחיתה למישהו שהאינסטגרם שלו נפרץ.',
    status: 'live',
  },
  {
    title: 'שחזור מנהל מודעות',
    path: '/שחזור-מנהל-מודעות',
    desc: 'דף נחיתה לשחזור Ads Manager / חשבון מודעות.',
    status: 'live',
  },
];

const SECONDARY_PAGES = [
  { title: 'שאלות ותשובות (FAQ)', path: '/faq', desc: '20 שאלות נפוצות ב-5 קטגוריות.', status: 'live' },
  { title: 'המלצות לקוחות', path: '/testimonials', desc: '6 חוות דעת + דירוג ממוצע 4.9/5.', status: 'live' },
  { title: 'מאמרים — דף ראשי', path: '/articles', desc: 'רשימה של כל המאמרים באתר.', status: 'live' },
  { title: 'תודה על פנייה (ליד)', path: '/תודה-קליסט', desc: 'דף תודה אחרי השארת פרטים.', status: 'live' },
  { title: 'תודה על רכישה', path: '/תודה-רכישה', desc: 'דף תודה אחרי תשלום על קורס.', status: 'live' },
  { title: 'מדיניות פרטיות', path: '/privacy', desc: 'דף משפטי — חובה לתאימות לחוק.', status: 'live' },
  { title: 'עיתונות', path: '/press', desc: 'אזכורים בעיתונות.', status: 'live' },
];

const ARTICLES = [
  { title: 'חשבון פייסבוק מושבת — מה עושים?', slug: 'facebook-account-disabled' },
  { title: 'אינסטגרם נפרץ — איך משחזרים', slug: 'instagram-hacked-recovery' },
  { title: 'שאדו-באן באינסטגרם 2026', slug: 'shadowban-instagram-2025' },
  { title: 'מדריך שחזור וואטסאפ', slug: 'whatsapp-recovery-guide' },
  { title: 'מנהל מודעות נחסם', slug: 'ads-manager-blocked' },
  { title: 'פייסבוק מושבת מול מוגבל — ההבדל', slug: 'facebook-disabled-vs-limited' },
  { title: 'איך מגנים על אינסטגרם', slug: 'protect-instagram-account' },
  { title: 'שחזור פייסבוק בלי מייל וטלפון', slug: 'facebook-recovery-no-email-phone' },
];

const INTEGRATIONS = [
  {
    title: 'Smoove — איסוף לידים',
    desc: 'כשמישהו ממלא טופס באתר, הוא נכנס אוטומטית לרשימה ב-Smoove (ID: 1131098).',
    status: 'live',
  },
  {
    title: 'MailerLite — רשימת תפוצה',
    desc: 'אינטגרציה למשלוח מיילים ללקוחות.',
    status: 'live',
  },
  {
    title: 'Google Apps Script',
    desc: 'סקריפטים אוטומטיים לניהול נתונים.',
    status: 'live',
  },
  {
    title: 'Vercel — אוטומציית פריסה',
    desc: 'כל שינוי שעולה ל-main מתפרסם אוטומטית באתר.',
    status: 'live',
  },
  {
    title: 'Vercel Analytics',
    desc: 'מעקב אחרי ביקורים בכל הדפים.',
    status: 'live',
  },
];

const OPEN_TASKS = [
  {
    title: 'להעלות לינק וידאו ל-VSL-BMS',
    desc: 'אחרי שתסיים להקליט את ה-VSL — להחליף את ה-placeholder בקובץ VslBms.jsx.',
    status: 'todo',
  },
  {
    title: 'להעלות לינק תשלום ל-VSL-BMS',
    desc: 'לינק חשבונית ירוקה / Smoove במקום ה-#.',
    status: 'todo',
  },
  {
    title: 'להעלות 4 תמונות לדף VSL-BMS',
    desc: 'תמונת hero, תמונת אושר, ו-3 תמונות לסטורי. צריך להעלות ל-public/images/vsl-bms/.',
    status: 'todo',
  },
  {
    title: 'להגדיר Pixel ID של פייסבוק',
    desc: 'יש סקריפט מוכן בדף — צריך רק להחליף YOUR_PIXEL_ID במזהה האמיתי.',
    status: 'todo',
  },
  {
    title: 'הגשת sitemap מעודכן ל-Google Search Console',
    desc: 'להגיש את https://www.israeltechforce.com/sitemap.xml + לבקש indexing לדפים החדשים.',
    status: 'todo',
  },
  {
    title: 'תיקוני lint קטנים',
    desc: '49 שגיאות lint ישנות בקבצים קיימים (לא קריטי, אבל כדאי לסדר).',
    status: 'idea',
  },
];

const STATUS_LABELS = {
  live: 'באוויר',
  wip: 'בעבודה',
  todo: 'לעשות',
  idea: 'רעיון',
  blocked: 'תקוע',
};

function StatusPill({ status }) {
  return <span className={`status ${status}`}>{STATUS_LABELS[status]}</span>;
}

function Item({ title, path, desc, status, note }) {
  return (
    <div className="dashboard-item">
      <StatusPill status={status} />
      <div className="body">
        <div className="title">{title}</div>
        <div className="desc">
          {desc}
          {path && (
            <>
              {' '}
              <span className="path">{path}</span>
            </>
          )}
          {note && (
            <div style={{ marginTop: 6, color: 'var(--yellow)', fontSize: 13 }}>📌 {note}</div>
          )}
        </div>
      </div>
      {path ? (
        <a className="open-link" href={path} target="_blank" rel="noopener noreferrer">
          פתח ←
        </a>
      ) : (
        <span className="no-link">—</span>
      )}
    </div>
  );
}

export default function Dashboard() {
  const totalLive = [...LANDING_PAGES, ...SECONDARY_PAGES, ...INTEGRATIONS].filter(
    (i) => i.status === 'live'
  ).length;
  const totalTodo = OPEN_TASKS.length;
  const totalArticles = ARTICLES.length;
  const totalLandingPages = LANDING_PAGES.length;

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        {/* HEADER */}
        <div className="dashboard-header">
          <h1>📋 לוח המעקב של אושר</h1>
          <p>כל מה שעבדנו עליו, מסודר במקום אחד.</p>
          <span className="updated">עודכן לאחרונה: 03/05/2026</span>
        </div>

        {/* STATS */}
        <div className="dashboard-stats">
          <div className="dashboard-stat">
            <div className="num">{totalLive}</div>
            <div className="label">דברים באוויר ✅</div>
          </div>
          <div className="dashboard-stat">
            <div className="num">{totalLandingPages}</div>
            <div className="label">דפי נחיתה 🌐</div>
          </div>
          <div className="dashboard-stat">
            <div className="num">{totalArticles}</div>
            <div className="label">מאמרים בבלוג ✍️</div>
          </div>
          <div className="dashboard-stat">
            <div className="num">{totalTodo}</div>
            <div className="label">משימות פתוחות 📝</div>
          </div>
        </div>

        {/* LEGEND */}
        <div className="dashboard-legend">
          <div className="legend-item"><StatusPill status="live" /> = עובד באתר</div>
          <div className="legend-item"><StatusPill status="wip" /> = בבנייה כרגע</div>
          <div className="legend-item"><StatusPill status="todo" /> = צריך לעשות</div>
          <div className="legend-item"><StatusPill status="idea" /> = רעיון לעתיד</div>
          <div className="legend-item"><StatusPill status="blocked" /> = תקוע, מחכה למשהו</div>
        </div>

        {/* OPEN TASKS — first because it's most important */}
        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <span className="icon">📝</span>
            <h2>משימות פתוחות — מה צריך לעשות עכשיו</h2>
            <span className="count">{OPEN_TASKS.length}</span>
          </div>
          <div className="dashboard-list">
            {OPEN_TASKS.map((t, i) => <Item key={i} {...t} />)}
          </div>
          <div className="dashboard-note">
            <strong>איך זה עובד:</strong> כל פעם שאנחנו פותחים משהו חדש או מסיימים משהו —
            אני אעדכן את הרשימה הזו. אתה תמיד יכול להיכנס לכאן ולראות את התמונה המלאה.
          </div>
        </section>

        {/* LANDING PAGES */}
        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <span className="icon">🌐</span>
            <h2>דפי נחיתה — דפים שמוכרים</h2>
            <span className="count">{LANDING_PAGES.length}</span>
          </div>
          <div className="dashboard-list">
            {LANDING_PAGES.map((p, i) => <Item key={i} {...p} />)}
          </div>
        </section>

        {/* SECONDARY PAGES */}
        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <span className="icon">📄</span>
            <h2>דפים פנימיים — תמיכה ותוכן</h2>
            <span className="count">{SECONDARY_PAGES.length}</span>
          </div>
          <div className="dashboard-list">
            {SECONDARY_PAGES.map((p, i) => <Item key={i} {...p} />)}
          </div>
        </section>

        {/* ARTICLES */}
        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <span className="icon">✍️</span>
            <h2>מאמרים בבלוג</h2>
            <span className="count">{ARTICLES.length}</span>
          </div>
          <div className="dashboard-list">
            {ARTICLES.map((a, i) => (
              <Item
                key={i}
                title={a.title}
                path={`/articles/${a.slug}`}
                desc="מאמר SEO באתר."
                status="live"
              />
            ))}
          </div>
        </section>

        {/* INTEGRATIONS */}
        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <span className="icon">🔌</span>
            <h2>אינטגרציות וכלים — מה מחובר לאתר</h2>
            <span className="count">{INTEGRATIONS.length}</span>
          </div>
          <div className="dashboard-list">
            {INTEGRATIONS.map((it, i) => <Item key={i} {...it} />)}
          </div>
        </section>

        {/* FOOTER NOTE */}
        <div className="dashboard-note" style={{ marginTop: 40, textAlign: 'center', borderRight: 'none', borderTop: `3px solid var(--blue-bright)` }}>
          <strong>🔒 הדף הזה פרטי</strong> — הוא לא מופיע בגוגל ואי אפשר להגיע אליו דרך התפריט.
          רק מי שיודע את הכתובת המדויקת (<span className="path" style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: 6 }}>/dashboard</span>) יכול לראות אותו.
        </div>
      </div>
    </div>
  );
}
