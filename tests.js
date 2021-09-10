const { webdriver, Builder, By, Key, until } = require("selenium-webdriver");
const test = require("selenium-webdriver/testing");
const assert = require("assert");

const { user, password } = require("./config.json").credentials;

let driver;
let customerId;
let accountId;
let accountDeletionMessage;

describe("Pruebas de automatizacion - Ejercicio 2", function () {
  before(async function () {
    driver = new Builder().forBrowser("chrome").build();
    await driver.get("http://demo.guru99.com/V4/index.php");
    await driver.findElement(By.name("uid")).sendKeys(user);
    await driver.findElement(By.name("password")).sendKeys(password);
    await driver.findElement(By.name("btnLogin")).sendKeys("", Key.ENTER);
  });

  it("Validar que el usuario con el que ingresó es igual al suministrado", async function () {
    const element = await (
      await driver.findElement(By.css("tr.heading3 > td")).getText()
    ).replace("Manger Id : ", "");
    assert.equal(element, user);
  });

  it("Caso de prueba 1: Crear un customer.", async function () {
    await driver
      .findElement(By.css("ul.menusubnav > li:nth-child(2) > a"))
      .click();
    await driver.findElement(By.name("name")).sendKeys("Test Customer");
    await driver.findElement(By.name("dob")).sendKeys("01/01/1993");

    await driver.findElement(By.name("addr")).sendKeys("Cra 65a numero 23 11");
    await driver.findElement(By.name("city")).sendKeys("Medellin");
    await driver.findElement(By.name("state")).sendKeys("Antioquia");
    await driver.findElement(By.name("pinno")).sendKeys("051054");
    await driver.findElement(By.name("telephoneno")).sendKeys("3217458474");
    await driver
      .findElement(By.name("emailid"))
      .sendKeys("email-customer-test5@test.com");
    await driver.findElement(By.name("password")).sendKeys("12345");
    await driver.findElement(By.name("sub")).sendKeys("", Key.ENTER);
    driver.switchTo().alert().accept();

    driver.wait(function () {
      return driver.isElementPresent(webdriver.By.css("#customer"));
    }, 5000);

    customerId = await driver
      .findElement(
        By.css("#customer > tbody > tr:nth-child(4) > td:nth-child(2)")
      )
      .getText();
    console.log(`customerId: ${customerId}`);

    driver.wait(function () {
      return driver.isElementPresent(
        webdriver.By.css("#customer > tbody > tr:nth-child(1) > td > p")
      );
    }, 5000);

    const message = await driver
      .findElement(By.css("#customer > tbody > tr:nth-child(1) > td > p"))
      .getText();

    assert.equal(message, "Customer Registered Successfully!!!");
  });
  it("Caso de prueba 2: crear un Account", async function () {
    await driver
      .findElement(
        By.xpath(".//*[@class='menusubnav']//li//a[contains(.,'New Account')]")
      )
      .sendKeys("", Key.ENTER);
    await driver.findElement(By.name("cusid")).sendKeys(customerId);
    await driver.findElement(By.name("inideposit")).sendKeys("15000");
    await driver.findElement(By.name("button2")).sendKeys("", Key.ENTER);
    const acountMessage = await driver
      .findElement(
        By.xpath(
          ".//*[@id='Accmsg']//tbody//tr//td//table//tbody//tr//td//p[contains(.,'Account Generated')]"
        )
      )
      .getText();
    accountId = await driver
      .findElement(
        By.css("#account > tbody > tr:nth-child(4) > td:nth-child(2)")
      )
      .getText();
    console.log(`Account Id: ${accountId}`);

    assert.equal(acountMessage.includes("Account Generated"), true);
  });

  it("Caso de prueba 3: Eliminar la cuenta y verificar que sea eliminada.", async function () {
    await driver
      .findElement(
        By.xpath(
          ".//*[@class='menusubnav']//li//a[contains(.,'Delete Account')]"
        )
      )
      .sendKeys("", Key.ENTER);
    await driver.findElement(By.name("accountno")).sendKeys(accountId);
    await driver.findElement(By.name("AccSubmit")).sendKeys("", Key.ENTER);
    await driver.switchTo().alert().accept();
    accountDeletionMessage = await driver.switchTo().alert().getText();
    console.log(accountDeletionMessage);
    await driver.switchTo().alert().accept();

    assert.equal(
      accountDeletionMessage.includes("Account Deleted Sucessfully"),
      true
    );
  });

  after(() => driver.quit());
});
