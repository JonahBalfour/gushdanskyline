# Gush Dan Skyline

## Purpose

A dashboard tracking building/skyscraper projects across the Gush Dan
(Tel Aviv metro) area, sourced from SkyscraperCity forum thread titles.
Originally built as a sub-page of jonahbalfour.com; now a standalone site.

## Deployment

- GitHub Pages, custom domain via `CNAME` → `gushdanskyline.com`
- Any push to `main` deploys live automatically — no build step, no CI.
- Static site: `index.html` fetches and Babel-transpiles `app.jsx` in the
  browser at runtime (classic-runtime JSX, no build step). React and Babel
  loaded from unpkg.

## Files

```
/
├── index.html    loads React/Babel, fetches + transpiles app.jsx
├── app.jsx       the whole app: RAW_DATA + the GushDanSkyline component
├── audit.py      standalone data-quality audit script (not part of the
│                 live app) — run `python3 audit.py` to flag likely gaps
│                 in RAW_DATA: unsplit multi-tower names, numbering gaps,
│                 duplicates, mixed height/floor pairings, missing heights
└── HANDOFF.md    running changelog of data fixes and design decisions
```

## Data methodology

`RAW_DATA` in `app.jsx` is harvested from SkyscraperCity Israel forum
thread titles (Gush Dan + Tel Aviv sub-forums). SkyscraperCity is treated
as the primary/trusted source over Wikipedia or other secondary sources
when they conflict — cross-check against the actual thread before
changing a row. Multi-tower complexes are usually split into one row per
tower; thread titles often encode the breakdown (e.g. "3 x 21 fl").

Every data change should get a dated entry in `HANDOFF.md`: what changed,
the source thread, and the reasoning — this is the project's memory
across sessions, since RAW_DATA itself doesn't carry provenance.

## Testing changes locally before pushing

```bash
npx --yes serve -l 8123 .
```

Then visit `http://localhost:8123/`.

## How this project came to be

This dashboard was originally built and developed inside
`jonah-balfour-portfolio-site/projects/skyscrapers/`, as part of Jonah's
main portfolio site. In September 2026, Jonah decided to spin it out into
its own standalone site — its own domain, own repo, own Claude Code
project — since it had outgrown being a sub-page. This repo is the result
of that split: `app.jsx`, `index.html`, `HANDOFF.md`, and `audit.py` were
copied over verbatim (all data and history intact), a fresh git history
was started, and it was pushed to a new GitHub repo
(`github.com/JonahBalfour/gushdanskyline`).

The portfolio repo's `projects/skyscrapers/` folder is expected to be
removed at some point (with its hub-page card pointed at
gushdanskyline.com instead) — that cleanup happens in the *portfolio*
repo/session, not here, since this project only owns the standalone site.

## Standalone-site setup status

- **Domain**: `gushdanskyline.com`, registered and DNS-hosted on
  Cloudflare.
- **DNS**: 4 `A` records at the apex (`185.199.108.153`,
  `.109.153`, `.110.153`, `.111.153`) plus a `CNAME` for `www` →
  `jonahbalfour.github.io` — all set to Cloudflare's "DNS only" (grey
  cloud), not proxied, matching how `jonahbalfour.com` is configured.
  These were added and are resolving correctly.
- **GitHub Pages**: enabled on `main` branch, root path, `CNAME` file
  present in the repo. Pages build status is "built" and the site serves
  correctly over **plain HTTP**.
- **HTTPS**: as of the last check, GitHub had **not yet finished
  provisioning the TLS certificate** for the custom domain
  (`https_enforced: false`, and `https://gushdanskyline.com` fails the TLS
  handshake). This is normal shortly after DNS goes live and usually
  resolves within a few hours; check with:
  ```bash
  gh api repos/JonahBalfour/gushdanskyline/pages
  curl -sI --max-time 10 https://gushdanskyline.com
  ```
  If it's still not resolved after ~24 hours, something's wrong and worth
  investigating (re-check DNS, or re-toggle the custom domain in the repo
  Settings → Pages to force GitHub to retry issuance).

## Outstanding

- [ ] Confirm HTTPS is live for `gushdanskyline.com` (see above).
- [ ] Coordinate with the portfolio-site project to remove
      `projects/skyscrapers/` there and point its hub-page card at
      `gushdanskyline.com`.
- [ ] `audit.py`'s last run (Sept 2026) flagged 50 unsplit-multi-tower, 69
      duplicate, and 67 missing-height candidates still unresolved. Of the
      ones already spot-checked: Kalanit Towers (Kiryat Ono) and Song
      Towers (Givat Shmuel) were confirmed genuine gaps and fixed;
      Maslavi/Matzlawi Elite Towers, Bialik Towers, and the "U Towers"
      numbering gap were confirmed false positives; Le'om Towers (Rishon
      LeZion) is flagged inconclusive (thread title matches our data, but
      a buried reply mentions a possibly different/renamed "Ha-Leom
      towers 2×22fl" — not enough context to act on). See HANDOFF.md's
      "Data-quality audit tool" section for full detail before re-running
      the sweep.
- [ ] Long-standing flagged/ambiguous items from earlier sessions, still
      open (see HANDOFF.md for context on each): Vitania Towers,
      Ha-Umanim Towers, Lapid Towers, BSR Shaar HaYam, Yoseftal Gate
      Masterplan, VICA Park, Reisdor Towers, Global Gold Phase B, BSR
      Tower 4 height, and the Hagag Einstein 8-building masterplan
      (undecided how to schema a wide-range masterplan as rows at all).
- [ ] 6 bonus multi-tower leads found during an earlier height-fill sweep,
      not yet added to `RAW_DATA`: Vertical/Bursa Triangle (Ramat Gan),
      Jabotinsky-Herzl (Ramat Gan), Orek and Oz House (Ramat Gan), Dofen
      HaKirya (Tel Aviv), Jabotinsky Enav (Ramat Gan), The Park (Bnei
      Brak). Each needs its per-tower height/floor breakdown confirmed
      from its thread before adding.
- [ ] ~44 more `floors > 40 && height == null` candidates from an earlier
      partial sweep were never checked (low priority/low yield — most
      buildings in this dataset never had a published height at all).
