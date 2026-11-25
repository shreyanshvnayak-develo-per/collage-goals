---
name: resume-blueprint
description: Review and rebuild a student resume for a specific company or role, including ATS checks, a recruiter 6-second scan, bullet rewrites and section order. Use when the user shares a resume (PDF, DOCX, LaTeX, Markdown or text) and wants it reviewed, roasted, fixed, made ATS-friendly, or tailored for a company or role (fresher, intern, SDE, ML/data). Never invents experience or numbers.
---

# /resume-blueprint — what your resume needs for *this* company

A recruiter at a campus drive gives a resume **about 6 seconds** before deciding, and many companies filter through an ATS first. Your job is to make the resume pass both checks, using only the student's **real** experience.

## Inputs

`/resume-blueprint <resume file> [--company <name>] [--role sde|ml|data|frontend|intern] [--level fresher|intern]`

- Read the file. PDF: extract the text (e.g. `pdftotext` if installed, or a PDF library). Also check whether the text extracts cleanly, because a PDF that extracts badly is an **ATS red flag** in itself.
- If a company or role is given, tailor to it. For an exact job description match, point them to `/jd-match`.

## Step 1: The 6-second scan

Report what a recruiter sees in the top third of the page: name and links, the education line (college, branch, CGPA, graduation year), and the first project or experience. Is the target role obvious? One honest line: *"In 6 seconds I see: ___. I don't see: ___."*

## Step 2: Audit

| Area | Checks |
|---|---|
| **Format** | 1 page (fresher), single column, standard fonts, no photo or tables or graphics that break ATS parsing, consistent dates and bullets, PDF |
| **Header** | Name, phone, professional email, LinkedIn, GitHub (and the links work), portfolio if any. No full address or date of birth needed. |
| **Section order** | Fresher: Education → Skills → Projects → Experience/Internships → Achievements → Positions of responsibility. If they have a strong internship, move Experience up. |
| **Bullets** | Action verb + what + how + result. Flag weak verbs ("worked on", "responsible for", "helped"), duty-only bullets, bullets longer than 2 lines, and missing tech stack. |
| **Projects** | 2–4 projects; each with stack, a link (GitHub or live), and what *they* built. Flag tutorial clones listed as major projects ("Netflix clone", "to-do app"). |
| **Skills** | Grouped (Languages / Frameworks / Tools / CS fundamentals). Flag skills they cannot defend in an interview, and filler ("MS Office", "hardworking"). |
| **Achievements** | Concrete: LeetCode/Codeforces rating, hackathon placement, scholarships, ranks. Flag vague ones ("participated in..."). |
| **ATS keywords** | For the target role and company: which important keywords are present or missing. Only suggest adding a keyword if they actually have that skill. |
| **Red flags** | Typos, inconsistent tense, CGPA hidden while everything else is shown (that is the student's choice, but mention it), unexplained gaps, objective statements full of clichés |

Give a **score out of 100** and a verdict for the target (e.g. "Will pass the ATS, but won't stand out for a product company").

## Step 3: Blueprint for the target

What a strong fresher resume for **this company/role** emphasises. For example, product SDE: DSA ratings plus deployed projects with scale or metrics. ML roles: projects with datasets, metrics and baselines, plus papers or Kaggle. Service companies: clean fundamentals, certifications, communication. Lay out the ideal section order and the top 3 changes.

## Step 4: Rewrite (with their facts only)

- Rewrite each weak bullet as **before → after**. If a result number is missing, ask the student for it, or write `[X%]` as a placeholder for them to fill. **Never make up numbers, users, ratings or companies.**
- Offer an edited version in their original format if feasible (LaTeX or Markdown source can be edited directly; for DOCX or PDF, give a clean Markdown or LaTeX version). Ask before writing files, and never overwrite the original. Write a new file such as `resume_v2.tex`.
- Keep it to one page. If something must be cut, say what to cut and why.

## Finish

A before → after score, a checklist of what is left for them (add links, fill placeholders, export the PDF), and a suggestion to run `/jd-match` against each job description they apply to.

## Rules

- Truthful only. Anything on the resume can come up in `/defend-my-project`-style questions.
- Resumes contain personal data. Keep everything local, and don't upload it anywhere.
