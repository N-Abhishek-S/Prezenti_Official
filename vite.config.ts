/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import path from 'path'
import type { IncomingMessage, ServerResponse } from 'http'
import fs from 'fs'

const vercelApiPlugin = () => ({
  name: 'vercel-api-plugin',
  configResolved(config: any) {
    // Load all env variables including non-VITE_ prefixed for local backend APIs
    Object.assign(process.env, loadEnv(config.mode, process.cwd(), ''));
  },
  configureServer(server: any) {
    server.middlewares.use('/api', async (req: IncomingMessage & { body?: any }, res: ServerResponse & { status?: any, json?: any }, next: () => void) => {
      try {
        const urlObj = new URL(req.url || '', `http://${req.headers.host}`);
        const pathname = urlObj.pathname;
        
        const filePath = path.join(process.cwd(), 'api', pathname + '.ts');
        if (fs.existsSync(filePath)) {
          const mod = await server.ssrLoadModule(filePath);
          const handler = mod.default || mod;

          let body = '';
          req.on('data', chunk => { body += chunk.toString(); });
          req.on('end', async () => {
            if (body) {
              try { req.body = JSON.parse(body); } catch (e) { req.body = body; }
            } else {
              req.body = {};
            }

            res.status = (code: number) => { res.statusCode = code; return res; };
            res.json = (data: any) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };

            await handler(req, res);
          });
          return;
        }
      } catch (err) {
        console.error(err);
      }
      next();
    });
  }
});

// Sitemap generation lives entirely in scripts/prerender.js, driven by the
// single authoritative route manifest at src/seo/indexableRoutes.json — see
// COMMIT_3_INDEXABILITY_MATRIX.md. vite-plugin-sitemap previously duplicated
// that route list here (with its own inconsistent set, including an
// orphaned "maharashtra" entry matching no real page) and its output was
// always overwritten by the prerender step, so it added risk with no effect
// and has been removed.

export default defineConfig({
  plugins: [
    vercelApiPlugin(),
    tailwindcss(),
    react(),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'lucide': ['lucide-react']
        }
      }
    }
  },
  css: {
    postcss: {} // Explicitly empty to prevent resolving global postcss.config.js
  }
})
