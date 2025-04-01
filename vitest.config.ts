import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    pool: 'threads',
    dir: 'src/__tests__/api/integration',
    sequence: {
      concurrent: false,
    },
    fileParallelism: false,
    globals: true,
    reporters: ['verbose'],
    silent: true,
    // You can add additional Vitest configuration options here
  },
  plugins: [tsconfigPaths()],
});

