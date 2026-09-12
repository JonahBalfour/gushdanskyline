# Gush Dan Skyscraper Catalog — Handoff to Claude Code

## What this is
A database + dashboard cataloguing skyscrapers/towers across the Tel Aviv (Gush Dan)
metro area. Built so far entirely in Claude Chat; this handoff moves it into the Code
project so it can live on your site.

## Files in this handoff
- `gush-dan-skyscrapers.jsx` — the current dashboard (React component). Filters,
  sortable table, skyline chart, approximate map. Self-contained, no external data file
  needed — the dataset is embedded directly in the component as `RAW_DATA`.
- `gush-dan-data.json` — the same 778 records as a plain JSON file, in case you'd rather
  the component fetch data separately instead of having it inlined.

## Data, in brief
- **778 buildings**, 27 Gush Dan-area cities (Tel Aviv, Ramat Gan, Bnei Brak, Givatayim,
  Petah Tikva, Bat Yam, Holon are the "core 7"; the rest is broader Gush Dan).
- Source: thread titles from the SkyscraperCity Israel forum (Gush Dan + Tel Aviv
  project sub-forums), which you said to trust over Wikipedia since it's updated more
  often. Wikipedia/CTBUH used as a secondary cross-check for the well-known towers.
- Each record: name, city, height (m, often missing), floors (mostly present), status
  (Completed / Topped Out / Under Construction / Approved / Proposed / Planned /
  Marketing / On Hold / Cancelled / Unknown).
- Cleanup already done: fixed a parser bug that mis-read multi-tower entries, fixed a
  case-sensitivity bug that dropped some floor counts, merged 11 duplicate threads,
  dropped 17 area-wide masterplans (not single buildings), and removed 326 entries
  with no forum activity since before 2023 that weren't Completed or Topped Out.

## Known limitations (carry these into the next phase)
- No address/plot data — city-level only. The map places dots in a city-center cluster
  with a small spread, not real building footprints.
- ~565 entries are missing height (only ~213 have it). Floors are present for most.
- A handful of multi-tower complexes are still collapsed into a single row (e.g. one
  thread covering two towers of different heights) — see open item #2 below.
- Some "Under Construction" entries may actually be finished, since old forum threads
  don't always get their status tag updated after completion.

## Open items — not yet done, still on the list
1. Add a row-number column as the leftmost column of the table.
2. Split multi-tower entries into one row per tower, rather than one row per thread.
3. Fill in missing heights by opening individual forum threads — scoped to
   Completed → Topped Out → Under Construction (190 entries), in that priority order.
4. (Parked) A recurring Cowork scheduled-task prompt to spread #3's thread lookups
   over multiple overnight runs instead of one long session.
5. Design inspiration collected, not yet applied: the old Emporis.com (via Wayback
   Machine) and CTBUH's Skyscraper Center city-profile pages (facts panel, rankings,
   completions timeline chart) — see skyscrapercenter.com/city/tel-aviv.
6. UI/filters pass already done in this chat: sort arrows, colored status badges,
   filter option counts, removable filter chips, sticky table header, page-size
   picker. Worth a look before doing more design work on top of it.

## Simple steps to pick this up in your Code project

1. **Open your Code project** — the same one you're using for the portfolio / jobs
   dashboard / game prototype merge.
2. **Copy both files in** — drop `gush-dan-skyscrapers.jsx` and `gush-dan-data.json`
   into the repo (e.g. a new `gush-dan-skyline/` folder, matching how your other two
   projects are organized).
3. **Ask Claude Code to wire it up as a new page/route**, the same way the jobs
   dashboard and game prototype are wired in — and to add a nav link from the
   portfolio, the same pattern you used for those.
4. **Paste this file's "Open items" list into that chat** so Claude Code knows what's
   already decided and what's still open — that way you don't have to re-explain the
   history.
5. From there, decisions about hosting, page location, and nav wording are yours to
   make with Claude Code, since it has visibility into the actual repo structure that
   this chat doesn't.

That's it — steps 2 and 3 are the only ones that need you to actually do something;
the rest is context for Claude Code to work from.

---

## Status: wired up in the Code repo

Steps 2–3 above are done. The page is live locally at `projects/skyscrapers/` (not
yet pushed to `main`) as:
- `projects/skyscrapers/index.html` — loads React, ReactDOM, and Babel-standalone
  from a CDN (unpkg) and transpiles `app.jsx` in-browser at load time. See "Open
  items" #7 below — this is a deliberate deviation from the rest of the site's
  zero-dependency pattern and worth a decision before going live.
- `projects/skyscrapers/app.jsx` — the component, lightly adapted to run without a
  build step (`import` swapped for a `const { useState, useMemo } = React;`, plus a
  `ReactDOM.createRoot(...).render(...)` call at the bottom). `RAW_DATA` kept
  inline, matching the original — `gush-dan-data.json` was not added to the repo.
- Added as a third card on `projects/index.html`, hero copy updated to mention it.

Item #6 above (sort arrows, status badges, filter counts, chips, sticky header,
page-size picker) was confirmed present and working during integration — no
further work needed there before other design changes stack on top.

## Open items — added by Claude Code during integration

7. **CDN dependency, unlike the rest of the site.** This page pulls React,
   ReactDOM, and Babel-standalone from `unpkg.com` at runtime — the dashboard and
   game are both fully self-contained/offline-capable, this page currently isn't.
   Decide: accept the dependency, or have Claude Code convert the component to
   vanilla JS (more work, more faithful to the rest of the site) before pushing
   live.
8. **In-browser JSX transpilation cost.** Babel-standalone re-transforms the
   ~110KB component on every page load. Not urgent on its own, but compounds with
   #7 above if vanilla-JS conversion happens anyway.
9. **Footer text says "v2 catalog"** — an internal versioning note from the Chat
   build. Reword for a public-facing page.
10. **No page description/meta tags** (title/description/social preview), unlike
    the site's other pages. Minor, easy to add.
11. **Hub-page card blurb is a first draft.** Currently: "A catalog of 778
    skyscraper and tower projects across the Tel Aviv (Gush Dan) metro area —
    filterable, sortable, with a skyline chart and approximate map, sourced from
    forum-tracked construction data." Worth revisiting given the known data gaps
    (~565 entries missing height, city-level-only locations) — may want to set
    expectations more explicitly in the teaser copy itself. (Note: entry count is
    now 784, not 778 — see below.)

## Progress on open items #1–#3

**#1 — row-number column: done.** Added as the leftmost `#` column, numbering
continues across pages rather than resetting each page. Verified in-browser.

**#2 — split multi-tower entries: in progress, first batch done.** Key finding:
SkyscraperCity's own thread-title convention usually already encodes the
per-tower breakdown directly (e.g. `"...| 303.6 m & 110 m | 79 fl T/O & 27 fl
Completed"` for asymmetric pairs, or `"...| 2x 102 m | 2x 30 FL |..."` for
identical twins) — so most splits don't require opening the full thread, just
reading the current title (which can differ from stale search-engine snippets;
confirm against the live thread).

Split so far (RAW_DATA now has 833 entries, up from 778):
- **Toha by Ron Arad** → `(Tower 1)` 302m/79fl/Topped Out (status corrected
  from stale "Completed") + new `(Tower 2)` 110m/27fl/Completed.
- **BSR Towers 1 & 2** (Ramat Gan/Bnei Brak boundary) → `BSR Tower 1` 121m/27fl
  + `BSR Tower 2` 110m/28fl, both Completed. Kept both under "Ramat Gan" since
  the complex straddles both cities — revisit if per-city accuracy matters more
  than keeping the pair together.
- **BSR 3 + 4** (Bnei Brak) → `BSR Tower 3` 35fl (no height found) +
  `BSR Tower 4` 40fl (no height found), both Completed.
- **BSR Tzameret 2 & 3** (Tel Aviv) → `BSR Tzameret Tower 2` +
  `BSR Tzameret Tower 3`, both 102m/30fl/Completed (symmetric twins, not a
  differing pair).
- **Tel Aviv Towers 3-4** → `Tel Aviv Towers (Tower 3)` +
  `Tel Aviv Towers (Tower 4)`, both 140m/34fl/Completed (symmetric twins).
- **U Towers (Masada 2–4)**, Bat Yam → `U Towers (Masada 2)` +
  `U Towers (Masada 4)`, both 34fl/Planned, height still unknown for both
  (symmetric twins).
