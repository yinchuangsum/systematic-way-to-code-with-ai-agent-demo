import { defineConfig } from 'vitest/config';

// The production suite. `npm test` must stay green at all times.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
});
