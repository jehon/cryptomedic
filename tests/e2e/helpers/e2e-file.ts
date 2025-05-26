import test, { expect, type Page } from "@playwright/test";
import { escapeRegExp } from "../../../src/utils/strings";
import { outputDate, startCryptomedic } from "./e2e";
import {
  E2EForm,
  type FieldsTypes,
  type IOType,
  type IOValue
} from "./e2e-form";
import { E2EIOPanel } from "./e2e-io-panel";
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
  Examiner: "Ershad",
  Center: "Ukhia",
  "Weight (kg)": "29",
  "Height (cm)": "134",

  "Others Comments and Treatments": "please do something",
  "Suggested for Surgery": false,
  "Treatment Evaluation": "Good result", // List
  "Treatment Finished": true
};

function reduceFieldConfig2Form(fc?: FieldsConfigTypeSimplified): FieldsTypes {
  if (!fc) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(fc).map(([k, v]) => [k, typeof v == "string" ? v : v.type])
  );
}

export class E2EFile extends E2EForm {
  private fileBaseUrl = "";
  protected page: Page;
  protected type: string;
  protected id: string;
  protected e2ePatient: E2EPatient;
  tmpFieldsConfig: FieldsTypes;

  constructor(
    e2ePatient: E2EPatient,
    type: string,
    id?: string,
    fieldsConfig?: FieldsConfigTypeSimplified
  ) {
    super(
      () => e2ePatient.cryptomedic.page.getByTestId(`${this.type}.${this.id}`),
      reduceFieldConfig2Form(fieldsConfig)
    );
    this.e2ePatient = e2ePatient;
    this.type = type;
    this.page = e2ePatient.cryptomedic.page;
    this.tmpFieldsConfig = reduceFieldConfig2Form(fieldsConfig);

    if (id === undefined) {
      this.id = this.e2ePatient.cryptomedic.detectId(this.type);
    } else {
      this.id = "" + id;
    }
    this.fileBaseUrl = `/patient/${this.e2ePatient.id}/${type}`;
  }

  /* ***********************************
   *
   * API
   *
   */

  async apiFileUpdate(id: string, data: Record<string, string | number>) {
    await this.e2ePatient.cryptomedic.apiCrudReset(
      `/fiche/${this.type}`,
      id,
      data
    );
  }

  /* ***********************************
   *
   * Generic
   *
   */

  /* ***********************************
   *
   * Routes
   *
   */

  async go(): Promise<E2EIOPanel> {
    await this.e2ePatient.go();
    const e2eIOPanel = new E2EIOPanel(
      this.e2ePatient.cryptomedic.page.getByTestId(`${this.type}.${this.id}`),
      this.tmpFieldsConfig
    );
    e2eIOPanel.doOpen();
    return e2eIOPanel;
  }

  async doDelete(): Promise<this> {
    const e2eIOPanel = new E2EIOPanel(
      this.e2ePatient.cryptomedic.page.getByTestId(`${this.type}.${this.id}`),
      this.tmpFieldsConfig
    );
    await e2eIOPanel.doDelete();

    await this.e2ePatient.cryptomedic.waitForPath(
      `/patient/${this.e2ePatient.id}/${this.type}/*`
    );
    return this;
  }

  async doSave(interceptAddedId: boolean = false): Promise<this> {
    await this.expectToBeVisible();

    const e2eIOPanel = new E2EIOPanel(
      this.e2ePatient.cryptomedic.page.getByTestId(`${this.type}.${this.id}`),
      this.tmpFieldsConfig
    );
    if (interceptAddedId) {
      await e2eIOPanel.doCreate();
      await this.e2ePatient.cryptomedic.waitForPathByRegex(
        new RegExp(`^.*#${escapeRegExp(this.fileBaseUrl)}/[0-9]+$`)
      );
      this.id = this.e2ePatient.cryptomedic.detectId(this.type);
    } else {
      await e2eIOPanel.doSave();
      await this.e2ePatient.cryptomedic.waitForPath(
        `${escapeRegExp(this.fileBaseUrl)}/${this.id}`
      );
    }

    // New id is detected, let's match it
    await this.e2ePatient.cryptomedic.waitForPath(
      `${escapeRegExp(this.fileBaseUrl)}/${this.id}`
    );
    return this;
  }

