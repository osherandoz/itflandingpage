---
name: IsraelTechForce BMS VSL
description: Dark, composed sales infrastructure for a Meta Business Manager protection course by Osher Ravach
colors:
  # Primary — Structural Blue ramp (darkest to lightest)
  deep-infrastructure: "#1e40af"
  signal-blue: "#2563eb"
  active-thread: "#3b82f6"
  interface-glow: "#60a5fa"
  # Neutral dark — tonal background progression
  command-black: "#050709"
  midnight-slate: "#0c1018"
  deep-slate: "#131824"
  card-surface: "#1a1f2e"
  # Neutral light — light sections only
  light-canvas: "#f5f7fa"
  light-white: "#ffffff"
  # Text scale
  stark-white: "#ffffff"
  mist-text: "#e2e8f0"
  storm-text: "#cbd5e1"
  muted-slate: "#94a3b8"
  dim-slate: "#64748b"
  night-ink: "#0f172a"
  # Semantic accents
  alert-red: "#ef4444"
  danger-deep: "#dc2626"
  warning-amber: "#f97316"
  confirm-green: "#10b981"
  bonus-gold: "#fbbf24"
typography:
  display:
    fontFamily: "'Heebo', 'Assistant', sans-serif"
    fontSize: "clamp(32px, 5.6vw, 56px)"
    fontWeight: 900
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Heebo', 'Assistant', sans-serif"
    fontSize: "clamp(30px, 4.8vw, 48px)"
    fontWeight: 900
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  title:
    fontFamily: "'Heebo', 'Assistant', sans-serif"
    fontSize: "clamp(22px, 3vw, 34px)"
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "'Assistant', 'Heebo', sans-serif"
    fontSize: "clamp(16px, 1.6vw, 19px)"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  quote:
    fontFamily: "'Frank Ruhl Libre', 'Heebo', serif"
    fontSize: "clamp(22px, 3vw, 32px)"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0"
  label:
    fontFamily: "'Heebo', 'Assistant', sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.18em"
rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
  pill: "60px"
spacing:
  section-desktop: "100px"
  section-mobile: "60px"
components:
  button-primary:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.stark-white}"
    rounded: "{rounded.pill}"
    padding: "20px 32px"
  button-primary-hover:
    backgroundColor: "{colors.deep-infrastructure}"
    textColor: "{colors.stark-white}"
    rounded: "{rounded.pill}"
    padding: "20px 32px"
  button-primary-active:
    backgroundColor: "{colors.deep-infrastructure}"
    textColor: "{colors.stark-white}"
    rounded: "{rounded.pill}"
    padding: "20px 32px"
  button-sticky:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.stark-white}"
    rounded: "{rounded.pill}"
    padding: "16px 24px"
    height: "56px"
  label-chip:
    backgroundColor: "{colors.card-surface}"
    textColor: "{colors.mist-text}"
    rounded: "{rounded.pill}"
    padding: "8px 20px"
  black-card:
    backgroundColor: "{colors.command-black}"
    textColor: "{colors.stark-white}"
    rounded: "{rounded.lg}"
    padding: "60px 40px"
---

# Design System: IsraelTechForce BMS VSL

## 1. Overview

**Creative North Star: "The Night Audit"**

The physical scene: a social media manager opens her phone at 11pm, already tense before she touches the ad account. She's on Facebook, she's Israeli, she's mobile-first, and she carries background anxiety about losing accounts she can't afford to lose. This page exists in that moment. Its job is not to excite her — it is to make her feel seen, then composed, then certain she has found the right person.

The design responds to that scene: dark backgrounds that feel private and focused, blue that reads as infrastructure (not marketing), typography that is heavy and direct without being loud. Every section earns the right to sell by first naming the exact pain. Osher's face and story carry more weight than any design element. The system clears the path for the copy and the human behind it; it does not compete.

This is not a "course funnel". It is a structured conversation between an expert and someone who already suspects they are exposed. The tone is calm. The stakes are explicit. The design keeps both true simultaneously.

