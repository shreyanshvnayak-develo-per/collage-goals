# TENSOR — Claude Code skills for CS/IT placements

```python
import tensor as tf   # not that one 😉
tf.shape  # (5 skills, ∞ practice, 0 fluff)
```

TENSOR is a set of 14 [Claude Code](https://claude.com/claude-code) skills covering the whole CS/IT placement journey for Indian students. They run in your terminal, on **your** code.

### 01 · Prep
| Skill | What it does |
|---|---|
| `/pattern-coach` | DSA hint ladder: brute force → trigger words → pattern → Python template → solution. Drill, review and map modes. |
| `/core-viva` | Rapid-fire viva on OS, DBMS, CN, OOP, Python, ML and DL. Adapts difficulty and builds a revision sheet from your weak topics. |

### 02 · Getting shortlisted
| Skill | What it does |
|---|---|
| `/github-glowup` | Audits your GitHub for the 30-second recruiter scan. Drafts fixes and applies them only with your permission. |
| `/make-it-hireable` | Turns a college project into a resume project: structure, tests, secrets, deploy, ML hygiene and honest bullets. |
| `/company-intel` | A sourced company brief: hiring rounds, what they test, stack, news, "Why us?" hooks and a prep plan. |
| `/resume-blueprint` | The 6-second scan, an ATS check, bullet rewrites and a blueprint for a target company. Never invents facts. |
| `/jd-match` | Resume vs one job description: match score, eligibility, an apply/tailor/skip decision and gap-closers. |
| `/referral-dm` | LinkedIn referral strategy, short personalised notes, follow-ups and a tracker. You send everything manually. |

### 03 · Interview rounds
| Skill | What it does |
|---|---|
| `/oa-sim` | A local online assessment with a timer, a judge and hidden tests (edge cases and TLE traps). |
| `/mock-interview` | A timed DSA round calibrated to the company and level, ending with a hire/no-hire verdict. |
| `/system-design-mock` | HLD, LLD and machine-coding rounds with pushback, at fresher depth. |
| `/defend-my-project` | Grilled on your real code, one question at a time, ending with a verdict and a cheat-sheet. |
| `/hr-round` | A STAR story bank, a mock HR round, and India-specific questions (bond, relocation, salary). |

### 04 · Offer
| Skill | What it does |
|---|---|
| `/offer-decode` | CTC breakdown → monthly in-hand estimate (new regime), bond and clawback flags, offer comparison, and a reverse "CTC needed for ₹X in-hand". |

## Install

```bash
git clone https://github.com/shreyanshvnayak-develo-per/collage-goals.git tensor
cd tensor && ./install.sh                 # all skills → ~/.claude/skills
./install.sh pattern-coach core-viva      # only some
./install.sh --project ~/code/my-repo     # into one repo's .claude/skills
```

Then open Claude Code in any folder and type `/pattern-coach`.

## Website

The showcase site is plain static HTML, CSS and JS (`index.html` + `assets/`). There is no build step.

- **Preview locally:** `python3 -m http.server 8000`, then open http://localhost:8000
- **Deploy:** import the repo on Vercel with framework preset "Other" and no build command. Netlify and GitHub Pages also work.
- **Add a skill:** create `skills/<name>/SKILL.md`, then add an entry to `assets/skills.js`.

## Layout

```
skills/<name>/SKILL.md   ← the actual skills
index.html, assets/      ← showcase website (Jupyter-dark theme)
install.sh               ← installer
```
