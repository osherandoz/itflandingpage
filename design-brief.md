# Design Brief — BMS-SM Funnel Pages
**Israel Tech Force · אושר רווח**
For use with Claude Design / Figma AI generation

---

## Context

Two-page lead funnel for the "BMS — Business Manager Security" course targeting Israeli Social Media Managers (female audience, RTL Hebrew).

1. **Landing Page** (`/bms-sm`) — squeeze page, lead capture
2. **Thank-You / Tripwire Page** (`/תודה-קליסט`) — post-optin, 129₪ offer

Both pages are standalone (no shared nav/header from the site). They share a font system and RTL layout but use **different color palettes**.

---

## Typography — MUST NOT CHANGE

> ⚠️ Typography is locked. Do not substitute or modify fonts, weights, or scale system.

### Font Family
```
Primary: Heebo (Hebrew + Latin)
Fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```
Heebo is self-hosted via `@fontsource/heebo`. Weights in use:
- **400** — body text, secondary copy
- **700** — subheadings, labels, UI elements
- **800** — headings, CTAs, price
- **900** — hero h1, large numerals (curriculum numbers, price)

### Type Scale
```
Hero h1:        clamp(2.1rem, 4.2vw, 3.2rem)  · weight 800 · line-height 1.25
Section titles: clamp(1.8rem, 3.2vw, 2.6rem)  · weight 800 · line-height 1.3
Reframe head:   clamp(1.9rem, 4vw, 3.2rem)    · weight 800 · line-height 1.25
Final CTA h2:   clamp(2rem, 3.8vw, 2.8rem)    · weight 800
Offer price:    3.6rem (desktop) / 2.8rem (mobile) · weight 800
Eyebrows:       0.8–0.85rem · weight 600 · uppercase tracking
Body copy:      1rem–1.15rem · line-height 1.65–1.8
Small/muted:    0.85–0.95rem · weight 400–500
```

### Typography Notes
- `letter-spacing: 0` on all headings (NOT tight negative tracking)
- `font-variant-numeric: tabular-nums` on countdown timers and price numerals
- Quote decoration uses `Georgia, 'Times New Roman', serif` for the large `"` glyph only (decorative, not body text)
- `-webkit-font-smoothing: antialiased` applied globally

---

## Page 1 — Landing Page (`/bms-sm`)

### Color Palette
```
Background (main):    #0C0E1D   (deep navy)
Background (section): #1a1f3a   (mid navy)
Background (darker):  #0f1729   (deep section alt)
Background (footer):  #07090f   (near black)

Primary / Blue:       #3B82F6   (brand blue)
Primary Dark:         #1D4ED8
Primary Light:        #60a5fa
Primary Muted Text:   #93c5fd

CTA / Green:          #25D366   (WhatsApp green — main CTA buttons)
CTA Dark:             #128C7E

Text Primary:         #ffffff
Text Secondary:       #e0e0e0
Text Muted:           #9aa5c1

Warning / Amber:      #fbbf24
Danger / Red:         #ef4444

Border Subtle:        rgba(255,255,255,0.1)
Border Primary:       rgba(59,130,246,0.3)
```

### Key Visual Treatments

**Hero section background:**
```css
radial-gradient(900px 500px at 85% 0%, rgba(59,130,246,.18), transparent 60%),
radial-gradient(700px 400px at 10% 90%, rgba(37,211,102,.08), transparent 60%),
linear-gradient(180deg, #0C0E1D 0%, #11152a 100%)
```
With a subtle grid overlay (48×48px dot grid, masked to ellipse, opacity 0.6) and a faint background image (`/images/hero-sm.png`) at 10% opacity.

**Lead card (hero form):**
- Glassmorphism panel: `rgba(26,31,58,.92)` background + `backdrop-filter: blur(10px)`
- Border: `1px solid rgba(59,130,246,0.25)`
- Top gradient border effect via pseudo-element (`::before`) in blue fade
- Green ribbon badge positioned `top: -14px`
- Border radius: 20px
- Shadow: `0 20px 60px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)`

**CTA Buttons:**
- Primary CTA (green): `linear-gradient(180deg, #25D366 0%, #1fbb5b 100%)`
- Secondary (blue): `linear-gradient(180deg, #3B82F6 0%, #1D4ED8 100%)`
- Hover: lift `translateY(-2px)` + stronger shadow
- Shimmer effect on hover (`::before` pseudo sweep)
- Border radius: 12px
- Font: 1.05rem weight 700

**Cards (problem, curriculum, testimonials):**
- Background: `linear-gradient(180deg, rgba(26,31,58,.85), rgba(15,23,41,.85))`
- Border: `1px solid rgba(255,255,255,0.1)`
- Hover: `translateY(-6px)` + blue border glow
- Border radius: 18–20px
- Top accent bar (3px height) using brand gradient

**Eyebrow labels (section openers):**
- Pill shape: `border-radius: 100px`
- Background: `rgba(59,130,246,0.1)` + `border: 1px solid rgba(59,130,246,0.3)`
- Color: `#93c5fd`
- Leading dot: 6–7px circle in brand blue with `box-shadow: 0 0 8px #3B82F6`

**Topbar (urgency countdown):**
- `linear-gradient(90deg, #1D4ED8 0%, #3B82F6 60%, #1D4ED8 100%)`
- Amber blinking dot (`#fbbf24`) with glow
- Countdown in `tabular-nums` pill: `rgba(0,0,0,0.28)` background

**FAQ accordion:**
- Closed: transparent with subtle border
- Open: `rgba(59,130,246,0.05)` tint + blue border
- Chevron rotates 180° on open