- **East& / Fmr Migdaley HaYetzira** (Tel Aviv) → `(South Tower)` 144.55m/35fl
  (the original single row) + new `(North Tower)` 152.5m/41fl, both Completed.
- **Azrieli Town** → `(Residential Tower)` 156m/40fl (status corrected from
  stale "Completed" to "Topped Out") + new `(Office Tower)` 175m/50fl/Completed.
- **Azrieli Center** (the classic Round/Triangle/Square trio) → existing row
  kept as `(Round Tower)` 187m/50fl/Completed, + new `(Triangle Tower)`
  169m/46fl/Completed + `(Square Tower)` 154m/42fl/Completed.

Checked the rest of the "Azrieli"-named entries too — all confirmed correct
as single towers already, no changes needed: Azrieli Center Spiral Tower,
Sarona Azrieli Tower, Azrieli Palace Rakafot, Azrieli Rishonim Center,
Azrieli Town E, Azrieli Petah Tikva (no dedicated thread found for this last
one — inconclusive, left as-is, not confirmed problem-free).

More splits (batch following up on a "BSR CITY" clue found while checking
Azrieli Petah Tikva):
- **BSR CITY** (Petah Tikva) → 4 identical towers, `(Tower 1)`–`(Tower 4)`,
  each 32fl/Completed, no height known for any.
- **OliO** (Bat Yam) → `(Tower 1)` new row 42fl/Topped Out + `(Tower 2)`
  existing row 10fl/Topped Out (status already correct).
- **Migdalei Rakafot** (Rishon LeZion) → `(Tower 1)` + `(Tower 2)`, both
  28fl/Completed (symmetric twins; live thread's floor count differs slightly
  from an older "2 x 29 fl" title revision — used the current one).
- **Uptown Tower** (Bat Yam) → `(Tower 1)` existing row 162m/46fl/Completed +
  new `(Tower 2)` 131m/34fl/Completed.

