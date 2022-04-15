const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
  const browser = await puppeteer.launch({headless: false, devtools: true})
  const page = await browser.newPage()
  await page.goto('https://www.tiktok.com/tag/onhiemmoitruong')
  //https://github.com/cheeriojs/cheerio

  
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
  // console.log(info.length);
  let content = await page.content();
  var $ = cheerio.load(content);
  var info = $(content).find("div.tiktok-1okfv2l-DivTagCardDesc-StyledDivTagCardDescV2")
  // console.log("info",info);
  let listTitle = [];
  info.each(function(i, e){
    let a = $(this)
    // console.log(i + 1);
    // const desc = e["attribs"]["title"];
    let title = a.text();
    let json = {title}
    listTitle.push(json)
  });
  console.log(listTitle)
  await browser.close();
})()