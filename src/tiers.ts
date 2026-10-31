import type { Cart } from './cart';
import type { PromoCode, Quote } from './promo';

export interface Tier {
  /** Minimum post-promo subtotal, in cents, to qualify. */
  minSubtotalCents: number;
  /** Whole percent discount for the tier. */
  percent: number;
}

/** Loyalty tiers, highest qualifying tier wins. Never cumulative. */
export const DEFAULT_TIERS: Tier[] = [
  { minSubtotalCents: 10_000, percent: 5 },
  { minSubtotalCents: 25_000, percent: 10 },
];

/**
 * Price a cart with promos AND loyalty tiers.
 *
 * NOT IMPLEMENTED. See capstone/README.md and capstone/tiers.test.ts.
 * ADR-002 decides whether tiers see the pre- or post-promo subtotal.
 * Read it before writing code.
 */
export function priceWithTiers(
  _cart: Cart,
  _promos: PromoCode[],
  _tiers: Tier[] = DEFAULT_TIERS,
  _now: Date = new Date(),
): Quote {
  throw new Error('NOT_IMPLEMENTED: tiered loyalty discounts');
}
