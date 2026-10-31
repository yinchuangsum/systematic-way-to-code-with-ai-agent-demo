import { describe, expect, it } from 'vitest';
import { subtotalCents, taxCents, type Cart } from './cart';
import { applyPromos, PromoError, type PromoCode, type PromoErrorCode } from './promo';
import { formatCents, roundHalfUp } from './money';

const TAX_6PCT = 600;

function cart(items: Array<[string, number, number]>, taxRateBps = TAX_6PCT): Cart {
  return {
    taxRateBps,
    items: items.map(([sku, unitPriceCents, quantity]) => ({
      sku,
      unitPriceCents,
      quantity,
    })),
  };
}

function promo(overrides: Partial<PromoCode> = {}): PromoCode {
  return { code: 'SAVE10', kind: 'PERCENT', value: 10, ...overrides };
}

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

describe('money', () => {
  it('rounds half up, never down', () => {
    expect(roundHalfUp(2.5)).toBe(3);
    expect(roundHalfUp(2.4)).toBe(2);
    expect(formatCents(12345)).toBe('RM123.45');
  });
});

describe('subtotal', () => {
  it('sums unit price times quantity across line items', () => {
    expect(subtotalCents(cart([['A', 1250, 2], ['B', 300, 3]]))).toBe(3400);
  });

  it('is zero for an empty cart', () => {
    expect(subtotalCents(cart([]))).toBe(0);
  });
});

describe('tax', () => {
  it('calculates and rounds tax once on the taxable amount', () => {
    expect(taxCents(199, TAX_6PCT)).toBe(12); // 11.94 -> 12
    expect(taxCents(100, TAX_6PCT)).toBe(6);
  });
});

describe('applyPromos - no promo', () => {
  it('returns subtotal plus tax when no promo code is supplied', () => {
    const quote = applyPromos(cart([['A', 3400, 1]]), []);
    expect(quote).toEqual({
      subtotalCents: 3400,
      discountCents: 0,
      taxCents: 204,
      totalCents: 3604,
      appliedCodes: [],
    });
  });
});

describe('applyPromos - single code', () => {
  it('applies a fixed discount to the subtotal, then taxes the remainder', () => {
    const quote = applyPromos(cart([['A', 3400, 1]]), [
      promo({ kind: 'FIXED', value: 500 }),
    ]);
    expect(quote.discountCents).toBe(500);
    expect(quote.taxCents).toBe(174);
    expect(quote.totalCents).toBe(3074);
  });

  it('applies a percentage discount to the subtotal', () => {
    const quote = applyPromos(cart([['A', 3400, 1]]), [promo({ value: 20 })]);
    expect(quote.discountCents).toBe(680);
    expect(quote.taxCents).toBe(163);
    expect(quote.totalCents).toBe(2883);
  });

  it('caps a percentage discount at maxDiscountCents', () => {
    const quote = applyPromos(cart([['A', 10000, 1]]), [
      promo({ value: 50, maxDiscountCents: 3000 }),
    ]);
    expect(quote.discountCents).toBe(3000);
    expect(quote.totalCents).toBe(7420);
  });

  it('never discounts more than the subtotal', () => {
    const quote = applyPromos(cart([['A', 3400, 1]]), [
      promo({ kind: 'FIXED', value: 5000 }),
    ]);
    expect(quote.discountCents).toBe(3400);
    expect(quote.taxCents).toBe(0);
    expect(quote.totalCents).toBe(0);
  });

  it('rejects an expired code', () => {
    const expired = promo({ expiresAt: new Date('2020-01-01T00:00:00Z') });
    expectPromoError(
      () => applyPromos(cart([['A', 3400, 1]]), [expired], new Date('2024-01-01T00:00:00Z')),
      'PROMO_EXPIRED',
    );
  });

  it('rejects a code below its minimum spend', () => {
    expectPromoError(
      () => applyPromos(cart([['A', 3400, 1]]), [promo({ minSpendCents: 5000 })]),
      'PROMO_MIN_SPEND',
    );
  });

  it('taxes the discounted subtotal, not the original', () => {
    const quote = applyPromos(cart([['A', 10000, 1]]), [
      promo({ kind: 'FIXED', value: 2000 }),
    ]);
    expect(quote.taxCents).toBe(480);
    expect(quote.totalCents).toBe(8480);
  });

  it('records which codes were applied', () => {
    const quote = applyPromos(cart([['A', 3400, 1]]), [promo({ code: 'WELCOME' })]);
    expect(quote.appliedCodes).toEqual(['WELCOME']);
  });
});
