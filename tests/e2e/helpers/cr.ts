import { Page, expect } from "@playwright/test";

export const LOGINS = {
  PHYSIO: "murshed",
  RO: "readonly",
  ADMIN: "jehon"
};

export const PASSWORD = "p";

function crUrl(segment: string = ""): string {
  return `http://localhost:8085/built/frontend-ng/${segment}`;
}

function crUrlAPI(segment: string = ""): string {
  return `http://localhost:8085/api${segment}`;
}

export function crDebugHooks(page: Page) {
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
    login: string | null;
  } = { login: LOGINS.PHYSIO, page: "" }
) {
  if (opts.login) {
    await page.request
      .post(crUrlAPI("/auth/mylogin"), {
        data: {
          username: opts.login,
          password: PASSWORD
        }
      })
      .then((resp) => {
        if (resp.status() != 200) {
          throw new Error(
            "Server responded with invalid status: " + resp.status()
          );
        }
      });
  }

  await page.goto(crUrl(opts.page ?? ""));

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Cryptomedic/);

  // Body is loading
  await expect(page.getByTestId("top-level")).toBeVisible();

  // App is initialized
  await expect(page.getByTestId("initial-loader")).toHaveCount(0);

  if (opts.login) {
    await expect(page.locator("#current-user")).toContainText(opts.login);
  }

  return crReady(page);
}

export async function crReady(
  page: Page,
  options: { url?: string; forScreenshot?: boolean } = {}
) {
  if (options.url !== undefined) {
    await page.goto(crUrl(options.url));
  }

  // No global spinning wheel anymore
  await expect(page.getByTestId("global-wait")).toHaveCount(0);

  if (options.forScreenshot) {
    // No ToastR
    await expect(page.getByRole("alert")).toHaveCount(0);
  }
}
