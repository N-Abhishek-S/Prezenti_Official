const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = 'http://localhost:3000';

const viewports = [
  { name: '1366x768_100', width: 1366, height: 768, zoom: 1 },
  { name: '1366x768_125', width: 1366, height: 768, zoom: 1.25 },
  { name: '1440x900_100', width: 1440, height: 900, zoom: 1 },
  { name: '1536x864_100', width: 1536, height: 864, zoom: 1 },
  { name: '1920x1080_100', width: 1920, height: 1080, zoom: 1 },
];

async function runMeasurements() {
  console.log('Starting evidence gathering...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const results = [];

  for (const vp of viewports) {
    const page = await browser.newPage();
    
    const cssWidth = Math.floor(vp.width / vp.zoom);
    const cssHeight = Math.floor(vp.height / vp.zoom);
    
    await page.setViewport({ width: cssWidth, height: cssHeight, deviceScaleFactor: vp.zoom });
    
    console.log(`Testing ${vp.name}...`);
    await page.goto(URL, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 800)); // Layout settle

    const data = await page.evaluate(() => {
      // 1. Hero container
      // HeroSection uses `max-w-7xl` class on the inner grid wrapper
      const heroContainer = document.querySelector('#home > div.mx-auto.grid');
      const cRect = heroContainer ? heroContainer.getBoundingClientRect() : { width: 0, height: 0 };
      
      // 2. Hero text block (first child of grid)
      const textBlock = heroContainer ? heroContainer.children[0] : null;
      const tRect = textBlock ? textBlock.getBoundingClientRect() : { width: 0 };
      
      // 3. Hero image block (second child of grid)
      const imgBlock = heroContainer ? heroContainer.children[1] : null;
      const iRect = imgBlock ? imgBlock.getBoundingClientRect() : { width: 0 };
      
      // 4. H1 rendered width
      const h1 = document.querySelector('#ps-project-hero-title');
      const h1Rect = h1 ? h1.getBoundingClientRect() : { width: 0 };
      
      // 5. Wrap status (check line height vs total height)
      let h1Wraps = false;
      if (h1) {
        // H1 contains two spans inside HeroContent. Let's get their individual heights or just line-count
        const firstSpan = h1.children[0];
        const secondSpan = h1.children[1];
        if (firstSpan && secondSpan) {
           h1Wraps = firstSpan.getBoundingClientRect().bottom <= secondSpan.getBoundingClientRect().top;
        }
      }
      
      // 6. Clipping status
      let h1Clips = false;
      if (h1 && textBlock) {
         if (h1Rect.width > tRect.width) h1Clips = true;
      }
      
      // 7. Horizontal overflow
      const docOverflow = document.documentElement.scrollWidth > window.innerWidth;
      
      return {
        containerWidth: cRect.width,
        textBlockWidth: tRect.width,
        imgBlockWidth: iRect.width,
        h1Width: h1Rect.width,
        h1Wraps: h1Wraps,
        h1Clips: h1Clips,
        horizontalOverflow: docOverflow,
        innerWidth: window.innerWidth
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
  fs.writeFileSync('evidence_report.json', JSON.stringify(results, null, 2));
  console.log('Evidence gathering complete.');
}

runMeasurements().catch(console.error);
