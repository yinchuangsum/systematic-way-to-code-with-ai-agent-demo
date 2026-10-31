# AGENTS.md — promo-engine

## Repo map

- `src/` — production code. Money is **integer cents**, always.
- `src/**/*.test.ts` — the production suite. Run with `npm test`.
- `exercise/**/*.test.ts` — the written-before testing decisions for the current feature. Run with `npm run test:exercise`.
- `capstone/**/*.test.ts` — Module 4 testing decisions. Run with `npm run test:capstone`.
- `docs/prd/` — the requirement. Read `PRD-002-tiers.md` before the capstone.
- `docs/adr/` — decisions. **Read ADR-002 before touching tiers.**
- `activities/` — the brief for whichever exercise you are in. Do not edit.

## Commands

```bash
npm install          # once
npm test             # production suite — MUST be green before you finish
npm run test:exercise # acceptance suite — red until the feature is done
npm run test:capstone # capstone suite — red until the tier feature is done
npm run typecheck    # tsc --noEmit — MUST be clean before you finish
```

## Definition of done

A task is done only when **all** of these are true:

1. `npm test` passes with the same number of tests as before you started.
2. `npm run test:exercise` passes.
3. `npm run typecheck` is clean.
4. No new dependencies were added.
5. You can name the test that proves each requirement.

## Forbidden — these are hard stops, not preferences

- **Never edit a test to make it pass.** If a test is wrong, stop and report it.
- **Never delete or skip a test.** No `.skip`, no `.todo`, no commented-out assertions.
- **Never change `vitest.config.ts`, `vitest.exercise.config.ts`, or `tsconfig.json`.**
- **Never change money representation.** Integer cents only; no floats, no `parseFloat` on money.
- **Never add a dependency** without an ADR that says why.
- **Never round per line item.** Round once, at the end.

## Working protocol

1. Read the failing test names first. They are the specification.
2. State the smallest change that makes one test pass. Then make it.
3. Run `npm test`. If you broke something, revert and try again.
4. Run `npm run test:exercise`. Repeat until green.
5. Run `npm run typecheck`.
6. Report: what changed, which tests prove it, and anything you could not do.

## When blocked

After **three** failed attempts at the same failure, stop. Report the exact
command, the exact error, and what you tried. Do not keep guessing, and do not
widen the change to compensate.
