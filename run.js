let chrome = require('selenium-webdriver/chrome')
let {By, until, Builder, Capabilities, WebDriver, Locator, promise, logging, WebElement, Condition} = require('selenium-webdriver')

console.time("main");

let args = [
    "--js-flags=--expose-gc",
    "--enable-precise-memory-info",
    "--no-first-run",
    "--enable-automation",
    "--disable-infobars",
    "--disable-background-networking",
    "--disable-background-timer-throttling",
    "--disable-cache",
    "--disable-translate",
    "--disable-sync",
    "--disable-extensions",
    "--disable-default-apps",
    "--window-size=1200,800"
];

let caps = new Capabilities({
    browserName: 'chrome',
    platform: 'ANY',
    version: 'stable',
    "goog:chromeOptions": {
        args: args,
        "perfLoggingPrefs": {
            "enableNetwork": true,
            "enablePage": true,
            "traceCategories": "devtools.timeline,blink.user_timing"
        }
    },
    "goog:loggingPrefs": {
        "browser": "ALL",
        "performance": "ALL"
    }
});

// port probing fails regularly on windows with hyper-v, the following driver construction avoids probing:
let service = new chrome.ServiceBuilder().setPort(9999).build();
console.timeLog("main", "configuration has been prepared");

var driver = chrome.Driver.createSession(caps, service);

console.timeLog("main", "driver is created");

driver.get(`http://chromedriver.chromium.org/`).then(() =>
{
    console.timeLog("main", "page was loaded");
});

/* 
Output on linux:
[stefan@blade chromedriver-slow-windows]$ node run.js
main: 1.472ms configuration has been prepared
main: 4.111ms driver is created
main: 2129.388ms page was loaded
*/