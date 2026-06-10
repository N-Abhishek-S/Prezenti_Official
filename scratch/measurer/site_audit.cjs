const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = 'http://localhost:5173';

const viewports = [
  { name: 'desktop_1366', width: 1366, height: 768 },
  { name: 'desktop_1536', width: 1536, height: 864 },
  { name: 'desktop_1920', width: 1920, height: 1080 },
  { name: 'mobile_320', width: 320, height: 568 },
  { name: 'mobile_360', width: 360, height: 800 },
  { name: 'mobile_375', width: 375, height: 667 },
  { name: 'mobile_390', width: 390, height: 844 },
  { name: 'mobile_414', width: 414, height: 896 },
  { name: 'tablet_768', width: 768, height: 1024 },
  { name: 'tablet_820', width: 820, height: 1180 }
];

const zooms = [1, 1.25, 1.5, 2];

async function runAudit() {
  console.log('Starting global site audit...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const results = [];

  for (const vp of viewports) {
    for (const zoom of zooms) {
      const page = await browser.newPage();
      
      // Calculate effective CSS viewport size for zoom
      const effectiveWidth = Math.floor(vp.width / zoom);
      const effectiveHeight = Math.floor(vp.height / zoom);
      
      await page.setViewport({ width: effectiveWidth, height: effectiveHeight, deviceScaleFactor: zoom });

      console.log(`Auditing ${vp.name} at ${zoom * 100}% zoom...`);

      // Inject Performance Observer for CLS before navigation
      await page.evaluateOnNewDocument(() => {
        window.clsValue = 0;
        try {
          new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              if (!entry.hadRecentInput) {
                window.clsValue += entry.value;
              }
            }
          }).observe({ type: 'layout-shift', buffered: true });
        } catch (e) {}

        window.fontStart = performance.now();
        document.fonts.ready.then(() => {
          window.fontEnd = performance.now();
        });
      });

      await page.goto(URL, { waitUntil: 'networkidle0' });

      // Wait a moment for rendering stabilization
      await new Promise(r => setTimeout(r, 500));

      const auditData = await page.evaluate(() => {
        const data = {
          sections: {},
          global: {},
          fonts: {}
        };

        // 1. Global Audit
        data.global.scrollWidth = document.documentElement.scrollWidth;
        data.global.innerWidth = window.innerWidth;
        data.global.horizontalScroll = document.documentElement.scrollWidth > window.innerWidth;

        // 2. Section Audit
        const sections = [
          { id: 'hero', selector: 'main > section:first-of-type' }, // approximation for hero
          { id: 'location', selector: '#location' },
          { id: 'impact', selector: 'section.bg-primary-900' }, // approximation for impact
          { id: 'comparison', selector: 'section:has(h2:contains("Support staff"))' },
          { id: 'serviceConfigurator', selector: 'div.max-w-\\[1260px\\]' },
          { id: 'contact', selector: 'section:has(h2:contains("Quick Answers"))' },
          { id: 'footer', selector: 'footer' }
        ];

        // We will just select by common tags since exact IDs might be missing.
        // Let's use simple section tags to approximate if exact selectors fail.
        const allSections = document.querySelectorAll('section, footer, main > div');
        
        allSections.forEach((sec, index) => {
          const rect = sec.getBoundingClientRect();
          if(rect.width === 0 || rect.height === 0) return;
          
          let name = sec.id || `section_${index}`;
          if (sec.tagName.toLowerCase() === 'footer') name = 'footer';
          
          const isOverflowing = sec.scrollWidth > sec.clientWidth;
          
          data.sections[name] = {
            width: rect.width,
            height: rect.height,
            overflow: isOverflowing,
            clipped: window.getComputedStyle(sec).overflow === 'hidden' && isOverflowing,
          };
        });

        // 3. Collision Audit
        // Check if any heading overlaps with any sibling or adjacent element
        const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
        let collisionFound = false;
        
        headings.forEach(h => {
          const hRect = h.getBoundingClientRect();
          // Check collision with siblings
          if(h.nextElementSibling) {
             const sRect = h.nextElementSibling.getBoundingClientRect();
             // Simple vertical overlap check assuming flow layout
             if (hRect.bottom > sRect.top && hRect.top < sRect.bottom && hRect.right > sRect.left && hRect.left < sRect.right) {
                // If they overlap physically, it's a collision
                collisionFound = true;
             }
          }
        });
        
        data.global.collisionDetected = collisionFound;

        // 4. Font Audit
        data.fonts.cls = window.clsValue || 0;
        data.fonts.loadTimeMs = window.fontEnd ? (window.fontEnd - window.fontStart) : 0;
        
        return data;
      });

      // Save a screenshot only if horizontal scrolling or collision is detected to save space
      const hasFailure = auditData.global.horizontalScroll || auditData.global.collisionDetected || Object.values(auditData.sections).some(s => s.overflow);
      if (hasFailure) {
        await page.screenshot({ path: `failure_${vp.name}_${zoom * 100}.png`, fullPage: true });
      }

      results.push({
        viewport: vp.name,
        zoom: `${zoom * 100}%`,
        effectiveDimensions: `${effectiveWidth}x${effectiveHeight}`,
        audit: auditData
      });

      await page.close();
    }
  }

  await browser.close();
  fs.writeFileSync('final_audit_report.json', JSON.stringify(results, null, 2));
  console.log('Audit complete. Saved to final_audit_report.json');
}

runAudit().catch(console.error);
