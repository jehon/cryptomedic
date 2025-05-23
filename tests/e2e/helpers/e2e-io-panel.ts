import { expect, type Locator } from "@playwright/test";
import { E2EForm, type FieldsTypes } from "./e2e-form";

// ts-unused-exports:disable-next-line
export class E2EIOPanel extends E2EForm {
  constructor(locator: Locator, fieldsConfig: FieldsTypes) {
    super(() => locator, fieldsConfig);
  }

  protected getButton(text: string) {
    return this.locator
      .getByTestId("panel-actions")
      .getByRole("button", { name: text, exact: true });
  }

  private async assertModeInput() {
    await expect(
      this.locator.locator("[data-mode='input']"),
      "to be in InputMode"
    ).toBeVisible();
  }

  private async assertModeOutput() {
    await expect(
      this.locator.locator("[data-mode='output']"),
      "to be in OutputMode"
    ).toBeVisible();
  }

  async doOpen() {
    await this.expectToBeVisible();
    await this.locator.click(); // the panel is the closed item
    await this.assertModeOutput();
    await this.expectToBeVisible();
  }

  async doCreate() {
    await this.assertModeInput();
    // Save button is outside of the ButtonGroup
    await this.getButton("Save").click();
    // Id is refreshed, so impossible to assert output
  }

  async doEdit() {
    await this.assertModeOutput();
    await this.expectToBeVisible();
    await this.getButton("Edit").click();
    await this.assertModeInput();
    await this.expectToBeVisible();
  }

  async doSave() {
    await this.assertModeInput();
    // Save button is outside of the ButtonGroup
    await this.getButton("Save").click();
    await this.assertModeOutput();
  }

  async doDelete() {
    await this.assertModeInput();
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
