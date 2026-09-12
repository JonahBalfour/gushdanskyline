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

## Outstanding

- [ ] Confirm DNS for `gushdanskyline.com` points at GitHub Pages.
- [ ] `audit.py`'s last run flagged ~48 unsplit-multi-tower, 69 duplicate,
      and 67 missing-height candidates still unresolved — see HANDOFF.md
      for the categories already worked through.
