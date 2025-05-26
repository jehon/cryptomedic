import test, { expect, type Page } from "@playwright/test";
import { outputDate, startCryptomedic } from "./e2e";
import { type FieldsTypes, type IOType, type IOValue } from "./e2e-form";
import { E2EIOPanel } from "./e2e-io-panel";

type FieldConfigType = {
  type?: IOType;
  json?: string;
};

type FieldsConfigTypeSimplified = {
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
    Object.entries(fc).map(([k, v]) => [
      k,
      typeof v == "string" ? v : (v.type ?? "string")
    ])
  );
}

export function patientRelatedFulllTest(context: {
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

          // TODO: Use the add button
          await cryptomedic.goTo(
            `/patient/${options.patientId}/${context.fileType}/add`
          );

          let e2eIOPanel = new E2EIOPanel(
            cryptomedic.page.getByTestId(`${context.fileType}.add`),
            reduceFieldConfig2Form(context.fieldsConfig)
          );

          await e2eIOPanel.expectScreenshot();

          if (!options.initialIsAlreadyGood) {
            // Try to save: it does not work
            await e2eIOPanel.locator.getByText("Save").first().click();
            await expect(
              e2eIOPanel.locator.getByText("Edit")
            ).not.toBeVisible();
            // No screenshot because too touchy
          }

          // Set field values
          await e2eIOPanel.setAllInputValues(options.data);
          await e2eIOPanel.expectScreenshot();

          await e2eIOPanel.doCreate();
          await cryptomedic.waitForPathByRegex(
            new RegExp(
              `^.*/patient/${options.patientId}/${context.fileType}/[0-9]+$`
            )
          );

          const newId = cryptomedic.detectId(context.fileType);
          e2eIOPanel = new E2EIOPanel(
            cryptomedic.page.getByTestId(`${context.fileType}.${newId}`),
            reduceFieldConfig2Form(context.fieldsConfig)
          );

          // Check that the values has been correctly saved
          await e2eIOPanel.expectAllOutputValues(options.data);
          await e2eIOPanel.expectScreenshot();

          // Go back to Edit
          e2eIOPanel.doEdit();
          await cryptomedic.waitForPath(
            `/patient/${options.patientId}/${context.fileType}/${newId}/edit`
          );
          // Check that the values has been correctly filled in form
          await e2eIOPanel.expectAllInputValues(options.data);
          await e2eIOPanel.expectScreenshot();

          await e2eIOPanel.doDelete();

          await cryptomedic.waitForPath(
            `/patient/${options.patientId}/${context.fileType}/${newId}`
          );
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
