import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    Sitemap({
      hostname: 'https://prezenti.com',
      dynamicRoutes: [
        '/',
        '/platform',
        '/services',
        '/industries',
        '/about',
        '/pricing',
        '/talk-to-us',
        '/compliance',
        '/case-studies',
        '/faq',
        '/contact',
        '/security',
        '/privacy-policy',
        '/terms-and-conditions',
        '/housekeeping-services',
        '/security-services',
        '/receptionist-staffing-services',
        '/office-boy-services',
        '/pantry-staff-services',
        '/facility-management-services',
        '/property-management-services'
      ]
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
