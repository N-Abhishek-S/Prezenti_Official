import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 54321;
const DIST_DIR = path.resolve(__dirname, '../dist');
const SHELL_PATH = path.join(DIST_DIR, 'index.shell.html');
const ORIGINAL_INDEX_PATH = path.join(DIST_DIR, 'index.html');
const isVercelBuild = Boolean(process.env.VERCEL);

const routes = [
  '/',
  '/services',
  '/housekeeping-services',
  '/security-services',
  '/receptionist-staffing-services',
  '/office-boy-services',
  '/pantry-staff-services',
  '/facility-management-services',
  '/property-management-services',
  '/privacy-policy',
  '/terms-and-conditions'
];

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

const browserLaunchArgs = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--disable-gpu'
];

function isChromiumDependencyError(error) {
  const message = `${error?.message ?? ''}\n${error?.stack ?? ''}`;

  return (
    message.includes('Failed to launch the browser process') ||
    message.includes('error while loading shared libraries') ||
    message.includes('cannot open shared object file') ||
    message.includes('libnspr4.so') ||
    message.includes('Code: 127')
  );
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
    browser = await puppeteer.launch({
      headless: true,
      args: browserLaunchArgs
    });

    const page = await browser.newPage();

    // Step 4: Crawl and save each route
    for (const route of routes) {
      const url = `http://127.0.0.1:${PORT}${route}`;
      console.log(`\nPrerendering route: ${route} (${url})`);
      
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000
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
      console.log(`  Validation status: title=${hasTitle}, description=${hasDescription}, schema=${hasLDJson}`);
    }

  } catch (error) {
    if (isVercelBuild && isChromiumDependencyError(error)) {
      console.warn('Prerendering skipped on Vercel: Chromium could not launch because required Linux shared libraries are unavailable in the build image.');
      console.warn('The Vite build output remains valid. Local prerendering is unchanged and will continue to generate static SEO HTML when Chromium is available.');
    } else {
      console.error('Prerendering failed:', error);
      process.exitCode = 1;
    }
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
    console.log('Prerendering process completed!');
  }
}

run();
