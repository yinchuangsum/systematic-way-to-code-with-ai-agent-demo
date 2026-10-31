/**
 * CAPSTONE SUITE - Module 4. Red on purpose.
 *
 * Six testing decisions from the approved PRD. Treat this file as read-only:
 * if a test is wrong, stop and report it, do not edit it.
 *
 * Run with: npm run test:capstone
 */
import { describe, expect, it } from 'vitest';
import type { Cart } from '../src/cart';
import type { PromoCode } from '../src/promo';
import { DEFAULT_TIERS, priceWithTiers } from '../src/tiers';

const TAX_6PCT = 600;

function cart(unitPriceCents: number): Cart {
  return { taxRateBps: TAX_6PCT, items: [{ sku: 'SKU-1', unitPriceCents, quantity: 1 }] };
}

const FIXED_500: PromoCode = { code: 'FIX500', kind: 'FIXED', value: 500 };
const FIXED_6000: PromoCode = { code: 'FIX6000', kind: 'FIXED', value: 6000 };
const FIXED_1000: PromoCode = { code: 'FIX1000', kind: 'FIXED', value: 1000 };

describe('tiered loyalty discount', () => {
  it('gives no tier discount below the first threshold', () => {
    const quote = priceWithTiers(cart(9999), [], DEFAULT_TIERS);
    expect(quote.discountCents).toBe(0);
    expect(quote.appliedCodes).toEqual([]);
  });

  it('applies the 5% tier from 10000 and taxes the remainder', () => {
    const quote = priceWithTiers(cart(10000), [], DEFAULT_TIERS);
    expect(quote.discountCents).toBe(500);
    expect(quote.taxCents).toBe(570);
    expect(quote.totalCents).toBe(10070);
  });

  it('applies only the highest qualifying tier, never cumulatively', () => {
    const quote = priceWithTiers(cart(25000), [], DEFAULT_TIERS);
    expect(quote.discountCents).toBe(2500); // 10%, not 5% + 10%
    expect(quote.totalCents).toBe(23850);
  });

  it('evaluates the tier on the post-promo subtotal', () => {
    // 30000 - 6000 promo = 24000 -> 5% tier = 1200
    const quote = priceWithTiers(cart(30000), [FIXED_6000], DEFAULT_TIERS);
    expect(quote.discountCents).toBe(7200);
    expect(quote.totalCents).toBe(24168);
  });

  it('drops to the lower tier when a promo pushes the subtotal below a threshold', () => {
    // 26000 - 500 promo = 25500 -> still 10% -> 2550
    const quote = priceWithTiers(cart(26000), [FIXED_500], DEFAULT_TIERS);
    expect(quote.discountCents).toBe(3050);
    expect(quote.appliedCodes).toContain('TIER_10');
    expect(quote.totalCents).toBe(24327);
  });

  it('rounds the tier discount half up, once', () => {
    // 12345 -> 5% = 617.25 -> 617
    const quote = priceWithTiers(cart(12345), [], DEFAULT_TIERS);
    expect(quote.discountCents).toBe(617);
    expect(quote.totalCents).toBe(12432);
  });
});
