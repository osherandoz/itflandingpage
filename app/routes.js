import { route, index } from "@react-router/dev/routes";

export default [
  index("./routes/home.jsx"),
  route("privacy", "./routes/privacy.jsx"),
  route("press", "./routes/press.jsx"),
  route("articles", "./routes/articles.jsx"),
  route("articles/:slug", "./routes/articles.$slug.jsx"),
  // Phase C — Dedicated service pages
  route("שחזור-חשבון-פייסבוק", "./routes/facebook-recovery.jsx"),
  route("שחזור-חשבון-אינסטגרם", "./routes/instagram-recovery.jsx"),
  route("שחזור-חשבון-וואטסאפ", "./routes/whatsapp-recovery.jsx"),
  route("חשבון-פייסבוק-מושבת", "./routes/facebook-disabled.jsx"),
  route("חשבון-אינסטגרם-נפרץ", "./routes/instagram-hacked.jsx"),
  route("שחזור-מנהל-מודעות", "./routes/ads-manager.jsx"),
  // Phase C — FAQ + Testimonials
  route("faq", "./routes/faq.jsx"),
  route("testimonials", "./routes/testimonials.jsx"),
  // BMS-SM — Course landing page + thank-you pages
  route("bms-sm", "./routes/bms-sm.jsx"),
  route("תודה-קליסט", "./routes/thank-you-lead.jsx"),
  route("תודה-רכישה", "./routes/thank-you-purchase.jsx"),
];