- **EXchange (Ramat Gan)** — Jonah caught this one directly (not from the
  review queue): "EXchange Residences" and "EXchange Offices" are two
  separate towers per Wikipedia, but we only had one row. Verified via the
  live thread ("EXchange frmr Elite tower | 59 fl Residential, 49 fl Office
  | 206.5 m & 197 m") and it turned out to be a mixed-pairing bug too — the
  same pattern as Beyond and Toha earlier this session, where the existing
  row's height (197m, Office) was paired with the wrong tower's floor count
  (59fl, Residential). A post from Sept 9, 2026 confirmed current status:
  Residential is now Completed, Office is still Topped Out (not yet open).
  Fixed: `EXchange (Office Tower)` 197m/49fl/Topped Out (corrected floor
  count + status) + new `EXchange (Residential Tower)` 206.5m/59fl/Completed.
- **Round 2 begun.** Cross-checked the dataset against the next tier of
  Wikipedia's list (120-150m, continuing down from Round 1's >150m pass).
  22 new items logged in the review queue artifact, categories E-J.
  Resolved so far:
  - **Category F (discrepancies vs. Wikipedia) — 6 of 7 resolved, no data
    changes needed.** Live-thread titles confirmed our existing numbers over
    Wikipedia's in every case checked: White City Residence (115m/29fl,
    32K-view thread vs. a superseded 2010 pre-construction thread at
    145m/37fl), Vision/HaSandlar Tower (135m/38fl — the "150m/40fl" hit
    that came up first is an unrelated, different Vision Tower in Tel
    Aviv), Azorim Hof Bat Yam (135m/40fl), Ashdar Bat Yam (147m/37fl — the
    "42fl" title variant traced back to a quoted compilation snippet, not
    the primary 13K-view thread), Maslavi Elite Towers (100m/33fl,
    71K-view/255-reply thread — a forum post explicitly confirms it's
    unrelated to a separate cancelled "Elite tower" office plan Wikipedia
    may have conflated it with), and Pisgat Dan - Jabotinsky 105
    (140m/40fl, not Wikipedia's 42fl). **BSR Tower 4** (Bnei Brak) remains
    open: the live thread title confirms floor count is 40 (not
    Wikipedia's 38), but no reliable height was found — a compilation-post
    snippet suggested 140m but couldn't be confirmed against the actual
    source post, so it's left as-is (no height) rather than guessed.
  - **BSR CITY (Towers 1-4)**, Petah Tikva — height filled in: 125m for all
    4 (floor counts already matched Wikipedia exactly).
  - **BSR Tower 3**, Bnei Brak — height filled in: 133.9m (floor count
    already matched).
  Note while verifying: confirmed we already have a separate "BSR Tower 1"
  and "BSR Tower 2" in **Ramat Gan** (121m/27fl and 110m/28fl, from an
  earlier session split) — worth double-checking against Wikipedia's
  "BSR Tower 2" (121m/30fl, listed as Bnei Brak) when tackling review-queue
  item G-01, since the height matches suspiciously well despite the
  city/floor mismatch — may be the same tower mislabeled by one source.
- **Global Towers & Global Gold** (Petah Tikva) — resolved from the review
  queue (item A-06), the last open item. Took real digging across multiple
  sources Jonah supplied: a SkyscraperCity moderator's post citing actual
  Petah Tikva planning-authority blueprints (most reliable — tied to real
  LPC approval documents, not just forum guesses), a labeled rendering
  image, and a local news article. This turned out to be two separate
  adjacent parcels/plans:
  - **Western parcel ("Global Towers")**: Tower A (167m/43fl) + Tower B
    (141m/36fl) + Building D (82m per blueprint, ~86m per our existing row
    — kept the existing row) + an existing non-tower building (Maccabi)
    and a low-rise, neither tracked here.
  - **Eastern parcel ("Global Gold")**: Phase A (144m/34fl) + Phase B (a
    southern tower, height still unknown).
  Jonah confirmed status: Tower A and Tower B are Completed, Global Gold
  Phase A is Topped Out. Renamed the existing row to `Global Towers
  (Building D)` (86m/20fl/Completed, unchanged) and added `Global Towers
  (Tower A)` 167m/43fl/Completed, `Global Towers (Tower B)`
  141m/36fl/Completed, and `Global Gold (Phase A)` 144m/34fl/Topped Out.
  **Global Gold Phase B remains unresolved** — no height or status found
  anywhere yet; add it if/when that surfaces.
- **Meier on Rothschild Tower** (Tel Aviv) — resolved from the review queue
  (item D-01). Floor count filled in: 38fl, from Wikipedia (height already
  matched Wikipedia exactly at 158m, so this was a safe fill per Jonah's
  go-ahead).
- **Toha by Ron Arad naming fix** — Jonah corrected the tower numbering:
  the shorter tower (110m/27fl/Completed) is Tower 1, the taller tower
  (302m/79fl/Topped Out) is Tower 2. Swapped from this session's earlier
  (backwards) labeling.
- **Category C (discrepancies) — resolved all 10.** Checked every item
  against live SkyscraperCity threads directly (not Wikipedia), using
  view-count as a tiebreaker where multiple threads existed for the same
  building (an older/abandoned thread vs. the actively-maintained one):
  - **8 needed no changes at all** — our data was already correct;
    Wikipedia was either wrong or (in Nimrodi Ma'ariv Tower's case)
    describing a completely different building that happens to share a
    developer's name: Hi Tower (220m/57fl — a duplicate thread with 9K
    views said 227m/58fl vs. the main thread's 275K views), Toha Tower 1,
    Azrieli Sarona Tower (238.5m/57fl), Champion Tower (160m/42fl), Amot
    Atrium Tower (153m/37fl — same duplicate-thread situation, 88K vs. 3K
    views), Sapir Tower (170m/43fl), One Tower (160m/36fl), Nimrodi
    Ma'ariv Tower (Tel Aviv, 220m/52fl, Planned/"Prep" — Wikipedia's
    "Nimrodi Tower" entry is actually the separate, completed "7 Stars
    Tower" in Bnei Brak), and Azrieli Town (already resolved earlier this
    session).
  - **1 needed a real fix — Landmark Towers**: confirmed via live thread
    ("2 x 162m | 45 fl | 1 Completed, 1 T/O") as a genuine 2-tower complex.
    Split into `(Tower A)` 162m/45fl/Completed (existing row) +
    `(Tower B)` 162m/45fl/Topped Out (new).
- **Sea Towers** + **Balfour Towers** (both Bat Yam) — resolved from the
  review queue (items B-11/B-12). Re-checked both live threads directly:
  neither had progressed since the old snapshots found earlier ("site prep"
  / "approved" from ~2015-2016) — both are still genuinely at those stages.
  Added as `(Tower 1)` + `(Tower 2)` pairs: Sea Towers 28fl each ("site
  prep" mapped to "Approved," no closer status bucket available), Balfour
  Towers 34fl each ("Approved"). Neither has a recorded height.
- **Sonol Tower 1** (Tel Aviv) — resolved from the review queue (item B-10).
  New row: 99.8m/29fl/Completed, per a building-ranking compilation source
  (no dedicated thread found). Same site as "Sonol Tower 2" (a later,
  still-Approved phase), already correctly in the dataset.
- **Kirya Tower** (Tel Aviv) — resolved from the review queue (item B-09).
  Jonah caught an error in my earlier sort: this is NOT the same building as
  "Temech 1 Hakirya Tower" (different, newer, still-under-construction
  building) — it's actually an alternate name for **HaYovel Tower**, a real
  separate completed building, confirmed via Wikipedia. Added as a new row:
  `HaYovel Tower (Kirya Tower)`, 158m/42fl/Completed (2005). Both this and
  Temech 1 now exist as their own correct, distinct rows.
- **H Recital Tower** (Tel Aviv) + **Leonardo City Tower** (Ramat Gan) —
  resolved from the review queue (items B-07/B-08). Both had no dedicated
  SkyscraperCity thread findable, so per Jonah's call, added using
  Wikipedia's numbers instead: H Recital Tower 153m/34fl/Completed, Leonardo
  City Tower 157m/37fl/Completed.
- **W-Tower** (Tel Aviv) — resolved from the review queue (item B-06). New
  row: 156m/46fl/Completed (2009), per "W-Tower | TEL AVIV | 156m | 46fl".
  Distinct from "W Prime," already correctly in the dataset.
- **Midtown** (Tel Aviv) — resolved from the review queue (item B-02/B-03).
  New rows: `(Office Tower)` 197m/50fl/Completed + `(Residential Tower)`
  183m/50fl/Completed, per "Midtown | 2x50 fl | 197m and 183m | Completed".
- **HaArba'a Towers** (Tel Aviv) — resolved from the review queue
  (item B-04/B-05). New rows: `(Tower 1)` 160m/37fl/Completed + `(Tower 2)`
  150m/40fl/Completed, per "Haarba'a towers | 37 & 40 fl | 160m & 150m |
  Completed".
- **HaShahar Tower** (Givatayim) — resolved from the review queue (item B-01).
  Jonah supplied two thread links: an international-forum cross-post ("The
  Shahar Tower | 202m | 661ft | 52 fl | Com") and the *original* Gush Dan
  sub-forum thread ("Shachar Tower | 200 m | 53 FL | Completed") — went with
  the original as authoritative. Added as a new row: 200m/53fl/Completed.
  Confirmed the thread sits squarely inside Middle East → Israeli Forums →
  Projects → Gush Dan, i.e. exactly the sub-forum the original data
  collection claims to have covered — so this wasn't a sub-forum-coverage
  gap, just a plain miss in that original harvest (exact mechanical cause
  unknown — no visibility into how that scrape was run).
  **Correction (Jonah caught this later):** the "miss" wasn't real — the
  dataset already had this building under the pre-existing spelling
  "Shachar Tower" (200m/53fl/Completed, same city, near-identical
  coordinates). The B-01 fix had added a second row as "HaShahar Tower"
  without first checking for a spelling-variant duplicate. Removed the
  duplicate row (the "HaShahar Tower" one added this session); kept the
  original "Shachar Tower" row, which also matches the live thread's own
  title exactly. Net effect: dataset is back down to 819 rows.
  A follow-up sanity pass (fuzzy name-match + identical stats, scoped to
  same-city pairs) found no other spelling-variant duplicates — every other
  high-similarity match was either a deliberate `(Tower N)` split from this
  session (symmetric towers sharing identical stats by design) or two
  genuinely different buildings that just share a street name/number
  pattern (e.g. the various "Eshkol NNN" and "Sde Dov NNNN" plot-address
  entries).
- **Tzameret Towers** (Tel Aviv) — resolved from the review queue (item
  G-03), via a Wikipedia link Jonah supplied directly
  ([Tzameret Towers](https://en.wikipedia.org/wiki/Tzameret_Towers)). This
  turned out not to be the mismatch it looked like: Wikipedia's "Tzameret
  Towers" (aka "Akirov Towers") is a real, distinct, famous 3-tower
  landmark complex (123m/34fl/Completed each) that was simply missing from
  the dataset entirely — a different building from our existing "BSR
  Tzameret Tower 2 & 3" (102m/30fl), which is itself a real, separate,
  correctly-sourced complex in the same Park Tzameret neighborhood
  (confirmed via its own live thread: "BSR Tzameret 2 & 3 | 2x 102 m | 2x
  30 FL | Completed", tagged "park tzameret tel aviv"). No "BSR Tzameret
  Tower 1" thread was found, so that gap (if real) stays open. Added 3 new
  rows: `Tzameret Towers (Tower 1/2/3)`, all 123m/34fl/Completed.
- **BSR Towers 1 & 2** (Ramat Gan / Bnei Brak) — resolved from the review
  queue (item G-01), via a Wikipedia link Jonah supplied directly
  ([BSR Towers](https://en.wikipedia.org/wiki/BSR_Towers)), with a caution
  to double-check since BSR has projects "all over the place." Wikipedia
  confirms the actual complex is exactly 4 towers total (1 in Ramat Gan, 2/3/4
  in Bnei Brak) — matching what we already had once Tower 3 & 4 were split
  earlier this session. The real issue was a mislabel: our existing "BSR
  Tower 1" (121m/27fl) and "BSR Tower 2" (110m/28fl) were both filed under
  Ramat Gan, but real-world business addresses (multiple law firms, Waze,
  company registries) confirm Tower 1 is at 2 Ben Gurion Rd, **Ramat Gan**,
  and Tower 2 is at 1 Ben Gurion Rd, **Bnei Brak** — and an independent
  source (SKYDB) put Tower 2 at 120.6m/27fl, matching our 121m/27fl row
  almost exactly. So the heights/floors we already had were correct — the
  two rows just had their tower numbers/city swapped. Fixed: `BSR Tower 1`
  now 110m/28fl/**Ramat Gan** (unchanged numbers, was already correct city);
  `BSR Tower 2` now 121m/27fl/**Bnei Brak** (city corrected from Ramat Gan).
  Checked further for any other BSR-branded tower in Bnei Brak beyond this
  4-tower complex (per Jonah's caution) — none found; every other
  BSR-named project in the dataset (BSR 1K, BSR CITY, BSR Shaar HaYam, BSR
  Tzameret, BSR Sarona, the proposed Central Point Towers) is a separate,
  unrelated development, already correctly filed as its own entry.
- **Tel Aviv Towers 1 & 2** (Tel Aviv) — resolved from the review queue (item
  G-02). Wikipedia's "Tel Aviv Towers" confirms it's genuinely a 4-tower
  complex: Towers 1 & 2 ("the two northern towers," 107.75m/34fl each,
  built 1998-2000) + Towers 3 & 4 ("the two southern towers," which we
  already had at 140m/34fl each, confirmed via live thread "Tel Aviv Towers
  3-4 | 140 m | 2 x 34 FL | Completed"). No dedicated SkyscraperCity thread
  exists for Towers 1 & 2 — the only mention found was an offhand aside
  inside the Towers 3-4 thread ("nicer than Tel Aviv towers 1-2 that are so
  square..."). Given they were completed in 2000, they likely pre-date the
  Gush Dan sub-forum's active period, same pattern as category I. Added
  using Wikipedia's specific 107.75m figure (not the flatter "140m" some
  secondary Wikipedia-derived lists mistakenly apply to all four towers,
  which is really the complex's tallest-building figure, not a per-tower
  one) — added 2 new rows: `Tel Aviv Towers (Tower 1)` + `(Tower 2)`, both
  107.75m/34fl/Completed.
  **Follow-up (Jonah caught a real inconsistency, then found the tiebreaker):**
  the Wikipedia infobox separately lists "Roof: 140m" / "Floor count: 42" as
  single, unlabeled values for the whole complex — contradicting the article's
  own detailed intro prose (107.75m/34fl for Towers 1&2). Checked the edit
  history: the specific 107.75m/34fl prose was added in a substantial,
  well-researched content edit (Oct 2025, grew the article from 2.5KB to
  4.3KB with real detail — apartment counts, construction dates); the
  infobox's raw fields date to the article's earlier stub era and have only
  been touched by mechanical bot edits since (template cleanup, archive-link
  fixes) — never reconciled with the newer prose. Jonah then found the
  developer's own site
  ([Hagag Group](https://www.hagag-group.co.il/projects/ResidentProjects/%D7%9E%D7%92%D7%93%D7%9C%D7%99_%D7%AA%D7%9C-%D7%90%D7%91%D7%99%D7%91))
  — Hagag is literally one of the two developers of the southern towers per
  Wikipedia's own history section — which states outright all four towers
  are 34 floors each. That's a third, independent, and highly authoritative
  source confirming 34fl for every tower, settling it: the infobox's "42"
  was a stray, unreconciled error, not a real alternate figure. No change
  to the data added above.
- **TOU Towers** (Tel Aviv) — resolved from the review queue (item G-04).
  The live thread ("Tel Aviv | TOU Towers | 2x33 fl | Completed", a
  long-running thread active from 2015 through 2026) confirms this is
  genuinely a twin-tower complex, matching our existing floor count (33fl)
  exactly — we just had it collapsed into one row instead of two.
  Wikipedia's "2 towers, 140m/36fl each" turned out to be the less reliable
  figure here: its floor count (36) doesn't match the live thread's 33fl,
  so its height (140m) wasn't trusted either and no height was added — no
  reliable height figure was found anywhere for this building (also known
  as "Rubinstein Twins" per an AI-search summary, part of the Yitzhak Sadeh
  compound, completed ~2021). Split into `TOU Towers (Tower 1)` (existing
  row) + new `TOU Towers (Tower 2)`, both 33fl/Completed, no height.
  **Category G is now fully resolved.**
- **Category H (missing, likely recent enough to have a thread) — 4 of 5
  resolved, 1 turned out to not be missing at all:**
  - **Delek Motors Tower** (Tel Aviv) — no dedicated thread found, only
    compilation-index mentions and a neighboring-building caption inside
    the Vitania Towers thread. Added per Wikipedia's consistent figure
    (146m/36fl/Completed, 2020).
  - **Manhattan Tower** (Tel Aviv) — a dedicated Park Tzameret thread was
    found ("Park Tzameret | Manhattan Tower | 140m | 41 fl | U/C") whose
    height matches Wikipedia exactly (140m) with a 1-floor difference
    (41 vs Wikipedia's 40). Went with the SkyscraperCity-sourced number per
    project convention. Added 140m/41fl, status updated to Completed
    (thread's "U/C" is stale — building has been complete since 2009).
  - **Levinstein Tower** (Tel Aviv) — a genuinely dedicated, multi-page
    thread exists ("Levinstein Tower l TEL AVIV l 145m l 34fl", its own
    info-card: 145m/34fl/completed 2000), outranking a general 2005
    Tel Aviv compilation-index post (125m/35fl) that Wikipedia also uses.
    Added 145m/34fl/Completed.
  - **Totzeret HaAretz 1 — not actually missing.** This turned out to be
    the exact same complex as our existing "Toha by Ron Arad" entries,
    just under Wikipedia's full name. Wikipedia's own
    [Totzeret HaAretz Towers](https://en.wikipedia.org/wiki/Totzeret_HaAretz_Towers)
    article confirms: Totzeret HaAretz 1 = ToHa Tower 1 (110.3m/27fl,
    2019) matches our "Toha by Ron Arad (Tower 1)" exactly; Totzeret
    HaAretz 2 = ToHa Tower 2 (302m/76fl) matches our "(Tower 2)" height
    exactly (floor count close: 76 wiki vs 79 ours, sourced from the live
    thread). No new rows added; this was the same kind of naming-cluster
    trap as the Shachar Tower duplicate earlier in the session, just caught
    before creating a duplicate this time.
    **Correction:** the article also states the complex "consists of three
    towers," and this was first guessed to match our existing, separate
    "Toha Residential (15 HaShalom)" row — Jonah corrected this: a real
    ToHa Tower 3 exists but is at such an early planning stage it isn't
    worth adding to the dataset yet. "Toha Residential (15 HaShalom)" is
    unrelated to it; left as-is either way, and Tower 3 stays out
    intentionally, consistent with how other early-stage/rumor-level
    projects have been excluded throughout.
  - **Neve Tzedek Tower** (Tel Aviv) — a dedicated thread ("Tel Aviv: Neve
    Tzedek tower, 44F (147m)") matches Wikipedia's numbers exactly. Added
    147m/44fl/Completed.
- **Category I (missing, likely pre-dates the forum) — all 3 resolved.**
  Jonah supplied direct source links for all three:
  - **Shalom Meir Tower** (Tel Aviv) — completed 1965, once the tallest
    building in the Middle East/Asia. Wikipedia's dedicated article is
    detailed and internally consistent (infobox matches body text, unlike
    the earlier Tel Aviv Towers contradiction). Added 129m/34fl/Completed.
  - **Marganit Tower** (Tel Aviv, HaKirya) — completed 1987, most of its
    138m height is actually an antenna mast ("finger"), which is why it
    only has 17 floors despite the height. Added 138m/17fl/Completed.
  - **Ayalon Tower** (Ramat Gan, Diamond Exchange District) — the
    developer's own project page (David Engineers) lists 30 floors, but a
    SkyscraperCity thread comment confirms the tower had floors added in
    stages after initial construction ("3rd Stage addition of 7 floors
    above") — the developer's figure is likely an earlier phase. Went with
    Wikipedia's 130m/35fl, independently corroborated by the original 2005
    Tel Aviv compilation-index post too. Added 130m/35fl/Completed.
  **Category I is now fully resolved.**
- **Rothschild Boulevard cluster (item J-01) — resolved. Category J is now
  fully resolved, and with it the entire Round 2 review queue.** Jonah
  supplied three direct links (CTBUH's Skyscraper Center, a Wikipedia
  article, and a developer's own site) and confirmed there are three
  distinct Rothschild-named towers in total. Sorted out:
  - **"22 Rothschild - Aviv Tower"** (our existing row, 130m/30fl) is the
    same building as Wikipedia's "Rothschild 22 Tower" article (owned by
    Aviv Group, at 22 Rothschild Blvd, 126.9m/29fl including mast) — not a
    second, conflicting building. Numbers close enough (within a floor/a
    few meters) to be the same building described slightly differently
    across sources; left our existing row unchanged.
  - **"Rothschild 10 (Six Senses Tel Aviv)"** (our existing row,
    161.4m/42fl) — confirmed as its own separate, correct building at a
    different address (Rothschild 10, not 1 or 22); left unchanged.
  - **"1 Rothschild Boulevard"** — the genuinely missing third tower (also
    known as "The Phoenix Tower" on an early SkyscraperCity thread). CTBUH's
    Skyscraper Center gives precise, detailed completion data (120.2m/32fl,
    completed 2010, address "1 Baron Edmond de Rothschild Boulevard") that
    was trusted over a less precise 2005 compilation-index figure
    (125m/34fl, also used by Wikipedia's tallest-buildings list). Added
    120.2m/32fl/Completed.
- **Arlozorov Young Towers** (Tel Aviv) — resolved from the review queue
  (item A-05), verified against the live thread directly (not Wikipedia):
  "170m, 150m | 47 + 41 FL | Completed". Our existing row (150m/41fl) matched
  Tower 2 exactly; added Tower 1 (170m/47fl/Completed).
- **Sitonai / Wholesale Market Towers** (Tel Aviv) — resolved from the review
  queue (item A-04). Jonah corrected Wikipedia here: it's actually **4**
  towers at 160m/48fl, not the 3 Wikipedia listed. Split into
  `(Tower 1)`–`(Tower 4)`, all 160m/48fl/Completed. (The separate, unrelated
  "Sitonai Market - Gindi Tel Aviv" entry, 16fl, was left untouched.)
- **Park Bavli** (Tel Aviv) — resolved from the review queue (item A-03), per
  Jonah's call to go with Wikipedia's numbers. Our row already matched
  exactly (150m/44fl/Completed), so it was simply duplicated into
  `(Tower 1)` + `(Tower 2)`.
- **Da Vinci Towers** (Tel Aviv) — resolved from the review queue (item A-02),
  per Jonah's call to go with Wikipedia's numbers here rather than our old
  single row. Split into `(North Tower)` + `(South Tower)`, both
  155.2m/42fl/Completed (identical twins).
- **Beyond** (Givatayim) — resolved from the review queue (item A-01). Live
  thread title is "313 m + ? m | 78 + 70 fl | T/O": Office Tower 313m/78fl,
  Residential Tower height unknown/70fl. The old single row had swapped the
  pairing (313m was paired with 70fl, not 78fl) — corrected to
  `(Office Tower)` 313m/78fl/Topped Out + new `(Residential Tower)`
  null/70fl/Topped Out.

Checked but inconclusive, left alone:
- **"Global Towers & Global Gold"** (id 12, Petah Tikva, our row: 86m/20fl/
  Completed) — UPDATE: verified against the live thread directly. This is
  NOT a wrong/mismatched row after all — it's a genuine **5-tower**
  megaproject. Live title: "Global Towers & Global Gold | 43 + 36 + 34 + ? +
  20 fl | 167 + 141 + 144 + ? + 86 m | 2 Completed, 1 T/O, 2 Approved LPC".
  Our row (86m/20fl) matches the smallest tower exactly, so it was right all
  along — just incomplete. Still couldn't fully resolve it though: the title
  gives 5 floor/height pairs and status *totals* but not which specific
  tower has which status, one tower's floor/height is unknown (the "?"), and
  a related developer page (BSRE) mentions a "Global Tower" at 24fl/U-C that
  doesn't match any of the 5 numbers — unclear if that's a 6th building, a
  renamed one of the 5, or unrelated. Left for Jonah, same as Sitonai.

Missing-entry gaps noticed while searching (not splits — these projects
aren't in the dataset at all, under any name):
- **"Sea Towers"** (Bat Yam) — "28 fl x 2 | site prep" per SkyscraperCity,
  not found anywhere in our 819 rows.
- **"Balfour Towers"** (Bat Yam) — "2 x 34 fl | approved" per SkyscraperCity,
  also not found in our 819 rows.
- (Also still open from earlier: the real "Sonol Tower 1," ~100m/29fl.)

Checked but NOT split (false leads, worth remembering so they aren't
re-litigated):
- **Sonol Tower 2** — not actually part of a pair to split; "Tower 2" is just
  this project's own name (phase two of a two-phase site). Row is already
  correct as-is.
- **Avnat Tower 2** — no matching thread found; only match was the unrelated,
  already-correct "Avnat Mall Tower & Prima Hotel" row. Left alone, unconfirmed.

Found but not yet resolved — needs a decision:
- **"Hagag Einstein 33-35, 36"** (id 597, Tel Aviv) — turned out to be a
  genuine 8-building masterplan ("3 x 30 fl, 5 x 15 fl | Approved"), not a
  simple 2-way split. Decide: split into 8 rows, or drop it the same way the
  original cleanup dropped 17 other area-wide masterplans.

Known gap surfaced along the way, not itself an open item to fix here:
- The real **"Sonol Tower 1"** (~100m/29fl, an existing completed building
  near Sonol Tower 2) isn't in the dataset at all — a missing-entry gap
  distinct from the split work above.

Still to do for #2: scan the rest of the 819 entries for more multi-tower
candidates (name-pattern heuristics like "Towers", "+", "&", "2 x N" catch
some but miss others — e.g. "Beyond", "I M Givatayim", and "Millennia" were
only found via direct thread search, not name pattern) and keep batching
through them.

**#3 — fill missing heights: paused, low yield so far.** First batch (8
"Completed" entries with missing height) found zero usable heights — for
ordinary 20–40 floor residential/office buildings, an exact height in meters
often was never recorded anywhere public (checked SkyscraperCity, Emporis,
Wikipedia), unlike landmark towers. Confirmed by directly reading a full
100-reply thread (Phoenix Art) via browser, not just search snippets — height
was never mentioned across the entire discussion. Tooling note: SkyscraperCity
blocks automated fetch tools (HTTP 402 paywall), but loads fine through an
actual browser session — use browser-based access, not WebFetch, for any
future thread-reading work. Given #2's better yield, #2 is the current focus;
revisit #3 once #2's batches are done.

## Review queue — for Jonah to go through, one at a time

Cross-checked the dataset (819 rows as of this pass) against Wikipedia's
[List of tallest buildings in Israel](https://en.wikipedia.org/wiki/List_of_tallest_buildings_in_Israel)
(buildings over 150m — the list has more below that cutoff not yet checked).
Per the project's own methodology, SkyscraperCity is the trusted primary
source and Wikipedia is only a secondary cross-check — so nothing below has
been auto-corrected from Wikipedia numbers alone. Each item needs either a
decision from Jonah or one more round of SkyscraperCity verification before
editing.

### A. Confirmed multi-tower gaps (need a split, not yet done)

- **Beyond** (id 2, Givatayim) — genuinely a 2-tower complex, but the sources
  disagree with each other: our row says 313m/70fl; live SkyscraperCity
  thread title says "313 m + ? m | 78 + 70 fl" (office tower 313m/78fl,
  residential tower height unknown); a web summary of the same thread says
  the residential tower is 50fl, not 70fl; Wikipedia says the office tower
  is 308.3m/72fl. Three sources, three different numbers for the office
  tower alone. Needs a careful direct read of the live thread (not just
  search snippets) before splitting — flagging rather than guessing given
  this is the tallest building in the country.
- **Da Vinci Towers** (id 483, Tel Aviv) — Wikipedia lists North + South
  towers, both 155.2m/42fl (identical twins). Our single row says
  154m/44fl. Likely the same symmetric-twin pattern as BSR Tzameret — needs
  a SkyscraperCity thread check to confirm the exact current figures before
  splitting (Wikipedia's 155.2/42 vs. our 154/44 don't match, so don't just
  copy Wikipedia's numbers in).
- **Park Bavli** (id 551, Tel Aviv) — Wikipedia lists Park Bavli 1 (2018)
  and Park Bavli 2 (2023), both 150m/44fl. Our single row already has
  150m/44fl — matches one tower exactly, likely just needs a duplicate row
  added (same symmetric-twin pattern), but confirm via SkyscraperCity first.
- **Sitonai / Wholesale Market Towers** (id 472, Tel Aviv) — Wikipedia lists
  3 towers, all 160m/48fl. Our single row already matches exactly
  (160m/48fl) — likely needs 2 more duplicate rows added, confirm via
  SkyscraperCity first. (Separate, unrelated entry "Sitonai Market - Gindi
  Tel Aviv," id 727, is a different building — leave alone.)
- **Arlozorov Young Towers** (id 583, Tel Aviv) — Wikipedia lists two towers
  with quite different stats: Tower 1 = 170m/53fl, Tower 2 = 151.7m/47fl.
  Our single row says 150m/41fl, which doesn't closely match either one.
  Needs a real SkyscraperCity thread check, not a name-based split — the
  numbers here don't line up cleanly enough to guess.
- **Global Towers & Global Gold** (id 12, Petah Tikva) — flagged before,
  now doubly confirmed as wrong: Wikipedia's "Global Towers 1" is
  152m/36fl, and the SkyscraperCity "Global Towers" project separately
  seen is a 2-3 tower megaproject (32fl/125m + 36fl/140m + a 3rd unclear
  tower) — our row's 86m/20fl doesn't match anything from either source.
  This row is very likely just wrong and needs a fresh look, not a split.

### B. Entries that appear to be missing from the dataset entirely

Checked directly by name — not found anywhere in the 819 rows, under any
naming variant:
- **HaShahar Tower**, Givatayim — 201m/54fl per Wikipedia.
- **Midtown Office** + **Midtown Residences**, Tel Aviv — 196m/50fl and
  183m/50fl per Wikipedia (the "Midtown Tel Aviv" complex).
- **HaArba'a Tower 1** + **Tower 2**, Tel Aviv — 160m/38fl and 146m/34fl.
- **W-Tower**, Tel Aviv — 156m/46fl (distinct from "W Prime," which we do
  have correctly as id matching 150m/46fl).
- **H Recital Tower**, Tel Aviv — 153m/34fl.
- **Leonardo City Tower**, Ramat Gan — 157m/37fl (we only have the
  unrelated "Leonardo Complex" in Tel Aviv — different city, different
  building).
- **Kirya Tower**, Tel Aviv — 158m/42fl. Closest thing in our data is
  "Temech 1 Hakirya Tower" (id 506, no height, 35fl) — floor count doesn't
  match, unclear if it's the same building under a different name or a
  genuinely separate missing entry.
- (Already known from earlier: **Sonol Tower 1**, **Sea Towers**,
  **Balfour Towers** — see above.)

### C. Height/floor/status discrepancies (entry exists, numbers disagree)

- **Hi Tower** (id 108, Givatayim) — ours: 220m/57fl. Wikipedia: 226.7m/58fl.
- **ToHa Tower 1** (our "Toha by Ron Arad (Tower 1)") — ours: 302m/79fl.
  Wikipedia's "ToHa Tower 2" (their numbering, not ours): 301.6m/76fl.
  Height close, floor count off by 3.
- **Azrieli Sarona Tower** (id 502) — ours: 238.5m/57fl. Wikipedia:
  238.4m/61fl. Floor count off by 4 — larger than a rounding difference.
- **Champion Tower** (id — Bnei Brak) — ours: 160m/42fl. Wikipedia's
  "Champion Motors Tower": 160m/40fl.
- **Amot Atrium Tower** (Ramat Gan) — ours: 153m/37fl. Wikipedia: 158m/40fl.
- **Sapir Tower** (Ramat Gan) — ours: 170m/43fl. Wikipedia: 163.6m/42fl.
- **Landmark Towers** (id 468, Tel Aviv) — ours: 162m/45fl. Wikipedia's
  "Landmark Tower 1": 165m/45fl (naming implies there may be a Tower 2 too
  — not found in our data or confirmed to exist).
- **One Tower** (id 238, Ramat Gan) — ours: 160m/36fl. Wikipedia: 158m/38fl.
- **Nimrodi Ma'ariv Tower** (id 510) — biggest discrepancy of the batch:
  ours has it in **Tel Aviv**, 220m/52fl, status **Planned**. Wikipedia's
  "Nimrodi Tower" is in **Bnei Brak**, 211.3m/52fl, status **Completed
  2023**. City, height, and status all disagree — floor count is the only
  thing that matches. Worth checking first since it looks like it could be
  a straightforwardly stale/wrong row rather than a subtle rounding issue.
- **Azrieli Town** — heads up: the split I just made this session used
  156m/40fl (Topped Out) + 175m/50fl (Completed), sourced from the live
  SkyscraperCity thread title. Wikipedia's numbers for the same complex are
  different: "Azrieli Town Residences" 170m/50fl and "Azrieli Town 1"
  155m/40fl. Close but not identical on both towers — worth a second look
  given I only just made this edit.

### D. Safe, low-risk fill (matches on height, just adding a missing floor count)

- **Meier on Rothschild Tower** (id — Tel Aviv) — ours has 158m but floors
  is null. Wikipedia says 158m/38fl — height matches exactly, so 38 floors
  is very likely safe to fill in directly. Not done yet, pending your
  go-ahead since it's still copying a number from Wikipedia rather than
  SkyscraperCity.

### E. Confirmed correct, no action needed

Moshe Aviv Tower, Dan Center (BBC Central Tower), Hakhsharat HaYishuv Tower,
ROM Tel Aviv, Eden Tower, Lighthouse/YBOX Bat Yam, Azrieli Center (Square
Tower) (confirms this session's earlier fix was right), W Prime.

### F. Out of scope, not a gap

**Big Fashion Glilot 1** (Ramat HaSharon) and **Dimri Tower** (Ashdod) —
both cities have zero entries anywhere in our dataset, confirming they're
simply outside this project's tracked area, not missing data.

Only checked Wikipedia's >150m section so far (57 buildings). The list
continues below 150m with many more Gush Dan buildings — worth another pass
later.

## Design pass — filters, height brackets, map, stat panel

With the full Round 1 + Round 2 review queue closed out (see the checklist
artifact and the log above), Jonah asked for a design pass on
`app.jsx` itself. Planned and implemented in one session:

- **Multi-select City / Status filters.** Replaced the two single-select
  `<select>` dropdowns with a `<MultiSelect>` checkbox-popover component, so
  e.g. "Completed + Topped Out" or "Tel Aviv + Ramat Gan" can be viewed at
  once. State changed from a single string (`"All"` sentinel) to a `Set`
  per filter (empty set = no restriction). Chip row now renders one chip per
  selected city/status.
- **Height-bracket filter.** New single-select pill row: All heights / Under
  150m / 150m+ / 200m+ / 300m+ (single-select since the brackets are
  cumulative — checking 150+ and 200+ together would just look like 150+
  alone, so this isn't a checkbox multi-select like city/status).
- **Google My Maps embed replaces the SVG cluster map.** The old map drew
  approximate circles clustered by city center from `filtered` (never a real
  footprint). Swapped for an iframe embed of Ynhockey (Yan Nasonov)'s
  community-maintained "Tel Aviv Area Projects" map — real pinned addresses,
  colour-coded by status. Credited directly under the embed with a link back
  to the original map. Trade-off (flagged to and accepted by Jonah): this
  map is a static external embed, so it no longer reacts to the page's
  filters the way the old SVG did — it always shows everything Ynhockey has
  mapped. The table and skyline chart stay fully filter-reactive.
- **Stat panel redesign.** The old 4-tile strip (Projects tracked / Tallest
  / Avg height / Under construction) mixed whole-dataset stats with
  tall-building-only stats. Replaced with: a standalone "All projects
  tracked" number above everything else, plus a new "Skyscrapers (150m+)"
  panel containing Tallest (now Completed-only, previously any status),
  Topped out, Under construction (both now scoped to height ≥150m,
  previously unscoped), and new 150m+/200m+/300m+ counts (Completed + Topped
  Out only, matching how Tallest/Topped Out are scoped). "Avg. height,
  built" was dropped per Jonah's call.

Verified in the browser: multi-select counts update live and combine
correctly with other active filters (e.g. 2 cities + 300m+ → 7 rows); height
pills are mutually exclusive and combine correctly with city/status; the
150m+ stat (60) was cross-checked against the table by filtering to
150m+/Completed+Topped Out directly (47 + 13 = 60, matches); the 300m+ stat
(2) was similarly cross-checked (2 Completed+Topped Out at 300m+ in the
filtered table); "Clear filters" resets all of it including the new sets and
bracket. No console errors.

## Rova Ayalon (Bat Yam) — Jonah caught this one

Jonah spotted, from just browsing the new map/stats, that "Rova Ayalon" was
suspicious — a single row didn't look right for what he remembered as a
multi-tower project. Confirmed via the live thread: "Bat Yam | Rova Ayalon |
3 x 152 m | 3 x 45 fl | T/O" (41K views, 112 replies) — three identical
towers, all 152m/45fl/Topped Out. Split the existing row into `Rova Ayalon
(Tower 1)`–`(Tower 3)`, all 152m/45fl/Topped Out. Dataset now at 835 rows.

## Kikar HaMedina Towers (Tel Aviv) — Jonah caught this one too

Same pattern, spotted while looking at the new stat panel: "there should be
three of them." Confirmed via a massive, highly active live thread (225K
views, 983 replies): "Tel Aviv | Kikar HaMedina Towers | 3 x 155m | 2 x 42
fl + 1 x 41 fl | T/O." Split the existing single row into `Kikar HaMedina
Towers (Tower 1)` and `(Tower 2)` (155m/42fl each) + new `(Tower 3)`
(155m/41fl), all Topped Out. Dataset now at 837 rows.

## Broader multi-tower sweep — 7 more confirmed splits, 1 flagged

Two catches in a row prompted a systematic pass: every single-row entry whose
name contains the plural "Towers" (72 candidates) is a plausible missed
split, on the theory that a genuinely single building rarely gets named that
way. Checked the ~10 most significant by height/status; 7 of them were
confirmed genuine multi-tower gaps and split, all sourced directly from live
SkyscraperCity threads:

- **Keren HaKirya Towers** (Tel Aviv) — actually 4 towers: 340m/80fl (our
  existing row) + 50fl + 45fl + 45fl (heights not given for the shorter
  three), all Approved. A 460,000 sqm mega-project approved jointly by the
  municipality and IDF.
- **Tara Towers** (Tel Aviv) — actually 4 towers: 3x 240m/55fl (we only had
  one) + a 4th at 40fl (height not given), all Approved.
- **Ribal Carasso Towers** (Tel Aviv) — actually 3 towers: 156m/48fl (our
  existing row) + 45fl + 41fl (heights not given), all Approved.
- **Baladi Towers** (Bat Yam) — actually 3 buildings: "Baladi 1" (our
  existing row, 155m/44fl/U-C) + "Baladi 2a"/"Baladi 2b" (33fl and 13fl,
  heights not given), all Under Construction.
- **Duo TLV Towers** (Tel Aviv) — a genuine symmetric twin, 2x 200m/54fl,
  Topped Out — matched our existing row exactly, just needed the second row.
- **Alon Towers (BSR Center TLV)** (Tel Aviv) — a genuine symmetric twin,
  2x 162m/45fl, Completed — same pattern, matched exactly.
- **Geffen Towers** (Ramat Gan) — a mixed pair: 140m/41fl (our existing row)
  + 110m/32fl, both Completed.

All added to app.jsx and verified (850 rows total, up from 837).

**Flagged, not split yet:** **Vitania Towers** (Tel Aviv) is confirmed
multi-tower (live thread: "2 x 42 fl + 1 x 36 fl | 1 Completed, 1 T/O, 1
U/C") but no height was found anywhere for any of its three towers, and the
title doesn't map which specific tower has which status — one forum comment
even mentions an unconfirmed rumor that Tower 3's construction was frozen.
Needs a decision from Jonah (or more digging) before splitting, rather than
guessing the status-to-tower mapping.

**Update: the full sweep is done.** Went through the entire remaining
candidate list (single-row entries with a plural "Towers" name), plus every
new lead that surfaced along the way while researching those (a second-order
sweep, since several forum snippets mentioned other multi-tower projects in
passing). Every SkyscraperCity thread cited below was checked live.

**48 more confirmed multi-tower splits, sourced from live threads (77 new
rows total, dataset now at 927):**

Symmetric/near-symmetric splits (all towers identical or near-identical —
just needed the missing copies): Seminar HaKibbutzim Towers (3x35fl/130m),
Yam towers frmr Minrav Yam (2x115m/33fl), Highline towers (2x106m/30fl),
Wiin Towers (2x26fl/97m), Tzamarot Dan Towers (2x30fl/95m), TLV Train
Towers-MR58 (2x24fl/90m), Naveh Towers (2x23fl/75m), 7-9 Einstein Towers
(2x14fl/50m), Ne'eman Towers (3x13fl/45m), Cinerama Towers (4x46fl),
BIG Kaniel Towers (5x40fl, U/C), Castro Towers (2x~40fl), NEARO Towers
(2x25fl), Baron Towers (2x22fl), Metro Towers Bat Yam (2x24fl), Sharonim
Towers (2x25fl), Gavriel Towers (2x21fl, U/C), BSR 1K Residential Towers
(2x21fl), Krause Towers (2x30fl), Electra Towers (3x21fl, U/C), Kikar Atarim
Towers (2x25fl), Philharmonic Towers (2x12fl), Mala Towers (2x25fl), Aura
Ramat Hen (3x110m/30fl), WAVE Givat Shmuel (2x23fl), Avgad Teo (5x25fl,
U/C), Alfa Rishon LeZion (5x18fl, U/C), Unik Cardo Nachalat Yehuda (3x24fl,
U/C), Unik Cardo (4x25fl, U/C), Zarfati Selected (3x31fl, U/C), ICR Herbert
Samuel (2x26fl).

Mixed/asymmetric splits (different floor counts or heights per tower):
- **Agish Reved & New Kiriyah towers** — our row (280m/65fl) was only "New
  Kiriyah"; added "Agish Reved" (345m/80fl).
- **Phoenix Towers** — our row was the 165m office tower, missing its floor
  count (now 40fl); added 2x 100m/27fl residential towers.
- **Insurance companies towers** — another mixed-pairing bug: our row
  (120.25m/40fl) had the small tower's height paired with the big towers'
  floor count. Fixed to Tower A/B (155.5m/40fl each) + Tower C
  (120.25m/30fl, our corrected original).
- **Or Bavli Towers** (Cancelled) — our row (28fl) was one of two; added a
  20fl one (both ~100m per the thread).
- **Elita Towers** — our row (58fl) + added 30fl (Planned).
- **LYFE Towers, fmr Dan Towers** — our row had the wrong status (was
  Completed on the 50fl tower, which the thread says is actually On Hold).
  Fixed status on our row + added the two genuinely-Completed towers (44fl,
  40fl).
- **B Towers** (On Hold) — our row (47fl) + added 30fl.
- **Tr3s (Krol Towers)** — "Tr3s" literally means "three." Our row (35fl) +
  added 30fl + 25fl.
- **Sophy Towers** — our row was Tower II (20fl, U/C); added Tower I (16fl,
  Topped Out).
- **Garden Towers** — our row (30fl) + added 27fl.
- **Etos Towers** — our row (18fl) was one of four buildings; added a
  second 18fl + two 7fl.
- **Solomon Towers** — our row (11fl) + added 25fl.
- **Talpiot Towers** — our row (15fl) + added 19fl.
- **Shbiro Towers** — our row (18fl) was one of three; added a second 18fl
  + a 15fl.
- **Mika Towers** — our row (24fl) + added 22fl.
- **Solelim Towers** — our row (40fl) was one of four; added 2x 35fl + 13fl.
- **BST Towers (BSTowers)** — our row (20fl) + added 27fl.
- **Ybox Gat Rimon Tower** — our row (41fl, unlabeled status) split into
  Tower 1 (41fl, Under Construction) + Tower 2 (41fl, Approved).

**Confirmed single towers, no change needed** (plural "Towers" name but the
live thread shows only one building): Bezalel towers, Bialik Towers, Ayala
Towers.

**Flagged, not split — needs more digging or a decision:**
- **Ha-Umanim Towers** and **Lapid Towers** — both confirmed as 3-tower
  proposals, but the thread only gives a floor *range* per tower (e.g.
  "3 x 80-120 FL"), not a specific breakdown — same issue as Vitania Towers
  above.
- **BSR Shaar HaYam** — a 5-building masterplan with a very wide floor
  range (9-40fl), same "is this really one entity in our schema" question as
  the still-undecided "Hagag Einstein" masterplan from earlier in the
  session.
- **Reisdor Towers** — confirmed 2x35fl, but a forum comment questions
  whether Tower 2 was ever actually started ("they decided not to build
  Tower 2 at this point?") — left as our single existing row rather than
  guess a status for a tower that might not exist yet.

**No confirming source found, left as-is:** Migdal-Top Towers, Market
Towers, Kalanit Towers, Song Towers, SPACE Towers, Orion Towers, Le'om
Towers, Shoham Prashkovsky Towers, Gindi Towers, Aminadav Towers, Zahala
Towers, Start Towers.

All 77 new rows added to app.jsx and spot-verified in the browser preview
(927 total rows, 927 unique ids; no console errors).

## Height-fill pass — floors>40 with no recorded height

Jonah asked to specifically target the missing-height gap for taller
buildings: every row with `height:null` and `floors>40` (70 candidates),
since those are the ones most likely to actually clear 150m and matter for
the Skyscrapers stat panel. Checked 26 of the 70 via live thread search
before wrapping up — this confirms the same low-yield pattern already noted
earlier in the session (see "#3 — fill missing heights" above): most
ordinary buildings, even fairly tall ones, simply never had a height in
meters published anywhere, only floor counts. Two solid finds:

- **Masterpiece Bavli** (Tel Aviv) — not just a missing height, a missed
  split too (wasn't on the earlier "Towers"-named sweep since the name
  doesn't contain "Towers"). Live thread: "Masterpiece Bavli | 2x174.8m |
  2x48 FL | U/C" — the height was revised up from an earlier 146m figure
  (per a forum comment confirming 174.8m is the current one). Split into
  `(Tower 1)` + `(Tower 2)`, both 174.8m/48fl/Under Construction. This
  alone moves "Under construction (150m+)" from 4 to 6.
- **Migdal HaKishon** (Bnei Brak) — 180m, from the original detailed post
  ("BNEI BRAK Migdal HaKishon 46 FL 180 M"); the thread's current title was
  later shortened to "HaKishon Tower | 45 FL | Planned" without a height,
  but the specific 180m figure ties to the same 46fl count we already had,
  so it was trusted over the vaguer, height-less title revision.

Also caught a stale/superseded floor count along the way (not a height fix,
but found while researching one): **22–28 Eilat EB** (Holon) was scraped at
an old 55fl figure; the live thread's own edit history shows it was
downgraded to "2x34 + 18fl | Approved LPC" after municipal approval. Fixed:
split into 3 rows at 34/34/18fl (heights still unknown).

**Bonus multi-tower discoveries** surfaced while researching this batch
(not height fills, but genuine gaps spotted in passing — not yet added to
the dataset, since this pass was scoped to heights specifically):
- **Vertical (Bursa Triangle)** (Ramat Gan) — actually 3 towers (60+72+111
  fl, "3 x 250-450 m"), we only have the 111fl one. The height range isn't
  clearly paired to specific floor counts, so needs the same treatment as
  Ha-Umanim/Lapid Towers before splitting.
- **Jabotinsky-Herzl** (Ramat Gan) — actually 3 towers (69+49+48fl), we
  only have the 48fl one.
- **Orek and Oz House** (Ramat Gan) — actually 2 towers (71+60fl), we only
  have the 60fl one.
- **Dofen HaKirya** (Tel Aviv) — actually 4 towers (55+55+60+60fl), we only
  have one 60fl one.
- **Jabotinsky Enav** (Ramat Gan) — actually 3 towers (35+45+50fl), we only
  have the 50fl one.
- **The Park** (Bnei Brak) — actually 2 towers (42fl Completed + 37fl
  Approved), we only have the 42fl Completed one.
- **Yoseftal Gate Masterplan** (Bat Yam) and **VICA Park** (Petah Tikva) —
  both wide-range masterplans (9 buildings / multiple buildings), same
  "how do we even schema this" open question as Hagag Einstein.

None of these bonus finds were added to app.jsx yet — flagging for a future
pass (either a dedicated multi-tower sweep #2, or bundled with resolving
the Ha-Umanim/Lapid Towers/Vitania/BSR Shaar HaYam/Hagag Einstein backlog).

Dataset now at 930 rows after this pass's 3 fixes (Masterpiece Bavli x2 new
rows, 22–28 Eilat EB x2 new rows net, Migdal HaKishon height-only).

## Layout tweak — catalog table above the map

Jonah asked for the "Full catalog" table to appear above the "Locations"
map, instead of side-by-side in a flex row. Removed the `splitRow` flex
wrapper; both sections are now full-width, stacked panels in order: table
first, map second. The now-unused `splitRow` style was deleted.

Also investigated a report that "filters don't change the list at the
bottom" — tested multi-select city/status, the height pills, and search
live in the browser, all updated the table correctly every time. Traced it
to a stale browser tab (confirmed by forcing a hard reload, which reset a
leftover filter selection that had survived a same-URL `navigate` call) —
not an app bug. No code change needed there.

## "Core cities" grouping — switched to the CBS Inner Ring definition

Jonah asked to sanity-check the "Core 7 cities only" toggle against a
"standard" grouping of Gush Dan cities, prompted by a Wikipedia map link.
The linked image itself doesn't carry distinct labeled groupings, but the
Gush Dan article does define an official structure from Israel's Central
Bureau of Statistics:

- **Core** (1 locality): Tel Aviv only.
- **Inner Ring** (13 localities): Bat Yam, Holon, Ramat HaSharon, Ramat Gan,
  Giv'atayim, Bnei Brak, Herzliya, Or Yehuda, Giv'at Shmuel, Kiryat Ono +
  smaller councils.
- **Middle Ring** (31 localities): Petah Tikva, Ra'anana, Rishon LeZion, Hod
  HaSharon, Kfar Saba, Yehud, Ramla, Lod, Rosh HaAyin, Ness Ziona, Rehovot +
  smaller councils.

The old `CORE_CITIES` (Tel Aviv, Ramat Gan, Bnei Brak, Givatayim, Petah
Tikva, Bat Yam, Holon) turned out to just be the top 7 cities by building
count in our own dataset, not any official grouping — it mixed Core, Inner
Ring, and (via Petah Tikva) Middle Ring cities.

Jonah chose to align with the CBS Inner Ring definition instead. Updated
`CORE_CITIES` to Tel Aviv + the Inner Ring cities we have data for: Bat
Yam, Ramat Gan, Givatayim, Bnei Brak, Holon, Or Yehuda, Givat Shmuel,
Kiryat Ono (9 cities total). This drops Petah Tikva (officially Middle
Ring) and adds Or Yehuda, Givat Shmuel, and Kiryat Ono, which we already
had building data for but which weren't in the old grouping. Ramat
HaSharon and Herzliya are also official Inner Ring cities but we have no
building entries for either, so they don't appear in `ALL_CITIES` at all.

Relabeled the toggle and its chip from "Core 7 cities only" / "Core 7
cities" to "Tel Aviv + Inner Ring only" / "Tel Aviv + Inner Ring" to match.
Verified live: toggling it filters the catalog from 930 to 746 rows, all
in the new city set.

## Data-quality audit tool (`audit.py`)

Jonah asked for a systematic way to catch the kinds of gaps this session
kept finding by hand (missed multi-tower splits, mixed height/floor
pairings, duplicates, missing heights). Built `audit.py` — a standalone
Python script (not part of the live app; `python3 audit.py` from this
folder) that parses `RAW_DATA` out of `app.jsx` and runs five heuristic
checks: unsplit multi-tower names, numbering gaps within a complex,
fuzzy-match duplicates, height/floor-ratio outliers within a complex
("mixed-pairing"), and missing heights on floors>40 buildings. All are
explicitly framed as candidates for human review, not verdicts.

First run flagged 189 items. Iterated the duplicate-detector once: it
initially compared every row's name pairwise, which falsely flagged
intentional multi-tower siblings (e.g. BSR Tower 2/3/4) as duplicates of
each other. Fixed by comparing at the shared-base-name (post-tower-suffix)
level instead of per-row, so siblings sharing one base name never get
compared against each other — the false positives disappeared without
losing real catches (e.g. "MAX Tower" vs. "M Tower" in Petah Tikva still
flags).

Spot-checked the two highest-confidence categories:
- **Numbering gaps (1 flag)**: "U Towers (Masada 2, 4)" in Bat Yam,
  missing "Masada 3". Checked the thread — title is literally "U Towers
  (Masada 2–4) | 2 x 34 fl", confirming only 2 towers exist and the
  numbers are lot/building numbers, not a sequential count. False
  positive, but a useful caveat to document: this heuristic can misfire on
  lot-number naming, not just missing towers.
- **Mixed-pairing (0 flags)**: none on the current dataset.

Then worked a batch from the 52 "possibly unsplit multi-tower" flags:
- **Maslavi/Matzlawi Elite (Ramat Gan)** — false positive. The office
  tower's own thread describes it as built "next to their residential
  tower" (singular), confirming "Maslavi Elite Towers" is one building
  with a plural marketing name. Both towers (id 61 residential, id 260
  office) were already correctly captured as separate rows — just under a
  spelling variant the duplicate-detector's threshold didn't catch. No
  fix needed.
- **Bialik Towers (Ramat Gan)** — false positive. Single thread, no count
  breakdown in the title; plural is marketing branding for one building
  (id 216, unchanged).
- **Kalanit Towers (Kiryat Ono)** — genuine gap. Thread: "Kalanit Towers |
  5 x 18 fl | Completed". Only 1 row existed (id 399). Split into 5:
  relabeled id 399 as "(Tower 1)" and added ids 928–931 as Towers 2–5,
  all 18fl/Completed/same coordinates.
- **Song Towers (Givat Shmuel)** — genuine gap. Thread: "Song Towers | 3 x
  21 fl | Completed". Only 1 row existed (id 418). Split into 3:
  relabeled id 418 as "(Tower 1)" and added ids 932–933 as Towers 2–3, all
  21fl/Completed/same coordinates.
- **Le'om Towers (Rishon LeZion)** — inconclusive, flagged for later. The
  thread title matches our data exactly (24fl, Completed), but a reply
  deep in the thread mentions "Ha-Leom towers - 2 X 22 Fl", which may be a
  different/renamed project or a later revision. Not enough context to
  act on; left as-is (id 440, 24fl unchanged).

Dataset now at 936 rows (930 + 6 from the two splits above). ~48 more
"unsplit multi-tower" flags, 69 duplicate flags, and 67 missing-height
flags from this run are still unresolved — good candidates for the next
pass.
