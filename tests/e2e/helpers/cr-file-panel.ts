import { expect, Locator, Page } from "@playwright/test";
import { crExpectUrl } from "./cr";

function expectField(where: Page | Locator, label: string): Locator {
  return where.locator(`[data-role='${label}']`);
}

async function expectFieldValue(
  where: Page | Locator,
  label: string,
  value?: string | number
): Promise<void> {
  const io = expectField(where, label);

  if (value) {
    await expect(io).toBeVisible();

    const ioc = io.locator(".content");
    await expect(ioc).toBeVisible();
    await expect((await ioc.textContent())?.trim() ?? "").toBe("" + value);
  } else {
    await expect(io).not.toBeVisible();
  }
}

async function setFieldValue(
  where: Page | Locator,
  label: string,
  value: string,
  type: "" | "textarea" | "select" = ""
): Promise<void> {
  const io = expectField(where, label);
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
}

async function goEdit(page: Page, fileBaseUrl: string) {
  await expect(page.getByText("Edit")).toBeVisible();
  await page.getByText("Edit").click();

  await crExpectUrl(page, new RegExp(`${fileBaseUrl}[0-9]+[/]edit`));
  await expect(page.getByText("Save")).toBeVisible();
}

async function doSave(page: Page, fileBaseUrl: string) {
  await expect(page.getByText("Save")).toBeVisible();
  await page.getByText("Save").click();

  await crExpectUrl(page, new RegExp(`${fileBaseUrl}[0-9]`));
  await expect(page.getByText("Edit")).toBeVisible();
}

async function doDelete(page: Page) {
  await page.getByText("Delete").click();
  const popup = page.getByTestId("popup");
  await expect(popup).toBeVisible();
  const popupActions = popup.getByRole("group");
  await expect(popupActions).toBeVisible();
  await expect(popupActions.getByText("Cancel")).toBeVisible();
  await expect(popupActions.getByText("Delete")).toBeVisible();
  await popupActions.getByText("Delete").click();
}

export async function crFile(
  page: Page,
  panelTestid: string,
  fileBaseUrl: string
) {
  const panel = await page.getByTestId(panelTestid);
  await expect(panel).toBeVisible();
  const form = await panel.locator("form");
  await expect(form).toBeVisible();

  return {
    panel,
    form,
    /**
     * If value is not defined, it is expected to be empty and invisible
     */
    expectFieldValue: (label, value?) => expectFieldValue(form, label, value),
    setFieldValue: (label, value, type?) =>
      setFieldValue(form, label, value, type),
    goEdit: () => goEdit(page, fileBaseUrl),
    doSave: () => doSave(page, fileBaseUrl),
    doDelete: () => doDelete(page)
  };
}
