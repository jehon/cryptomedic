import test, { expect, Locator, Page } from "@playwright/test";
import { CRUD } from "../../../src/constants";
import { escapeRegExp } from "../../../src/utils/strings";
import { E2EPatient } from "../patients/e2e-patients";
import {
  crApi,
  crApiLogin,
  crExpectUrl,
  crReady,
  crUrl,
  outputDate
} from "./e2e";

type IOTypes =
  | "string"
  | "checkbox"
  | "date"
  | "radio"
  | "readonly"
  | "select"
  | "textarea";
type FieldConfigTypeOptional = {
  type?: IOTypes;
  json?: string;
};
type FieldConfigType = {
  type: IOTypes;
  json: string;
};
type FieldsConfigType = {
  [key: string]: IOTypes | FieldConfigTypeOptional;
};

type IOValue = string | number | boolean | undefined;

function ioValue2String(val: IOValue): string {
  if (val === undefined) {
    return "";
  }

  if (val === false) {
    return "";
  }

  return val + "";
}

const IOV = {
  R_Checked: "✔"
};

export const TimedFieldsConfigType: FieldsConfigType = {
  Date: "date",
  Examiner: "radio",
  Center: "select"
};

export const ConsultFieldsConfigType: FieldsConfigType = {
  ...TimedFieldsConfigType,
  "Weight (kg)": { json: "weight_kg" },
  "Weight sd": "readonly",
  "Height (cm)": { json: "height_cm" },
  "Height sd": "readonly",
  "Weight/Height ratio": "readonly",
  "Weight/Height sd": "readonly",
  BMI: "readonly",
  "BMI sd": "readonly",

  "Others Comments and Treatments": {
    type: "textarea",
    json: "comments"
  },
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

  "Others Comments and Treatments": "please do something",
  "Suggested for Surgery": false,
  "Treatment Evaluation": "Good result", // List
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

  async expectScreenshot(): Promise<this> {
    await crReady(this.page);
    await expect(this.form).toBeVisible();
    await expect(this.form).toHaveScreenshot();
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
    await crReady(this.page);
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
    return this;
  }

  async doSave(interceptAddedId: boolean = false): Promise<this> {
    await this.expectToBeVisible();

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
    value?: IOValue,
    type?: IOTypes
  ): Promise<this> {
    const io = await this.expectField(label);

    if (value) {
      switch (type) {
        case "date":
          value = outputDate(value as string);
          break;
        case "checkbox":
          if (value) {
            value = IOV.R_Checked;
          } else {
            value = "";
          }
      }

      await expect(io).toBeVisible();

      let ioc = io.locator(".content");
      if ((await ioc.locator("div").all()).length > 0) {
        // In case of Date, we have multiple divs
        ioc = ioc.locator("div").first();
      }

      await expect(ioc).toBeVisible();
      await expect((await ioc.textContent())?.trim() ?? "").toBe(
        ioValue2String(value)
      );
    } else {
      await expect(io).not.toBeVisible();
    }

    return this;
  }

  async expectInputValue(
    label: string,
    value?: IOValue,
    type?: IOTypes
  ): Promise<this> {
    switch (type) {
      case undefined:
      case "string":
      case "date":
      case "select":
      case "textarea":
        await expect(this.panel.getByLabel(label)).toHaveValue(
          ioValue2String(value)
        );
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
          (await this.expectField(label)).getByLabel(ioValue2String(value), {
            exact: true
          })
        ).toBeChecked();
        break;
      case "readonly":
        break;
    }
    return this;
  }

  async setFieldValue(
    label: string,
    value?: IOValue,
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
        await ioc.locator("input").fill(ioValue2String(value));
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
          const radio = await ioc.getByLabel(ioValue2String(value), {
            exact: true
          });
          await expect(radio).toBeVisible();
          await radio.check();
        }
        break;
      case "select":
        {
          const select = ioc.locator("select");
          await expect(select).toBeVisible();
          await expect(select).toContainText(ioValue2String(value));
          await select.selectOption({ label: ioValue2String(value) });
        }
        break;
      case "textarea":
        await expect(ioc.locator("textarea")).toBeVisible();
        await ioc.locator("textarea").fill(ioValue2String(value));
        break;
      default:
        throw new Error("Unknown type: " + type);
    }

    return this;
  }
}

