import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
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

const serviceSlugs = [
  'housekeeping-services',
  'security-services',
  'receptionist-staffing-services',
  'office-boy-services',
  'pantry-staff-services',
  'facility-management-services',
  'property-management-services'
];

const locationSlugs = [
  'pune',
  'mumbai',
  'navi-mumbai',
  'thane',
  'nagpur',
  'nashik',
  'aurangabad',
  'kolhapur',
  'maharashtra'
];

// Generate programmatic URLs: /service-location
const programmaticRoutes = serviceSlugs.flatMap(service => 
  locationSlugs.map(location => `/${service}-${location}`)
);

const baseRoutes = [
  '/about',
  '/blog',
  '/services',
  '/faqs',
  '/faq',
  '/talk-to-us',
  '/privacy-policy',
  '/terms-and-conditions',
  ...serviceSlugs.map(s => `/${s}`),
  ...locationSlugs.map(l => `/${l}`)
];

export default defineConfig({
  plugins: [
    vercelApiPlugin(),
    tailwindcss(),
    react(),
    Sitemap({
      hostname: 'https://www.prezenti.com',
      generateRobotsTxt: false,
      exclude: ['/404'],
      dynamicRoutes: [...baseRoutes, ...programmaticRoutes]
    })
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
