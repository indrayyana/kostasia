import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    // You can add additional Vitest configuration options here
  },
  plugins: [tsconfigPaths()],
});
