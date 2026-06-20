# Implementation Plan: Odyssey Marketing/Info Static Website

## Overview
A single-page (multi-section) static marketing/info website that reflects the **current** state of the Odyssey travel iOS app: what it does (login → search → book real Duffel orders → view/cancel trips), its feature set, its visual identity, and its tech/status. No backend, no build step — plain HTML + CSS (one small JS file only if needed for nav/animation). Lives in `` and opens directly in a browser. Content is sourced from `CLAUDE.md`, `ROADMAP.md`, and the app's actual `Theme`/feature files so the site stays faithful to the app rather than invented.

## Source of Truth (extracted from the repo)
- **Name / tagline**: Odyssey — a SwiftUI iOS app for booking flights & hotels (Traveloka-style).
- **Core flow**: login → search → book real Duffel test orders → view/cancel trips.
- **Five tabs / surfaces**: Home/Discover, Flights, Stays, Trips, Profile.
- **Headline features** (from ROADMAP, only ship what's real): real flight + hotel bookings via Duffel; round-trip & multi-city flight search; results filters & sorting; real cancellation with refund surfacing; per-passenger checkout + saved travelers; trip e-tickets & live status sync; local push (booking confirmation + day-before reminder); onboarding, app icon, launch screen; accessibility (VoiceOver, Dynamic Type, Reduce Motion, WCAG AA contrast); localization (English + Tiếng Việt, multi-currency display); Sign in with Apple + email accounts; privacy manifest; TestFlight-ready.
- **Brand colors** (from `Theme` in HomeView.swift): background `#EEF5FF`, surface `#FFFFFF`, text `#0C2340`, muted `#5E7088`, accent `#3E7FE0`, hero gradient `#5BA8F5 → #3E7FE0 → #6FB0F0`, success green `#1D9E75 → #3FC79A`.
- **Tech**: SwiftUI, iOS 17+, value-based navigation, JSON persistence, Express token-proxy backend, Duffel API, Amadeus. Unit + UI test targets.
- **Status**: working prototype; not yet App Store submitted. Be honest — don't claim "available on the App Store."

## Architecture Decisions
- **Plain static HTML/CSS, no framework, no build.** Matches "static website" literally; trivial to host (GitHub Pages / Netlify drop) and review.
- **Single `index.html` + one `styles.css`.** Optional `main.js` only for smooth-scroll/nav-toggle and on-scroll reveal. Keep JS minimal.
- **Design tokens mirror the app `Theme`** as CSS custom properties, so the site visually matches the app.
- **Content honesty**: present as a product/portfolio info page for a prototype, not a live consumer product. CTAs point to "the prototype" / repo, not a fake App Store link.
- **Responsive, mobile-first**, since it describes a mobile app. Include a phone-mockup hero.
- **Accessibility built in** (semantic HTML, alt text, contrast) — fitting given the app's own a11y work.
- **Deploy target: custom domain `odysseytrip.org`** via GitHub Pages (repo already on GitHub) with a `CNAME` (at repo root) file + DNS; Netlify documented as an alternative. SEO `<title>`/meta + canonical URL set to the domain.

## Task List

### Phase 1: Foundation
- [ ] Task 1: Scaffold site shell + design tokens
- [ ] Task 2: Hero section (brand, tagline, phone mockup, CTAs)

### Checkpoint: Foundation
- [ ] `index.html` opens in a browser with styled hero, no console errors.

### Phase 2: Core Content
- [ ] Task 3: "How it works" flow section (login → search → book → manage)
- [ ] Task 4: Features grid (real features from ROADMAP, grouped)
- [ ] Task 5: App surfaces / five-tabs section

### Checkpoint: Core Content
- [ ] All sections render, content matches ROADMAP, internal nav links scroll correctly.

### Phase 3: Detail & Polish
- [ ] Task 6: Tech & status section (stack, test coverage, prototype-status honesty, privacy)
- [ ] Task 7: Footer + nav + responsive/a11y pass
- [ ] Task 8: README for the website (how to view/deploy)

### Checkpoint: Complete
- [ ] Responsive at 375px and 1280px; passes a manual a11y/contrast check; links work; ready for review.

---

## Task 1: Scaffold site shell + design tokens
**Description:** Create `index.html` with semantic skeleton (header/nav, main, sections, footer) and `styles.css` defining CSS custom properties mirroring the app `Theme`, base typography, layout container, and a reset.

**Acceptance criteria:**
- [ ] `:root` defines `--bg, --surface, --text, --muted, --accent` + gradient matching `Theme` hex values.
- [ ] Page has header, `<main>`, and footer landmarks; system font stack; max-width container.

**Verification:**
- [ ] Open `index.html` — page loads, background `#EEF5FF`, no console errors.

**Dependencies:** None
**Files likely touched:** `index.html`, `styles.css`
**Estimated scope:** S

## Task 2: Hero section
**Description:** Build the hero: Odyssey wordmark, tagline ("Book flights & hotels — search, book real orders, manage trips"), short subcopy, primary/secondary CTAs (View prototype / See features → anchor), and a CSS phone mockup showing a stylized Discover/search screen using the brand gradient.

**Acceptance criteria:**
- [ ] Hero uses the hero gradient; headline + tagline reflect the real app purpose.
- [ ] Phone mockup renders with pure CSS (no external image dependency required).

**Verification:**
- [ ] Hero visible above the fold at 1280px and 375px; CTAs are focusable links.

**Dependencies:** Task 1
**Files likely touched:** `index.html`, `styles.css`
**Estimated scope:** M

## Task 3: "How it works" flow section
**Description:** A 4-step horizontal/stacked flow mirroring the app's core path: 1) Sign in (Apple / email / guest), 2) Search flights & stays (one-way, round-trip, multi-city), 3) Book a real Duffel order (per-passenger checkout), 4) Manage trips (e-tickets, live status, cancel with refund).

**Acceptance criteria:**
- [ ] Exactly the 4 steps above, wording grounded in ROADMAP, each with icon + caption.

**Verification:**
- [ ] Section reads top-to-bottom on mobile, as a row on desktop.

**Dependencies:** Task 1
**Files likely touched:** `index.html`, `styles.css`
**Estimated scope:** S

## Task 4: Features grid
**Description:** Card grid of real, shipped features grouped (Booking, Search, Trips, Experience). Pull only items marked done/partial in ROADMAP; mark not-yet items (Payments, App Store submission) as "coming" rather than claiming them.

**Acceptance criteria:**
- [ ] ≥8 feature cards, each traceable to a ROADMAP line; no invented features.
- [ ] Unshipped items (real payments, App Store availability) are not presented as done.

**Verification:**
- [ ] Cross-check each card against `ROADMAP.md`.

**Dependencies:** Task 1
**Files likely touched:** `index.html`, `styles.css`
**Estimated scope:** M

## Task 5: App surfaces / five-tabs section
**Description:** Showcase the five tabs (Home/Discover, Flights, Stays, Trips, Profile) with a one-line description of each.

**Acceptance criteria:**
- [ ] All five tabs listed with accurate descriptions.

**Verification:**
- [ ] Names match `RootView.swift` tabs.

**Dependencies:** Task 1
**Files likely touched:** `index.html`, `styles.css`
**Estimated scope:** S

## Task 6: Tech & status section
**Description:** Honest "Under the hood" section: SwiftUI / iOS 17+, value-based nav, JSON persistence, Express token-proxy + Duffel/Amadeus, unit + UI test targets, privacy manifest, localization (en/vi). Clear status line: "Working prototype on Duffel's test environment — not yet on the App Store."

**Acceptance criteria:**
- [ ] Lists the real stack; states prototype/test status explicitly; mentions test coverage and privacy.

**Verification:**
- [ ] Claims match `CLAUDE.md` + `ROADMAP.md`; no overstated availability.

**Dependencies:** Task 1
**Files likely touched:** `index.html`, `styles.css`
**Estimated scope:** S

## Task 7: Nav, footer, responsive & a11y pass
**Description:** Sticky top nav with anchor links to each section (mobile menu toggle if needed), footer with repo/credit line and year. Final responsive + accessibility sweep: semantic headings order, alt/aria where needed, focus styles, contrast check against tokens.

**Acceptance criteria:**
- [ ] Nav links scroll to sections; layout intact at 375px and 1280px; visible focus states.

**Verification:**
- [ ] Tab through page — all interactive elements reachable; headings are a single logical outline.

**Dependencies:** Tasks 2–6
**Files likely touched:** `index.html`, `styles.css`, `main.js`
**Estimated scope:** M

## Task 8: Website README + custom-domain deploy
**Description:** `README.md` — what the site is, how to view it (open `index.html` / `python3 -m http.server`), and how to deploy to the custom domain **odysseytrip.org**. Add a `CNAME` (at repo root) file containing `odysseytrip.org` (GitHub Pages picks this up automatically). Document the DNS setup: apex `A`/`ALIAS` records (or `CNAME` (at repo root) for a `www` subdomain) pointing at the chosen host, and enabling HTTPS. Cover the recommended host (GitHub Pages, since the repo is already on GitHub) plus a Netlify alternative.

**Acceptance criteria:**
- [ ] `CNAME` (at repo root) contains `odysseytrip.org`.
- [ ] README documents local view + step-by-step custom-domain deploy (host setup, DNS records, HTTPS).
- [ ] Canonical URL `https://odysseytrip.org` used consistently in any meta tags / CTAs as appropriate.

**Verification:**
- [ ] Following the steps serves the site locally; CNAME present; DNS instructions name concrete record types.

**Dependencies:** Tasks 1–7
**Files likely touched:** `README.md`, `CNAME` (at repo root)
**Estimated scope:** S

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Overstating app status (e.g. "on the App Store") | Med | Status section + Task 4 rule: only ship real/done items |
| Site drifts from app over time | Low | Tokens + copy sourced from repo files; README notes source of truth |
| Scope creep into a full framework/site builder | Med | Decision: plain HTML/CSS, no build |

## Resolved Decisions
- **Purpose: pre-launch landing page.** Lead with value prop and an upbeat "coming soon" tone — but keep the honesty rule: no claim of App Store availability or real payments (mark those "coming"). Status section frames it as "in beta / launching soon" rather than "shipped product."
- **Main CTA → GitHub repo** `https://github.com/LongHoang0887/travel-web-public`. Primary button links there; secondary button is a "See features" anchor.
- **Host/deploy repo:** `LongHoang0887/travel-web-public` serves the site via GitHub Pages on `odysseytrip.org`. The `` contents here are pushed to that repo's Pages source (root or `/docs`); `CNAME` (at repo root) + DNS bind the domain.
