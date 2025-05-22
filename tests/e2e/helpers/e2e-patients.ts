import { expect, type Locator, type Page } from "playwright/test";
import { CRUD } from "../../../src/utils/network";
import { escapeRegExp } from "../../../src/utils/strings";
import { crAcceptPopup, crExpectUrl, E2ECryptomedic } from "./e2e";
import crApi from "./e2e-api";
import {
  E2EFilePanel,
  type FieldsConfigTypeSimplified
} from "./e2e-file-panel";

// TODO: this is a E2EForm too?
export class E2EPatient {
  public id: string;
  readonly cryptomedic: E2ECryptomedic;

  constructor(cryptomedic: E2ECryptomedic, id?: string | number) {
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

  async expectToBeVisible() {
    await expect(this.panel).toBeVisible();
    await expect(this.cryptomedic.page.getByTestId("add")).toBeVisible();
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
  }): E2EFilePanel {
    return new E2EFilePanel(
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
    await crAcceptPopup(this.panel, "Delete");

    // Patient is deleted, we should go back to home
    await crExpectUrl(
      this.cryptomedic.page,
      new RegExp("^.*" + escapeRegExp("#/home"))
    );
  }
}
