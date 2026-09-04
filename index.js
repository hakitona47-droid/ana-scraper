import puppeteer from "puppeteer";
import http from "http";

async function scrape() {
const browser = await puppeteer.launch({
  headless: "new",
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

  const page = await browser.newPage();
  await page.goto("https://www.ana.co.jp/ja/jp/international/", {
    waitUntil: "networkidle2"
  });

  const title = await page.title();
  await browser.close();
  return title;
}

http.createServer(async (req, res) => {
  const result = await scrape();
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(result);
}).listen(8078, "0.0.0.0");
