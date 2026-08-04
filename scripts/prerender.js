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

// Single authoritative source of truth for which routes are indexable
// (prerendered + sitemap-listed). See src/seo/indexableRoutes.json and
// COMMIT_3_INDEXABILITY_MATRIX.md for the full classification rationale.
const MANIFEST_PATH = path.resolve(__dirname, '../src/seo/indexableRoutes.json');
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
const BASE_URL = manifest.domain;

const routes = [...manifest.staticRoutes, manifest.blog.hub];

// Add pure service routes
manifest.serviceSlugs.forEach(s => routes.push(`/${s}`));

// Add location hub routes
manifest.locationSlugs.forEach(l => routes.push(`/locations/${l}`));

// Add industry routes
manifest.industrySlugs.forEach(i => routes.push(`/industries/${i}`));

// Add knowledge/pricing/trust/comparison pages
manifest.knowledgeSlugs.forEach(slug => routes.push(`/${slug}`));

// Automatically discover Blog post routes from src/content/blogs — the only
// family that is legitimately dynamic; every other route above comes from
// the static manifest so there is exactly one place to add/remove a route.
// A post is only included if its meta.ts status is one BlogHubPage.tsx
// itself treats as publishable ('Published' or 'Ready') — matching that
// component's own filter (`b.status === 'Published' || b.status === 'Ready'`)
// so a Draft/Review/Archived post folder can never become prerendered or
// sitemap-listed just because the folder exists. meta.ts is plain source
// TypeScript here (this script isn't part of the Vite/TS build graph), so
// the status is read via a targeted regex rather than a full TS import.
const PUBLISHABLE_STATUSES = ['Published', 'Ready'];
const blogsDir = path.resolve(__dirname, '..', manifest.blog.sourceDir);
if (fs.existsSync(blogsDir)) {
  const blogFolders = fs.readdirSync(blogsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  blogFolders.forEach(slug => {
    const metaPath = path.join(blogsDir, slug, 'meta.ts');
    if (!fs.existsSync(metaPath)) {
      console.warn(`[prerender] Skipping /blog/${slug}: no meta.ts found.`);
      return;
    }
    const metaSource = fs.readFileSync(metaPath, 'utf-8');
    const statusMatch = metaSource.match(/status:\s*['"]([^'"]+)['"]/);
    const status = statusMatch ? statusMatch[1] : null;
    if (status && PUBLISHABLE_STATUSES.includes(status)) {
      routes.push(`/blog/${slug}`);
    } else {
      console.warn(`[prerender] Excluding /blog/${slug} from prerender/sitemap: status is "${status ?? 'unknown'}", not Published/Ready.`);
    }
  });
}

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

    // index.shell.html is kept in dist/ (not deleted) — it's the clean,
    // unhydrated SPA shell with no page-specific Helmet content baked in.
    // vercel.json rewrites any request that doesn't match a real static
    // file to this shell, so routes that are intentionally not prerendered
    // (see COMMIT_3_INDEXABILITY_MATRIX.md — Category B/non-existent paths)
    // never inherit stale title/canonical/robots tags left over from a
    // *different* page's prerendered output the way serving the prerendered
    // homepage as a generic fallback would.

    // Step 6: Generate sitemap.xml — URLs only, sourced from the same
    // authoritative `routes` list used for prerendering. No changefreq or
    // priority values are emitted: there is no real update-frequency or
    // relative-priority data behind them, and Google largely ignores both,
    // so fabricating them would just be SEO decoration.
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${BASE_URL}${route}</loc>
  </url>`).join('\n')}
</urlset>`;
    
    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
    console.log('Successfully generated sitemap.xml at dist/sitemap.xml');
    
    console.log('Prerendering process completed!');
  }
}

run();
