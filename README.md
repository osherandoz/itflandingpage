# Landing Page - Israel Tech Force

אתר נחיתה מודרני עם מדיניות פרטיות וטופס יצירת קשר.

## תכונות עיקריות

### 🔒 מדיניות פרטיות
- מודל מדיניות פרטיות בעברית
- מופיע לכל משתמש חדש
- שמירת הסכמה ב-localStorage
- עיצוב מותאם למובייל

### 📞 טופס יצירת קשר
- שדות: שם מלא, דוא"ל, טלפון, תיאור בעיה
- אימות טופס מלא
- הסכמה ליצירת קשר
- עיצוב רספונסיבי

### 📱 עיצוב מותאם למובייל
- תמיכה מלאה במכשירים ניידים
- עיצוב רספונסיבי
- חוויית משתמש מותאמת

## התקנה והרצה

```bash
# התקנת תלויות
npm install

# הרצת השרת המקומי
npm run dev

# בנייה לפרודקשן
npm run build
```

## מבנה הפרויקט

```
src/
├── components/
│   ├── PrivacyPolicy.jsx    # מודל מדיניות פרטיות
│   ├── ContactForm.jsx      # טופס יצירת קשר
│   ├── Modal.jsx           # רכיב מודל כללי
│   └── ...                 # רכיבים נוספים
├── App.jsx                 # רכיב ראשי
└── ...
```

## שימוש

1. **מדיניות פרטיות**: מופיעה אוטומטית למשתמשים חדשים
2. **טופס יצירת קשר**: נגיש דרך תפריט הניווט "צור קשר"
3. **שמירת נתונים**: הסכמה למדיניות נשמרת ב-localStorage

## טכנולוגיות

- React 19
- Vite
- CSS3 עם Flexbox/Grid
- LocalStorage לניהול מצב

## Api Keys:
 - MailerLite: eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZjMzZWVhMzEzMWQ5NjBhYTk0ZmZjNjllZWEzYTM3NTM2NTllZWRkYTFhOTcyYjMwZjRhYTk0MDEyMDZlZTNiODUwZGQ1YTY3ZDA1ZmYyMGUiLCJpYXQiOjE3NTgwMDUxNTIuMDkyNjg3LCJuYmYiOjE3NTgwMDUxNTIuMDkyNjg5LCJleHAiOjQ5MTM2Nzg3NTIuMDg4NDIzLCJzdWIiOiIxNzY4MzM0Iiwic2NvcGVzIjpbXX0.DP2_y1Ib30f5dYJKVaejqRZYuaGkmJ8qFaI5bjMADNRMDkGsJCTcMnV8tGQ-tRDsOGEULDLvzj2bVymMjFdfow4ydSG0g0s7ldXbRrXk9aoxkrzJrSnx1poaryxYYcdPnWcHQybr1TK_8FAcg-7jxKIJ9mm5f7xDVz6u4RH_QCNppJUngqcqZ943HkiWxnfe9bv32X-r3iVZs-Bpg3QH4chIMRlv-xn1_d002qrKezgDcACf0gXC6gGa7AF9leDO3Fr3fQhrjWJvW_WcWLM9DADcC8kek2E-IW5cWs63sA0EJklq8n8jISL5emlEPR985bE_RftAUWcpfC4MMHcUcRrme6S-IMsP0-hmG_SKD5G101ydQ5QK8P_dxa74Ufp_TXgMyM3tXhs1NlWxmxvS1I--9XMvDpAQx_RghPrUirZbGmc1mro9yiyjizAO-XEK4qUSQ1xNrWZx3gcDCUn_nvk0KJVqB9Vbug409TROPjqv5kXt8DB4w2wdn3xRPdS6PBSem25UwQ_Lbh5oGwuRsOc1sAsbdD99BCzJ7iPKGyY0dWXLPUov8Oxc-Tp3MiBHKrZRU5R0KgAbtnZTjeq8ow7dQX0XhzbAaTpOZ59M-yTAwQ0OcNI-Cw-uijyyJdQD3Kc0fuCQaEyeUZaNV1WU5jmZDz0UPSRcQJIQgQd1ilk