**Key Characteristics:**
- Dark tonal progression: 5-step background ramp from command-black to card-surface, alternating with two light sections (invitation, framework) to break reading rhythm
- Structural blue as the only accent: appears on interactive elements, timeline dots, authority numbers, and section dividers — never decoratively
- Three-family typography: Heebo 900 for authority, Assistant 400 for information, Frank Ruhl Libre for emotional truth
- Timeline layout as the deliverables pattern: vertical right-border with colored dots, not cards
- RTL Hebrew throughout: all layout, logical properties, and spacing respect `direction: rtl`
- Fluid type scale: every size uses `clamp()`, optimized for mobile-first Facebook ad traffic

## 2. Colors: The Blueprint Palette

A single saturated ramp — Structural Blue — does all the work. Everything else is dark infrastructure or signal text. The palette reads as a system, not a mood board.

### Primary — Structural Blue

- **Deep Infrastructure** (`#1e40af`): Gradient foundations, section dividers, deep hover states. The weight-bearing color; rarely visible alone.
- **Signal Blue** (`#2563eb`): Primary CTA background, the one color with full visual authority on the page. Used exactly where action is required.
- **Active Thread** (`#3b82f6`): Interactive highlights, `.gradient-text` accent on key phrases, timeline dot alternates. The midpoint between authority and approachability.
- **Interface Glow** (`#60a5fa`): Glow pulses, focus rings, icon fills, the lightest state of the blue ramp. Only appears to signal interactivity or as an ambient quality mark around active elements.

**The Structural Rule.** Blue is architecture, not decoration. It appears on surfaces where the user must act or where Osher's authority is asserted numerically. Using it on a background, divider, or label with no functional reason is prohibited.

**The Rarity Rule.** Interface Glow (`#60a5fa`) is for glow states only. It must never be used as a solid fill on a surface larger than 28px × 28px. Its rarity is what makes the CTA pulse feel like a signal, not noise.

### Neutral — Dark Infrastructure

- **Command Black** (`#050709`): Base page background. The ground everything else sits on. Not pure black — carries a barely perceptible blue tint that keeps it in the same color family as the Structural ramp.
- **Midnight Slate** (`#0c1018`): Secondary sections (numbers, story, FAQ, final CTA). Provides just enough contrast against command-black to create section breathing room.
- **Deep Slate** (`#131824`): Mid-surface, used sparingly when a third dark level is needed.
- **Card Surface** (`#1a1f2e`): Card backgrounds (author-quote-card, checklist, value-box). The lightest dark surface; distinguishes contained information from the page body.

### Neutral — Light Sections

- **Light Canvas** (`#f5f7fa`): Invitation section and Framework section. Two light interruptions in the dark flow, used to reset cognitive pace and make those sections feel distinctly different.
- **Night Ink** (`#0f172a`): Text on light sections only. Never used on dark backgrounds.

### Text Scale

- **Stark White** (`#ffffff`): Primary text on dark backgrounds, CTA labels, heading text.
- **Mist Text** (`#e2e8f0`): Secondary body text, card content, section labels.
- **Storm Text** (`#cbd5e1`): Body copy in dark sections (proof bullets, story paragraphs, deliverable bodies). Slightly lower contrast than Mist, reducing fatigue over long reading.
- **Muted Slate** (`#94a3b8`): Labels, metadata, counts, caption text. Tertiary hierarchy.
- **Dim Slate** (`#64748b`): Disclaimer text, footer, timestamps. Near-invisible by design.

### Semantic Accents

- **Alert Red** (`#ef4444`) and **Danger Deep** (`#dc2626`): Failure indicators, the strikethrough on the original price. Used exclusively to signal loss or danger — never for visual interest.
- **Warning Amber** (`#f97316`): Defined but currently used only in gradients. Do not introduce standalone.
- **Confirm Green** (`#10b981`): Checklist icons in the final CTA. Success state only.
- **Bonus Gold** (`#fbbf24`): Bonus module labels, bonus timeline dots. A warm departure from the blue ramp that signals added value without changing the overall palette register.

**The Gray-on-Color Rule.** Never place `--text-muted` (muted-slate, `#94a3b8`) directly on a saturated blue or gradient background. Use `--text-light` or a blue-tinted variant. Gray text on color is the most common contrast failure on this page.

## 3. Typography

