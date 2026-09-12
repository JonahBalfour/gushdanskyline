#!/usr/bin/env python3
"""
Data-quality audit for RAW_DATA in app.jsx.

Run manually whenever the dataset changes: `python3 audit.py`.
Not part of the live app — a standalone maintenance tool.

Re-implements, as repeatable checks, the heuristics that found real gaps
by hand over the course of this project:
  - unsplit multi-tower : plural/multi-tower name, but only one row for it
  - numbering gaps      : a complex has towers 2 and 4 but not 1 or 3
  - possible duplicates : fuzzy name match within the same city
  - mixed-pairing       : siblings in one complex whose height/floor ratio
                          doesn't match the rest of the complex (height and
                          floors likely sourced from two different towers)
  - missing heights     : floors > 40 with no recorded height

These are heuristics, not verdicts — every flag needs a human look at the
source thread before acting on it. False positives are expected (e.g. a
building whose name happens to contain "Complex" but is genuinely one
building); the point is narrowing hundreds of rows down to a short list
worth checking.
"""

import re
import sys
import difflib
from collections import defaultdict

APP_JSX = sys.argv[1] if len(sys.argv) > 1 else "app.jsx"

ROW_RE = re.compile(
    r'\{id:(?P<id>\d+),name:"(?P<name>(?:[^"\\]|\\.)*)",city:"(?P<city>[^"]*)",'
    r'height:(?P<height>null|[\d.]+),floors:(?P<floors>null|[\d.]+),'
    r'status:"(?P<status>[^"]*)"'
)


def load_rows(path):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    rows = []
    for m in ROW_RE.finditer(text):
        name = m.group("name").replace('\\"', '"').replace("\\'", "'")
        rows.append({
            "id": int(m.group("id")),
            "name": name,
            "city": m.group("city"),
            "height": None if m.group("height") == "null" else float(m.group("height")),
            "floors": None if m.group("floors") == "null" else float(m.group("floors")),
            "status": m.group("status"),
        })
    return rows


TRAILING_PAREN_RE = re.compile(r"\s*\(([^()]*)\)\s*$")
TRAILING_NUMBER_RE = re.compile(r"(\d+)[a-zA-Z]?\s*$")


def strip_trailing_parens(name):
    """Peel trailing '(...)' groups one at a time; return (core_name, [suffix_text, ...])."""
    core = name
    suffixes = []
    while True:
        m = TRAILING_PAREN_RE.search(core)
        if not m:
            break
        suffixes.append(m.group(1))
        core = core[:m.start()].strip()
    return core, suffixes


def group_by_base(rows):
    """Group rows by (city, name-with-all-trailing-parens-removed)."""
    groups = defaultdict(list)
    for r in rows:
        core, suffixes = strip_trailing_parens(r["name"])
        tag_num = None
        if suffixes:
            m = TRAILING_NUMBER_RE.search(suffixes[0])
            if m:
                tag_num = int(m.group(1))
        groups[(r["city"], core)].append((r, tag_num))
    return groups


MULTI_TOWER_WORDS_RE = re.compile(r"\btowers\b|\bcomplex\b|\bcompound\b", re.I)
MULTIPLIER_RE = re.compile(r"\b\d+\s*x\s*\d+|\bx\s*\d+\b", re.I)


def check_unsplit_multitower(groups):
    flagged = []
    for (city, core), members in groups.items():
        if len(members) != 1:
            continue
        r, _ = members[0]
        if MULTI_TOWER_WORDS_RE.search(r["name"]) or MULTIPLIER_RE.search(r["name"]):
            flagged.append(r)
    return flagged


def check_numbering_gaps(groups):
    flagged = []
    for (city, core), members in groups.items():
        nums = sorted({tag for _, tag in members if tag is not None})
        if len(nums) < 2:
            continue
        full_range = set(range(nums[0], nums[-1] + 1))
        missing = sorted(full_range - set(nums))
        if missing:
            flagged.append((city, core, nums, missing, [r for r, _ in members]))
    return flagged


def check_duplicates(groups, threshold=0.82):
    """Fuzzy match between DIFFERENT complexes' base names in the same city.

    Comparing at the group (base-name) level, rather than per-row, means
    intentional multi-tower siblings (which share one base name) never get
    compared against each other here.
    """
    by_city = defaultdict(list)
    for (city, core), members in groups.items():
        by_city[city].append((core, members))

    flagged = []
    for city, bases in by_city.items():
        for i, (core_a, members_a) in enumerate(bases):
            for core_b, members_b in bases[i + 1:]:
                ratio = difflib.SequenceMatcher(None, core_a.lower(), core_b.lower()).ratio()
                if ratio >= threshold:
                    flagged.append((city, core_a, members_a[0][0], core_b, members_b[0][0], ratio))
    return flagged


def check_mixed_pairing(groups, tolerance=0.35):
    flagged = []
    for (city, core), members in groups.items():
        usable = [r for r, _ in members if r["height"] and r["floors"]]
        if len(usable) < 2:
            continue
        ratios = [(r, r["height"] / r["floors"]) for r in usable]
        vals = sorted(v for _, v in ratios)
        median = vals[len(vals) // 2]
        for r, v in ratios:
            if median and abs(v - median) / median > tolerance:
                flagged.append((city, core, r, v, median))
    return flagged


def check_missing_heights(rows, floor_threshold=40):
    return [r for r in rows if r["height"] is None and r["floors"] and r["floors"] > floor_threshold]


def main():
    rows = load_rows(APP_JSX)
    groups = group_by_base(rows)
    print(f"Loaded {len(rows)} rows from {APP_JSX}\n")

    unsplit = check_unsplit_multitower(groups)
    print(f"=== Possibly unsplit multi-tower projects ({len(unsplit)}) ===")
    print("Name implies multiple towers/buildings, but only one row exists for it.")
    for r in unsplit:
        print(f"  [{r['id']}] {r['name']!r} — {r['city']}")
    print()

    gaps = check_numbering_gaps(groups)
    print(f"=== Numbering gaps within a complex ({len(gaps)}) ===")
    print("Towers N and M exist but a tower in between is missing — possibly incomplete.")
    for city, core, nums, missing, members in gaps:
        ids = ", ".join(str(r["id"]) for r in members)
        print(f"  {core!r} — {city}: have {nums}, missing {missing}  (rows: {ids})")
    print()

    dupes = check_duplicates(groups)
    print(f"=== Possible duplicates ({len(dupes)}) ===")
    print("Fuzzy name match between different entries in the same city — check for spelling variants.")
    for city, core_a, ra, core_b, rb, ratio in dupes:
        print(f"  [{ra['id']}] {core_a!r}  ~  [{rb['id']}] {core_b!r}  ({city}, similarity {ratio:.2f})")
    print()

    mixed = check_mixed_pairing(groups)
    print(f"=== Possible mixed-pairing (height/floors from different towers) ({len(mixed)}) ===")
    print("A sibling tower whose height-per-floor ratio doesn't match the rest of its complex.")
    for city, core, r, v, median in mixed:
        print(f"  [{r['id']}] {r['name']!r} — {city}: {v:.1f} m/floor vs. complex median {median:.1f} m/floor")
    print()

    missing_h = check_missing_heights(rows)
    print(f"=== Missing heights, floors > 40 ({len(missing_h)}) ===")
    for r in missing_h:
        print(f"  [{r['id']}] {r['name']!r} — {r['city']}, {int(r['floors'])} floors, status {r['status']}")
    print()

    total = len(unsplit) + len(gaps) + len(dupes) + len(mixed) + len(missing_h)
    print(f"Total flags: {total}")


if __name__ == "__main__":
    main()
