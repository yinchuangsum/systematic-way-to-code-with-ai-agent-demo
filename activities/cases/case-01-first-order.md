# Case 1 — 10% off the first order

**From:** Growth · **To:** Engineering · **Date:** 2026-10-31
**Status:** a request, not a decision

## The ticket, verbatim

> New customers should get 10% off their first order. It is a thank-you for
> signing up, so keep it simple: once per customer, no expiry. Can we get it into
> checkout this sprint?

## What we already know

- Checkout prices promo codes today; loyalty tiers exist in the sample PRD-002.
- Money is integer cents; tax is calculated once, at the end (`src/money.ts`).
- Orders already carry a customer id.

## What the ticket does not decide

Read these as questions, not requirements. They are the work.

1. What makes a customer "new" — an account, an email, a device, or the first *paid* order?
2. Is the discount a promo code, a loyalty tier, or a separate adjustment? Does it appear in `appliedCodes`?
3. "10% off" — off the subtotal, the total, or the subtotal after other promos?
4. Before or after tax? The ticket does not say, and the answer changes the total.
5. Rounded once, or per line item?
6. "Once per customer" — enforced how, and what error does a second attempt return?
7. Can it combine with a campaign code? In which order?
8. Refund: is the discount restored? Is the customer "new" again?
9. Is the percentage configurable, or fixed at 10% for launch?
10. Abuse: same person, new account. Is that in scope for this sprint?

## Constraints that are real

- Existing promo behaviour must not change.
- No new dependencies.
- Pricing stays synchronous, under 50 ms.
- No schema change unless an ADR says why.

## Activity 1 — five minutes

In groups, draft, not write:

- **Problem** and **Solution**, in the customer's words.
- **Three user stories**, numbered.
- **One decision** for the ADR, with two alternatives you rejected.

Do not write the whole document. Five minutes, then we walk a finished sample and
score it together.
