import XButton from "../../../../legacy/app-old/v2/widgets/style/x-button.js";
import { crGo, crPage, crReady } from "./cr.js";
import { guiHashStartWith } from "./gui.js";

/**
 * @param {object} patient
 * @property {number} entryyear of the patient
 * @property {number} entryorder of the patient
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
      cy.get('[name="entryyear"]').invoke("attr", "value", patient.entryyear);
      cy.get('[name="entryorder"]').invoke("attr", "value", patient.entryorder);
      cy.get(`x-button[action="${XButton.Search}"]`).click();
    });
  }

  if (patient.id) {
    guiHashStartWith(`/folder/${patient.id}`, true);
  }

  crReady();
  cy.get("#folderpage").should("be.visible");

  crReady();
  cy.get("#Patient_entryyear").should("contain.text", patient.entryyear);
  cy.get("#Patient_entryorder").should("contain.text", patient.entryorder);

  cy.log(
    `Gone to patient ${patient.entryyear}-${patient.entryorder} successfully`
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
