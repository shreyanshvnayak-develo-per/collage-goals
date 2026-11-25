---
name: offer-decode
description: Decode an Indian job offer: break CTC into components, estimate monthly in-hand salary after tax/PF/professional tax, flag bonds, clawbacks, variable pay and ESOP fine print, compare multiple offers, and reverse-calculate the CTC needed for a target in-hand (e.g. "₹1 lakh in-hand per month"). Use when the user shares an offer letter, a CTC breakup, or asks "how much will I actually get".
---

# /offer-decode — the CTC number vs what hits your bank account

Indian offers advertise **CTC** (cost to company). The salary you receive each month is much lower: CTC includes the employer's PF, gratuity, variable pay, joining bonus, ESOPs and insurance, and then tax and the employee's PF come out of what's left. Your job is to turn an offer into an honest **monthly in-hand estimate** and flag the fine print.

> ⚠️ Always say: *"This is an estimate, not tax advice. Tax rules change every Budget. Confirm with HR / the payslip / a CA."*

## Modes

| Invocation | Mode |
|---|---|
| `/offer-decode <offer letter file or pasted breakup>` | Decode one offer |
| `/offer-decode compare <offer A> <offer B> ...` | Side-by-side comparison |
| `/offer-decode target <monthly in-hand>` | Reverse: the CTC needed for that in-hand (e.g. `target 100000`) |
| `/offer-decode` | Ask for the offer details |

## Step 1: Extract components

From the offer letter or breakup, list each component with its annual amount and whether it is **fixed**, **variable**, **one-time**, **deferred** or **not cash**:

- Basic, HRA, special allowance, LTA, other allowances: fixed monthly cash
- Employer PF contribution (often 12% of basic, sometimes capped at ₹1,800/month): not in-hand, goes to EPF
- Gratuity (around 4.81% of basic): paid only after about 5 years of service; not in-hand
- Variable / performance bonus: conditional, often paid annually and often below 100%
- Joining / signing bonus: one-time, usually with a **clawback** if you leave within 12 months
- Relocation: one-time
- Retention bonus: deferred, conditional
- ESOPs / RSUs: vesting schedule and cliff; for unlisted startups, value is uncertain
- Insurance, meal cards, NPS, other perks: note the tax treatment

If something is missing or ambiguous, ask, or state the assumption.

## Step 2: Monthly in-hand estimate (year 1)

Show the working in a table:

1. **Fixed gross** = CTC − employer PF − gratuity − variable − one-time − ESOP − insurance/perks not paid as cash
2. **Employee PF** = usually 12% of basic (the same as the employer's share, or capped; confirm)
3. **Professional tax**: state-dependent, about ₹2,500/year in many states (e.g. Maharashtra, Karnataka, Gujarat). Some states have none; ask which state they will work in.
4. **Income tax**: default to the **new tax regime** (the default regime for salaried individuals) unless the student asks for the old regime.
   - Use the **slabs for the current financial year**. If web access is available, verify the latest Budget's slabs and say which FY you used.
   - Reference values (**FY 2025-26, new regime**, from Budget 2025; re-verify for later years):
     - standard deduction ₹75,000
     - slabs on taxable income: 0–4L nil · 4–8L 5% · 8–12L 10% · 12–16L 15% · 16–20L 20% · 20–24L 25% · above 24L 30%
     - Section 87A rebate makes tax nil up to ₹12L taxable income (about ₹12.75L gross salary with the standard deduction), with marginal relief just above it
     - 4% health & education cess on tax; surcharge only above ₹50L income
   - Compute the tax on (fixed gross + expected variable for the year − standard deduction), then the monthly TDS ≈ annual tax ÷ 12.
5. **Monthly in-hand** ≈ (fixed gross − employee PF − professional tax − tax on fixed) ÷ 12

Present:
- **Monthly in-hand (fixed only)**: what to expect every month
- **Variable payout** (when and how much after tax, if paid at the target %)
- **Year-1 total cash** (including the joining bonus after tax)
- **In-hand as a % of CTC**: a reality check

Do the arithmetic carefully. If a shell is available, compute in Python (`python3 -c ...`) rather than in your head, and show the formula.

## Step 3: Fine print & red flags

Read the offer letter text for:
- **Service agreement / bond**: amount, duration, and whether it's a penalty or training-cost recovery. It's common in service companies; flag it clearly.
- **Joining bonus clawback** period
- **Notice period** (60–90 days affects future switches)
- **Variable pay** that depends on company *and* individual performance; the historical payout % if known
- **ESOP** vesting (e.g. 4 years with a 1-year cliff), exercise price, the exercise window after leaving
- **Probation** terms; **non-compete** clauses (often weakly enforceable in India, but flag them)
- **Location / shift / relocation** obligations; **background verification** conditions; **offer validity / joining date** risks (delayed onboarding is common, so note it)

## Compare mode

A table across offers: CTC · fixed · monthly in-hand · year-1 cash · variable · bond · notice · ESOP · location (adjust for cost of living, e.g. Bengaluru vs Ahmedabad rent) · growth and learning. End with the **trade-offs**, not just "pick the bigger number". Ask what the student values: learning, brand, money, location, work-life balance.

## Target mode (reverse calculation)

Given a target **monthly in-hand** (e.g. ₹1,00,000):
1. Assume a typical structure: basic 40–50% of fixed, employer and employee PF at 12% of basic (state whether it's capped), gratuity 4.81% of basic, variable 10% of CTC, new regime, the student's state for professional tax.
2. Iterate (binary search in Python) to find the **CTC needed**. Show the answer as a range, because the structure changes it: e.g. "around ₹X–Y LPA CTC".
3. Explain which levers change it most: variable %, PF cap, regime, joining bonus.
4. Give context: which kinds of roles and companies typically offer that range for freshers or 2–3 YOE, and what timeline it's realistic on. Keep this hedged; don't promise.

## Rules

- Never guarantee figures. Label assumptions and the tax year used.
- Offer letters are confidential. Keep them local and don't upload them anywhere.
- If the student wants to negotiate, give polite, factual negotiation lines (competing offer, market data), and never suggest lying about other offers.
