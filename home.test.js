let puppeteer = require('puppeteer');

let browser;
let page;
let urlBase = 'https://www.geru.com.br/emprestimos';


beforeAll(async () => {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
    page.setViewport({width: 1366, height: 768});
});

it('take an screenshot of homepage', async () => {
    await page.goto(urlBase);
    await page.screenshot({path: 'screenshots/home.png', fullPage: true});
}, 15000);

it('navigate to login from homepage', async ()=>{
    await page.goto(urlBase);
    await page.waitForSelector('#header-myaccount-button-personal');
    await page.click('#header-myaccount-button-personal');
    const email = await page.waitForSelector('input[name="email"]');
    const password = await page.waitForSelector('input[name="password"]');
    expect(email).toBeTruthy();
    expect(password).toBeTruthy();

}, 15000);

afterAll(async () => {
    browser.close();
});
