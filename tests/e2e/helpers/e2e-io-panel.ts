import type { Locator } from "@playwright/test";
import { E2EForm, type FieldsTypes } from "./e2e-form";

export class E2EIOPanel extends E2EForm {
  constructor(locatorFunction: () => Locator, fieldsConfig: FieldsTypes) {
    super(locatorFunction, fieldsConfig);
  }

  // protected getButtonGroup() {
  //   const bt = this.locator.getByTestId(
  //     `panel-actions-${this.type}.${this.id}`
  //   );
  //   expect(bt).toBeVisible();
  //   return bt;
  // }
}
