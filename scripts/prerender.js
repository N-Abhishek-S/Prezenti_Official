import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 54321;
const DIST_DIR = path.resolve(__dirname, '../dist');
const SHELL_PATH = path.join(DIST_DIR, 'index.shell.html');
const ORIGINAL_INDEX_PATH = path.join(DIST_DIR, 'index.html');
const isVercelBuild = Boolean(process.env.VERCEL);
const shouldUseVercelChromium = isVercelBuild && process.platform === 'linux';

const staticRoutes = [
  '/',
  '/services',
  '/talk-to-us',
  '/privacy-policy',
  '/terms-and-conditions'
];

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
  'pune', 'mumbai', 'navi-mumbai', 'thane', 'nagpur', 'nashik', 'aurangabad'
];

const industrySlugs = [
  'offices', 'hospitals', 'schools', 'warehouses', 'residential'
];

const routes = [...staticRoutes];

// Add pure service routes
serviceSlugs.forEach(s => routes.push(`/${s}`));

// Add pure location routes
locationSlugs.forEach(l => routes.push(`/${l}`));

// Add industry routes
industrySlugs.forEach(i => routes.push(`/industries/${i}`));

// Add Programmatic Service x Location routes
serviceSlugs.forEach(s => {
  locationSlugs.forEach(l => {
    routes.push(`/${s}-${l}`);
  });
});

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

const localBrowserLaunchArgs = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--disable-gpu'
];

async function getBrowserLaunchOptions() {
  if (!shouldUseVercelChromium) {
    return {
      headless: true,
      args: localBrowserLaunchArgs
    };
  }

  return {
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless
  };
}

// Create local static file server
const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(DIST_DIR, urlPath);

  // If path is a directory (or root), try serving index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Fallback routing: serve index.shell.html if the requested resource does not exist.
  // This ensures the crawl gets the clean client-side SPA shell for routing.
  if (!fs.existsSync(filePath)) {
    filePath = SHELL_PATH;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end(`Server Error: ${err.code}`);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

async function run() {
  if (!fs.existsSync(ORIGINAL_INDEX_PATH)) {
    console.error(`Error: Original index.html not found at ${ORIGINAL_INDEX_PATH}. Run build first.`);
    process.exit(1);
  }

  // Step 1: Backup original index.html as index.shell.html
  console.log('Backing up SPA shell index.html...');
  fs.copyFileSync(ORIGINAL_INDEX_PATH, SHELL_PATH);

  // Step 2: Start the HTTP server
  server.listen(PORT, '127.0.0.1', () => {
    console.log(`Temporary web server running at http://127.0.0.1:${PORT}`);
  });

  let browser;
  try {
    // Step 3: Launch Puppeteer
    console.log('Launching headless browser...');
    browser = await puppeteer.launch(await getBrowserLaunchOptions());

    // Attach detailed debug logging
    const logPage = async (p) => {
      p.on('console', msg => console.log('[Browser Console]', msg.text()));
      p.on('pageerror', err => console.error('[Page Error]', err));
      p.on('requestfailed', request => {
        console.error('[Request Failed]', request.url(), request.failure()?.errorText);
      });
    };

    // Helper to chunk the routes array
    const chunkArray = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
    
    // Process 5 routes concurrently to speed up the build without overloading memory
    const routeChunks = chunkArray(routes, 5);

    // Step 4: Crawl and save routes in batches
    for (const chunk of routeChunks) {
      await Promise.all(chunk.map(async (route) => {
        const page = await browser.newPage();
        await logPage(page);
        const url = `http://127.0.0.1:${PORT}${route}`;
        console.log(`\nPrerendering route: ${route} (${url})`);
        
        try {
          await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 90000 // Increased timeout to 90 seconds
          });

          // Wait a little extra to ensure react-helmet and schemas are injected
          await new Promise(resolve => setTimeout(resolve, 1000));

          const html = await page.content();

          // Determine output directory & file name
          let destFile;
          if (route === '/') {
            destFile = ORIGINAL_INDEX_PATH;
          } else {
            const destDir = path.join(DIST_DIR, route.substring(1));
            fs.mkdirSync(destDir, { recursive: true });
            destFile = path.join(destDir, 'index.html');
          }

          fs.writeFileSync(destFile, html, 'utf-8');
          console.log(`Successfully saved to: ${destFile}`);

          // Basic validation log
          const hasTitle = html.includes('<title>');
          const hasDescription = html.includes('name="description"');
          const hasLDJson = html.includes('type="application/ld+json"');
          console.log(`  Validation status [${route}]: title=${hasTitle}, description=${hasDescription}, schema=${hasLDJson}`);
        } catch (err) {
          console.error(`Failed to prerender ${route}:`, err);
        } finally {
          await page.close();
        }
      }));
    }

  } catch (error) {
    console.error('Prerendering failed:', error);
    process.exitCode = 1;
  } finally {
    // Step 5: Cleanup
    if (browser) {
      await browser.close();
    }
    server.close();

    if (fs.existsSync(SHELL_PATH)) {
      console.log('Removing temp SPA shell...');
      fs.unlinkSync(SHELL_PATH);
    }
    
    // Step 6: Generate sitemap.xml
    const BASE_URL = 'https://www.prezenti.com';
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
    
    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
    console.log('Successfully generated sitemap.xml at dist/sitemap.xml');
    
    console.log('Prerendering process completed!');
  }
}

run();
