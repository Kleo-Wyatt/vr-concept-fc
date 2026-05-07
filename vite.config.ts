import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.resolve(projectRoot, 'src');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(srcPath, 'app'),
      '@pages': path.resolve(srcPath, 'pages'),
      '@widgets': path.resolve(srcPath, 'widgets'),
      '@features': path.resolve(srcPath, 'features'),
      '@entities': path.resolve(srcPath, 'entities'),
      '@shared': path.resolve(srcPath, 'shared'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});