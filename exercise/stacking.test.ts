/**
 * EXERCISE SUITE - this file must stay RED until the feature is implemented.
 *
 * Rules of engagement for the agent:
 *   1. Do not modify this file.
 *   2. Do not modify src/promo.test.ts.
 *   3. Make `npm run test:exercise` and `npm test` both green.
 *
 * These tests are the written-before version of the testing decisions for
 * "support promo stacking".
 * They are intentionally written before the implementation exists.
 */
import { describe, expect, it } from 'vitest';
import type { Cart } from '../src/cart';
import { applyPromos, PromoError, type PromoCode, type PromoErrorCode } from '../src/promo';

const TAX_6PCT = 600;

function cart(unitPriceCents: number, taxRateBps = TAX_6PCT): Cart {
  return { taxRateBps, items: [{ sku: 'SKU-1', unitPriceCents, quantity: 1 }] };
}

const PERCENT_20: PromoCode = { code: 'PCT20', kind: 'PERCENT', value: 20, stackable: true };
const FIXED_500: PromoCode = { code: 'FIX500', kind: 'FIXED', value: 500, stackable: true };

function expectPromoError(fn: () => unknown, code: PromoErrorCode): void {
  try {
    fn();
  } catch (error) {
    expect(error).toBeInstanceOf(PromoError);
    expect((error as PromoError).code).toBe(code);
    return;
  }
  throw new Error(`Expected PromoError ${code}, but nothing was thrown`);
}

describe('promo stacking', () => {
  it('applies the percentage first, then the fixed amount', () => {
    // 2000 - 20% = 1600, then -500 = 1100
    const quote = applyPromos(cart(2000), [PERCENT_20, FIXED_500]);
    expect(quote.discountCents).toBe(900);
    expect(quote.totalCents).toBe(1166); // 1100 + 6% tax
  });

  it('applies the percentage cap before the fixed amount', () => {
    const capped: PromoCode = { ...PERCENT_20, maxDiscountCents: 300 };
    // 2000 - min(400, 300) = 1700, then -500 = 1200
    const quote = applyPromos(cart(2000), [capped, FIXED_500]);
    expect(quote.discountCents).toBe(800);
    expect(quote.totalCents).toBe(1272);
  });

  it('checks minimum spend against the pre-discount subtotal', () => {
    const highMinimum: PromoCode = { ...FIXED_500, minSpendCents: 1900 };
    // Subtotal 2000 clears the 1900 minimum even though the percentage drops it to 1600.
    const quote = applyPromos(cart(2000), [PERCENT_20, highMinimum]);
    expect(quote.discountCents).toBe(900);
  });

  it('floors the total at zero when discounts exceed the subtotal', () => {
    const quote = applyPromos(cart(1000), [
      { code: 'PCT50', kind: 'PERCENT', value: 50, stackable: true },
      { code: 'FIX900', kind: 'FIXED', value: 900, stackable: true },
    ]);
    expect(quote.discountCents).toBe(1000);
    expect(quote.taxCents).toBe(0);
    expect(quote.totalCents).toBe(0);
  });

  it('taxes the final discounted subtotal once', () => {
    // 10000 - 20% = 8000, -500 = 7500, tax 6% = 450
    const quote = applyPromos(cart(10000), [PERCENT_20, FIXED_500]);
    expect(quote.taxCents).toBe(450);
    expect(quote.totalCents).toBe(7950);
  });

  it('rejects two stackable codes of the same kind', () => {
    const anotherPercent: PromoCode = { code: 'PCT10', kind: 'PERCENT', value: 10, stackable: true };
    expectPromoError(() => applyPromos(cart(2000), [PERCENT_20, anotherPercent]), 'PROMO_INVALID_STACK');
  });
});
