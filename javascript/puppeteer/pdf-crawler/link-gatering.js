const fs = require('fs');
const pupperteer = require('puppeteer');

const crawler = async () => {
  const brower = await pupperteer.launch({headless: true});
  const page = await brower.newPage();
  await page.goto('', {waitUntil: 'networkidle2'});

  const links = await page.evaluate(() => {
    const nodes = document.querySelectorAll('.list-sub > .list-sub__item > div > a');
    return Array.from(nodes).map(n => {
      return {href: n.href};
    });
  });
  for await (let url of links) {
    const linkPage = await brower.newPage();
    const name = url.href.split('/');
    await linkPage.goto(url.href, {waitUntil: ['load', 'networkidle2']});
    await linkPage.pdf({
      path: './pdf/' + name[name.length - 1] + '.pdf',
      format: 'A4',
    });
    await linkPage.close();
  }

  await page.close();
  await brower.close();
};

crawler();
