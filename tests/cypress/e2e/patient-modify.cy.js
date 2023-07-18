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
      entryyear: patientFilesCrud.entryyear,
      entryorder: patientFilesCrud.entryorder,
      Name: "crud patient",
      Pathology: "ClubFoot"
    });
  });

  it("create a reference", () => {
    crApiPatientDelete(
      patientCrudCreateReference.entryyear,
      patientCrudCreateReference.entrynumber
    );

    cy.get("x-patient-by-reference").within((el) => {
      cy.get("[name=entryyear]").invoke(
        "attr",
        "value",
        patientCrudCreateReference.entryyear
      );
      cy.get("[name=entryorder]").invoke(
        "attr",
        "value",
        patientCrudCreateReference.entrynumber
      );

      cy.get(`x-button[action="${XButton.Search}"]`).click();

      cy.wrap(el).should("have.attr", "status", "creation-proposed");

      cy.crCompareSnapshot("create");

      cy.get("#create-reference").click({ force: true });
    });

    crPage().within(() => {
      cy.get("#Patient_entryyear").should(
        "contain.text",
        patientCrudCreateReference.entryyear
      );
      cy.get("#Patient_entryorder").should(
        "contain.text",
        patientCrudCreateReference.entrynumber
      );

      cy.get("#Patient_Name").type("rezaul");
      cy.get("#topsubmenu #patient_save").click();
    });
  });

  it("generate a reference", () => {
    // entrynumber will be set automatically to 10.000
    crApiPatientDelete(
      patientCrudGenerateReference.entryyear,
      patientCrudGenerateReference.entrynumber
    );

    cy.get("#autogenerate-reference")
      .should("be.visible")
      .within(() => {
        cy.crCompareSnapshot("generate-1-input");
        cy.get("x-button").click();
      });

    crPage().within(() => {
      cy.get("#Patient_Name").should("be.visible");

      // Edit and save
      cy.get("#Patient_entryyear").type(patientCrudGenerateReference.entryyear);
      cy.get("#Patient_Name").type("rezaul");
      cy.crCompareSnapshot("generate-2-complete");

      cy.get("#bottomsubmenu #patient_create").click();

      // Check readonly mode
      cy.get("span#Patient_entryyear").should(
        "contain.text",
        patientCrudGenerateReference.entryyear
      );
      cy.get("#Patient_Name").should("contain.text", "rezaul");
      cy.get("#Patient_entryorder").should(
        "contain.text",
        patientCrudGenerateReference.entryorder
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
      cy.get("input#Patient_Name").should("be.visible");
      cy.get("#Patient_Name").should("have.value", "crud patient");

      cy.get("[name=Pathology]").invoke("attr", "value", "ClubFoot");
      cy.get("#Patient_Name").clear();
      cy.get("#Patient_Name").type("rezaul");

      cy.get("#topsubmenu #patient_cancel").click();
      cy.get("#Patient_Name").should("contain.text", "crud patient");
    });
  });

  it("edit a patient", () => {
    patientgo(patientFilesCrud);
    crPage().within(() => {
      cy.get("#button_patient").click();
      cy.get("#topsubmenu #patient_edit").click();
      cy.get("input#Patient_Name").should("be.visible");
      cy.get("#Patient_Name").should("have.value", "crud patient");
      cy.get("#Patient_Name").clear();
      cy.get("#Patient_Name").type("rezaul");

      cy.get("#topsubmenu #patient_save").click();
      crReady();
      cy.get("#Patient_Name").should("contain.text", "rezaul");
    });
  });
});
