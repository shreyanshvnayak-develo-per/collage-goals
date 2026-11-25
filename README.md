# TENSOR — Claude Code skills for CS/IT placements

```python
import tensor as tf   # not that one 😉
tf.shape  # (5 skills, ∞ practice, 0 fluff)
```

TENSOR is a set of [Claude Code](https://claude.com/claude-code) skills for Indian CS/IT students preparing for placements. They run in your terminal, on **your** code.

| Skill | What it does |
|---|---|
| `/pattern-coach` | DSA hint ladder: brute force → trigger words → pattern → Python template → solution. Drill, review and progress-map modes. |
| `/github-glowup` | Audits your GitHub profile, pinned repos and READMEs for the 30-second recruiter scan. Drafts fixes and applies them only with your permission. |
| `/make-it-hireable` | Turns a college project into a resume project: structure, README, secrets, tests, deploy, ML hygiene, plus honest resume bullets. |
| `/defend-my-project` | A mock "explain your project" round. Every question comes from your real files. Ends with a hire/no-hire verdict and a cheat-sheet. |
| `/core-viva` | Rapid-fire viva on OS, DBMS, CN, OOP, Python, ML and DL. Adapts difficulty and builds a revision sheet from your weak topics. |

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