  async goEdit(): Promise<this> {
    const e2eIOPanel = new E2EIOPanel(
      this.e2ePatient.cryptomedic.page.getByTestId(`${this.type}.${this.id}`),
      this.tmpFieldsConfig
    );
    e2eIOPanel.doEdit();

    await this.e2ePatient.cryptomedic.waitForPath(`${this.fileBaseUrl}/*/edit`);

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
      patientId: string;
      fileId: string;
      data: Record<string, IOValue | undefined>;
    }) {
      await test(`${context.fileType}.${options.fileId}`, async ({ page }) => {
        const cryptomedic = startCryptomedic(page);
        await cryptomedic.apiLogin();
        await cryptomedic.goTo(
          `/patient/${options.patientId}/${context.fileType}/${options.fileId}`
        );

        const e2eIOPanel = new E2EIOPanel(
          cryptomedic.page.getByTestId(`${context.fileType}.${options.fileId}`),
          reduceFieldConfig2Form(context.fieldsConfig)
        );

        await e2eIOPanel.doOpen();
        await e2eIOPanel.expectAllOutputValues(options.data);
        await e2eIOPanel.expectScreenshot();
      });
    },

    async testCreateDelete(options: {
      patientId: string;
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
        `${context.fileType} create and delete`.trim(),
        async ({ page }) => {
          const cryptomedic = startCryptomedic(page);
          await cryptomedic.apiLogin();
          await cryptomedic.goTo(`/patient/${options.patientId}/`);

          const e2ePatient = await new E2EPatient(
            cryptomedic,
            options.patientId
          );
          const e2eFile = await e2ePatient.doAdd({
            fileType: context.fileType,
            fieldsConfig
          });
          await e2eFile.expectScreenshot();

          if (!options.initialIsAlreadyGood) {
            // Try to save: it does not work
            await e2eFile.locator.getByText("Save").first().click();
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
      patientId: string;
      fileId: string;
      dataInitial: Record<string, IOValue>;
      dataUpdated: Record<string, IOValue>;
    }) {
      await test(
        `${context.fileType}.${options.fileId} update`.trim(),
        async ({ page }) => {
          test.slow();
          const cryptomedic = startCryptomedic(page);
          await cryptomedic.apiLogin();

          const e2eIOPanel = new E2EIOPanel(
            cryptomedic.page.getByTestId(
              `${context.fileType}.${options.fileId}`
            ),
            reduceFieldConfig2Form(context.fieldsConfig)
          );

          // Reset the data in the backend
          await cryptomedic.apiCrudReset(
            `/fiche/${context.fileType}`,
            options.fileId,
            Object.fromEntries(
              Object.entries(options.dataInitial).map(([k, v]) => [
                getJson(k),
                v ?? null
              ])
            )
          );

          await cryptomedic.goTo(
            `/patient/${options.patientId}/${context.fileType}/${options.fileId}`
          );
          await e2eIOPanel.doOpen();

          // Output mode: verify initial data
          await e2eIOPanel.expectAllOutputValues(options.dataInitial);
          await e2eIOPanel.expectScreenshot();

          // Input mode: verify initial data
          e2eIOPanel.doEdit();
          await cryptomedic.waitForPath(
            `/patient/${options.patientId}/${context.fileType}/${options.fileId}/edit`
          );
          await e2eIOPanel.expectAllInputValues(options.dataInitial);
          await e2eIOPanel.expectScreenshot();

          // Input mode: fill-in new data
          await e2eIOPanel.setAllInputValues(options.dataUpdated);
          await e2eIOPanel.expectScreenshot();

          await e2eIOPanel.doSave();
          await cryptomedic.waitForPath(
            `/patient/${options.patientId}/${context.fileType}/${options.fileId}`
          );
          // Output mode: verify updated data
          await e2eIOPanel.expectAllOutputValues(options.dataUpdated);
          await e2eIOPanel.expectScreenshot();
        }
      );
    }
  };
}
