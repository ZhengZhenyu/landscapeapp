import puppeteer from "puppeteer";
import { renderFile } from "ejs";
import { shuffle } from "lodash";
import { writeFileSync, readFileSync, readdirSync } from "fs";
import path from "path";
import { projectPath } from "./settings";

async function main() {
  // TODO: try to use line below instead of listing directory
  // const svgs = projects.map(({ href }) => href)
  const svgs = readdirSync(path.resolve(projectPath, 'dist', 'logos'))
                  .filter((logo) => logo.includes('.svg'))
                  .map((logo) => `logos/${logo}`)

  const mainLogo = 'images/cncf-logo.svg'
  const browser = await puppeteer.launch({ defaultViewport: { width: 128, height: 128 } });
  const page = await browser.newPage();
  await page.setContent(`<html>${readFileSync(path.resolve(projectPath, mainLogo))}</html>`);
  const aspectRatio = await page.evaluate(() => {
    const { width, height } = document.querySelector('svg').getBoundingClientRect();
    return width / height;
  });
  await browser.close();

  const vSize = Math.ceil(Math.sqrt(svgs.length * aspectRatio));
  const hSize = Math.ceil(svgs.length / vSize);

  const output = await renderFile( path.join(__dirname, "mosaic.html.ejs"),
    { svgs: shuffle(svgs), hSize, vSize, aspectRatio, mainLogo });

  writeFileSync(path.resolve(projectPath, 'dist', "mosaic.html"), output);
}

main()
