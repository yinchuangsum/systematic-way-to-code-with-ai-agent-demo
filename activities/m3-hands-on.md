# Module 3 hands-on — turn the red suite green

**Time:** 50 minutes · **Pairs** · **Done = the four commands below**

## Goal

```bash
npm test                 # 13 passed, unchanged
npm run test:exercise    # 6 passed
npm run typecheck        # clean
git diff -- '*.test.ts'  # empty
```

## Rules

- **Never edit** `exercise/stacking.test.ts` or `src/promo.test.ts`.
- Do not skip, delete, or comment out a test.
- No new dependencies.
- Make the smallest change that turns one failure green, then run both suites.
- Three failed attempts on the same failure: stop, report the exact error, wait.

## How

1. Read the failing test names. They are the specification.
2. Say out loud the smallest change that would make one pass.
3. Make it. Run `npm test` and `npm run test:exercise`.
4. Repeat. Read the failure, not the summary.
5. When both suites are green: `npm run typecheck`.

## If you believe a test is wrong

Stop and tell the facilitator. That is a finding, not a failure — and it is a
better outcome than editing the test.