**Display/Heading Font:** Heebo (with Assistant, sans-serif fallback)
**Body Font:** Assistant (with Heebo, sans-serif fallback)
**Quote Font:** Frank Ruhl Libre (with Heebo, serif fallback) — Hebrew-optimized serif for emotional peaks only

**Character:** Heebo at weight 900 reads as deliberate authority — a practitioner who has seen everything and has no reason to perform. Assistant provides the information layer: legible, neutral, functional. Frank Ruhl Libre makes a rare appearance at emotional peaks where the serif weight signals sincerity. The three fonts never compete; they occupy different registers of trust.

### Hierarchy

- **Display** (900, `clamp(32px, 5.6vw, 56px)`, lh 1.15, ls -0.035em): Hero H1 only. The page's single loudest voice.
- **Headline** (900, `clamp(30px, 4.8vw, 48px)`, lh 1.15, ls -0.03em): Section H2 headings. Each section earns one.
- **Title** (900, `clamp(22px, 3vw, 34px)`, lh 1.2, ls -0.025em): Sub-section headings (deliverable titles, framework step titles, FAQ summaries at weight 700).
- **Body** (400, `clamp(16px, 1.6vw, 19px)`, lh 1.7): All running text. Max effective line length held under 65ch by container widths (760px max). Longer than 19px on desktop is never needed.
- **Quote** (Frank Ruhl Libre 700, `clamp(22px, 3vw, 32px)`, lh 1.4): The big-quote in the author card. Used once. Non-negotiable as a serif moment.
- **Label** (700, 12–14px, ls 0.05–0.18em, uppercase): Module numbers, section pills, deliverable metadata. Always uppercase, always spaced.

**The Weight Cliff Rule.** Weights are 900 (headings) or 400 (body). Weight 700 appears only on labels, captions, CTAs, and the Frank Ruhl Libre quote. Weight 500 is reserved for photo captions. There is no weight 600 usage in primary hierarchy. The cliff between 900 and 400 is what gives the page its authority-without-shouting quality.

**The Fluid Scale Rule.** Every font size in the system uses `clamp(min, fluid, max)`. Hard-coded px sizes are only permitted in mobile media query overrides where the clamp minimum is already appropriate. No font may be smaller than 12px on any viewport.

**The Tight Tracking Rule.** Heebo headlines carry negative letter-spacing (−0.025em to −0.035em). This is non-negotiable: Heebo at 900 weight with default tracking looks wide and amateur. The tightness is what reads as competence.

## 4. Elevation

This system uses **tonal layering as the primary depth mechanism**. Shadows are functional, not decorative. Glows are reserved exclusively for interactive elements (CTA buttons) and never applied to static surfaces.

Dark backgrounds progress from command-black → midnight-slate → card-surface. The lightest dark surface (card-surface, `#1a1f2e`) creates the maximum legible contrast available without introducing shadow. Sections alternate between this dark ramp and two light-canvas interruptions. The stack never exceeds three tonal levels at any one point on the page.

**The Glow Reserve Rule.** `filter: drop-shadow()` and `box-shadow` glows in the blue family appear on two element types: CTA buttons (functional) and `.video-wrapper` (aspirational quality signal). Applying a blue glow to any other element — cards, section headings, authority numbers — is prohibited. The glow says "press here"; using it on static elements destroys that signal.

### Shadow Vocabulary

- **Video Container** (`0 0 0 1px rgba(96,165,250,0.15), 0 25px 80px rgba(0,0,0,0.6), 0 0 60px rgba(37,99,235,0.15)`): The most elaborate shadow on the page. The ring + deep drop + blue ambient together signal that the video is the primary value artifact. Used once only.
- **CTA Pulse** (`filter: drop-shadow(0 0 6px rgba(96,165,250,0.4))` → `drop-shadow(0 0 20px rgba(96,165,250,0.78))`): Animated glow on the hero CTA only. GPU-compositable. Communicates "this is the action" without motion that competes with reading. Runs at 2.4s ease-in-out, respects `prefers-reduced-motion`.
- **CTA Resting** (`0 0 0 1px rgba(96,165,250,0.35), 0 0 40px rgba(59,130,246,0.35), 0 8px 24px rgba(37,99,235,0.35)`): All non-hero CTA buttons at rest. Provides elevation without animation.
- **Authority Photo** (`0 0 0 1px rgba(96,165,250,0.2), 0 24px 60px rgba(0,0,0,0.55)`): The author portrait. The ring is a subtle containment; the drop shadow anchors Osher as a real, physical presence on a dark page.
- **Flat by Default Rule.** Cards (author-quote-card, black-card, value-box, checklist) use no shadow. Their depth comes from their background color being one step lighter than the section background. Shadows on static cards are prohibited.

