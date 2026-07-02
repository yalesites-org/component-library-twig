import { defineConfig } from 'vitest/config';

// Unit/behavioral test runner for the component library (epic #1351, Wave 0).
// Percy covers visual regression; Vitest covers behavior Percy is blind to
// (keyboard operation, focus, ARIA state changes on interaction).
export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['components/**/*.test.js'],
    globals: true,
  },
});
