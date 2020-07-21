const puppeteer = require('puppeteer');

/**
 * page.$(선택자)
 * page.evaluate 내부에서는 document를 사용가능하다.
 */

const crawler = async () => {
  const browser = await puppeteer.launch({headless: process.env.NODE_ENV === 'production'});
  const [page, page2, page3] = await Promise.all([browser.newPage(), browser.newPage(), browser.newPage()]);

  await Promise.all([page.goto('https://naver.com'), page2.goto('https://google.com'), page3.goto('https://google.com')]);

  await Promise.all([page.waitFor(300), page2.waitFor(2000), page3.waitFor(1000)]);

  await page.close();
  await page2.close();
  await page3.close();
  await browser.close();
};

crawler();