### Spacing Rhythm

Section padding is not uniform. Variation is intentional:

| Section | Padding |
|---|---|
| Hero | `72px top / 64px bottom` — slightly tighter; the video is the real hero |
| Cinematic | `120px` — the break moment deserves air |
| Final CTA | `120px top / 100px bottom` — most important section, most generous entry |
| FAQ | `80px top / 100px bottom` — pre-conversion zone, pulls close to Final CTA |
| All others | `var(--section-py-d): 100px` |

**Never collapse all sections to the same padding.** Rhythm requires contrast.

### Easing Tokens

Two named easing properties defined on `.vsl-bms-page`. Use these — not generic `ease` or `linear`:

- `--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1)` — smooth deceleration for reveals, FAQ expand, scroll-reveal
- `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` — confident, decisive; used on video-wrapper hero entrance

## 5. Components

### Buttons

The system has one button shape: a full pill (`border-radius: 60px`). Authority does not need variation; every CTA on the page is the same shape at the same weight. What changes is context and emphasis level.

- **Shape:** Full pill (60px radius). No square or rounded-rect variants.
- **Primary CTA:** Gradient background (`linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)`), Stark White label at 800 weight. The gradient provides directionality — the button is going somewhere, not just sitting.
- **Hover:** `translateY(-2px)` lift + expanded blue glow. The shimmer sweep (`::before` translateX from −100% to +100%) runs at 0.55s ease-out.
- **Focus:** `outline: 3px solid #60a5fa` with 3px offset. Never removed. The focus ring color is Interface Glow — visible on both dark and light backgrounds.
- **Active:** `translateY(0)` at 0.05s — the lift snaps back immediately on press.
- **Arrow badge:** 34px circle at 15% white opacity, contains the directional icon. On hover it translates 4px toward the label direction (RTL: right, `translateX(-4px)`).
- **Hero Glow Variant (`.cta-btn-glow`):** Hero button only. Adds the animated `vsl-cta-pulse` keyframe. Must not be applied to secondary or in-content CTAs — the signal only works if it's singular.
- **Mobile:** Full width up to 460px, min-height 56px (44px minimum touch target cleared). Font drops to 16px. The arrow badge shrinks to 30px.
- **Sticky Mobile CTA:** Same pill shape, no shimmer sweep, no pulse animation. Background is the full gradient. Text at 16px, 800 weight. Fixed bottom strip with `safe-area-inset-bottom` padding. Appears only after 600px scroll; hidden on desktop (`min-width: 768px`).

### FAQ

`<details>` / `<summary>` native disclosure. No JavaScript. No custom dropdown.

- **Resting:** `rgba(255,255,255,0.03)` background, `rgba(255,255,255,0.08)` border, 12px radius.
- **Open:** Background shifts to `rgba(96,165,250,0.06)`, border to `rgba(96,165,250,0.3)`. The blue tint communicates "expanded" without a modal or animation.
- **Toggle indicator:** `::after` pseudo-element, `+` at rest → `−` when open. The open indicator uses Interface Glow background with Night Ink text — a color inversion that reads as "active".
- **Summary hover:** Label color shifts to Interface Glow.
- **Summary focus-visible:** `outline: 2px solid #60a5fa` inset.
- **Internal padding:** 18px 22px on summary (RTL: inline-end 50px for indicator clearance); 0 22px 20px on answer.

### Deliverable Timeline

The deliverable items form a vertical timeline. Not a card grid.