**Testimonial cards:**
- Featured card spans 2 columns (desktop)
- Large decorative `"` in Georgia font, color: `#3B82F6` at 25% opacity
- Star ratings in `#fbbf24`
- Avatar: 48px circle with gradient background, white initials

**Price display:**
- Old price: `text-decoration: line-through` in red (`#ef4444`)
- Current price: `linear-gradient(180deg, #fff, #c9d6ff)` gradient clip text
- Currency symbol `₪` in CTA green, superscript

### Layout
- Max width: 1200px (`.wrap`)
- RTL direction, text-align right
- Hero: 2-column grid (1.15fr / 0.85fr), collapses at 960px
- Section padding: 90px vertical (60px mobile)
- Mobile sticky CTA bar: fixed bottom, visible below 860px
- Exit-intent popup: modal with blur overlay

---

## Page 2 — Thank-You / Tripwire Page (`/תודה-קליסט`)

### Color Palette
```
Background (main):    #0d0d14   (near black, deeper than landing page)
Background (card):    #13131f
Background (mid):     #0f0f1a

Primary / Indigo:     #6366f1   (premium indigo — different from LP blue)
Primary Light:        #818cf8

Gold:                 #f59e0b
Gold Light:           #fde68a

Text Primary:         #ffffff
Text Muted:           #9ca3af

Border:               rgba(255,255,255,0.08)
Border Radius:        16px (cards)
```

> Note: The thank-you page intentionally uses **indigo** (`#6366f1`) instead of the landing page's blue (`#3B82F6`). This signals a psychological shift — from "information" to "premium purchase decision".

### Key Visual Treatments

**Confirmation bar (top):**
- Background: `linear-gradient(90deg, #14532d, #166534)` (dark green)
- Text: `#bbf7d0` / icon `#4ade80`
- Checkmark icon from Font Awesome

**VSL video player:**
- 16:9 aspect ratio container
- Background: `#0a0a12` with `border: 1px solid rgba(255,255,255,0.08)`
- Play button: 72px circle in `#6366f1` with `box-shadow: 0 0 40px rgba(99,102,241,0.4)`
- Hover: scale(1.08) + darker indigo

**Urgency bar:**
- Background: `rgba(245,158,11,0.1)` + `border: 1px solid rgba(245,158,11,0.25)`
- Text: `#fde68a` (gold)
- Countdown in `#f59e0b`, weight 900, `tabular-nums`, letter-spacing 2px
- Blinking dot: 8px circle in `#f59e0b`

**Offer card:**
- Background: `#13131f`
- Border: `1px solid rgba(255,255,255,0.08)`
- Border radius: 20px, padding: 40px 36px
- Badge: `linear-gradient(135deg, #6366f1, #4f46e5)` pill

**Price display:**
- Old price: `text-decoration: line-through`, color `#9ca3af`
- Current price: `clamp(3rem, 8vw, 4rem)`, weight 900
- Currency `₪` as superscript, `font-size: 0.5em`

**CTA button (tripwire):**
- Background: `linear-gradient(135deg, #6366f1, #4f46e5)`
- Shadow: `0 4px 24px rgba(99,102,241,0.35)`
- Hover: `translateY(-2px)` + stronger shadow
- Full width, border radius 12px

**Includes list:**
- 2-column grid (desktop), 1-column (mobile)
- Green checkmarks: `#4ade80`
- Font: 0.9rem, color `#d1d5db`

**Social proof cards:**
- Background: `#13131f` + border
- Metric badge: `rgba(99,102,241,0.12)` background + `rgba(99,102,241,0.25)` border
- Avatar: 36px gradient circle with initials
- Auto-fit grid: `minmax(220px, 1fr)`

### Layout
- Max width: 780px (narrower than LP — focuses attention)
- RTL direction
- No navigation — distraction-free
- Sections flow: confirm bar → VSL → bridge copy → offer → social proof → second CTA → footer

---

## Shared Patterns (Both Pages)

### Shadows
```
Cards:      0 20px 60px -20px rgba(0,0,0,0.6)
Modals:     0 40px 100px rgba(0,0,0,0.7)
CTAs:       0 4px 15px rgba([accent],0.3)  — color matches button
```

### Interactions
- All cards: `transition: transform 0.3s, border-color 0.3s`
- All CTAs: `transition: transform 0.15s, box-shadow 0.15s`
- Hover lift: `translateY(-2px)` to `translateY(-6px)` depending on element size
- No rotation or complex animations — clean, professional

### Icons
- Font Awesome 6.5 (`fa-solid` and `fa-regular` classes)
- `aria-hidden="true"` on all decorative icons

### Accessibility
- `dir="rtl"` on root element
- `aria-live="polite"` on countdown timers
- `aria-label` on icon-only buttons
- Focus states: blue ring `box-shadow: 0 0 0 3px rgba(59,130,246,0.15)`

### Images Used
- `/images/hero-sm.png` — hero background texture (10% opacity overlay)
- `/images/Curriculum%20Section.png` — curriculum section background
- `/images/israeltechforce-logo-white.png` — brand logo (white)
- Instructor photo: `/images/[osher-photo]` in "About" section

---

## What to Design / Redesign

When generating or refining designs based on this brief:

1. **Keep the Heebo font family exactly as specified** — weights, scale, and letter-spacing
2. **Keep RTL layout** — all text aligns right, flex/grid flows right-to-left
3. The two pages have separate accent colors (blue vs indigo) — maintain this intentional split
4. The green CTA (`#25D366`) is specific to the landing page only — the thank-you page uses indigo CTAs
5. Mobile breakpoint is 600px (thank-you) and 860px (landing) — both are mobile-first
6. The "premium dark" aesthetic should be maintained — avoid light themes or pastel variations
