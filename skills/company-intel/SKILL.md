---
name: company-intel
description: Research brief on a target company for placements or internships: hiring process, round structure, OA style, what they test, tech stack, products, recent news, culture, roles for freshers, and a tailored prep plan. Use when the user names a company they are applying to or interviewing with ("prepare me for Razorpay", "what's Zomato's interview process", "company intel on Atlassian").
---

# /company-intel — know the company before it tests you

Students walk into interviews knowing DSA but nothing about the company. Then *"Why us?"* and *"What do you know about our product?"* sink them, and they prepare for the wrong round format. You build a **sourced, honest brief** and a prep plan.

## Inputs

`/company-intel <company> [--role sde|data|ml|frontend|intern] [--when <date>]`. Ask for the role if it isn't given; the default is SDE fresher.

## Research (be honest about sources)

Use web search and fetch tools if available: the company's careers page, engineering blog, official product pages, recent news, and public interview-experience posts (GeeksforGeeks interview experiences, LeetCode Discuss, Glassdoor, Reddit, YouTube). If you have **no web access**, say so plainly, give what you know with a "may be outdated" warning, and list exactly what the student should look up.

For every claim, mark its confidence:
- ✅ **Official**: from the company's own site, blog or careers page
- 🟡 **Reported**: from interview-experience posts. Note how many sources agree, and how recent they are.
- ⚪ **General knowledge**: unverified; may be outdated

Never present a reported interview question as guaranteed. Never make up interview experiences, cutoffs or packages.

## Brief structure

1. **Snapshot**: what the company does in 2 lines, main products, business model, size, engineering locations in India.
2. **Roles for freshers**: titles, the typical hiring channel (on-campus, off-campus drive, hiring challenge, referral, internship → PPO).
3. **Hiring process**: rounds in order (OA → technical 1/2 → system design/LLD → managerial → HR), the format of each, and its duration. Note when the process differs between on-campus and off-campus.
4. **What they test**: DSA difficulty and favourite topics as reported, CS fundamentals, LLD or machine coding, project deep-dive, any domain areas (payments, maps, ML).
5. **Tech stack & engineering culture**: languages, frameworks, notable blog posts the student could mention in an interview.
6. **Recent news (last 12 months)**: launches, funding, layoffs, acquisitions. Note things that matter for the student (a hiring freeze, a new office).
7. **Compensation (if publicly reported)**: a range only, labelled as reported, with the source type. Suggest `/offer-decode` once a real offer arrives.
8. **"Why us?" ammunition**: 3 specific, true hooks connecting the company to the student's interests and projects. Read their resume or repo if available.
9. **Smart questions to ask the interviewer**: 5, specific to this company.

## Prep plan

Based on the time until the interview (ask if unknown), give a day-by-day plan: which `/pattern-coach drill` patterns to do, `/oa-sim` style, `/mock-interview <company>`, `/system-design-mock` if relevant, `/core-viva` subjects, and `/hr-round --company <company>`.

Offer to save the brief to `.tensor/company-<name>.md` (ask first).

## Rules

- Cite sources: the site name and, when available, the URL. Use only links you actually opened.
- Flag anything older than about 18 months as possibly outdated.
- No gossip, no unverified claims about named employees.
