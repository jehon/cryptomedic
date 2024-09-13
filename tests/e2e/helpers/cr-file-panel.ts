import { expect, Locator, Page } from "@playwright/test";
import { crExpectUrl } from "./cr";

class CrFile {
  panel: Locator;
  form: Locator;

  constructor(
    protected page: Page,
    protected panelTestid: string,
    protected fileBaseUrl: string
  ) {}

  async init(): Promise<CrFile> {
    this.panel = await this.page.getByTestId(this.panelTestid);
    await expect(this.panel).toBeVisible();
    this.form = await this.panel.locator("form");
    await expect(this.form).toBeVisible();

    // await crExpectUrl(page, new RegExp(fileBaseUrl + ".*"));

    return this;
  }

  private expectField(label: string): Locator {
    return this.form.locator(`[data-role='${label}']`);
  }

  async expectFieldValue(label, value?): Promise<CrFile> {
    const io = this.expectField(label);

    if (value) {
      await expect(io).toBeVisible();

      const ioc = io.locator(".content");
      await expect(ioc).toBeVisible();
      await expect((await ioc.textContent())?.trim() ?? "").toBe("" + value);
    } else {
      await expect(io).not.toBeVisible();
    }

    return this;
  }

  async setFieldValue(
    label: string,
    value: string,
    type: "" | "textarea" | "select" = ""
  ): Promise<CrFile> {
    const io = this.expectField(label);
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
      default:
        throw new Error("Unknown type: " + type);
    }

    return this;
  }

  async doDelete(): Promise<CrFile> {
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

  async goEdit(): Promise<CrFile> {
    await expect(this.page.getByText("Edit")).toBeVisible();
    await this.page.getByText("Edit").click();

    await crExpectUrl(
      this.page,
      new RegExp(`${this.fileBaseUrl}[0-9]+[/]edit`)
    );
    await expect(this.page.getByText("Save")).toBeVisible();
    return this;
  }

  async doSave(): Promise<CrFile> {
    await expect(this.page.getByText("Save")).toBeVisible();
    await this.page.getByText("Save").click();

    await crExpectUrl(this.page, new RegExp(`${this.fileBaseUrl}[0-9]`));
    await expect(this.page.getByText("Edit")).toBeVisible();
    return this;
  }
}

export function crFile(
  page: Page,
  panelTestid: string,
  fileBaseUrl: string
): Promise<CrFile> {
  return new CrFile(page, panelTestid, fileBaseUrl).init();
}
