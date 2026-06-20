# Odyssey — website

The marketing / pre-launch landing site for **Odyssey**, a SwiftUI iOS app for
booking flights and hotels (search → book real orders → manage trips).

It's a plain static site — no framework, no build step. Content mirrors the app's
real feature set and visual `Theme`.

Live at **https://odysseytrip.org**.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The whole page (hero, how-it-works, features, app tabs, tech & status, footer) |
| `styles.css` | Design tokens (mirror the app `Theme`) + all styling |
| `main.js` | Mobile nav toggle only |
| `CNAME` | Binds the GitHub Pages site to `odysseytrip.org` |

## View locally

Open `index.html` directly in a browser, or serve it:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy — GitHub Pages (recommended)

This repo (`LongHoang0887/travel-web-public`) already serves the site.

1. Push to `main`.
2. **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*,
   Branch = `main`, folder = `/ (root)`.
3. The `CNAME` file sets the custom domain to `odysseytrip.org`. In **Settings → Pages
   → Custom domain** it should show `odysseytrip.org`; tick **Enforce HTTPS** once the
   certificate is issued (can take a few minutes).

### DNS records

At your domain registrar / DNS host for `odysseytrip.org`:

**Apex domain** (`odysseytrip.org`) — add the four GitHub Pages `A` records:

```
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```

(Optionally add the matching `AAAA` records for IPv6, or use an `ALIAS`/`ANAME`
to `longhoang0887.github.io` if your host supports it.)

**`www` subdomain** (optional redirect):

```
CNAME   www   longhoang0887.github.io.
```

DNS can take up to ~24h to propagate; HTTPS is automatic once GitHub validates the domain.

## Deploy — Netlify (alternative)

1. *Add new site → Import from Git* → pick this repo. No build command; publish
   directory = repo root.
2. *Domain settings → Add custom domain* → `odysseytrip.org`, then point DNS at
   Netlify (their `A`/`ALIAS` + `www` `CNAME`), or use Netlify DNS. HTTPS is automatic.
   (If hosting on Netlify instead of Pages, delete `CNAME` — it's GitHub-Pages-specific.)