export function fullTest(context: {
  fileType: string;
  fieldsConfig: FieldsConfigType;
}) {
  const key2json = (key: string) => key.toLowerCase().replaceAll(" ", "_");

  const fieldsConfig: {
    [key: string]: FieldConfigType | undefined;
  } = Object.fromEntries(
    Object.entries(context.fieldsConfig).map(([k, v]) => [
      k,
      typeof v == "string"
        ? {
            type: v ?? "string",
            json: key2json(k)
          }
        : {
            type: v.type ?? "string",
            json: v.json ?? key2json(k)
          }
    ])
  );

  return {
    async testRead(options: {
      patientEntryOrder: string;
      patientId: string | number;
      fileId: string | number;
      data: Record<string, IOValue>;
    }) {
      await test(`${options.patientEntryOrder}.${context.fileType}.${options.fileId}`, async ({
        page
      }) => {
        await crApiLogin(page);
        const e2eFile = await new E2EPatient(page, options.patientId)
          .getFile(context.fileType, options.fileId)
          .go();

        for (const [key, val] of Object.entries(options.data)) {
          await e2eFile.expectOutputValue(key, val, fieldsConfig[key]?.type);
        }
        await e2eFile.expectScreenshot();
      });
    },

    async testCreateDelete(options: {
      patientEntryOrder: string;
      patientId: string | number;
      deleteTest: (page: Page) => any;
      initialIsAlreadyGood?: boolean; // ==> Default false/undefined
      data: Record<string, IOValue>;
    }) {
      await test(`${options.patientEntryOrder} create and delete ${context.fileType}`, async ({
        page
      }) => {
        await crApiLogin(page);
        const e2ePatient = await new E2EPatient(page, options.patientId).go();
        const e2eFile = await e2ePatient.doAdd(context.fileType);
        await e2eFile.expectScreenshot();

        if (!options.initialIsAlreadyGood) {
          // Try to save: it does not work
          await e2eFile.panel.getByText("Save").click();
          await expect(e2eFile.panel.getByText("Edit")).not.toBeVisible();
          // No screenshot because too touchy
        }

        // Set field values
        for (const [key, val] of Object.entries(options.data)) {
          await e2eFile.setFieldValue(
            key,
            ioValue2String(val),
            fieldsConfig[key]?.type
          );
        }
        await e2eFile.expectScreenshot();

        await e2eFile.doSave(true);
        // Check that the values has been correctly saved
        for (const [key, val] of Object.entries(options.data)) {
          await e2eFile.expectOutputValue(
            key,
            ioValue2String(val),
            fieldsConfig[key]?.type
          );
        }
        await e2eFile.expectScreenshot();

        // Go back to Edit
        await e2eFile.goEdit();
        // Check that the values has been correctly filled in form
        for (const [key, val] of Object.entries(options.data)) {
          await e2eFile.expectInputValue(
            key,
            ioValue2String(val),
            fieldsConfig[key]?.type
          );
        }
        await e2eFile.expectScreenshot();

        await e2eFile.doDelete();
        await options.deleteTest(page);
      });
    },

    async testUpdate(options: {
      patientEntryOrder: string;
      patientId: string | number;
      fileId: string | number;
      dataInitial: Record<string, IOValue>;
      dataUpdated: Record<string, IOValue>;
    }) {
      await test(`${options.patientEntryOrder} update ${context.fileType}`, async ({
        page
      }) => {
        test.slow();

        await crApiLogin(page);
        const e2eFile = new E2EPatient(page, options.patientId).getFile(
          context.fileType,
          options.fileId
        );

        // Reset the data in the backend
        await e2eFile.apiFileUpdate(options.patientId, {
          id: options.fileId,
          ...Object.fromEntries(
            Object.entries(options.dataInitial).map(([k, v]) => [
              fieldsConfig[k]?.json ?? key2json(k),
              v ?? null
            ])
          )
        });

        // Output mode: verify initial data
        await e2eFile.go();
        for (const [key, val] of Object.entries(options.dataInitial)) {
          await e2eFile.expectOutputValue(key, val, fieldsConfig[key]?.type);
        }
        await e2eFile.expectScreenshot();

        // Input mode: verify initial data
        await e2eFile.goEdit();
        for (const [key, val] of Object.entries(options.dataInitial)) {
          await e2eFile.expectInputValue(key, val, fieldsConfig[key]?.type);
        }
        await e2eFile.expectScreenshot();

        // Input mode: fill-in new data
        for (const [key, val] of Object.entries(options.dataUpdated)) {
          await e2eFile.setFieldValue(key, val, fieldsConfig[key]?.type);
        }
        await e2eFile.expectScreenshot();

        await e2eFile.doSave();
        // Output mode: verify updated data
        for (const [key, val] of Object.entries(options.dataUpdated)) {
          await e2eFile.expectOutputValue(key, val, fieldsConfig[key]?.type);
        }
        await e2eFile.expectScreenshot();
      });
    }
  };
}
