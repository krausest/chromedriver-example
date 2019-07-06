let chrome = require('selenium-webdriver/chrome')
let {By, until, Builder, Capabilities, WebDriver, Locator, promise, logging, WebElement, Condition} = require('selenium-webdriver')

console.time("main");
require('chromedriver');
console.timeLog("main", "chromedriver required");
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
    driver.quit();
});

/* 
Output on linux:
[stefan@blade chromedriver-slow-windows]$ node run.js
main: 1.472ms configuration has been prepared
main: 4.111ms driver is created
main: 2129.388ms page was loaded

Output on windows:
λ node run.js
main: 16.382ms chromedriver required
main: 21.798ms configuration has been prepared
main: 24.900ms driver is created

DevTools listening on ws://127.0.0.1:52773/devtools/browser/74c32d5d-6323-448f-b5a3-a214adc223f4
main: 10651.563ms page was loaded

It's 8 seconds slower an windows than on linux.
*/