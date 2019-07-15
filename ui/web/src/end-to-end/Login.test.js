import puppeteer from 'puppeteer';

const URL = 'http://localhost:5000';

let browser;
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    slowMo: 250
  });
});

afterAll(async () => {
  await browser.close();
});

let page;
beforeEach(async () => {
  page = await browser.newPage();

  page.emulate({
    viewport: {
      width: 500,
      height: 900
    },
    userAgent: ''
  });
});

afterEach(async () => {
  await page.close();
});

it('Can login successfully', async () => {
  await page.goto(`${URL}/signin`);

  await expect(page).toFillForm('form', { username: 'James', password: 'Doe' });
  await page.click('button[type=submit]');

  await page.waitForSelector('[data-testid="homepage"]');
});
