import os from "os";
import path from "path";
import { expect } from "chai";
import { spawn, spawnSync } from "child_process";
import { Builder, By, Capabilities,until } from "selenium-webdriver";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Helper function to convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// create the path to the expected application binary
const application = path.resolve(
  __dirname,
  'target',
  'release',
  'calibrationapp'
)
let driver
let tauriDriver

before(async function () {
  this.timeout(120000)
  spawnSync('cargo', ['build', '--release'])

  //tauri-driver
  tauriDriver = spawn(
    path.resolve(os.homedir(), '.cargo', 'bin', 'tauri-driver'),
    [],
    { stdio: [null, process.stdout, process.stderr] }
  )
  // start the webdriver client
  driver = await new Builder().forBrowser('MicrosoftEdge')
    .withCapabilities(Capabilities.edge())
    .usingServer('http://127.0.0.1:4444/')
    .build()
  await driver.get('http://localhost:1420/')
})
after(async function () {
  await driver.quit()
  tauriDriver.kill()
})

describe('Test App', () => {
  it('should locate app name',async ()=>{
    let title = await driver.getTitle()
    expect(title,"Callibration App")
  })
  it('should start at home page',async ()=>{
    await driver.findElement(By.id('main_page_id'))
  })
  describe('Test Navigation',()=>{
    beforeEach('should locate app navigation burger',async ()=>{
      //test if the nav bar is findable, than 
      let burger = await driver.findElement(By.id('app_nav_burger'))
      let innerBurger = await burger.findElement(By.css("*"))
      let openValue = await innerBurger.getAttribute("data-opened")    
      if(!openValue) {await burger.click()}
      await driver.manage().setTimeouts({ implicit: 2000 })
    })
    it('should navigate to settings page',async ()=>{
      let navlink = await driver.findElement(By.id("settings_page_navlink"))
      await navlink.click()
      let page = await driver.findElement(By.id("settings_page_id"))
      await driver.wait(until.elementIsVisible(page), 1000)
    })
    it('should navigate to testing page',async ()=>{
      let navlink = await driver.findElement(By.id("test_page_navlink"))
      await navlink.click()
      let page = await driver.findElement(By.id("test_page_id"))
      await driver.wait(until.elementIsVisible(page), 1000)
    })
    it('should navigate to report page',async ()=>{
      let navlink = await driver.findElement(By.id("report_page_navlink"))
      await navlink.click()
      let page = await driver.findElement(By.id("reports_page_id"))
      await driver.wait(until.elementIsVisible(page), 1000)
    })
    it('should navigate to home page',async ()=>{
      let navlink = await driver.findElement(By.id("main_page_navlink"))
      await navlink.click()
      let page = await driver.findElement(By.id("main_page_id"))
      await driver.wait(until.elementIsVisible(page), 1000)
  
    })
  })
})