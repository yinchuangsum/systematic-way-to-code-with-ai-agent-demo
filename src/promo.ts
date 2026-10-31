import { taxCents, subtotalCents, type Cart } from './cart';
import { roundHalfUp } from './money';

export type PromoKind = 'PERCENT' | 'FIXED';

export interface PromoCode {
  code: string;
  kind: PromoKind;
  /** PERCENT: whole percent, 1-100. FIXED: discount in cents. */
  value: number;
  /** Maximum discount in cents, applied after the percentage is calculated. */
  maxDiscountCents?: number;
  /** Minimum cart subtotal (before discounts) required to use this code. */
  minSpendCents?: number;
  /** May be combined with one other promo of a different kind. */
  stackable?: boolean;
  expiresAt?: Date;
}

export type PromoErrorCode =
  | 'PROMO_UNKNOWN'
  | 'PROMO_EXPIRED'
  | 'PROMO_MIN_SPEND'
  | 'PROMO_NOT_STACKABLE'
  | 'PROMO_INVALID_STACK';

export class PromoError extends Error {
  constructor(
    readonly code: PromoErrorCode,
    message?: string,
  ) {
    super(message ?? code);
    this.name = 'PromoError';
  }
}

export interface Quote {
  subtotalCents: number;
  discountCents: number;
  taxCents: number;
  totalCents: number;
  appliedCodes: string[];
}

function validate(promo: PromoCode, subtotal: number, now: Date): void {
  if (!promo.code) throw new PromoError('PROMO_UNKNOWN');

  if (promo.expiresAt && now.getTime() > promo.expiresAt.getTime()) {
    throw new PromoError('PROMO_EXPIRED', `${promo.code} has expired`);
  }

  if (promo.minSpendCents !== undefined && subtotal < promo.minSpendCents) {
    throw new PromoError('PROMO_MIN_SPEND', `${promo.code} needs a minimum spend`);
  }

  if (promo.kind === 'PERCENT' && (promo.value <= 0 || promo.value > 100)) {
    throw new PromoError('PROMO_UNKNOWN', `Invalid percentage ${promo.value}`);
  }

  if (promo.kind === 'FIXED' && promo.value <= 0) {
    throw new PromoError('PROMO_UNKNOWN', `Invalid fixed amount ${promo.value}`);
  }
}

function discountFor(promo: PromoCode, subtotal: number): number {
  const raw =
    promo.kind === 'PERCENT'
      ? roundHalfUp((subtotal * promo.value) / 100)
      : promo.value;

  const capped =
    promo.maxDiscountCents !== undefined
      ? Math.min(raw, promo.maxDiscountCents)
      : raw;

  return Math.max(0, Math.min(capped, subtotal));
}

function buildQuote(
  subtotal: number,
  discount: number,
  taxRateBps: number,
  appliedCodes: string[],
): Quote {
  const safeDiscount = Math.max(0, Math.min(discount, subtotal));
  const taxable = subtotal - safeDiscount;
  const tax = taxCents(taxable, taxRateBps);

  return {
    subtotalCents: subtotal,
    discountCents: safeDiscount,
    taxCents: tax,
    totalCents: taxable + tax,
    appliedCodes,
  };
}

/**
 * Price a cart with promo codes.
 *
 * KNOWN LIMITATION: only one promo code per order is supported today.
 * Support has asked for stacking. There is no specification for it yet.
 */
export function applyPromos(
  cart: Cart,
  promos: PromoCode[],
  now: Date = new Date(),
): Quote {
  const subtotal = subtotalCents(cart);

  if (promos.length === 0) {
    return buildQuote(subtotal, 0, cart.taxRateBps, []);
  }

  if (promos.length > 1) {
    throw new PromoError(
      'PROMO_NOT_STACKABLE',
      'Only one promo code per order is supported',
    );
  }

  const promo = promos[0]!;
  validate(promo, subtotal, now);

  return buildQuote(
    subtotal,
    discountFor(promo, subtotal),
    cart.taxRateBps,
    [promo.code],
  );
}
