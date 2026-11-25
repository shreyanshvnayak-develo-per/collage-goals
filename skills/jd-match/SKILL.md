---
name: jd-match
description: Match a resume against a specific job description (JD) and tailor it honestly. Use when the user pastes or links a job posting / JD and wants a match score, missing keywords, eligibility check, tailored bullets, or a decision on whether to apply. Covers ATS keyword overlap, must-have vs nice-to-have skills, and gap-closing plans. Never adds skills the user doesn't have.
---

# /jd-match — your resume vs this exact job

Sending one resume to 200 openings gets low reply rates. Matching the resume to each JD, **honestly**, raises them. Your job is to show how well the student fits this particular JD, what to change, and whether it's worth applying.

## Inputs

`/jd-match <resume file> <JD text | JD file | JD URL>`

- If the JD is a URL and you can't fetch it, ask them to paste the text.
- If there's no resume, ask for it, or look for `resume*.pdf|tex|md|docx` in the folder.

## Step 1: Parse the JD

Extract and show:
- **Role, level, location, work mode, batch / graduation-year eligibility, CGPA or branch criteria**, if stated
- **Must-have skills** (stated as "required", "must", or listed first) vs **nice-to-have** ("preferred", "plus", "bonus")
- **Responsibilities**, translated into what they'll actually test in interviews
- **Hidden signals**: e.g. "fast-paced" → startup; "client-facing" → communication rounds; "Kubernetes, Terraform" → DevOps-heavy, not pure SDE

## Step 2: Match

| JD requirement | Type | In resume? | Evidence (resume line) |
|---|---|---|---|

Statuses: ✅ clearly shown · 🟡 present but weak or implicit · ❌ missing.

Compute a **match score** with the method shown: for example, must-haves weighted ×2 and nice-to-haves ×1, as the percentage covered. Also report:
- **Eligibility blockers** (batch, CGPA, location, work authorisation), shown first and in plain words
- **ATS keyword overlap**: the exact terms from the JD that are missing from the resume

## Step 3: Decide

One clear recommendation:
- **Apply now**: strong match
- **Tailor, then apply**: good match, but the resume undersells it
- **Stretch, apply with a referral**: a gap exists but is bridgeable. Suggest `/referral-dm`.
- **Skip**: a hard blocker or a big mismatch. Say why kindly and suggest similar roles that fit better.

## Step 4: Tailor (honestly)

For 🟡 items, rewrite existing bullets to surface the matching skill using **the JD's wording**, when it's true. For example, if the JD says "REST APIs" and their bullet says "backend in Flask", rewrite it to "built REST APIs in Flask...".

For ❌ items, don't add them. Instead:
- If they **actually have** the skill but left it off, ask them, then add it.
- If they don't, suggest a **gap-closer**: a 1–3 day mini-project or certification, with a concrete spec, that would let them add it truthfully next time.

Also produce:
- a reordered skills line, with the JD's priorities first
- a 2-line tailored summary (optional; only if the resume format uses one)
- 3 likely interview questions derived from this JD

Ask before writing a tailored copy, e.g. `resume_<company>.tex`. Never modify the original.

## Rules

- **No keyword stuffing, no fake skills, no white-text tricks.** Interviewers ask about every line.
- Be direct about blockers; it saves the student time.
- Keep personal data local.
