import { expect, type Locator } from "@playwright/test";
import { E2EForm, type FieldsTypes } from "./e2e-form";

// ts-unused-exports:disable-next-line
export class E2EIOPanel extends E2EForm {
  constructor(locatorFunction: () => Locator, fieldsConfig: FieldsTypes) {
    super(locatorFunction, fieldsConfig);
  }

  protected getButtonGroup() {
    const bt = this.locator.getByTestId("panel-actions");
    expect(bt).toBeVisible();
    return bt;
  }
}