- **Track:** 1px solid `rgba(96,165,250,0.15)` right border (RTL side). Connects all items visually.
- **Dot:** 16px circle, absolute-positioned 8px outside the right border. Color varies by module position (red → orange → gold → green → cyan → blue → violet) to create visual progression without interaction.
- **Item:** 40px right padding (to clear the track), 30px bottom padding, 40px bottom margin. Last child: transparent border (breaks the visual track).
- **Bonus items:** Gold dot, gold title. A warm rupture in the cool blue progression that signals "extra value".
- **Mobile:** Right padding reduces to 24px; margins compress. Timeline visual persists on mobile.

### Authority Strip

Replaces the hero-metric template. Two statements, each a number + prose sentence, displayed inline with `align-items: baseline`.

- **Number:** Heebo 900, `clamp(28px, 3.5vw, 40px)`, Active Thread color (`#3b82f6`), tight tracking (−0.03em).
- **Text:** Body weight 500, Storm Text (`#cbd5e1`), `lh 1.45`.
- **Container:** No border, no background — just top + bottom 1px lines at `rgba(96,165,250,0.15)`. The restraint is deliberate: the numbers carry their own authority.

### Section Label Chips

Small uppercase pills that label section types (not headings).

- **Background:** Card Surface (`#1a1f2e`) with a 1px `rgba(96,165,250,0.2)` border.
- **Text:** 14px, Muted Slate, Heebo 700, ls 0.05em.
- **Shape:** Pill (60px radius).
- **Rule:** Never used as navigation. Label chips are orientation markers — they tell the reader where they are in the narrative, not where to go next.

### Black Card

Full-width dark container used in the Invitation section.

- **Background:** Command Black (`#050709`).
- **Border:** 1px `rgba(96,165,250,0.15)`.
- **Radius:** 24px.
- **Shadow:** None (relies on contrast against Light Canvas parent).
- **Internal padding:** 60px 40px desktop, 36px 22px mobile.
- **Nested CTA:** Allowed. This is the only pattern where a CTA button sits inside a card-like container.

### Video Placeholder State

Shown when `VIDEO_EMBED_URL` is empty. Must look intentional, never like a dev error.

- **Layout:** Flex column, centered, `gap: 12px`, `min-height: 240px`.
- **Background:** `var(--bg-darkest)` — same as the live video player background.
- **Icon:** `IconVolume` at 36px, `aria-hidden="true"`.
- **Label:** "ההדרכה תהיה זמינה בקרוב" — Hebrew, `var(--text-muted)`, 15px Heebo.
- **Accessibility:** Container carries `aria-label="הדרכה בטעינה"`.
- **Rule:** No raw dev instructions, placeholder text, or bracket-notation strings may ever reach a user-facing render.

### Framework Steps

Three cards in a horizontal grid with arrow connectors.

- **Shape:** 24px radius, white-to-light-gray gradient background (`linear-gradient(180deg, #fff 0%, #f8fafc 100%)`), 1px `rgba(37,99,235,0.12)` border.
- **Step number pill:** Monospace-feel label, 12px, ls 0.18em, Signal Blue text on `rgba(37,99,235,0.08)` background. 4px radius — the only square-radius element in the system.
- **Icon wrap:** 56px square, 14px radius, blue-to-glow gradient background.
- **Hover:** `translateY(-4px)` lift at 0.25s ease-out. No shadow increase on mobile (hover: none + pointer: coarse suppresses the lift).
- **Connectors:** `aria-hidden` arrow icons at 60% opacity between steps. Rotate −90deg and stack vertically on mobile; hide on `max-width: 768px` (connector becomes implicit from vertical layout).

## 6. Do's and Don'ts

### Do:

