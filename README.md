# promo-engine

Teaching repository for **Systematic Way to Code with AI Agent**.

A cart pricing service with promo codes. Two suites:

| Command | Suite | Expected state |
|---|---|---|
| `npm test` | `src/**/*.test.ts` — existing behaviour | **green**, 13 tests |
| `npm run test:exercise` | `exercise/**/*.test.ts` — the feature to build | **red**, 6 tests |

The gap between "13 green" and "6 red" is the lesson: the existing suite encodes
what the system does, the exercise suite encodes what the business now wants,
and nothing connects them until a human writes the specification.

## Quick start

```bash
npm install
npm test                 # 13 passed
npm run test:exercise    # 6 failed  <- on purpose
```

## The exercise

Support stacking one percent code with one fixed code. The rules are in
`exercise/stacking.test.ts`. They are deliberately incomplete — the ordering of
validation, the rounding point, and what counts as a legal stack are decisions,
not facts. That is what the ADR is for.

## The activities

| Activity | Brief | Produces |
|---|---|---|
| Module 1, 8 min | `activities/m1-exercise.md` | nothing — reset afterwards |
| Module 2, 5 min | `activities/activity-1-discussion.md` | a paper draft; no file |
| Module 3, 50 min | `activities/m3-hands-on.md` | six green exercise tests |

The case the Module 2 discussion works from is
`activities/cases/case-01-first-order.md`.

## Layout

```
src/
  money.ts        integer-cent helpers, round-half-up
  cart.ts         line items, subtotal, single tax calculation
  promo.ts        applyPromos() — currently single-code only
  promo.test.ts   the 13 green tests
exercise/
  stacking.test.ts  the 6 red tests (do not edit)
activities/       the three briefs and the case
  cases/case-01-first-order.md
docs/prd/         PRD template + the sample PRD-002
docs/adr/         ADR template + the sample ADR-002
AGENTS.md          rules of engagement for the coding agent
```
