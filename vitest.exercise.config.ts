import { defineConfig } from 'vitest/config';

// The exercise suite. `npm run test:exercise` is RED on purpose.
// The agent's job is to make it green without touching these files.
export default defineConfig({
  test: {
    include: ['exercise/**/*.test.ts'],
  },
});
