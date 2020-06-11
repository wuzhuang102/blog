const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://baidu.com');
        await driver.findElement(By.name('wd')).sendKeys('吴壮', Key.RETURN);
        await driver.wait(until.titleIs('吴壮_百搜索'), 1000);
    } finally {
        await driver.quit();
    }
})();