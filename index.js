const { Builder, By, Key, promise } = require('selenium-webdriver');
const map = promise.map;


(async function myFunction() {
  try {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://demo.guru99.com/V4/index.php')
    await driver.findElement(By.name('uid')).sendKeys('mngr346258');
    await driver.findElement(By.name('password')).sendKeys('epubepe');
    await driver.findElement(By.name('btnLogin')).sendKeys('', Key.ENTER);
    await driver.findElement(By.xpath(".//*[@class='menusubnav']//li//a[contains(.,'New Customer')]")).sendKeys('', Key.ENTER);
    await driver.findElement(By.name('name')).sendKeys('Test Customer');
    await driver.findElement(By.name('dob')).sendKeys('01/01/1993');

    await driver.findElement(By.name('addr')).sendKeys('Cra 65a numero 23 11');
    await driver.findElement(By.name('city')).sendKeys('Medellin');
    await driver.findElement(By.name('state')).sendKeys('Antioquia');
    await driver.findElement(By.name('pinno')).sendKeys('051054');
    await driver.findElement(By.name('telephoneno')).sendKeys('3217458474');
    await driver.findElement(By.name('emailid')).sendKeys('camilo.jimenez@test.com');
    await driver.findElement(By.name('password')).sendKeys('12345');
    await driver.findElement(By.name('sub')).sendKeys('', Key.ENTER);

    const customerMessage = await driver.findElement(By.xpath(".//*[@id='regmsg']//tbody//tr//td//table//tbody//tr//td//p[contains(.,'Customer Registered')]")).getText();
    const customerId = await driver.findElement(By.css('#customer > tbody > tr:nth-child(4) > td:nth-child(2)')).getText();
    console.log(`Customer Id: ${customerId}`);

    if (customerMessage.includes('Customer Registered')) {
      console.log('El mensaje de creacion de usuario es correcto');
    } else {
      throw new Error('El mensaje de creacion no es correcto o el usuario no fue creado exitosamente')
    }
    console.log(customerMessage);

    await driver.findElement(By.xpath(".//*[@class='menusubnav']//li//a[contains(.,'New Account')]")).sendKeys('', Key.ENTER);
    await driver.findElement(By.name('cusid')).sendKeys(customerId);
    await driver.findElement(By.name('inideposit')).sendKeys('15000');
    await driver.findElement(By.name('button2')).sendKeys('', Key.ENTER);
    const acountMessage = await driver.findElement(By.xpath(".//*[@id='Accmsg']//tbody//tr//td//table//tbody//tr//td//p[contains(.,'Account Generated')]")).getText();
    const accountId = await driver.findElement(By.css('#account > tbody > tr:nth-child(4) > td:nth-child(2)')).getText();
    console.log(`Account Id: ${accountId}`);

    if (acountMessage.includes('Account Generated')) {
      console.log('El mensaje de creacion de cuenta es correcto');
    } else {
      throw new Error('El mensaje de creacion no es correcto o la cuenta no fue creado exitosamente')
    }
    console.log(acountMessage);

    await driver.findElement(By.xpath(".//*[@class='menusubnav']//li//a[contains(.,'Delete Account')]")).sendKeys('', Key.ENTER);
    await driver.findElement(By.name('accountno')).sendKeys(accountId);
    await driver.findElement(By.name('AccSubmit')).sendKeys('', Key.ENTER);
    await driver.switchTo().alert().accept();
    const accountDeletionMessage = await driver.switchTo().alert().getText();
    console.log(accountDeletionMessage);
    await driver.switchTo().alert().accept();

    if (accountDeletionMessage.includes('Account Deleted Sucessfully')) {
      console.log('El mensaje de eliminacion de cuenta es correcto');
    } else {
      throw new Error('El mensaje de eliminacion no es correcto o la cuenta no fue eliminada exitosamente')
    }

  } catch (error) {
    console.error(error);
  }
})();