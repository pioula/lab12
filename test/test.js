import { promises as fsp } from "fs";
import { equal } from "assert";
import { Builder, Capabilities } from "selenium-webdriver";

import { fun, asyncfun } from "./example.js";

async function takeScreenshot(driver, file) {
  const image = await driver.takeScreenshot();
  await fsp.writeFile(file, image, "base64");
}

describe("Function", () => {
  it("should output string equal to 'test'", () => {
    equal(fun(), "test");
  });
});

describe("Async function", () => {
  it("should output string equal to 'atest'", async () => {
    const a = await asyncfun();
    console.log(a);
    equal(a, "atest");
  });
});

describe("Selenium test", () => {
  const TIMEOUT = 10000;
  const driver = new Builder().withCapabilities(Capabilities.firefox()).build();

  before(async () => {
    await driver
      .manage()
      .setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });
  });

  it("should go to google.com and check title", async () => {
    await driver.get("https://www.google.com");
    await takeScreenshot(driver, "test.png");
    const title = await driver.getTitle();
    equal(title, "Google");
  });

  after(() => driver.quit());
});
