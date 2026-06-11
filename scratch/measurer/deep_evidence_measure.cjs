const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const URL = 'http://localhost:3000';

const viewports = [
  { name: '1366x768_100', width: 1366, height: 768, zoom: 1 },
  { name: '1366x768_125', width: 1366, height: 768, zoom: 1.25 },
  { name: '1440x900_100', width: 1440, height: 900, zoom: 1 },
  { name: '1536x864_100', width: 1536, height: 864, zoom: 1 },
  { name: '1600x900_100', width: 1600, height: 900, zoom: 1 },
  { name: '1920x1080_100', width: 1920, height: 1080, zoom: 1 },
  { name: '1920x1080_125', width: 1920, height: 1080, zoom: 1.25 }
];

const browsersToTest = [
  { name: 'chrome', executablePath: undefined },
  { name: 'edge', executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' }
];

async function runDeepMeasurements() {
  console.log('Starting deep evidence gathering...');
  const results = [];

  for (const browserConfig of browsersToTest) {
    if (browserConfig.name === 'edge' && !fs.existsSync(browserConfig.executablePath)) {
      console.log('Edge not found, skipping Edge tests.');
      continue;
    }

    const browser = await puppeteer.launch({ 
      headless: 'new',
      executablePath: browserConfig.executablePath
    });

    for (const vp of viewports) {
      const page = await browser.newPage();
      const cssWidth = Math.floor(vp.width / vp.zoom);
      const cssHeight = Math.floor(vp.height / vp.zoom);
      
      await page.setViewport({ width: cssWidth, height: cssHeight, deviceScaleFactor: vp.zoom });
      
      console.log(`Testing ${browserConfig.name} - ${vp.name}...`);
      
      // Inject Performance Observer for CLS & Fonts
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

      await page.goto(URL, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 1500)); // Layout settle
      
      // Force font loading fallback check
      const fontData = await page.evaluate(async () => {
        const h1 = document.querySelector('h1');
        const originalFont = window.getComputedStyle(h1).fontFamily;
        const widthWithFont = h1.getBoundingClientRect().width;
        
        // Force fallback
        h1.style.fontFamily = 'monospace';
        const widthWithFallback = h1.getBoundingClientRect().width;
        
        // Restore
        h1.style.fontFamily = '';
        
        return {
          originalFont,
          widthWithFont,
          widthWithFallback,
          diff: Math.abs(widthWithFont - widthWithFallback),
          cls: window.clsValue,
          fontLoadTimeMs: window.fontEnd ? (window.fontEnd - window.fontStart) : 0
        };
      });

      const data = await page.evaluate(() => {
        const getRect = (sel) => {
          const el = document.querySelector(sel);
          return el ? el.getBoundingClientRect() : { width: 0, height: 0, top: 0, left: 0 };
        };
        const getLines = (sel) => {
          const el = document.querySelector(sel);
          if (!el) return 0;
          const style = window.getComputedStyle(el);
          const lh = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;
          return Math.round(el.getBoundingClientRect().height / lh);
        };
        const isClipped = (sel) => {
          const el = document.querySelector(sel);
          if (!el) return false;
          return el.scrollWidth > el.clientWidth;
        };

        // Hero
        const heroContainer = document.querySelector('#home > div.mx-auto.grid');
        const cRect = heroContainer ? heroContainer.getBoundingClientRect() : { width: 0, height: 0 };
        const textBlock = heroContainer ? heroContainer.children[0] : null;
        const imgBlock = heroContainer ? heroContainer.children[1] : null;
        const h1Lines = getLines('#ps-project-hero-title');
        
        const hero = {
          containerWidth: cRect.width,
          containerHeight: cRect.height,
          textBlockWidth: textBlock ? textBlock.getBoundingClientRect().width : 0,
          badgeWidth: getRect('#home > div.mx-auto.grid > div:nth-child(1) > div:nth-child(1)').width,
          descriptionWidth: getRect('#home p.text-\\[17px\\]').width,
          ctaGroupWidth: getRect('#home div.flex.flex-col.sm\\:flex-row').width,
          h1Width: getRect('#ps-project-hero-title').width,
          h1Height: getRect('#ps-project-hero-title').height,
          h1Lines: h1Lines,
          h1Wraps: h1Lines > 1,
          h1Clips: isClipped('#ps-project-hero-title'),
          imgBlockWidth: imgBlock ? imgBlock.getBoundingClientRect().width : 0,
          imgBlockHeight: imgBlock ? imgBlock.getBoundingClientRect().height : 0,
          floatingCardWidth: getRect('#home > div.mx-auto.grid > div:nth-child(2) > div.absolute.bottom-0').width,
          floatingCardPos: getRect('#home > div.mx-auto.grid > div:nth-child(2) > div.absolute.bottom-0').top
        };

        // Location
        const locH2 = document.querySelector('#location h2');
        const loc = {
          sectionWidth: getRect('#location > div.mx-auto').width,
          headingWidth: locH2 ? locH2.getBoundingClientRect().width : 0,
          headingHeight: locH2 ? locH2.getBoundingClientRect().height : 0,
          headingLines: getLines('#location h2'),
          mapWidth: getRect('#location > div.mx-auto > div:nth-child(2) > div:nth-child(2)').width,
          mapHeight: getRect('#location > div.mx-auto > div:nth-child(2) > div:nth-child(2)').height,
          coverageCardWidth: getRect('#location > div.mx-auto > div:nth-child(2) > div:nth-child(2) > div.absolute').width
        };

        // Impact
        const imp = {
          sectionWidth: getRect('section.bg-primary-900 > div.mx-auto').width,
          statsGridWidth: getRect('section.bg-primary-900 > div.mx-auto > dl').width,
          cardWidths: Array.from(document.querySelectorAll('section.bg-primary-900 > div.mx-auto > dl > div')).map(el => el.getBoundingClientRect().width)
        };

        // Configurator
        const conf = {
          accordionWidth: getRect('div.max-w-\\[1260px\\] > div.flex > div.flex-1').width,
          labelWidth: getRect('div.max-w-\\[1260px\\] button span').width,
          labelLines: getLines('div.max-w-\\[1260px\\] button span')
        };

        return {
          hero, loc, imp, conf
        };
      });

      // Take screenshot
      const filename = `deep_${browserConfig.name}_${vp.name}.png`;
      await page.screenshot({ path: filename });

      results.push({
        browser: browserConfig.name,
        viewport: vp.name,
        cssDimensions: `${cssWidth}x${cssHeight}`,
        screenshot: filename,
        fonts: fontData,
        dom: data
      });

      await page.close();
    }
    await browser.close();
  }

  fs.writeFileSync('deep_evidence_report.json', JSON.stringify(results, null, 2));
  console.log('Deep evidence gathering complete.');
}

runDeepMeasurements().catch(console.error);
