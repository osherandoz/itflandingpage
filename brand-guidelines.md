# IsraelTechForce — שפת מותג

מסמך מותג · גרסה 1.0
מקור אמת: `DESIGN.md`

---

## 01. פלטת הצבעים

רמפה כחולה סטרוקטורלית אחת עושה את כל העבודה. כל השאר — תשתית כהה או טקסט. כחול מופיע רק במקום שדורש פעולה או סמכות, לא כקישוט.

### ראשי — Structural Blue

| שם | Hex | שימוש |
|---|---|---|
| Deep Infrastructure | `#1E40AF` | בסיס גרדיאנטים, hover עמוק |
| Signal Blue | `#2563EB` | רקע CTA ראשי |
| Active Thread | `#3B82F6` | הדגשות אינטראקטיביות |
| Interface Glow | `#60A5FA` | זוהר, focus ring — לא כמילוי שטח |

### ניטרלי — תשתית כהה

| שם | Hex | שימוש |
|---|---|---|
| Command Black | `#050709` | רקע בסיס |
| Midnight Slate | `#0C1018` | סקשנים משניים |
| Deep Slate | `#131824` | משטח ביניים |
| Card Surface | `#1A1F2E` | רקע כרטיסים |

### ניטרלי — סקשנים בהירים

| שם | Hex | שימוש |
|---|---|---|
| Light Canvas | `#F5F7FA` | סקשן הזמנה / מסגרת |
| Night Ink | `#0F172A` | טקסט על רקע בהיר בלבד |

### סקלת טקסט

| שם | Hex | שימוש |
|---|---|---|
| Stark White | `#FFFFFF` | טקסט ראשי על כהה |
| Mist Text | `#E2E8F0` | טקסט משני |
| Storm Text | `#CBD5E1` | גוף טקסט ארוך |
| Muted Slate | `#94A3B8` | תוויות, מטא־דאטה |
| Dim Slate | `#64748B` | הערות שוליים |

### אקצנטים סמנטיים

| שם | Hex | שימוש |
|---|---|---|
| Alert Red | `#EF4444` | כשל, סימון מחיקה |
| Danger Deep | `#DC2626` | סכנה עמוקה |
| Warning Amber | `#F97316` | גרדיאנטים בלבד |
| Confirm Green | `#10B981` | מצב הצלחה |
| Bonus Gold | `#FBBF24` | בונוסים בלבד |

---

## 02. טיפוגרפיה

שלוש משפחות, שלושה תפקידים. Heebo 900 לסמכות, Assistant 400 למידע, Frank Ruhl Libre לרגע רגשי — לא מתחרות אף פעם.

| תפקיד | גופן / משקל | גודל (clamp) | line-height | letter-spacing |
|---|---|---|---|---|
| Display (H1 בלבד) | Heebo 900 | 32–56px | 1.15 | -0.035em |
| Headline (H2) | Heebo 900 | 30–48px | 1.15 | -0.03em |
| Title (תת־כותרות) | Heebo 900 | 22–34px | 1.2 | -0.025em |
| Body (גוף טקסט) | Assistant 400 | 16–19px | 1.7 | normal |
| Quote (פעם אחת בעמוד) | Frank Ruhl Libre 700 | 22–32px | 1.4 | 0 |
| Label (תוויות/פילים) | Heebo 700 | 12px | 1 | 0.18em, uppercase |

**כלל צוק המשקלים:** רק 900 (כותרות), 700 (תוויות/CTA/ציטוט), 400 (גוף). אין 600 בהיררכיה ראשית.

**כלל ה־clamp:** כל גודל גופן חייב clamp(). פיקסלים קבועים מותרים רק ב־mobile override.

**כלל ה־tracking:** כותרות Heebo 900 מקבלות letter-spacing שלילי, מינימום -0.025em — אחרת נראה חובבני.

---

## 03. רכיבים

**צורה אחת לכפתורים:** פיל מלא, `border-radius: 60px`. שום וריאציה מרובעת.

- **כפתור ראשי:** גרדיאנט `linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #3B82F6 100%)`, טקסט Stark White במשקל 800.
- **Hover:** `translateY(-2px)` + זוהר כחול מורחב.
- **Focus:** `outline: 3px solid #60A5FA`, לעולם לא מוסר.
- **תווית סקשן (chip):** רקע Card Surface, גבול `rgba(96,165,250,0.2)`, טקסט Muted Slate 14px.
- **נקודות ציר (timeline dots):** 16px עיגול, צבע לפי מיקום מודול — אדום → כתום → זהב → ירוק → כחול.
- **FAQ:** `<details>/<summary>` נייטיב, בלי JS. פתוח = רקע `rgba(96,165,250,0.06)`.

---

## 04. רדיוסים ומרווחים

| טוקן | ערך |
|---|---|
| `rounded-sm` | 8px |
| `rounded-md` | 16px |
| `rounded-lg` | 24px |
| `rounded-pill` | 60px |
| `section-desktop` | 100px |
| `section-mobile` | 60px |

---

## 05. כללי שימוש

### Do
- Tracking שלילי על כל כותרת Heebo 900 — מינימום ‎-0.025em.
- clamp() על כל גודל גופן. פיקסלים קבועים רק ב־mobile override.
- עומק טונלי — כל שכבה קלה יותר מקבלת גבול או סיבה מבנית.
- drop-shadow() לאנימציות זוהר, לא box-shadow.
- logical properties (‎inset-inline-start וכו') לפריסת RTL.

### Don't
- Gradient text — הוסר מהפרויקט, לא חוזר.
- צבע אקצנט שני מתחרה בכחול. Bonus Gold הוא היוצא היחיד.
- אפור מושתק (Muted Slate) על רקע כחול רווי או גרדיאנט.
- טיימר ספירה לאחור או אנימציית דחיפות מכל סוג.
- `transition: all` — לפרט רק את המאפיינים שבאמת משתנים.

---

*ISRAELTECHFORCE · BRAND SYSTEM V1 · מקור: DESIGN.md*
