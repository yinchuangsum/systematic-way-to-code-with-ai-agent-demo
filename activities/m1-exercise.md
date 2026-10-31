# Module 1 exercise — prompt-first, and what it costs

**Time:** 8 minutes · **Pairs** · **No deliverable**

## Do

1. Open this repository. Confirm `npm test` is green.
2. Ask your agent this, verbatim, and nothing more:

   > Add support for stacking promo codes in src/promo.ts. A percent code and a
   > fixed code should be able to apply together.

3. Watch it work. Do not fix anything, do not interrupt, do not add context.

## Watch for

- Which of the two codes it applies first — did it ask you?
- Where it rounds, and how many times.
- Whether it writes its own tests, and what those tests assume.
- Whether `src/promo.test.ts` survives unchanged.

## Bring to the debrief

One line each:

- the decision it made that you did not make;
- the file it changed that you did not ask it to change.

## Reset

```bash
git checkout -- .
git status          # must be clean before the demo starts
```
