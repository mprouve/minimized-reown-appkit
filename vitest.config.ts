import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Optional, if you want to use Jest-like globals
    coverage: {
      enabled: true,
      reporter: ['text', 'html'],
    },
    watch: false, // Don't watch files by default
  },
});
