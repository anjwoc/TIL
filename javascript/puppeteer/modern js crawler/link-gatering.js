const fs = require('fs');
const pupperteer = require('puppeteer');

const crawler = async () => {
  const brower = await pupperteer.launch({headless: true});
  const page = await brower.newPage();
  await page.goto();
  await page.waitFor(3000);
  const links = await page.evaluate(() => {
    const nodes = document.querySelectorAll('.list-sub > .list-sub__item > div > a');
    return Array.from(nodes).map(n => {
      return {href: n.href};
    });
  });
  if (links) {
    await fs.writeFileSync('./data.json', JSON.stringify(links));
  }

  await page.close();
  await brower.close();
};

crawler();
