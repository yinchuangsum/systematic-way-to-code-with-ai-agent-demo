# ADR-002: Loyalty tiers are evaluated on the post-promo subtotal

**Date:** 2026-10-26 · **Status:** accepted

## Context

We are adding spend-based loyalty tiers on top of promo codes (PRD-002). Two
tiers exist: 5% from RM100 and 10% from RM250, where the tier is chosen by the
order's value.

The open question is **which value**. If tiers are evaluated before promo
discounts, a customer can use a large voucher to qualify for a tier they did not
really earn, and the two discounts compound. At RM250 with a RM60 voucher, the
difference between the two rules is RM3.00 per order.

Finance treats promo codes as a marketing cost and loyalty tiers as a retention
cost; they are budgeted separately and must not inflate each other's base.

## Decision

**We will evaluate tier eligibility on the subtotal after promo discounts have
been applied, and before tax.**

Tiers are never cumulative: only the highest qualifying tier applies. The tier
percentage is calculated on the same post-promo amount, rounded half-up once,
and tax is calculated on what remains.

## Alternatives considered

| Alternative | Why we did not choose it |
|---|---|
| Evaluate tiers on the pre-promo subtotal | Lets a voucher push an order into a tier it would not otherwise reach, so marketing spend inflates loyalty spend and the two budgets contend. |
| Cumulative tiers (5% + 10% = 15% at RM250) | Not what the retention programme promises; a 15% discount at RM250 breaks the margin model. |
| Round the tier discount per line item | Introduces one-cent drift against the payment provider, the same defect ADR-001 avoided. |

## Consequences

**Positive**
- One evaluation point, easy to test: six assertions, no ambiguity.
- Marketing and loyalty budgets stay independent.

**Negative**
- A customer who adds a voucher can drop a tier, which support must explain.
- Tier names in analytics now depend on the post-promo amount, so the dashboard
  query changes.

**Follow-ups**
- Add `TIER_5` / `TIER_10` to the applied-codes vocabulary.
- Analytics to recut the tier report on post-promo subtotal.

## Reversibility

`cheap`. The evaluation point is one expression; historical orders are not
re-priced. Switching later is a one-line change plus six test updates.
