import { expect, Locator, Page } from "playwright/test";
import { CRUD } from "../../../src/constants";
import { crApi, crInit } from "../helpers/cr";
import { E2EFilePanel } from "../helpers/e2e-file-panel";

export { outputDate } from "../helpers/cr";

export class E2EPatient {
  private isInit = false;
  public id: string;

  constructor(
    public page: Page,
    id: string | number
  ) {
    this.id = "" + id;
  }

  get panel(): Locator {
    return this.page.getByTestId(`folder-${this.id}`);
  }

  async expectToBeVisible() {
    await expect(this.panel).toBeVisible();
    await expect(this.page.getByTestId("add")).toBeVisible();
  }

  getFile(type: string, fileId?: string | number): E2EFilePanel {
    return new E2EFilePanel(this, type, "" + fileId);
  }

  async go(): Promise<this> {
    await crInit(this.page, {
      page: `/folder/${this.id}/summary/`
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

  async doAdd(type: string): Promise<E2EFilePanel> {
    await this.page.getByTestId("add").click();
    await this.page.getByTestId("add-" + type).click();

    return this.getFile(type, "add");
  }
}
