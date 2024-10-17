import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import svgo from 'vite-plugin-svgo';
import checker from 'vite-plugin-checker';
import path from 'path';

export default defineConfig(({ mode }) => ({
  // base: '/',
  server: {
    port: 3000,
    open: true, // Open the browser automatically when running dev
  },
  build: {
    outDir: 'build',
    sourcemap: mode === 'development',
    assetsInlineLimit: 8192, // Larger images will be emitted as files, smaller ones inlined
  },
  resolve: {
    alias: [
      {
        find: '~',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({ include: '**/*.svg' }), // For importing SVGs as React components
    svgo(), // For optimizing SVGs
    checker({
      eslint: {
        lintCommand: 'eslint "src/**/*.{ts,tsx}" --max-warnings=0', // Define which files to lint
      },
      typescript: true,
    }),
  ],
  optimizeDeps: {
    force: true,
    include: ['@mui/material/Tooltip'],
  },
}));
