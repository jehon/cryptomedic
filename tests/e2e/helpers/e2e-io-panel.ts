import { expect, type Locator } from "@playwright/test";
import { E2EForm, type FieldsTypes } from "./e2e-form";

// ts-unused-exports:disable-next-line
export class E2EIOPanel extends E2EForm {
  constructor(locator: Locator, fieldsConfig: FieldsTypes) {
    super(() => locator, fieldsConfig);
  }

  protected getButtonGroup() {
    const bt = this.locator.getByTestId("panel-actions");
    expect(bt).toBeVisible();
    return bt;
  }

  async doOpen(): Promise<this> {
    await this.expectToBeVisible();
    await this.locator.click(); // the panel is the closed item
    await this.expectToBeVisible();
    return this;
  }
}
