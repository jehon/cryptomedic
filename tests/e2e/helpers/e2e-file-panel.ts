import test, { expect, Page } from "@playwright/test";
import { CRUD } from "../../../src/constants";
import { escapeRegExp } from "../../../src/utils/strings";
import {
  crApi,
  crApiLogin,
  crExpectUrl,
  crReady,
  crUrl,
  outputDate
} from "./e2e";
import { E2EForm, IOType, IOValue } from "./e2e-form";
import { E2EPatient } from "./e2e-patients";

type FieldConfigType = {
  type?: IOType;
  json?: string;
};

export type FieldsConfigTypeSimplified = {
  [key: string]: IOType | FieldConfigType;
};

export const TimedFieldsConfigType: FieldsConfigTypeSimplified = {
  Date: "date",
  Examiner: "radio",
  Center: "select"
};

export const ConsultFieldsConfigType: FieldsConfigTypeSimplified = {
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
  "Treatment Evaluation": "select",
  "Treatment Finished": "checkbox"
};

export const consultBasicData = {
  Date: "2007-01-10",
  Examiner: "Ershad",
  Center: "Ukhia",
  "Weight (kg)": "29",
  "Height (cm)": "134",

  "Others Comments and Treatments": "please do something",
  "Suggested for Surgery": false,
  "Treatment Evaluation": "Good result", // List
  "Treatment Finished": true
};

function reduceFieldConfig2Form(fc?: FieldsConfigTypeSimplified) {
  if (!fc) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(fc).map(([k, v]) => [k, typeof v == "string" ? v : v.type])
  );
}

export class E2EFilePanel extends E2EForm {
  protected fileBaseUrl = "";
  protected page: Page;
  protected patient_id: string;
  protected id: string;

  constructor(
    protected e2ePatient: E2EPatient,
    protected type: string,
    id: string | number,
    fieldsConfig?: FieldsConfigTypeSimplified
  ) {
    super(
      () =>
        e2ePatient.page
          .getByTestId(`${this.type}.${this.id}`)
          .locator(">[data-role=panel]"),
      reduceFieldConfig2Form(fieldsConfig)
    );
    this.page = e2ePatient.page;
    this.patient_id = "" + this.e2ePatient.id;
    this.id = "" + id;
    this.fileBaseUrl = `/folder/${this.patient_id}/summary/${type}.`;
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
    await this.expectToBeVisible();

    await this.locator.click(); // the panel is the closed item

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
      const url = this.page.url();
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
}

export function fullTest(context: {
  fileType: string;
  fieldsConfig: FieldsConfigTypeSimplified;
}) {
  const fieldsConfig: { [key: string]: { type?: IOType; json: string } } =
    Object.fromEntries(
      Object.entries(context.fieldsConfig)
        .map(([k, v]): [string, FieldConfigType] => [
          k,
          (typeof v == "string" ? { type: v } : v) as FieldConfigType
        ])
        .map(([k, v]) => [
          k,
          {
            type: v.type,
            json: v.json ?? k.toLowerCase().replaceAll(" ", "_")
          }
        ])
    );

  const getJson = (key: string) =>
    fieldsConfig[key]?.json ?? key.toLowerCase().replaceAll(" ", "_");

  return {
    fieldsConfig,

    async testRead(options: {
      patientEntryOrder: string;
      patientId: string | number;
      fileId: string | number;
      data: Record<string, IOValue | undefined>;
    }) {
      await test(`${options.patientEntryOrder}.${context.fileType}.${options.fileId}`, async ({
        page
      }) => {
        await crApiLogin(page);
        const e2eFile = await new E2EPatient(page, options.patientId)
          .getFile({
            fileType: context.fileType,
            fileId: options.fileId,
            fieldsConfig
          })
          .go();

        await e2eFile.expectAllOutputValues(options.data);
        await e2eFile.expectScreenshot();
      });
    },

    async testCreateDelete(options: {
      patientEntryOrder?: string;
      patientId: string | number;
      deleteTest?: (page: Page, data: Record<string, IOValue>) => any;
      initialIsAlreadyGood?: boolean; // ==> Default false/undefined
      data: Record<string, IOValue>;
    }) {
      // Default values
      options = {
        deleteTest: (page, data) =>
          expect(
            page.getByText(outputDate(data["Date"] as string))
          ).toHaveCount(0),
        ...options
      };

      await test(
        `${options.patientEntryOrder ?? ""} create and delete ${context.fileType}`.trim(),
        async ({ page }) => {
          await crApiLogin(page);
          const e2ePatient = await new E2EPatient(page, options.patientId).go();
          const e2eFile = await e2ePatient.doAdd({
            fileType: context.fileType,
            fieldsConfig
          });
          await e2eFile.expectScreenshot();

          if (!options.initialIsAlreadyGood) {
            // Try to save: it does not work
            await e2eFile.locator.getByText("Save").click();
            await expect(e2eFile.locator.getByText("Edit")).not.toBeVisible();
            // No screenshot because too touchy
          }

          // Set field values
          await e2eFile.setAllInputValues(options.data);
          await e2eFile.expectScreenshot();

          await e2eFile.doSave(true);
          // Check that the values has been correctly saved
          await e2eFile.expectAllOutputValues(options.data);
          await e2eFile.expectScreenshot();

          // Go back to Edit
          await e2eFile.goEdit();
          // Check that the values has been correctly filled in form
          await e2eFile.expectAllInputValues(options.data);
          await e2eFile.expectScreenshot();

          await e2eFile.doDelete();
          await options.deleteTest!(page, options.data);
        }
      );
    },

    async testUpdate(options: {
      patientEntryOrder?: string;
      patientId: string | number;
      fileId: string | number;
      dataInitial: Record<string, IOValue>;
      dataUpdated: Record<string, IOValue>;
    }) {
      await test(
        `${options.patientEntryOrder ?? ""} update ${context.fileType}`.trim(),
        async ({ page }) => {
          test.slow();

          await crApiLogin(page);
          const e2eFile = new E2EPatient(page, options.patientId).getFile({
            fileType: context.fileType,
            fileId: options.fileId,
            fieldsConfig
          });

          // Reset the data in the backend
          await e2eFile.apiFileUpdate(options.patientId, {
            id: options.fileId,
            ...Object.fromEntries(
              Object.entries(options.dataInitial).map(([k, v]) => [
                getJson(k),
                v ?? null
              ])
            )
          });

          // Output mode: verify initial data
          await e2eFile.go();
          await e2eFile.expectAllOutputValues(options.dataInitial);
          await e2eFile.expectScreenshot();

          // Input mode: verify initial data
          await e2eFile.goEdit();
          await e2eFile.expectAllInputValues(options.dataInitial);
          await e2eFile.expectScreenshot();

          // Input mode: fill-in new data
          await e2eFile.setAllInputValues(options.dataUpdated);
          await e2eFile.expectScreenshot();

          await e2eFile.doSave();
          // Output mode: verify updated data
          await e2eFile.expectAllOutputValues(options.dataUpdated);
          await e2eFile.expectScreenshot();
        }
      );
    }
  };
}
