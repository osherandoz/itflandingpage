# היררכיית האתר + מפת משפך — israeltechforce.com

עודכן: 2026-08-27 · מקור אמת: `app/routes.js`, `src/data/servicePages.js`, `public/sitemap.xml`

---

## 1. היררכיה — עברית (ראשי)

```
/  (Home — src/pages/Home.jsx)
│
├── מוצרי שירות (Service Pages) — תבנית אחת: src/components/ServicePage.jsx
│   ├── /שחזור-חשבון-פייסבוק        slug: facebook-recovery    kw: שחזור חשבון פייסבוק
│   ├── /שחזור-חשבון-אינסטגרם       slug: instagram-recovery   kw: שחזור חשבון אינסטגרם
│   ├── /שחזור-חשבון-וואטסאפ        slug: whatsapp-recovery    kw: שחזור חשבון וואטסאפ
│   ├── /חשבון-פייסבוק-מושבת        slug: facebook-disabled    kw: חשבון פייסבוק מושבת
│   ├── /חשבון-אינסטגרם-נפרץ        slug: instagram-hacked     kw: אינסטגרם נפרץ
│   └── /שחזור-מנהל-מודעות          slug: ads-manager          kw: מנהל מודעות חסום
│
├── מוצר דיגיטלי (קורס BMS, ₪197)
│   ├── /bms-sm          לא דף מכירה — דף לכידת ליד (צ׳קליסט חינם)
│   ├── /VSL-BMS         דף מכירה VSL (indexed)
│   ├── /VSL-BMS-V2      וריאנט A/B (noindex, nofollow)
│   ├── /תודה-קליסט      thank-you ליד   (noindex) — fbq: Lead
│   └── /תודה-רכישה      thank-you רכישה (noindex) — fbq: Purchase ₪197
│
├── תוכן / אמון (Support layer)
│   ├── /articles                 (9 מאמרים)
│   │   ├── /articles/whatsapp-unblock
│   │   ├── /articles/facebook-account-disabled
│   │   ├── /articles/instagram-hacked-recovery
│   │   ├── /articles/shadowban-instagram-2025
│   │   ├── /articles/whatsapp-recovery-guide
│   │   ├── /articles/ads-manager-blocked
│   │   ├── /articles/facebook-disabled-vs-limited
│   │   ├── /articles/protect-instagram-account
│   │   └── /articles/facebook-recovery-no-email-phone
│   ├── /faq
│   ├── /testimonials
│   ├── /press
│   └── /newsletter          (The Safety Signal → Smoove)
│
├── /privacy
└── /dashboard               פנימי, noindex, Disallow ב-robots
```

## 2. היררכיה — אנגלית (/en/*)

מראה מלאה של 6 דפי המוצר + תוכן. **אין** מקבילה אנגלית ל-bms-sm / VSL / thank-you.

```
/en
├── /en/facebook-account-recovery
├── /en/instagram-account-recovery
├── /en/whatsapp-account-recovery
├── /en/facebook-account-disabled
├── /en/instagram-account-hacked
├── /en/ads-manager-recovery
├── /en/articles  (+ 9 slugs זהים לעברית)
├── /en/faq
├── /en/testimonials
├── /en/press
├── /en/newsletter
└── /en/privacy
```

hreflang: he ↔ en ↔ x-default(he) — מוגדר ב-`src/i18n/index.js`, מוזרק בכל route.

---

## 3. אנטומיה של דף מוצר שירות (זהה ב-6 הדפים)

| בלוק | מקור תוכן | ייחודי לדף? |
|---|---|---|
| Hero: H1 + subtitle + CTA וואטסאפ | `title` + מחרוזת קבועה | H1 בלבד |
| Stats strip (2,500+ / 95%+ / 24-48 / 4.9★) | קשיח בקומפוננטה | ❌ זהה |
| "מה זה ולמה זה קורה" | `whatIsIt` (HTML) | ✅ ~120 מילים |
| 3 שלבים | `steps[]` | ✅ ~60 מילים |
| 3 המלצות | `testimonialIds` מתוך 6 קבועות | ❌ סבב מאותו מאגר |
| FAQ (5–6) | `faqs[]` | ✅ ~110 מילים |
| מאמרים קשורים | `relatedArticles[]` | ✅ 1–3 קישורים |
| CTA סופי | מחרוזת קבועה | ❌ זהה |

**נפח תוכן ייחודי לדף:** 259–320 מילים בלבד.

| דף | מילים ייחודיות | FAQ | מאמרים קשורים |
|---|---|---|---|
| facebook-recovery | 280 | 5 | 3 |
| instagram-recovery | 278 | 5 | 3 |
| whatsapp-recovery | 259 | 5 | 2 |
| facebook-disabled | 268 | 5 | 2 |
| instagram-hacked | 269 | 5 | 2 |
| ads-manager | 320 | 6 | 1 |

