import { defineConfig } from 'vitest/config';

// Module 4 capstone suite. Red until priceWithTiers() is implemented.
export default defineConfig({
  test: {
    include: ['capstone/**/*.test.ts'],
  },
});
