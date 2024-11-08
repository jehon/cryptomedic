import { expect, Locator, Page } from "playwright/test";
import { CRUD } from "../../../src/constants";
import { crApi, crInit, crReady } from "./e2e";
import { E2EFilePanel, FieldsConfigTypeSimplified } from "./e2e-file-panel";

// TODO: this is a E2EForm too?
export class E2EPatient {
  public id: string;

  constructor(
    public page: Page,
    id?: string | number
  ) {
    if (id === undefined) {
      this.id = this.detectPatientId();
    } else {
      this.id = "" + id;
    }
  }

  get panel(): Locator {
    return this.page.getByTestId(`folder-${this.id}`);
  }

  async expectToBeVisible() {
    await expect(this.panel).toBeVisible();
    await expect(this.page.getByTestId("add")).toBeVisible();
  }

  detectPatientId(): string {
    const url: string = this.page.url();
    const matches = /#\/folder\/(?<id>[0-9]+)\/.*$/.exec(url);
    return matches?.groups?.["id"] ?? "";
  }

  getFile(options: {
    fileType: string;
    fileId?: string | number;
    fieldsConfig?: FieldsConfigTypeSimplified;
  }): E2EFilePanel {
    return new E2EFilePanel(
      this,
      options.fileType,
      "" + options.fileId,
      options.fieldsConfig
    );
  }

  async go(): Promise<this> {
    await crInit(this.page, {
      page: `/patient/${this.id}/patient.${this.id}/`
    });
    const panel = await this.page.getByTestId(`folder-${this.id}`);
    await expect(panel).toBeVisible();
    return this;
  }

  static apiDelete(
    page: Page,
    entry_year: number,
    entry_order: number
  ): Promise<void> {
    return crApi(page, `/reference/${entry_year}/${entry_order}`)
      .then(
        (folder) =>
          folder?.id > 0
            ? crApi(page, `/fiche/patients/${folder.id}`, {
                method: CRUD.delete
              })
            : undefined,
        () => {
          // If the file is not found, it's ok
        }
      )
      .then(() => undefined);
  }

  async doAdd(options: {
    fileType: string;
    fieldsConfig: FieldsConfigTypeSimplified;
  }): Promise<E2EFilePanel> {
    await this.page.getByTestId("add").click();
    await this.page.getByTestId("add-" + options.fileType).click();

    await crReady(this.page);
    return this.getFile({
      fileType: options.fileType,
      fileId: "add",
      fieldsConfig: options.fieldsConfig
    });
  }
}
