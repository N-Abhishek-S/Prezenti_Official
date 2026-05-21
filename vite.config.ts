import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, '');
  const basePath = env.VITE_BASE_PATH || '/Prezenti_Official/';

  return {
    base: basePath,
    plugins: [react(), tailwindcss()],
    cacheDir: '.tmp/vite-cache',

    resolve: {
      alias: {
        '@': path.resolve(rootDir, './src'),
      },
    },

    server: {
      host: '127.0.0.1',
      port: 5173,
      strictPort: false,
      open: false,
    },

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
    },
  };
});
