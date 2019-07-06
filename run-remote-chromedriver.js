let chrome = require('selenium-webdriver/chrome')
let webdriver = require('selenium-webdriver')

// run on the command line: .\node_modules\.bin\chromedriver.cmd --port=9998 --verbose --log-path=chromedriver.log

console.time("main");

let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .usingServer('http://localhost:9999')
    .build();

console.timeLog("main", "driver is created");

driver.get(`http://chromedriver.chromium.org/`).then(() =>
{
    console.timeLog("main", "page was loaded");
    driver.quit();
});