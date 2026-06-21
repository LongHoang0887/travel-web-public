# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The marketing / pre-launch landing site for **Odyssey**, a SwiftUI iOS app for booking
flights and hotels (search → book real Amadeus orders → manage trips). The app itself
lives in a separate repo (`travel-ios-app`). This repo is **only** the website.

Plain static site — **no framework, no build step, no dependencies**. Open `index.html`
directly or serve the folder.

Live at **https://odysseytrip.org** via GitHub Pages.

## Files

- `index.html` — the entire page (hero, how-it-works, features, app tabs, tech & status, footer)
- `styles.css` — design tokens + all styling
- `main.js` — small vanilla-JS progressive enhancements: mobile nav toggle, hero
  phone slider + pointer 3D tilt, scroll-reveal on sections, and the contact-form
  mailto handler
- `CNAME` — binds GitHub Pages to `odysseytrip.org` (don't delete unless moving off Pages)
- `tasks/` — the build plan (`plan.md`) and checklist (`todo.md`)

## Conventions

- **Design tokens mirror the app `Theme`.** Colors live as CSS custom properties in
  `:root` (`--accent #3E7FE0`, hero gradient `#5BA8F5→#3E7FE0→#6FB0F0`, navy `#0C2340`,
  page `#EEF5FF`). Never hardcode a color in a rule — reference the variable.
- **Dark mode** is a `prefers-color-scheme: dark` block at the *end* of `styles.css`
  that overrides the tokens. Keep it there: any component override (not just token
  swaps) must come after the base rule to win the cascade. Prefer fixing colors via
  tokens so both themes stay in sync.
- **Content must stay faithful to the real app.** Features come from the app's
  `ROADMAP.md`; don't invent capabilities. Unshipped items (real payments, App Store
  availability) are marked "Coming", never presented as done.
- **Honest status.** It's a working prototype on Amadeus's *test* environment, wired for
  TestFlight — not on the App Store. Keep copy consistent with that.
- **Keep it dependency-free.** No frameworks, bundlers, or external CSS/JS. JS stays
  minimal and vanilla — small progressive enhancements only (see `main.js`), and the
  page must work without it.
- **Accessibility:** semantic landmarks, a single clean heading outline (one `h1`, `h2`
  per section, `h3` for items), skip link, visible focus styles, WCAG-AA contrast.

## Verify

Open `index.html` (or `python3 -m http.server`) and check the page renders, nav anchors
scroll, and the layout holds at 375px and 1280px. Toggle the OS appearance (or emulate
`prefers-color-scheme`) to check dark mode. There are no tests or build.

## Deploy

Push to `main`; GitHub Pages serves the repo root on `odysseytrip.org`. See `README.md`
for Pages settings and DNS records.
