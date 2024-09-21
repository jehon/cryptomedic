import { expect, Locator, Page } from "@playwright/test";
import { CRUD } from "../../../src/constants";
import { escapeRegExp } from "../../../src/utils/strings";
import { E2EPatient } from "../patients/e2e-patients";
import { crApi, crExpectUrl, crUrl } from "./cr";

type IOTypes = "" | "radio" | "select" | "textarea";

export class E2EFilePanel {
  protected fileBaseUrl = "";
  protected page: Page;
  protected patient_id: string;
  protected id: string;

  constructor(
    protected e2ePatient: E2EPatient,
    protected type: string,
    id: string | number
  ) {
    this.page = e2ePatient.page;
    this.patient_id = "" + this.e2ePatient.id;
    this.id = "" + id;
    this.fileBaseUrl = `/folder/${this.patient_id}/summary/${type}.`;
  }

  get panel(): Locator {
    // We take the data-role=panel to avoid the fullscreen overlay
    return this.page.getByTestId(this.uuid).locator(">[data-role=panel]");
  }

  get form(): Locator {
    return this.panel.locator("form");
  }

  get uuid(): string {
    return `${this.type}.${this.id}`;
  }

  /* ***********************************
   *
   * API
   *
   */

  apiFileUpdate(id: string | number, data: Record<string, string | number>) {
    return crApi(this.page, `/fiche/${this.type}/${id}`, {
      method: CRUD.update,
      data
    });
  }

  /* ***********************************
   *
   * Generic
   *
   */

  // fragment: /appointment.102
  async expectUrlFragmentForType(fragment: string) {
    await crExpectUrl(
      this.page,
      new RegExp(
        "^.*" +
          escapeRegExp(`#/folder/${this.patient_id}/summary`) +
          fragment +
          "$"
      )
    );
  }

  async waitVisible(): Promise<this> {
    await expect(this.panel).toBeVisible();
    await expect(this.form).toBeVisible();
    return this;
  }

  /* ***********************************
   *
   * Routes
   *
   */

  async go(): Promise<this> {
    await this.e2ePatient.go();
    return this.doOpen();
  }

  async doDelete(): Promise<this> {
    await this.waitVisible();

    await this.page.getByText("Delete").click();
    const popup = this.page.getByTestId("popup");
    await expect(popup).toBeVisible();
    const popupActions = popup.getByRole("group");
    await expect(popupActions).toBeVisible();
    await expect(popupActions.getByText("Cancel")).toBeVisible();
    await expect(popupActions.getByText("Delete")).toBeVisible();
    await popupActions.getByText("Delete").click();

    return this;
  }

  async doOpen(): Promise<this> {
    await expect(this.panel).toBeVisible();
    await this.panel.click(); // the panel is the closed item

    // TODO: when URL will be self-updated on load, this should be fixed
    this.page.goto(crUrl(`${this.fileBaseUrl}${this.id}`));
    if (this.id) {
      await this.expectUrlFragmentForType(`\\/${this.type}\\.${this.id}`);
    } else {
      await this.expectUrlFragmentForType(`\\/${this.type}\\.[0-9]+`);
    }
    return this.waitVisible();
  }

  async doSave(interceptAddedId: boolean = false): Promise<this> {
    await this.waitVisible();

    await expect(this.page.getByText("Save")).toBeVisible();
    await this.page.getByText("Save").click();

    if (interceptAddedId) {
      await crExpectUrl(
        this.page,
        new RegExp(`^.*#${escapeRegExp(this.fileBaseUrl)}[0-9]+$`)
      );
      const url = await this.page.url();
      const matches = /\.(?<id>[0-9]+)$/.exec(url);
      this.id = matches?.groups?.id ?? "";
    }

    await crExpectUrl(
      this.page,
      new RegExp(`^.*#${escapeRegExp(this.fileBaseUrl)}${this.id}$`)
    );
    await expect(this.page.getByText("Edit")).toBeVisible();

    return this.waitVisible();
  }

  async goEdit(): Promise<this> {
    await this.waitVisible();

    await expect(this.page.getByText("Edit")).toBeVisible();
    await this.page.getByText("Edit").click();

    await crExpectUrl(
      this.page,
      new RegExp(`^.*${this.fileBaseUrl}[0-9]+[/]edit$`)
    );
    await expect(this.page.getByText("Save")).toBeVisible();

    return this.waitVisible();
  }

  /* ***********************************
   *
   * Forms
   *
   */

  private async expectField(label: string): Promise<Locator> {
    await this.waitVisible();
    return this.form.locator(`[data-role='${label}']`);
  }

  async expectOutputValue(label, value?): Promise<this> {
    const io = await this.expectField(label);

    if (value) {
      await expect(io).toBeVisible();

      let ioc = io.locator(".content");
      if ((await ioc.locator("div").all()).length > 0) {
        // In case of Date, we have multiple divs
        ioc = ioc.locator("div").first();
      }

      await expect(ioc).toBeVisible();
      await expect((await ioc.textContent())?.trim() ?? "").toBe("" + value);
    } else {
      await expect(io).not.toBeVisible();
    }

    return this;
  }

  async expectInputValue(label, value = "", type: IOTypes): Promise<this> {
    switch (type) {
      case "":
      case "select":
      case "textarea":
        await expect(this.panel.getByLabel(label)).toHaveValue(value);
        break;
      case "radio":
        await expect(
          (await this.expectField(label)).getByLabel(value, { exact: true })
        ).toBeChecked();
        break;
    }
    return this;
  }

  async setFieldValue(
    label: string,
    value: string,
    type: IOTypes = ""
  ): Promise<this> {
    const io = await this.expectField(label);
    await expect(io).toBeVisible();

    const ioc = io.locator(".content");
    await expect(ioc).toBeVisible();

    switch (type) {
      case "":
        await expect(ioc.locator("input")).toBeVisible();
        await ioc.locator("input").fill("" + value);
        break;
      case "textarea":
        await expect(ioc.locator("textarea")).toBeVisible();
        await ioc.locator("textarea").fill("" + value);
        break;
      case "select":
        await expect(ioc.locator("select")).toBeVisible();
        await ioc.locator("select").selectOption({ label: "" + value });
        break;
      case "radio":
        {
          const radio = await ioc.getByLabel(value, { exact: true });
          await expect(radio).toBeVisible();
          await radio.check();
        }
        break;
      default:
        throw new Error("Unknown type: " + type);
    }

    return this;
  }
}
