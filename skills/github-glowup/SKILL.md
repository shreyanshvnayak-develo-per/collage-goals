---
name: github-glowup
description: Audit and upgrade a student's GitHub profile so a recruiter scanning it for 30 seconds is impressed. Use when the user asks to review, fix, polish or "glow up" their GitHub, profile README, pinned repos, repo READMEs, descriptions, topics or commit history before placements or internship applications. Audits first, drafts fixes, and applies them only with permission.
---

# /github-glowup — make your GitHub recruiter-ready

Recruiters and interviewers at campus drives spend about **30 seconds** on a GitHub profile. In that time they look at the profile README, the pinned repos, whether the READMEs explain anything, and whether the green squares look real. Your job is to make those 30 seconds count. Use only the student's real work. Never invent projects, stats or experience.

## Inputs

- `/github-glowup <username>`: audit that GitHub profile.
- `/github-glowup` with no argument: ask for the username. If they say "this repo", audit only the current repository.
- An optional role target, e.g. `/github-glowup <username> --role ml-engineer` (or `backend`, `frontend`, `data-analyst`, `sde`). The default is SDE fresher.

## Step 1: Gather (read-only)

Use whatever is available, in this order of preference:

1. The `gh` CLI if it is installed and authenticated: `gh api users/<u>`, `gh repo list <u> --limit 100 --json name,description,repositoryTopics,stargazerCount,primaryLanguage,isFork,pushedAt`, `gh api repos/<u>/<u>/readme` for the profile README.
2. Public GitHub API through `curl` if network access allows.
3. Otherwise, ask the user to paste their profile README and their list of pinned repos.

Also check the local clones of their repos if they are in the working directory. Never push, edit or create anything in this step.

## Step 2: Scorecard

Score each area from 0 to 10 and show it as a table:

| Area | What you check |
|---|---|
| Profile README | Exists? 1-line headline with role + stack? Links (LinkedIn, portfolio, resume)? Not a wall of badges or a GIF dump? |
| Pinned repos | 4–6 pinned? Original work, not forks or tutorial clones? Shows range (one ML/data, one full-stack/backend, one DSA/CP or tooling)? |
| Repo READMEs | For each pinned repo: what it is, a screenshot/GIF/demo link, tech stack, how to run, results/metrics |
| Descriptions & topics | One-line description on every pinned repo? Topics set (`python`, `machine-learning`, `fastapi`...)? |
| Commit history | Meaningful messages, not "update", "final", "asdf"? Spread over time, not one dump the night before the drive? |
| Red flags | Committed `.env`/API keys, `node_modules`, `venv`, huge `.ipynb` checkpoints, dataset blobs, empty repos, "Untitled" repos, forks pinned as their own |

Give an **overall score out of 100** and a one-line verdict ("Looks like a tutorial follower" → "Looks like someone who ships").

**Secrets are urgent.** If you see what looks like a committed key or `.env`, flag it at the top. Tell them to **rotate the key first**, because deleting the file does not remove it from git history. Never print the secret value.

## Step 3: Fix plan

List fixes ordered by **impact per minute of effort**. For each fix, give what to change, why a recruiter cares, and the time it takes. Typical top fixes:

1. Write or replace the profile README.
2. Re-pick the pinned repos.
3. Add a README with a demo GIF to the top 3 projects.
4. Add a description and topics to every pinned repo.
5. Archive or make private the clutter (forks, "test", "practice-1").
6. Add a `.gitignore` and remove `venv` / `node_modules` / data blobs.

## Step 4: Draft

For each fix the student says yes to, produce the actual content:

- **Profile README**: short and clean. Name + role headline · 2–3 line "what I build" · tech stack as plain text or a small badge row · 3 featured projects with one-line impact each · contact links. No fake stats, no "I am a passionate learner" filler, no 20 badge GIFs. For ML-role targets, lead with ML projects and metrics (e.g. "F1 0.91 on ...") but only numbers that are actually in their repo.
- **Repo README template**, filled in from the real code: Title + one-liner · demo (screenshot/GIF/live link placeholder) · Features · Tech stack · Architecture (a small diagram if useful) · Getting started (exact commands) · Results/metrics (ML: dataset, model, metric, baseline) · What I learned / future work.
- **Descriptions** (≤ 100 characters) and **topics** for each repo.

Read the repo's code before writing its README so that every claim is true. If something is unknown (live URL, screenshots), leave a clear `<!-- TODO: add screenshot -->` instead of guessing.

## Step 5: Apply (only with permission)

Show every draft first. Apply only what the student approves, and only in ways they choose:

- Local repo: write the README file, then ask before `git commit` / `git push`.
- Remote metadata via `gh`, e.g. `gh repo edit <repo> --description "..." --add-topic python`. Ask before each batch.
- Never delete repos, rewrite history, or force-push. Suggest those steps for the student to do themselves.

## Finish

End with a before → after scorecard and the remaining fixes, each with a time estimate. Optionally offer to run `/make-it-hireable` on their weakest pinned project.
