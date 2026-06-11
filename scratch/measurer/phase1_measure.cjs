const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = 'http://localhost:3000';

const viewports = [
  { name: '1366x768_100', width: 1366, height: 768, zoom: 1 },
  { name: '1366x768_125', width: 1366, height: 768, zoom: 1.25 },
  { name: '1536x864_100', width: 1536, height: 864, zoom: 1 },
  { name: '1920x1080_100', width: 1920, height: 1080, zoom: 1 }
];

async function runMeasurements() {
  console.log('Starting Phase 1 measurements...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const results = [];

  for (const vp of viewports) {
    const page = await browser.newPage();
    const cssWidth = Math.floor(vp.width / vp.zoom);
    const cssHeight = Math.floor(vp.height / vp.zoom);
    
    await page.setViewport({ width: cssWidth, height: cssHeight, deviceScaleFactor: vp.zoom });
    console.log(`Testing ${vp.name}...`);
    await page.goto(URL, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 1500)); // Layout settle

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

      const heroContainer = document.querySelector('#home > div.mx-auto.grid');
      const cRect = heroContainer ? heroContainer.getBoundingClientRect() : { width: 0, height: 0 };
      
      return {
        containerWidth: cRect.width,
        textBlockWidth: getRect('#home > div.mx-auto.grid > div:nth-child(1)').width,
        imgBlockWidth: getRect('#home > div.mx-auto.grid > div:nth-child(2)').width,
        h1Width: getRect('#ps-project-hero-title').width,
        h1Lines: getLines('#ps-project-hero-title')
      };
    });

    results.push({
      viewport: vp.name,
      cssDimensions: `${cssWidth}x${cssHeight}`,
      measurements: data
    });

    await page.close();
  }

  await browser.close();
  fs.writeFileSync('phase1_report.json', JSON.stringify(results, null, 2));
  console.log('Phase 1 measurements complete.');
}

runMeasurements().catch(console.error);
