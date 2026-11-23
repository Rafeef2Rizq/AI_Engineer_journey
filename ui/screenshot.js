// Usage: node screenshot.js <round-name>
// Saves full-page screenshots at 1440px (desktop) and 390px (mobile) into screenshots/.
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const name = process.argv[2] || 'round-1';
  const outDir = path.join(__dirname, 'screenshots');
  fs.mkdirSync(outDir, { recursive: true });
  const url = 'file://' + path.join(__dirname, 'index.html');

  const localChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const browser = await puppeteer.launch(
    fs.existsSync(localChrome) ? { executablePath: localChrome, headless: true } : {}
  );
  const page = await browser.newPage();
  for (const [label, width] of [['desktop', 1440], ['mobile', 390]]) {
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(outDir, `${name}-${label}.png`), fullPage: true });
    console.log(`saved screenshots/${name}-${label}.png`);
  }
  await browser.close();
})();
