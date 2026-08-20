const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OG_DIR = path.join(__dirname, '../public/og-images');
const LOGO_PATH = path.join(__dirname, '../public/brand/prezenti-horizontal-logo.png');

if (!fs.existsSync(OG_DIR)) {
  fs.mkdirSync(OG_DIR, { recursive: true });
}

// Read logo and convert to base64
const logoBase64 = fs.readFileSync(LOGO_PATH).toString('base64');
const logoSrc = `data:image/png;base64,${logoBase64}`;

const images = [
  {
    filename: 'og-homepage.jpg',
    headline: 'Professional Facility Management & Staffing Solutions',
    subheadline: 'Housekeeping • Receptionist • Office Boy • Pantry Staff'
  },
  {
    filename: 'og-about.jpg',
    headline: 'About Prezenti',
    subheadline: 'Building Reliable Workforce Solutions Across Maharashtra'
  },
  {
    filename: 'og-housekeeping.jpg',
    headline: 'Professional Housekeeping Services',
    subheadline: 'Trained Staff For Offices, IT Parks & Commercial Spaces'
  },
  {
    filename: 'og-receptionist.jpg',
    headline: 'Receptionist Staffing Services',
    subheadline: 'Professional Front Desk Management For Businesses'
  },
  {
    filename: 'og-facility-management.jpg',
    headline: 'Integrated Facility Management',
    subheadline: 'End-to-End Workforce & Facility Solutions'
  },
  {
    filename: 'og-office-boy.jpg',
    headline: 'Office Boy Services',
    subheadline: 'Reliable Administrative Support Staff'
  },
  {
    filename: 'og-pantry.jpg',
    headline: 'Pantry Staff Services',
    subheadline: 'Efficient Pantry & Hospitality Management'
  },
  {
    filename: 'og-blog.jpg',
    headline: 'Facility Management Insights',
    subheadline: 'Industry Trends, Staffing Strategies & Business Guides'
  }
];

function generateHtml(headline, subheadline) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
      <style>
        body {
          margin: 0;
          padding: 0;
          width: 1200px;
          height: 630px;
          background-color: #0A0F1C;
          background-image: 
            radial-gradient(circle at 100% 0%, rgba(37, 99, 235, 0.15) 0%, transparent 40%),
            linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.8) 100%),
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          color: white;
          box-sizing: border-box;
          position: relative;
        }

        .container {
          padding: 80px 100px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-sizing: border-box;
          z-index: 10;
        }

        .logo {
          height: 60px;
          margin-bottom: 60px;
          filter: brightness(0) invert(1);
        }

        .headline {
          font-size: 72px;
          font-weight: 800;
          line-height: 1.1;
          margin: 0 0 24px 0;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          max-width: 950px;
        }

        .subheadline {
          font-size: 32px;
          font-weight: 600;
          color: #94A3B8;
          margin: 0;
          line-height: 1.4;
          max-width: 850px;
        }

        .footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(15, 23, 42, 0.6);
        }

        .url {
          font-size: 28px;
          font-weight: 600;
          color: #60A5FA;
          letter-spacing: 1px;
        }

        .badge {
          background: rgba(37, 99, 235, 0.2);
          border: 1px solid rgba(59, 130, 246, 0.4);
          color: #93C5FD;
          padding: 12px 24px;
          border-radius: 100px;
          font-size: 20px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img src="${logoSrc}" class="logo" alt="Prezenti Logo">
        <h1 class="headline">${headline}</h1>
        <p class="subheadline">${subheadline}</p>
      </div>
      <div class="footer">
        <div class="url">prezenti.com</div>
        <div class="badge">Enterprise Solutions</div>
      </div>
    </body>
    </html>
  `;
}

async function main() {
  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 }); // 2x scale for sharpness, but we'll export standard size

  for (const img of images) {
    const html = generateHtml(img.headline, img.subheadline);
    await page.setContent(html, { waitUntil: 'load', timeout: 60000 });
    const outputPath = path.join(OG_DIR, img.filename);
    await page.screenshot({
      path: outputPath,
      type: 'jpeg',
      quality: 90
    });
    console.log(`Generated: ${img.filename}`);
  }

  await browser.close();
  console.log('All OG images generated successfully!');
}

main().catch(console.error);
