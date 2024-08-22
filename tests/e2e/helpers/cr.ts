import { Locator, Page, expect } from "@playwright/test";
import { CRUD, CRUDType } from "../../../src/app-patient/loaders";
export { outputDate } from "../../../src/utils/date";

export const LOGINS = {
  PHYSIO: "murshed",
  RO: "readonly",
  ADMIN: "jehon"
};

export const PASSWORD = "p";

function crUrl(segment: string = ""): string {
  return `http://localhost:8085/built/frontend/ng1x.html#${segment}`;
}

function crUrlAPI(segment: string = ""): string {
  return `http://localhost:8085/api${segment}`;
}

export function crApi(
  page: Page,
  url: string,
  options: {
    method?: CRUDType;
    data?: any;
  } = {}
): Promise<any> {
  return page.request[(options.method ?? CRUD.read).toLowerCase()](
    crUrlAPI(url),
    {
      data: options.data ?? {}
    }
  ).then((resp) => {
    if (resp.status() != 200) {
      throw new Error("Server responded with invalid status: " + resp.status());
    }
    return resp.json();
  });
}

export function crDebugHooks(page: Page): void {
  // Listen for all console logs
  // page.on("console", (msg) =>
  //   console.info("Error from browser: ", { type: msg.type(), text: msg.text() })
  // );

  page.on("console", async (msg) => {
    const msgArgs = msg.args();
    const logValues = await Promise.all(
      msgArgs.map(async (arg) => await arg.jsonValue())
    );
    console.warn(
      "Error from browser: ",
      JSON.stringify(
        { type: msg.type(), text: msg.text(), logs: logValues },
        null,
        2
      )
    );
  });

  page.on("pageerror", (err) =>
    console.warn("Uncatched error from browser: ", err)
  );
}

export async function crInit(
  page: Page,
  opts: {
    page?: string;
    login?: string;
  } = {}
): Promise<void> {
  if (opts.login) {
    await crApi(page, "/auth/mylogin", {
      method: CRUD.submit,
      data: {
        username: opts.login,
        password: PASSWORD
      }
    });
  } else {
    await page.request.post(crUrlAPI("/auth/logout"));
  }

  await page.goto(crUrl(opts.page ?? ""));

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Cryptomedic/);

  // Body is loading
  await expect(page.getByTestId("top-level")).toBeVisible();

  // // App is initialized
  // await expect(page.getByTestId("initial-loader")).toHaveCount(0);

  if (opts.login) {
    await expect(page.locator("#user")).toContainText(opts.login);
  }

  return crReady(page);
}

export async function crReady(
  page: Page
  // options: { forScreenshot?: boolean } = {}
): Promise<void> {
  // No global spinning wheel anymore
  await expect(page.getByTestId("global-wait")).toHaveCount(0);

  // if (options.forScreenshot) {
  //   // No ToastR
  //   await expect(page.getByRole("alert")).toHaveCount(0);
  // }
}

export function expectField(where: Page | Locator, label: string): Locator {
  return where.locator(`[data-role='${label}']`);
}

export async function expectFieldValue(
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

export async function setFieldValue(
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

export async function crLegacyInput(
  page: Page | Locator,
  selector: string,
  value: string | number
): Promise<void> {
  const el = page.locator(selector);
  await expect(el).toBeVisible();
  const input = el.locator("input");
  await expect(input).toBeVisible();
  await input.fill("" + value);
  await expect(input).toHaveValue("" + value);
}
