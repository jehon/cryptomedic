import { expect, type Locator } from "playwright/test";
import { escapeRegExp } from "../../../src/utils/strings";
import { type E2ECryptomedicType } from "./e2e";
import { E2EFile, type FieldsConfigTypeSimplified } from "./e2e-file";
import { E2EForm } from "./e2e-form";

export class E2EPatient extends E2EForm {
  public id: string;
  readonly cryptomedic: E2ECryptomedicType;

  constructor(cryptomedic: E2ECryptomedicType, id?: string | number) {
    super(() => this.panel, {});
    this.cryptomedic = cryptomedic;
    if (id === undefined) {
      this.id = this.detectPatientId();
    } else {
      this.id = "" + id;
    }
  }

  get panel(): Locator {
    return this.cryptomedic.page.getByTestId(`folder-${this.id}`);
  }

  override async expectToBeVisible() {
    await super.expectToBeVisible();
    await expect(this.cryptomedic.page.getByTestId("add")).toBeVisible();
    return this;
  }

  detectPatientId(): string {
    const url: string = this.cryptomedic.page.url();
    const matches = /#\/patient\/(?<id>[0-9]+)(\/.*)?$/.exec(url);
    console.info("Guessing patient: ", matches?.groups?.["id"]);
    return matches?.groups?.["id"] ?? "";
  }

  getFile(options: {
    fileType: string;
    fileId?: string | number;
    fieldsConfig?: FieldsConfigTypeSimplified;
  }): E2EFile {
    return new E2EFile(
      this,
      options.fileType,
      "" + options.fileId,
      options.fieldsConfig
    );
  }

  async go(): Promise<this> {
    await this.cryptomedic.goTo(`/patient/${this.id}`);
    const panel = await this.cryptomedic.page.getByTestId(`folder-${this.id}`);
    await expect(panel).toBeVisible();
    return this;
  }

  static apiDelete(
    cryptomedic: E2ECryptomedicType,
    entry_year: number,
    entry_order: number
  ): Promise<void> {
    return cryptomedic
      .api(`/reference/${entry_year}/${entry_order}`)
      .then(
        (folder) =>
          folder?.id > 0
            ? cryptomedic.apiCrudDelete(`/fiche/patients/`, folder.id)
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
  }): Promise<E2EFile> {
    await this.cryptomedic.page.getByTestId("add").click();
    await this.cryptomedic.page.getByTestId("add-" + options.fileType).click();
    await this.cryptomedic.waitReady();

    return this.getFile({
      fileType: options.fileType,
      fileId: "add",
      fieldsConfig: options.fieldsConfig
    });
  }

  async doDelete() {
    await this.cryptomedic.page.getByText("Delete").click();
    await this.cryptomedic.acceptPopup("Delete");

    // Patient is deleted, we should go back to home
    await this.cryptomedic.waitForUrl(
      new RegExp("^.*" + escapeRegExp("#/home"))
    );
  }
}
