import { expect, type Locator } from "@playwright/test";
import { E2EForm, type FieldsTypes } from "./e2e-form";

export class E2EIOPanel extends E2EForm {
  constructor(locator: Locator, fieldsConfig: FieldsTypes) {
    super(() => locator, fieldsConfig);
  }

  protected getButton(text: string) {
    return this.locator
      .getByTestId("panel-actions")
      .getByRole("button", { name: text, exact: true });
  }

  private async waitMode(mode: "input" | "output") {
    await this.locator
      .locator(`[data-mode='${mode}']`)
      .first() // We can have sub-files
      .waitFor({ state: "visible", timeout: 5 * 1000 });
  }

  async doOpen() {
    await this.waitToBeVisible();
    await this.locator.click(); // the panel is the closed item
    await this.waitMode("output");
    await this.waitToBeVisible();
  }

  async doCreate() {
    await this.waitMode("input");
    // Save button is outside of the ButtonGroup
    await this.getButton("Create").click();
    // Id is refreshed, so impossible to assert output
    await this.locator.waitFor({ state: "detached" });
  }

  async doEdit() {
    await this.waitMode("output");
    await this.waitToBeVisible();
    await this.getButton("Edit").click();
    await this.waitMode("input");
    await this.waitToBeVisible();
  }

  async doSave() {
    await this.waitMode("input");
    // Save button is outside of the ButtonGroup
    await this.getButton("Save").click();
    await this.waitMode("output");
  }

  async doDelete() {
    await this.waitMode("input");
    await this.getButton("Delete").click();
    const popup = this.locator.getByTestId("popup");
    await expect(popup).toBeVisible();
    const popupActions = popup.getByRole("group");
    await expect(popupActions).toBeVisible();
    await expect(popupActions.getByText("Cancel")).toBeVisible();
    await expect(popupActions.getByText("Delete")).toBeVisible();
    await popupActions.getByText("Delete").click();
    await popupActions.getByText("Delete").waitFor({ state: "detached" });
  }
}
