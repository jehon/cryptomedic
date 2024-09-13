import { expect, Locator, Page } from "@playwright/test";

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

export async function crFile(_page: Page, form: Locator) {
  await expect(form).toBeVisible();

  return {
    form,
    /**
     * If value is not defined, it is expected to be empty and invisible
     */
    expectFieldValue: (label, value?) => expectFieldValue(form, label, value),
    setFieldValue: (label, value, type?) =>
      setFieldValue(form, label, value, type)
    // goEdit: (page, form) => goEdit(page, form)
  };
}