- **Do** use the tonal dark ramp for depth. Every step lighter costs permission — earn it with structure (card boundary, section boundary).
- **Do** use negative letter-spacing on all Heebo 900 headings. Minimum −0.025em, maximum −0.04em. Missing this makes headlines look amateur.
- **Do** use `clamp()` for every font size. Hard-coded px values are only allowed in mobile query overrides that refine the minimum.
- **Do** load Google Fonts via the route's `links()` export. Never via CSS `@import` — that blocks first paint.
- **Do** use `filter: drop-shadow()` for CTA pulse animations. `box-shadow` triggers layout paint and cannot be GPU-composited.
- **Do** use `ease-out` on all transitions. Generic `ease` (ease-in-out) decelerates wrong on interactive elements.
- **Do** respect `prefers-reduced-motion`. The pulse animation must stop; scroll-reveal must fire immediately.
- **Do** use `aria-hidden="true"` on all decorative elements: gradient-dividers, icon badges, anti-pill quote marks.
- **Do** use OKLCH for any new color values introduced beyond the existing token set.
- **Do** use logical CSS properties (`inset-inline-start`, `inset-inline-end`, `padding-inline`) for RTL layout.
- **Do** mirror before selling. Each section earns its pitch by naming the user's exact situation first.
- **Do** use authority through specificity: named cases (לילך, דליה, מאיה), exact numbers (2,500+, 95%+, ₪150,000), named failure modes. Never "many clients" or "significant results".
- **Do** contextualize BMS before using the acronym. The top banner must state the benefit or protection first; "BMS" may appear only after the user understands what they are being protected from.
- **Do** use `--ease-out-quart` and `--ease-out-expo` for all new CSS transitions and animations. These are defined as custom properties on `.vsl-bms-page`.
- **Do** use the opacity variant tokens for semi-transparent white text: `--text-light-78` (consent note), `--text-light-88` (WhatsApp prompt), `--text-light-92` (anti-pill quote). Never hard-code `rgba(255,255,255,0.x)` in new rules.
- **Do** use `--bg-overlay-dark` (`rgba(15,23,42,0.6)`) for dark overlay backgrounds. Never hard-code the value.
- **Do** write descriptive alt text on every image. Describe what is shown, not just what it represents. "Business Manager ריק ללא נכסים" not "BM ריק".
- **Do** add mobile overrides for any section that uses hard-coded top/bottom padding instead of `var(--section-py-d)`. At `max-width: 768px` the token swaps to `var(--section-py-m): 60px` — hard-coded values bypass this swap.
- **Do** add `will-change: filter` to any element using a continuous `filter` animation. The `.cta-btn-glow` pulse uses it.
- **Do** stagger grouped reveals. Framework steps stagger at 120ms intervals; proof bullets and anti-list items at 80ms intervals. Any new list of 3+ items added to scroll-reveal should define `transition-delay` increments.
- **Do** add new elements to the IntersectionObserver query array in `VslBms.jsx`. The observer targets 10 selectors; any structurally significant new section element should be included.
- **Do** gate hero entrance and scroll-reveal behind `!prefersReducedMotion`. The `hero-animate` class is added via `requestAnimationFrame` in the motion-safe branch only.

### Don't:

- **Don't** use gradient text (`background-clip: text` with `background-image`). This was present at project start and was removed. It returns under no circumstances.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe on any card, callout, or list item.
- **Don't** use the hero-metric template: a big number with a small label underneath on a gradient card background. The authority strip is the correct replacement.
- **Don't** use glassmorphism (`backdrop-filter: blur`) decoratively. The trust bar and sticky CTA use it functionally (frost over the scroll content below); those are the only permitted uses.
- **Don't** use countdown timers, blinking elements, or urgency animations of any kind. This is explicitly prohibited by PRODUCT.md: "No fake urgency, no blinking elements."
- **Don't** build a Canva-looking layout: stock photos of laptops, generic gradient cards, templated section stacks. Every section should be identifiably this page.
- **Don't** add Three.js backgrounds, particle effects, or excessive interactivity. Per PRODUCT.md: "Heavy is not trustworthy. Converts worse, loads worse."
- **Don't** add a second accent color to compete with the Structural Blue ramp. Bonus Gold (`#fbbf24`) is the only permitted warm departure, and only on bonus-specific elements.
- **Don't** place `color: var(--text-muted)` (Muted Slate) on any saturated blue or gradient background. Use Stark White or Mist Text.
- **Don't** animate `box-shadow` — use `filter: drop-shadow()` instead.
- **Don't** add `transition: all`. Enumerate only the specific properties that change.
- **Don't** use `backdrop-filter` on mobile sticky elements — it's removed at `max-width: 767px` for performance.
- **Don't** use undefined CSS variables. `var(--font-body)` was found and removed; all variable references must resolve to a token defined in the `:root`/`.vsl-bms-page` block.
