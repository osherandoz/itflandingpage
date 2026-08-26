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
  // Newsletter — The Safety Signal subscribe page
  route("newsletter", "./routes/newsletter.jsx"),
  // Phase C — FAQ + Testimonials
  route("faq", "./routes/faq.jsx"),
  route("testimonials", "./routes/testimonials.jsx"),
  // BMS-SM — Course landing page + thank-you pages
  route("bms-sm", "./routes/bms-sm.jsx"),
  // VSL-BMS — Video sales letter for BMS course
  route("VSL-BMS", "./routes/vsl-bms.jsx"),
  // VSL-BMS-V2 — A/B test variant (noindex)
  route("VSL-BMS-V2", "./routes/vsl-bms-v2.jsx"),
  route("תודה-קליסט", "./routes/thank-you-lead.jsx"),
  route("תודה-רכישה", "./routes/thank-you-purchase.jsx"),
  // Internal — private tracking dashboard (noindex)
  route("dashboard", "./routes/dashboard.jsx"),

  // ——— English site (/en/*) — mirrors the Hebrew pages with English slugs ———
  route("en", "./routes/en.home.jsx"),
  route("en/privacy", "./routes/en.privacy.jsx"),
  route("en/press", "./routes/en.press.jsx"),
  route("en/articles", "./routes/en.articles.jsx"),
  route("en/articles/:slug", "./routes/en.articles.$slug.jsx"),
  route("en/facebook-account-recovery", "./routes/en.facebook-recovery.jsx"),
  route("en/instagram-account-recovery", "./routes/en.instagram-recovery.jsx"),
  route("en/whatsapp-account-recovery", "./routes/en.whatsapp-recovery.jsx"),
  route("en/facebook-account-disabled", "./routes/en.facebook-disabled.jsx"),
  route("en/instagram-account-hacked", "./routes/en.instagram-hacked.jsx"),
  route("en/ads-manager-recovery", "./routes/en.ads-manager.jsx"),
  route("en/newsletter", "./routes/en.newsletter.jsx"),
  route("en/faq", "./routes/en.faq.jsx"),
  route("en/testimonials", "./routes/en.testimonials.jsx"),
];
