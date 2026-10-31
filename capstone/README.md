# Module 4 capstone — Loyalty tiers

**Time:** 3:50–4:25 build, 4:25–4:45 peer review.
**Starting point:** `src/tiers.ts` (a stub that throws) and `capstone/tiers.test.ts`
(6 red tests). You already have a PRD, an ADR, and a testing-decisions table with
six rows.

## Your job

1. Read `capstone/README.md` and `docs/adr/ADR-002-tiers.md` (**4 minutes**).
2. Restate the six criteria in your own words to your pair. If you disagree on
   any of them, stop and read the ADR again.
3. Write nothing until you can name the test that will prove each criterion.
4. Implement. Keep `npm test`, `npm run test:exercise`, and `npm run test:capstone`
   in view.
5. When green, run `npm run typecheck` and commit.
6. Swap repos with the neighbouring pair and score them with the rubric.

## The rules you must not break

- Do not edit `capstone/tiers.test.ts`, `exercise/stacking.test.ts`, or `src/promo.test.ts`.
- Do not change `src/money.ts` or the tax path.
- No new dependencies.
- If you believe a test is wrong, stop and tell the facilitator. That is a
  finding, not a failure.

## Definition of done

```bash
npm test              # 13 passed
npm run test:exercise #  6 passed
npm run test:capstone #  6 passed
npm run typecheck     # clean
```

## What "good" looks like (the rubric scores these)

| Criterion | What earns a 4 |
|---|---|
| Testing decisions testable and traceable | Every story maps to an input → expected criterion and a named test; no adjectives |
| ADR records a real decision | Names the alternative it rejected and why |
| Tests precede implementation | Commit order or transcript shows red before green |
| Self-correction visible | Agent read the failure and made a targeted fix, not a rewrite |
| Existing tests untouched | `git diff` shows no changes to test files |
