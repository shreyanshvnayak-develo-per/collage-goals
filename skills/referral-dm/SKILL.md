---
name: referral-dm
description: LinkedIn referral strategy and message writer for students. Use when the user wants to ask for a referral, cold-message alumni or employees, write a LinkedIn connection note, follow up, email a recruiter, or plan a referral campaign for a target company or job ID. Produces short, personalised, non-spammy messages and a tracker. Never automates sending or scraping.
---

# /referral-dm — referrals that actually get replies

Referrals skip the resume black hole, but most referral requests get ignored. Usually the message is generic ("Hi sir, please refer me"), too long, or has no job ID. Your job is to plan **who** to ask, write **short, specific** messages, and track follow-ups. The student sends everything themselves.

## Inputs

`/referral-dm <company> [--job <job ID or link>] [--resume <file>]`

Collect:
- Target company and role, and **job ID or link** (strongly preferred; referrers need it)
- The student's resume or a 3-line summary: college, branch, year, the top 2 projects, a standout achievement
- Any connection to the company: same college alumni, same city or state, same club or open-source project, met at an event

## Step 1: Who to ask (strategy)

Rank the people to reach out to, best first:
1. **Alumni of the same college** working there. This is the highest reply rate. Search LinkedIn: company → People → filter by school.
2. People in **the same team or tech stack** as the role (they benefit from good hires).
3. **Recent hires** (0–2 years). They remember the struggle and are often generous.
4. Recruiters and talent acquisition, for the specific job ID only.

Avoid senior leadership for cold referrals, and avoid mass-messaging 50 people at one company. Aim for **3–5 well-chosen people per company**, and space the messages out.

Explain how to find them manually: LinkedIn search filters, the college alumni page, company people search. **Do not scrape LinkedIn or automate requests.** It breaks LinkedIn's terms and can get the account restricted.

## Step 2: Messages

Write each one personalised to the person (ask for their name, role, and anything notable: a post, a shared college or a project).

**A. Connection note**: keep it **very short**. LinkedIn caps connection notes at a few hundred characters, and free accounts may be capped lower or allowed only a limited number of notes per month. Aim for about 200 characters.

> Hi Priya, fellow LDCE alum (CE '28) here. Saw you're on the payments team at Razorpay — I'm applying for SDE Intern (Job ID 12345) and would love 2 mins of your advice. Thanks!

**B. Referral ask, after they connect or reply.** It has four parts and stays under about 120 words:
1. Context: who you are, in one line
2. The ask: a specific role plus **job ID/link**
3. Proof: 2 bullet highlights that match the role (a project with a metric, a rating, an internship)
4. Make it easy: "I've attached my resume; happy to share anything else. Totally understand if not possible."

**C. Follow-up**, after 5–7 days of no reply. One short, polite nudge. **Maximum one follow-up**, then move on.

**D. Thank-you**, whether they refer or not. And when an interview or offer comes, tell them; it builds the relationship.

**E. Recruiter email/InMail variant**, if relevant.

Style rules for every message:
- Use their name. No "Dear Sir/Madam", no "Respected Sir".
- No copy-paste feel: one specific personal line per person.
- No guilt or pressure, no long life story, no asking for a "job" in general.
- Grammar check, and natural English. Mirror formality to the person.

## Step 3: Tracker

Offer to create `.tensor/referrals.md` (ask first), with the columns:

`Company | Role + Job ID | Person | Relation | Sent (date) | Follow-up due | Status (sent/replied/referred/declined/no reply) | Notes`

Remind the student of the follow-up dates in later sessions if the tracker exists.

## Weekly cadence (if they want a campaign)

Suggest a rhythm: for example, 5 companies a week, 3 people each, about 15 well-crafted notes, follow-ups on day 6, and a review every Sunday. Before asking for referrals, make sure the resume is ready (`/resume-blueprint`) and the GitHub is polished (`/github-glowup`). Referrers do look.

## Rules

- The student sends everything manually. Never automate LinkedIn actions.
- Never fake a connection ("we met at...") that didn't happen.
- Respect a "no" or silence: one follow-up maximum.
