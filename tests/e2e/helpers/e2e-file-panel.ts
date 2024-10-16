import test, { expect, Locator, Page } from "@playwright/test";
import { CRUD } from "../../../src/constants";
import { escapeRegExp } from "../../../src/utils/strings";
import { E2EPatient } from "../patients/e2e-patients";
import { crApi, crApiLogin, crExpectUrl, crUrl } from "./e2e";

type IOTypes =
  | "string"
  | "checkbox"
  | "date"
  | "radio"
  | "readonly"
  | "select"
  | "textarea";
export type FieldsConfigType = {
  [key: string]: IOTypes;
};

export const IOV = {
  R_Checked: "yes",
  R_NotChecked: ""
};

export const TimedFieldsConfigType: FieldsConfigType = {
  Date: "date",
  Examiner: "radio",
  Center: "select"
};

export const ConsultFieldsConfigType: FieldsConfigType = {
  ...TimedFieldsConfigType,
  "Weight sd": "readonly",
  "Height sd": "readonly",
  "Weight/Height ratio": "readonly",
  "Weight/Height sd": "readonly",
  BMI: "readonly",
  "BMI sd": "readonly",

  Comments: "textarea",
  "Suggested for Surgery": "checkbox",
  "Treatment Evaluation": "radio",
  "Treatment Finished": "checkbox"
};

export const consultBasicData = {
  Date: "2007-01-10",
  Examiner: "Ershad",
  Center: "Ukhia",
  "Weight (kg)": "29",
  "Weight sd": "0.0",
  "Height (cm)": "134",
  "Height sd": "0.0",
  "Weight/Height ratio": "0.2",
  "Weight/Height sd": "'value' is out-of-bounds: 134 [80 -> 120]",
  BMI: "24",
  "BMI sd": "-0.0",

  "Others Comments/Treatments": "please do something",
  "Suggested for Surgery": false,
  "Treatment Evaluation": "Good Result",
  "Treatment Finished": true
};

export class E2EFilePanel {
  protected fileBaseUrl = "";
  protected page: Page;
  protected patient_id: string;
  protected id: string;

  constructor(
    protected e2ePatient: E2EPatient,
    protected type: string,
    id: string | number
  ) {
    this.page = e2ePatient.page;
    this.patient_id = "" + this.e2ePatient.id;
    this.id = "" + id;
    this.fileBaseUrl = `/folder/${this.patient_id}/summary/${type}.`;
  }

  get panel(): Locator {
    // We take the data-role=panel to avoid the fullscreen overlay
    return this.page.getByTestId(this.uuid).locator(">[data-role=panel]");
  }

  get form(): Locator {
    return this.panel.locator("form");
  }

  get uuid(): string {
    return `${this.type}.${this.id}`;
  }

  /* ***********************************
   *
   * API
   *
   */

  apiFileUpdate(id: string | number, data: Record<string, string | number>) {
    return crApi(this.page, `/fiche/${this.type}/${id}`, {
      method: CRUD.update,
      data
    });
  }

  /* ***********************************
   *
   * Generic
   *
   */

  // fragment: /appointment.102
  async expectUrlFragmentForType(fragment: string) {
    await crExpectUrl(
      this.page,
      new RegExp(
        "^.*" +
          escapeRegExp(`#/folder/${this.patient_id}/summary`) +
          fragment +
          "$"
      )
    );
  }

  async expectToBeVisible(): Promise<this> {
    await expect(this.panel).toBeVisible();
    await expect(this.form).toBeVisible();
    return this;
  }

  /* ***********************************
   *
   * Routes
   *
   */

  async go(): Promise<this> {
    await this.e2ePatient.go();
    await this.doOpen();
    await expect(this.panel).toHaveScreenshot();
    return this;
  }

  async doDelete(): Promise<this> {
    await this.expectToBeVisible();

    await this.page.getByText("Delete").click();
    const popup = this.page.getByTestId("popup");
    await expect(popup).toBeVisible();
    const popupActions = popup.getByRole("group");
    await expect(popupActions).toBeVisible();
    await expect(popupActions.getByText("Cancel")).toBeVisible();
    await expect(popupActions.getByText("Delete")).toBeVisible();
    await popupActions.getByText("Delete").click();
    await crExpectUrl(
      this.page,
      new RegExp(".*" + escapeRegExp(`#/folder/${this.patient_id}/summary`))
    );
    await this.e2ePatient.expectToBeVisible();
    return this;
  }

  async doOpen(): Promise<this> {
    await expect(this.panel).toBeVisible();
    await this.panel.click(); // the panel is the closed item

    // TODO: when URL will be self-updated on load, this should be fixed
    this.page.goto(crUrl(`${this.fileBaseUrl}${this.id}`));
    if (this.id) {
      await this.expectUrlFragmentForType(`\\/${this.type}\\.${this.id}`);
    } else {
      await this.expectUrlFragmentForType(`\\/${this.type}\\.[0-9]+`);
    }
    await this.e2ePatient.expectToBeVisible();
    await this.expectToBeVisible();
    await expect(this.form).toHaveScreenshot();

    return this;
  }

  async doSave(interceptAddedId: boolean = false): Promise<this> {
    await this.expectToBeVisible();
    await expect(this.form).toHaveScreenshot();

    await expect(this.page.getByText("Save")).toBeVisible();
    await this.page.getByText("Save").click();

    if (interceptAddedId) {
      await crExpectUrl(
        this.page,
        new RegExp(`^.*#${escapeRegExp(this.fileBaseUrl)}[0-9]+$`)
      );
      const url = await this.page.url();
      const matches = /\.(?<id>[0-9]+)$/.exec(url);
      this.id = matches?.groups?.["id"] ?? "";
    }

    await crExpectUrl(
      this.page,
      new RegExp(`^.*#${escapeRegExp(this.fileBaseUrl)}${this.id}$`)
    );
    await this.e2ePatient.expectToBeVisible();
    await this.expectToBeVisible();
    await expect(this.page.getByText("Edit")).toBeVisible();
    await expect(this.form).toHaveScreenshot();

    return this;
  }