Schema לכל דף מוצר: `Service` + `FAQPage` + `HowTo` + `BreadcrumbList` (+2 גלובליים מה-root) = 6 בלוקים.

---

## 4. מפת המשפך בפועל (מה שקיים היום)

```
       מודעות / אורגני
              │
   ┌──────────┼───────────────────────┬──────────────────────┐
   ▼          ▼                       ▼                      ▼
 Home    דף שירות (×6)            מאמר (×9)             /VSL-BMS
   │          │                       │                      │
   │          ├─ Footer → 6 דפי שירות │                      │
   │          ├─ → מאמר קשור ─────────┘                      │
   │          │                       └─ CTA → וואטסאפ בלבד  │
   │          │                          (אין חזרה לדף מוצר) │
   ▼          ▼                                              ▼
ContactForm  WhatsApp                                  mrng.to (₪197)
StickyCTA    (בלבד)                                          │
   │            │                                            ▼
   ▼            ▼                                      /תודה-רכישה
/api/lead   שיחה ידנית                              (fbq Purchase)
(Apps Script)                                               │
                                                     ▼ (מבוי סתום)

  /bms-sm ──► /api/bms-lead ──► /תודה-קליסט ──► ✖ אין המשך
 (צ׳קליסט                       (fbq Lead)      (רק "חזרה ל-bms-sm")
  חינם)

  /newsletter ──► Smoove ──► ✖ אין thank-you ייעודי
```

### קצוות שקיימים
| מאיפה | לאן | סוג |
|---|---|---|
| Home → 6 דפי שירות | `Services.jsx` + `Footer.jsx` | `<Link>` |
| דף שירות → מאמרים | `relatedArticles` | `<Link>` |
| דף שירות → 6 דפי שירות + bms-sm + VSL-BMS | Footer בלבד | `<Link>` |
| מאמר → וואטסאפ | CTA box | `<a>` חיצוני |
| VSL-BMS / V2 → mrng.to | PURCHASE_URL | `<a>` חיצוני |
| bms-sm → /api/bms-lead → /תודה-קליסט | טופס | redirect |

### קצוות שחסרים (חורי משפך)
1. **מאמר → דף שירות**: אפס. כל מאמר קופץ לוואטסאפ ומדלג על דף המכירה.
2. **דף שירות → דף שירות**: אין קישור בגוף התוכן (רק Footer).
3. **/תודה-קליסט → כלום**: אין אפסייל ל-₪197, אין VSL, אין וואטסאפ.
4. **דף שירות → לכידת ליד**: אין טופס. וואטסאפ או כלום. אין רשימת רימרקטינג.
5. **bms-sm → VSL-BMS**: הליד מגנט לא מוביל לדף המכירה של אותו מוצר.
6. **/en/* → מוצר הקורס**: אין. תנועה אנגלית מגיעה רק לשירות ידני.

---

## 5. נכסי מדידה קיימים

| אירוע | איפה נורה | ערוץ |
|---|---|---|
| `whatsapp_click` | כל CTA וואטסאפ | GA + CRM (`trackSiteEvent`) |
| `ViewContent` / `page_view_bms` | bms-sm | fbq + gtag |
| `CTAClick` | VSL-BMS (גלילה ל-CTA) | fbq custom |
| `InitiateCheckout` ₪197 | לחיצה על רכישה | fbq |
| `Lead` | /תודה-קליסט, /newsletter | fbq |
| `Purchase` ₪197 | /תודה-רכישה | fbq + gtag (`transaction_id`) |

חסר: אירועי CRM (`trackSiteEvent`) בדפי BMS/VSL — הם מדווחים רק ל-Meta/GA.

---

## 6. הצעת ארכיטקטורת משפך (למילוי החורים)

```
TOFU   מאמר / רילס / חיפוש
         └─► דף שירות רלוונטי   ← להוסיף קישור מכל מאמר
MOFU   דף שירות
         ├─► וואטסאפ (קיים)
         └─► טופס "אבחון חינם" ← להוסיף (רשימת רימרקטינג)
BOFU   שיחה → הצעה → תשלום

מסלול מוצר דיגיטלי:
TOFU   רילס / קהילה → /bms-sm (צ׳קליסט)
       └─► /תודה-קליסט ──► הצעת ₪197 + כפתור ל-/VSL-BMS  ← להוסיף
MOFU   /VSL-BMS → mrng.to
BOFU   /תודה-רכישה ──► אונבורדינג + הצעת שירות שחזור      ← להוסיף
```

---

## 7. עמודים חסרים בסייטמאפ / robots

- Sitemap כולל 46 URL. חסרים: `/VSL-BMS-V2` (מכוון, noindex), thank-you (מכוון).
- `robots.txt` חוסם: `/dashboard`, `/api/`, `/VSL-BMS-V2`, שני דפי התודה.
- **`/bms-sm` ו-`/VSL-BMS` בסייטמאפ ללא מקבילה אנגלית** — אין hreflang עליהם.
