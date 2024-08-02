import { crApiLogin } from "./helpers/cr-api.js";
import { crLoginInBackground } from "./helpers/cr.js";
import {
  patientFilesRead2014_103,
  patientFilesRead2014_105
} from "./helpers/e2e-entrynumber-assigned.js";
import { patientSelectFile, patientgo } from "./helpers/patients.js";
import TableIterator from "./helpers/table-iterator.js";

context("Actions", () => {
  beforeEach(() => {
    crLoginInBackground(crApiLogin.RO);
  });

  it("read patient 2014-105", () => {
    // id: 5
    patientgo(patientFilesRead2014_105).within(() => {
      cy.get("#Patient_phone").should("contain.text", "1813247984");
      cy.get("#Patient_address_upazilla").should("contain.text", "Ukhia");
      cy.get("#Patient_address_union").should("contain.text", "Jalia palong");

      patientSelectFile("ClubFoot", 1);
      cy.get("#ageAtConsultationTime").should("be.visible");
      cy.get("#ageAtConsultationTime").should("contain.text", "2y0m");
      // TODO: adapt the data and check them
      cy.get("#button_edit").should("not.exist");
      cy.crCompareSnapshot("patient_2014_105_clubfoot");
    });
  });

  it("read patient 2014-103", () => {
    // id: 3
    patientgo(patientFilesRead2014_103).within(() => {
      patientSelectFile("Bill", 2);
      new TableIterator("#paymentsList", { xtable: false })
        .col(2)
        .assert("Murshed")
        .nextCol()
        .assert(15)
        .row(2)
        .col(2)
        .assert("Ershad")
        .nextCol()
        .assert(10);
    });
  });
});