  async goEdit(): Promise<this> {
    await this.expectToBeVisible();

    await expect(this.page.getByText("Edit")).toBeVisible();
    await this.page.getByText("Edit").click();

    await crExpectUrl(
      this.page,
      new RegExp(`^.*${this.fileBaseUrl}[0-9]+[/]edit$`)
    );
    await expect(this.page.getByText("Save")).toBeVisible();
    await this.expectToBeVisible();
    await expect(this.form).toHaveScreenshot();

    return this;
  }

  /* ***********************************
   *
   * Forms
   *
   */

  private async expectField(label: string): Promise<Locator> {
    await this.expectToBeVisible();
    return this.form.locator(`[data-role='${label}']`);
  }

  async expectOutputValue(
    label: string,
    value?: string | number | boolean
  ): Promise<this> {
    const io = await this.expectField(label);

    if (value) {
      await expect(io).toBeVisible();

      let ioc = io.locator(".content");
      if ((await ioc.locator("div").all()).length > 0) {
        // In case of Date, we have multiple divs
        ioc = ioc.locator("div").first();
      }

      await expect(ioc).toBeVisible();
      if (value === true) {
        await expect((await ioc.textContent())?.trim() ?? "").toBe("✔");
      } else {
        await expect((await ioc.textContent())?.trim() ?? "").toBe("" + value);
      }
    } else {
      await expect(io).not.toBeVisible();
    }

    return this;
  }

  async expectInputValue(
    label: string,
    value = "",
    type?: IOTypes
  ): Promise<this> {
    switch (type) {
      case undefined:
      case "string":
      case "date":
      case "select":
      case "textarea":
        await expect(this.panel.getByLabel(label)).toHaveValue(value);
        break;
      case "checkbox":
        {
          const loc = (await this.expectField(label)).locator(
            "input[type=checkbox]"
          );

          if (value == "1") {
            await expect(loc).toBeChecked();
          } else {
            await expect(loc).not.toBeChecked();
          }
        }
        break;
      case "radio":
        await expect(
          (await this.expectField(label)).getByLabel(value, { exact: true })
        ).toBeChecked();
        break;
      case "readonly":
        break;
    }
    return this;
  }

  async setFieldValue(
    label: string,
    value: string = "",
    type?: IOTypes
  ): Promise<this> {
    if (type == "readonly") {
      // The io is not visible
      return this;
    }

    const io = await this.expectField(label);
    await expect(io).toBeVisible();

    const ioc = io.locator(".content");
    await expect(ioc).toBeVisible();

    switch (type) {
      case "date":
      case "string":
      case undefined:
        await expect(ioc.locator("input")).toBeVisible();
        await ioc.locator("input").fill("" + value);
        break;
      case "checkbox":
        {
          const loc = (await this.expectField(label)).locator(
            "input[type=checkbox]"
          );
          if (value) {
            await loc.check();
          } else {
            await loc.uncheck();
          }
        }
        break;
      case "radio":
        {
          const radio = await ioc.getByLabel(value, { exact: true });
          await expect(radio).toBeVisible();
          await radio.check();
        }
        break;
      case "select":
        {
          const select = ioc.locator("select");
          await expect(select).toBeVisible();
          await expect(select).toContainText(value);
          await select.selectOption({ label: "" + value });
        }
        break;
      case "textarea":
        await expect(ioc.locator("textarea")).toBeVisible();
        await ioc.locator("textarea").fill("" + value);
        break;
      default:
        throw new Error("Unknown type: " + type);
    }

    return this;
  }
}

export async function fullTestRead(options: {
  patientEntryOrder: string;
  patientId: string | number;
  fileType: string;
  fileId: string | number;
  data: Record<string, string | number | boolean | undefined>;
}) {
  await test(`${options.patientEntryOrder}.${options.fileType}.${options.fileId}`, async ({
    page
  }) => {
    await crApiLogin(page);
    const e2eFile = await new E2EPatient(page, options.patientId)
      .getFile(options.fileType, options.fileId)
      .go();

    for (const [key, val] of Object.entries(options.data)) {
      await e2eFile.expectOutputValue(key, val);
    }
    await expect(e2eFile.form).toHaveScreenshot();
    await expect(e2eFile.panel).toHaveScreenshot();
  });
}

export async function fullTestCreateDelete(options: {
  page: Page;
  patientId: string | number;
  fileType: string;
  deleteTest: (page: Page) => any;
  initialIsAlreadyGood?: boolean; // ==> Default false/undefined
  fieldsConfig: FieldsConfigType;
  data: Record<string, string | number | boolean | undefined>;
}) {
  await crApiLogin(options.page);

  const e2ePatient = await new E2EPatient(options.page, options.patientId).go();
  const panel = await e2ePatient.doAdd(options.fileType);

  if (!options.initialIsAlreadyGood) {
    // Try to save: it does not work
    await panel.panel.getByText("Save").click();
    await expect(panel.panel.getByText("Edit")).not.toBeVisible();
    await expect(panel.form).toHaveScreenshot();
  }

  for (const [key, val] of Object.entries(options.data)) {
    await panel.setFieldValue(key, "" + val, options.fieldsConfig[key]);
  }
  await panel.doSave(true);

  await panel.goEdit();
  await panel.doDelete();

  await options.deleteTest(options.page);
}
