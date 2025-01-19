import { expect, Locator } from "@playwright/test";
import path from "node:path/posix";
import { isEmptyValue } from "../../../src/utils/objects";
import { outputDate } from "./e2e";

export type IOValue = string | number | boolean | undefined;
type IOValues = {
  [key: string]: IOValue | undefined;
};

export type IOType =
  | "string"
  | "checkbox"
  | "date"
  | "file"
  | "radio"
  | "readonly"
  | "select"
  | "textarea";

type FieldsTypes = {
  [key: string]: IOType | undefined;
};

function ioValue2String(val?: IOValue): string {
  switch (val) {
    case undefined:
    case false:
      return "";
    default:
      return val + "";
  }
}

export class E2EForm {
  private locatorFunction: () => Locator;
  private fieldsConfig: FieldsTypes;

  constructor(locatorFunction: () => Locator, fieldsConfig: FieldsTypes) {
    this.locatorFunction = locatorFunction;
    this.fieldsConfig = fieldsConfig;
  }

  get locator(): Locator {
    return this.locatorFunction();
  }

  //
  // Private
  //

  private getType(label: string): IOType {
    return this.fieldsConfig[label] ?? "string";
  }

  private async expectField(label: string): Promise<Locator> {
    await this.expectToBeVisible();
    return this.locator.locator(`[data-role='${label}']`);
  }

  //
  // Public
  //

  async expectToBeVisible(): Promise<this> {
    await expect(
      this.locator,
      "2e2-form.expectToBeVisible: global panel"
    ).toBeVisible();
    return this;
  }

  async expectScreenshot(): Promise<this> {
    await this.expectToBeVisible();
    await expect(this.locator.locator("form")).toHaveScreenshot();
    return this;
  }

  async expectOutputValue(label: string, value?: IOValue): Promise<this> {
    const io = await this.expectField(label);

    if (isEmptyValue(value)) {
      await expect(io).not.toBeVisible();
      return this;
    }

    // We have a value

    switch (this.getType(label)) {
      case "date":
        value = outputDate(value as string);
        break;
      case "checkbox":
        if (value) {
          value = "✔";
        }
        break;
      case "file":
        // No test to be made
        // TODO: test that an image is visible
        return this;
    }

    await expect(io).toBeVisible();

    let ioc = io.locator(".content");
    if ((await ioc.locator("div").all()).length > 0) {
      // In case of Date, we have multiple divs
      ioc = ioc.locator("div").first();
    }

    await expect(ioc).toBeVisible();
    await expect((await ioc.textContent())?.trim() ?? "").toBe(
      ioValue2String(value)
    );

    return this;
  }

  async expectAllOutputValues(allValues: IOValues): Promise<this> {
    for (const [key, val] of Object.entries(allValues)) {
      await this.expectOutputValue(key, val);
    }
    return this;
  }

  async expectInputValue(label: string, value?: IOValue): Promise<this> {
    const type = this.getType(label);
    const msg = `expectInputValue '${label}' = '${value}' (${type})`;
    switch (type) {
      case "string":
      case "date":
      case "select":
      case "textarea":
        await expect(this.locator.getByLabel(label), msg).toHaveValue(
          ioValue2String(ioValue2String(value))
        );
        break;
      case "checkbox":
        {
          const loc = (await this.expectField(label)).locator(
            "input[type=checkbox]"
          );

          if (value) {
            await expect(loc, msg + " => checked").toBeChecked();
          } else {
            await expect(loc, msg + " => unChecked").not.toBeChecked();
          }
        }
        break;
      case "radio":
        await expect(
          (await this.expectField(label)).getByLabel(ioValue2String(value), {
            exact: true
          }),
          msg
        ).toBeChecked();
        break;
      case "file":
      case "readonly":
        break;
    }
    return this;
  }

  async expectAllInputValues(allValues: IOValues): Promise<this> {
    for (const [key, val] of Object.entries(allValues)) {
      await this.expectInputValue(key, val);
    }
    return this;
  }

  async setInputValue(label: string, value?: IOValue): Promise<this> {
    const type = this.getType(label);

    if (type == "readonly") {
      // The io is not visible
      return this;
    }

    const io = await this.expectField(label);
    await expect(io).toBeVisible();

    const ioc = io.locator(".content");
    await expect(ioc).toBeVisible();

    switch (type) {
      case "date":
      case "string":
      case undefined:
        await expect(ioc.locator("input")).toBeVisible();
        await ioc.locator("input").fill(ioValue2String(value));
        break;
      case "checkbox":
        {
          const loc = (await this.expectField(label)).locator(
            "input[type=checkbox]"
          );
          if (value) {
            await loc.check();
          } else {
            await loc.uncheck();
          }
        }
        break;
      case "file":
        {
          // https://playwright.dev/docs/api/class-filechooser
          const fileChooserPromise = this.locator
            .page()
            .waitForEvent("filechooser");
          await io.locator("input").click();
          const fileChooser = await fileChooserPromise;
          await fileChooser.setFiles(
            path.join(import.meta.dirname, "..", "assets", value as string)
          );
        }
        break;
      case "radio":
        {
          const radio = await ioc.getByLabel(ioValue2String(value), {
            exact: true
          });
          await expect(radio).toBeVisible();
          await radio.check();
        }
        break;
      case "select":
        {
          const select = ioc.locator("select");
          await expect(select).toBeVisible();
          await expect(select).toContainText(ioValue2String(value));
          await select.selectOption({ label: ioValue2String(value) });
        }
        break;
      case "textarea":
        await expect(ioc.locator("textarea")).toBeVisible();
        await ioc.locator("textarea").fill(ioValue2String(value));
        break;
    }

    return this;
  }

  async setAllInputValues(allValues: IOValues): Promise<this> {
    for (const [key, val] of Object.entries(allValues)) {
      await this.setInputValue(key, val);
    }
    return this;
  }
}
