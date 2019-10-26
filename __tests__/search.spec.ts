import puppeteer from "puppeteer";

let page: any;
let browser: any;

describe("google search", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto("https://www.google.com", { waitUntil: "networkidle0" });
  });

  afterAll(() => {
    if (!page.isClosed()) {
      browser.close();
    }
  });

  test("should be on google search page", async () => {
    const title = await page.title();
    expect(title).toEqual("Google");
  });

  test("should search for Cheese!", async () => {
    const searchBox = ".gLFyf.gsfi";
    expect(!!(await page.$(searchBox))).toBe(true);
    await page.type(searchBox, "Cheese!", { delay: 100 });
    await page.keyboard.press("\n");
  });

  test('the page title should start with "Cheese!', async () => {
    await page.waitFor("#resultStats");
    const title = await page.title();
    const words = title.split(" ");
    expect(words[0]).toEqual("Cheese!");
  });
});
