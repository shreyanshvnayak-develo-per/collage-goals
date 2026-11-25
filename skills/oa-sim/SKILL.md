---
name: oa-sim
description: Online assessment (OA) simulator with hidden test cases, like HackerRank / HackerEarth / Mettl / CodeSignal / Amcat campus tests. Use when the user wants to practise an OA, a "coding test", "online round", or a company's first screening round under a timer. Generates original problems, builds a local judge with visible and hidden tests, runs the user's solutions and reports a score like a real platform.
---

# /oa-sim — the online round, simulated locally

The OA is the first filter in most campus drives. People fail it less because they don't know DSA and more because of **hidden test cases, edge cases, time limits and panic**. You build a realistic OA in the student's project folder, with a timer and a local judge.

## Setup

Ask, or parse from the arguments:

- **Style**: `service` (TCS NQT / Infosys / Wipro / Accenture style: 2 problems, easy-medium, plus optional MCQs) · `product` (2–3 problems, medium to medium-hard) · `faang` (2 problems, medium-hard, tight limits). Default: `product`.
- **Duration**: default 60 / 75 / 90 minutes by style.
- **Language**: Python (default), C++ or Java.
- **MCQ section** (optional): `--mcq` adds 10 aptitude, CS-fundamentals or output-prediction questions.

## Build the OA (ask before writing files)

Create a folder `oa-<date>/` containing:

```
oa-<date>/
  README.md            ← rules, problem statements, time limit, how to submit
  p1/ statement.md  solution.py (stub with signature + I/O)  tests_visible/
  p2/ ...
  .judge/ judge.py  tests_hidden/   ← hidden cases; tell the student not to open them
```

- Problems must be **original wordings** with full constraints, input/output format, and 2 sample tests each.
- Write a correct reference solution yourself first, privately, inside `.judge/`. Generate **10–20 hidden tests per problem** with it, including:
  - edge cases: min n, empty or single element, all equal, negatives, duplicates
  - max-size tests (close to the constraint limits) to catch TLE from O(n²) solutions
  - tricky cases that break greedy or off-by-one solutions
- Before you hand the OA over, verify every test against the reference solution, and check that a deliberately naive solution fails the large tests.
- `judge.py` runs `solution.py` on every test with a per-test time limit (e.g. 2 s for Python) and reports `AC / WA / TLE / RE` for each test, plus a total score. Partial scoring is per test, as on HackerRank.

Record the start time using `date` and tell the student: *"Your OA has started. You have N minutes. Run `python .judge/judge.py p1` to submit p1."*

## During the OA

- Act as the proctored platform. No hints, no reviewing their code, no explaining.
- If they ask for help, reply: *"This is an OA — no help available. Keep going."* Offer one exception: if they say `pause`, pause the timer.
- When they submit, run the judge and show only the verdict summary, like a platform does: `p1: 14/20 passed (6 hidden failed)`. Never show which hidden input failed.
- Give time warnings at 50% and with 10 minutes left. At time up, take the final submissions.

## Results

When time is up or they say "end":

1. **Scorecard**: per problem, tests passed / total and points. Add an estimated cutoff verdict for the style chosen ("Likely clears the shortlist cutoff for a product-company OA"). Make clear this is an estimate.
2. **Hidden test reveal**: now show which categories failed (edge case, TLE, wrong logic) with **one** failing input for each category.
3. **Root cause** for each failed problem: what was wrong, in two lines.
4. **Reference solutions** with complexity and the pattern name.
5. **OA tactics review**: time split, whether they read the constraints, whether they started with the easier problem, whether they submitted a brute force for partial marks, and fast I/O in Python (`sys.stdin`).
6. **Next**: suggest `/pattern-coach drill <pattern>` for the patterns they missed.

## Rules

- Never claim a problem is "the actual TCS/Amazon OA question". Present it as practice in that style.
- The hidden tests must actually be hidden during the test: don't print them, and don't read them aloud.
- Generated tests must be correct. If you are not sure of an expected output, regenerate it from the reference solution. Never hand-write expected outputs for big inputs.
- Clean up only with permission. The student may want to keep the folder for revision.
