import { roundHalfUp } from './money';

export interface LineItem {
  sku: string;
  unitPriceCents: number;
  quantity: number;
}

export interface Cart {
  items: LineItem[];
  /** Tax rate in basis points. 600 = 6%. */
  taxRateBps: number;
}

export function subtotalCents(cart: Cart): number {
  return cart.items.reduce(
    (sum, item) => sum + item.unitPriceCents * item.quantity,
    0,
  );
}

/** Tax is calculated once, on the taxable amount, and rounded once. */
export function taxCents(taxableCents: number, taxRateBps: number): number {
  return roundHalfUp((taxableCents * taxRateBps) / 10_000);
}
