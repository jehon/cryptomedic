import {
  patientCrudCreateReference,
  patientCrudGenerateReference,
  patientFilesCrud
} from "./helpers/e2e-entrynumber-assigned.js";
import {
  crApiFicheModify,
  crApiLogin,
  crApiPatientDelete
} from "./helpers/cr-api.js";
import { crLoginInBackground, crPage, crReady } from "./helpers/cr.js";
import { guiAcceptAlert, guiHashStartWith } from "./helpers/gui.js";
import { patientgo } from "./helpers/patients.js";
import XButton from "../../../legacy/app-old/v2/widgets/style/x-button.js";

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

  it("create a reference", () => {
    crApiPatientDelete(
      patientCrudCreateReference.entry_year,
      patientCrudCreateReference.entry_order
    );

    cy.get("x-patient-by-reference").within((el) => {
      cy.get("[name=entry_year]").invoke(
        "attr",
        "value",
        patientCrudCreateReference.entry_year
      );
      cy.get("[name=entry_order]").invoke(
        "attr",
        "value",
        patientCrudCreateReference.entry_order
      );

      cy.get(`x-button[action="${XButton.Search}"]`).click();

      cy.wrap(el).should("have.attr", "status", "creation-proposed");

      cy.crCompareSnapshot("create");

      cy.get("#create-reference").click({ force: true });
    });

    crPage().within(() => {
      cy.get("#Patient_entry_year").should(
        "contain.text",
        patientCrudCreateReference.entry_year
      );
      cy.get("#Patient_entry_order").should(
        "contain.text",
        patientCrudCreateReference.entry_order
      );

      cy.get("#Patient_name").type("rezaul");
      cy.get("#topsubmenu #patient_save").click();
    });
  });

  it("generate a reference", () => {
    // entry_order will be set automatically to 10.000
    crApiPatientDelete(
      patientCrudGenerateReference.entry_year,
      patientCrudGenerateReference.entry_order
    );

    cy.get("#autogenerate-reference")
      .should("be.visible")
      .within(() => {
        cy.crCompareSnapshot("generate-1-input");
        cy.get("x-button").click();
      });

    crPage().within(() => {
      cy.get("#Patient_name").should("be.visible");

      // Edit and save
      cy.get("#Patient_entry_year").type(
        patientCrudGenerateReference.entry_year
      );
      cy.get("#Patient_name").type("rezaul");
      cy.crCompareSnapshot("generate-2-complete");

      cy.get("#bottomsubmenu #patient_create").click();

      // Check readonly mode
      cy.get("span#Patient_entry_year").should(
        "contain.text",
        patientCrudGenerateReference.entry_year
      );
      cy.get("#Patient_name").should("contain.text", "rezaul");
      cy.get("#Patient_entry_order").should(
        "contain.text",
        patientCrudGenerateReference.entry_order
      ); // Should be above 10000 as automatically generated

      cy.get("#topsubmenu #patient_edit").click();
      cy.get("#topsubmenu #patient_delete").click();

      guiAcceptAlert();

      cy.get("#page_home").should("be.visible");
      guiHashStartWith("/home");
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
