import { crApiFicheModify, crApiLogin } from "./helpers/cr-api.js";
import { crLoginInBackground, crPage, crReady } from "./helpers/cr.js";
import { patientFilesCrud } from "./helpers/e2e-entrynumber-assigned.js";
import { patientgo } from "./helpers/patients.js";

context("Actions", () => {
  beforeEach(() => {
    crLoginInBackground(crApiLogin.PHYSIO);

    crApiFicheModify("patients", patientFilesCrud.id, {
      entry_year: patientFilesCrud.entry_year,
      entry_order: patientFilesCrud.entry_order,
      name: "crud patient",
      pathology: "ClubFoot"
    });
  });

  it("edit and cancel patient", () => {
    patientgo(patientFilesCrud);
    crPage().within(() => {
      cy.get("#button_patient").click();
      cy.get("#topsubmenu #patient_edit").click();
      cy.get("input#Patient_name").should("be.visible");
      cy.get("#Patient_name").should("have.value", "crud patient");

      cy.get("[name=pathology]").invoke("attr", "value", "ClubFoot");
      cy.get("#Patient_name").clear();
      cy.get("#Patient_name").type("rezaul");

      cy.get("#topsubmenu #patient_cancel").click();
      cy.get("#Patient_name").should("contain.text", "crud patient");
    });
  });

  it("edit a patient", () => {
    patientgo(patientFilesCrud);
    crPage().within(() => {
      cy.get("#button_patient").click();
      cy.get("#topsubmenu #patient_edit").click();
      cy.get("input#Patient_name").should("be.visible");
      cy.get("#Patient_name").should("have.value", "crud patient");
      cy.get("#Patient_name").clear();
      cy.get("#Patient_name").type("rezaul");

      cy.get("#topsubmenu #patient_save").click();
      crReady();
      cy.get("#Patient_name").should("contain.text", "rezaul");
    });
  });
});
