const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = 'http://localhost:3001';

const viewports = [
  { name: '1366x768_100', width: 1366, height: 768, zoom: 1 },
  { name: '1440x900_100', width: 1440, height: 900, zoom: 1 },
  { name: '1536x864_100', width: 1536, height: 864, zoom: 1 },
  { name: '1600x900_100', width: 1600, height: 900, zoom: 1 },
  { name: '1728x1117_100', width: 1728, height: 1117, zoom: 1 },
  { name: '1920x1080_100', width: 1920, height: 1080, zoom: 1 }
];

async function runMeasurements() {
  console.log('Starting Phase 3 measurements...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const results = [];

  for (const vp of viewports) {
    const page = await browser.newPage();
    const cssWidth = Math.floor(vp.width / vp.zoom);
    const cssHeight = Math.floor(vp.height / vp.zoom);
    
    await page.setViewport({ width: cssWidth, height: cssHeight, deviceScaleFactor: vp.zoom });
    console.log(`Testing ${vp.name}...`);
    
    // Track CLS
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
    });

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

      // Containers
      const navContainer = getRect('nav > div.desktop-container');
      const heroContainer = getRect('#home > div.desktop-container');
      const impContainer = getRect('section.bg-primary-900 > div.desktop-container');
      const locContainer = getRect('#location > div.desktop-container');
      const faqContainer = getRect('#faq > div.desktop-container');
      const footContainer = getRect('footer > div.desktop-container');
      
      // Location Section
      const locH2 = document.querySelector('#location h2');
      const loc = {
        sectionWidth: locContainer.width,
        headingWidth: locH2 ? locH2.getBoundingClientRect().width : 0,
        headingLines: getLines('#location h2'),
        mapWidth: getRect('#location > div.desktop-container > div:nth-child(2) > div:nth-child(2)').width,
        cardWidth: getRect('#location > div.desktop-container > div:nth-child(2) > div:nth-child(2) > div.absolute').width
      };

      // Impact Section
      const imp = {
        sectionWidth: impContainer.width,
        statGridWidth: getRect('section.bg-primary-900 > div.desktop-container > dl').width,
        cardWidth: getRect('section.bg-primary-900 > div.desktop-container > dl > div:nth-child(1)').width
      };

      // Configurator
      const conf = {
        sectionWidth: getRect('#services > div.desktop-container').width,
        accordionWidth: getRect('#services > div.desktop-container div.flex-1').width,
        cardWidth: getRect('#services > div.desktop-container div.lg\\:grid-cols-\\[1fr_auto\\]').width,
        labelWidth: getRect('#services > div.desktop-container button span').width
      };

      // FAQ
      const faq = {
        sectionWidth: faqContainer.width,
        accordionWidth: getRect('#faq > div.desktop-container > div.mx-auto.max-w-3xl').width,
        textWidth: getRect('#faq > div.desktop-container > div.mx-auto.max-w-3xl button span').width
      };

      // Density Heights
      const density = {
        heroHeight: getRect('#home').height,
        heroMediaHeight: getRect('#home .aspect-9\\/16')?.height || getRect('#home video')?.height || 0,
        comparisonVideoHeight: getRect('.bg-canvas video')?.height || 0,
        configuratorHeight: getRect('#services').height,
        locationHeight: getRect('#location').height,
        faqHeight: getRect('#faq')?.height || getRect('.divide-y')?.height || 0
      };

      return {
        containers: {
          nav: navContainer.width,
          hero: heroContainer.width,
          imp: impContainer.width,
          loc: locContainer.width,
          faq: faqContainer.width,
          foot: footContainer.width
        },
        density,
        loc,
        imp,
        conf,
        faq,
        cls: window.clsValue,
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        overflow: document.documentElement.scrollWidth > window.innerWidth
      };
    });

    results.push({
      viewport: vp.name,
      cssDimensions: `${cssWidth}x${cssHeight}`,
      measurements: data
    });

    await page.screenshot({ path: `screenshot_${vp.name}.png`, fullPage: true });

    await page.close();
  }

  await browser.close();
  fs.writeFileSync('final_report.json', JSON.stringify(results, null, 2));
  console.log('Phase 3 measurements complete.');
}

runMeasurements().catch(console.error);
