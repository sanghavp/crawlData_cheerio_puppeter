const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
  const browser = await puppeteer.launch({headless: false, devtools: true})
  const page = await browser.newPage()
  // Open website
  await page.goto('https://www.tiktok.com/tag/onhiemmoitruong')
  //https://github.com/cheeriojs/cheerio

  // Scroll to end page
  let previousHeight;
  while (true) {
    try {
      previousHeight = await page.evaluate('document.body.scrollHeight')
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`)
    } catch (e) {
      console.log('Scroll End Page')
      break
    }
  }

  // full Content in website
  let content = await page.content();
  var $ = cheerio.load(content);
  // Div tag contains title
  var info = $(content).find("div.tiktok-1okfv2l-DivTagCardDesc-StyledDivTagCardDescV2")
  // Div tag contain other
  var other = $(content).find("div.tiktok-x6f6za-DivContainer-StyledDivContainerV2")

  let listTitle = [];
  info.each(function(i, e){
    let a = $(this)
    let title = a.text();
    let json = {title}
    listTitle.push(json);
  });
  console.log(listTitle)
  await browser.close();
})()