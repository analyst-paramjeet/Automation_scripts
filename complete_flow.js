var webdriver = require("selenium-webdriver");

by = webdriver.By;

var driver = new webdriver.Builder().forBrowser("chrome").build();

driver.get("https://www.saucedemo.com/");

async function login(user, pass){
    await driver.findElement(by.name("user-name")).sendKeys(user);
    await driver.findElement(by.name("password")).sendKeys(pass);
    await driver.findElement(by.name("login-button")).click();
    try{
        await driver.findElement(by.className("shopping_cart_link"));
        console.log("Logged in Successfully with username:", user);
        await driver.findElement(by.name("add-to-cart-sauce-labs-backpack")).click();
        await driver.findElement(by.className("shopping_cart_link")).click();
        await driver.findElement(by.name("checkout")).click();
        await driver.findElement(by.name("firstName")).sendKeys("test_user");
        await driver.findElement(by.name("lastName")).sendKeys("test_user_lname");
        await driver.findElement(by.name("postalCode")).sendKeys("test_user_zip");
        await driver.findElement(by.name("continue")).click();
        await driver.findElement(by.name("finish")).click();
    }
    catch{
        console.log(user, " is invalid");
        await driver.get("https://www.saucedemo.com/");
    }
}

async function users(cred){
    await login(cred[0], cred[1]);
    console.log("Order Successfully");
    setTimeout(() => {driver.quit();}, 2000);
}


cred = ["standard_user", "secret_sauce"];
users(cred);
