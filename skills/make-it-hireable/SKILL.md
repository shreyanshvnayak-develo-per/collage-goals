---
name: make-it-hireable
description: Turn a student project (in the current repo) into something an interviewer takes seriously. Use when the user asks to make a project resume-worthy, interview-ready, "hireable", production-like, or wants resume bullets for it. Audits code, structure, README, tests, deployability and ML hygiene, then fixes the highest-impact gaps with permission. Pairs with /defend-my-project.
---

# /make-it-hireable — from college project to resume project

Most student projects look alike: a tutorial clone, one giant file or notebook, no README, no tests, hard-coded keys, and "works on my machine". Interviewers spot this in a minute. Your job is to find the **few changes that move this project from "tutorial" to "engineer built this"**, make them with the student's permission, and then give them honest resume bullets.

Work only on the project in the current working directory, unless the user points to another path.

## Step 1: Understand the project (read-only)

- Read the README, the dependency files (`requirements.txt`, `pyproject.toml`, `package.json`, `pom.xml`...), the entry points and the folder structure.
- Work out what it does, the stack, how you run it, and who it is for.
- Check git history: `git log --oneline | head -50`, the number of commits, and whether it was one big dump.
- Summarise your understanding in five lines and ask the student to confirm or correct it **before** auditing. Your audit is only as good as this understanding.

## Step 2: Hireability audit

Score each area from 0 to 5, with one line of evidence (a file path or command) for each:

| Area | Looks for |
|---|---|
| **Story** | Clear problem → solution → result. Would a stranger know why it exists in 10 seconds? |
| **README** | Demo (GIF/screenshot/live link), setup commands that actually work, stack, architecture, results |
| **Structure** | Separation of concerns (not one 800-line `app.py` / `main.ipynb`), sensible module names |
| **Code quality** | Naming, duplication, dead code, magic numbers, error handling, type hints (Python) |
| **Config & secrets** | `.env` + `.env.example`, no keys in code or history, config not hard-coded |
| **Reproducibility** | Pinned deps, one-command run (`make run` / `docker compose up` / script), seed set (ML) |
| **Tests** | Any tests at all? Core logic covered? `pytest` / `jest` runs green? |
| **Deploy** | Live link (Vercel / Render / Hugging Face Spaces / Streamlit Cloud), or at least Docker |
| **Git hygiene** | `.gitignore`, no `venv`/`node_modules`/datasets/model weights committed, meaningful commits |

**ML / data projects also get:**

| Area | Looks for |
|---|---|
| **Data** | Source and licence named, train/val/test split explained, **no leakage** (scaling or encoding fitted before the split, target in features, duplicates across splits) |
| **Baseline & metrics** | A simple baseline to beat; the metric suits the problem (not accuracy on imbalanced data); results table |
| **Notebook → code** | Exploration can stay in notebooks, but training and inference should be importable `.py` modules |
| **Model card** | What it predicts, the data, metrics, limitations, and how to use it |

Show the total out of 45 (or 65 for ML) and a one-line verdict.

## Step 3: Top 5 upgrades

Pick the **5 changes with the most interview impact per hour**, not 30 nitpicks. For each one, give what you would change, the files it touches, a time estimate, and the interview question it prepares them for (e.g. "How do you handle secrets?" → `.env.example` + config module).

Common high-impact upgrades:
- README rewrite with demo and results
- Split the monolith into modules (`data/`, `models/`, `api/`, `utils/`)
- `.env.example` + config loading; remove hard-coded keys (and say: **rotate any key that was ever committed**)
- Add 5–10 focused tests for the core logic + a GitHub Actions workflow running them
- Dockerfile or a one-command run script
- Deploy to a free host and put the link at the top of the README
- ML: add a baseline, fix leakage, add a metrics table and model card, and move training into `train.py` with CLI args

## Step 4: Implement (with permission)

- Ask which upgrades to do. Do them **one at a time**, showing the diff summary after each.
- Keep the student's style and stack. Don't swap frameworks or add heavy dependencies unasked.
- After each change, run what exists (tests, the app, the lint) and report the real result. If something fails, say so.
- Never commit, push, or rewrite git history without asking. Never delete their files without asking.
- **Explain each change in two lines**, because they will be asked about it. The point is that they understand it, not that the code looks impressive.

## Step 5: Resume bullets

Write 3–4 bullets in the **Action verb + what + how + measurable result** format, for example:

> Built a FastAPI service serving a fine-tuned DistilBERT sentiment model (F1 0.89 vs 0.81 TF-IDF baseline), containerised with Docker and deployed on Render with CI tests.

Rules:
- Every number must come from the repo (metrics files, README results, test counts) or from the student. **Never invent numbers.** If there is no number, write the bullet without one and suggest how to measure it.
- Name the real stack. No "leveraged cutting-edge synergies".
- Also give a one-line project description for LinkedIn and a 30-second spoken pitch.

## Finish

End with the before → after score, what is still pending, and:
> Now run **/defend-my-project** — I'll grill you on this code like an interviewer would.
