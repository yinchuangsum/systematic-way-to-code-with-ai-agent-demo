# PRD-002: Loyalty tier discounts

**Owner:** Retention · **Date:** 2026-10-26 · **Status:** approved
**Decisions:** ADR-002 (evaluation point, non-cumulative, rounding)

## 1. Problem

The loyalty programme promises 5% from RM100 and 10% from RM250, but checkout
applies no tier discount. Members see the promise on the marketing site and not
on the receipt, and support has no way to explain the difference.

## 2. Solution

A returning member sees the tier they qualify for applied to their order, and
pays a total that matches the tier shown before payment.

## 3. User stories

1. As a member, I want 5% off from RM100, so that the promise on the site is honoured.
2. As a member, I want 10% off from RM250, so that higher spend is rewarded.
3. As a member, I want only the highest qualifying tier applied, so that the discount is predictable.
4. As a member, I want the tier evaluated after promos, so that the discount reflects what I actually spend.
5. As a member, I want the tier shown in `appliedCodes`, so that support can confirm what was applied.
6. As finance, I want tax computed after the tier discount, so that collected tax matches the return.
7. As a member, I want the discount rounded once, so that the receipt never shows stray cents.

## 4. Implementation decisions

- Thresholds: 5% from 10 000 cents, 10% from 25 000 cents, in integer cents.
- Evaluated on the **post-promo, pre-tax subtotal**.
- Highest qualifying tier only, never cumulative.
- Tier recorded in `appliedCodes` as `TIER_5` / `TIER_10`.
- Rounding: half up, once, at the end.
- No change to `src/money.ts`, the tax path, or existing single-promo behaviour.
- No new dependencies. Synchronous, under 50 ms.
- The evaluation point, the non-cumulative rule and the rounding are settled in ADR-002.

## 5. Testing decisions

- Tests assert external behaviour only: call `priceWithTiers` with a cart, promos and tiers, then assert discount, tax, total and `appliedCodes`.
- Tested: tier evaluation and its interaction with promos and tax. Not tested: the tax table itself, which is unchanged.
- Prior art: `exercise/stacking.test.ts`. Same shape — one observable behaviour per test, integer cents, no mocks.
- The capstone suite is the written-before version of this table. Treat it as read-only.

| # | Story | Criterion (input → expected) | Test name |
|---|---|---|---|
| 1 | 1 | Subtotal 9999 → no tier, discount 0 | `gives no tier discount below the first threshold` |
| 2 | 1, 6 | Subtotal 10000 @6% → discount 500, tax 570, total 10070 | `applies the 5% tier from 10000 and taxes the remainder` |
| 3 | 2, 3 | Subtotal 25000 → discount 2500, total 23850 | `applies only the highest qualifying tier, never cumulatively` |
| 4 | 4 | Subtotal 30000 with 6000 fixed → discount 7200, total 24168 | `evaluates the tier on the post-promo subtotal` |
| 5 | 4, 5 | Subtotal 26000 with 500 fixed → discount 3050, `TIER_10` | `drops to the lower tier when a promo pushes the subtotal below a threshold` |
| 6 | 7 | Subtotal 12345 → tier 617 (half up), total 12432 | `rounds the tier discount half up, once` |

## 6. Out of scope

- Earning or expiring tier status; tiers are passed in, not computed here.
- Points, referrals, or per-category exemptions.
- Retroactive re-pricing of placed orders.
- Any change to the tax rate source.

## 7. Further notes

- ADR-002 records the evaluation point, the non-cumulative rule and the rounding.
- Open questions: none.
- Definition of done: `AGENTS.md`.
