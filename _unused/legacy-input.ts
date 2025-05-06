import { expect, type Locator, type Page } from "@playwright/test";

export async function crLegacyInput(
  page: Page | Locator,
  selector: string,
  value: string | number
): Promise<void> {
  const el = page.locator(selector);
  const msg = "with '${selector}' = '${value}' (e2e.crLegacyInput)`";
  await expect(el, msg).toBeVisible();
  const input = el.locator("input");
  await expect(input, msg).toBeVisible();
  await input.fill("" + value);
  await expect(input, msg).toHaveValue("" + value);
}
