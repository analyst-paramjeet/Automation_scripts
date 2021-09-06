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
        await driver.findElement(by.id("react-burger-menu-btn")).click();
        await driver.get("https://www.saucedemo.com/");
    }
    catch{
        console.log(user, " is invalid");
        await driver.get("https://www.saucedemo.com/");
    }
}

async function users(cred){
    for(let user_pass of cred){
        await login(user_pass[0], user_pass[1]);
    }
    await driver.quit();
}


var cred = [
    ["standard_user", "secret_sauce"],
    ["locked_out_user", "secret_sauce"],
    ["problem_user", "secret_sauce"],
    ["performance_glitch_user", "secret_sauce"]
];

users(cred);





