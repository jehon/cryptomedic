import XButton from "../../../../legacy/app-old/v2/widgets/style/x-button.js";
import { crGo, crPage, crReady } from "./cr.js";
import { guiHashStartWith } from "./gui.js";

/**
 * @param {object} patient
 * @property {number} entry_year of the patient
 * @property {number} entry_order of the patient
 * @property {number} [id] of the patient
 * @returns {Cypress.Chainable} with the Page element
 */
export function patientgo(patient) {
  if (patient.id) {
    crGo(`/folder/${patient.id}`);
  } else {
    crGo();

    cy.get("#menu_home").click();

    cy.get("x-patient-by-reference").within(() => {
      cy.get('[name="entry_year"]').invoke("attr", "value", patient.entry_year);
      cy.get('[name="entry_order"]').invoke(
        "attr",
        "value",
        patient.entry_order
      );
      cy.get(`x-button[action="${XButton.Search}"]`).click();
    });
  }

  if (patient.id) {
    guiHashStartWith(`/folder/${patient.id}`, true);
  }

  crReady();
  cy.get("#folderpage").should("be.visible");

  crReady();
  cy.get("#Patient_entry_year").should("contain.text", patient.entry_year);
  cy.get("#Patient_entry_order").should("contain.text", patient.entry_order);

  cy.log(
    `Gone to patient ${patient.entry_year}-${patient.entry_order} successfully`
  );

  crReady();

  return crPage();
}
/**
 * @param {string} type of the fiel
 * @param {number} id of the file
 */
export function patientSelectFile(type, id) {
  cy.get(`#folder_menu_${type}_${id}`).should("contain.text", type);
  cy.get(`#folder_menu_${type}_${id}`).click();
  crReady();

  cy.log(`Gone to file ${type}#${id} successfully`);
}
