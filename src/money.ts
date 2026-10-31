/**
 * All money in this codebase is integer cents.
 * Never use floats for money, never round per line item, never round twice.
 */

/** Round half-up to the nearest cent. 2.5 -> 3, -2.5 -> -2. */
export function roundHalfUp(value: number): number {
  return Math.floor(value + 0.5);
}

export function formatCents(cents: number): string {
  const sign = cents < 0 ? '-' : '';
  const abs = Math.abs(cents);
  return `${sign}RM${Math.floor(abs / 100)}.${String(abs % 100).padStart(2, '0')}`;
}
