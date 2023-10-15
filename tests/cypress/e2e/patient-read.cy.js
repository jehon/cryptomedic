/// <reference types="Cypress" />

import { crApiLogin } from "./helpers/cr-api.js";
import { crLoginInBackground } from "./helpers/cr.js";
import {
  patientFilesRead2000_1,
  patientFilesRead2001_1,
  patientFilesRead2014_103,
  patientFilesRead2014_105
} from "./helpers/e2e-entrynumber-assigned.js";
import { getByDataRole } from "./helpers/gui.js";
import { patientgo, patientSelectFile } from "./helpers/patients.js";
import TableIterator from "./helpers/table-iterator.js";

context("Actions", () => {
  beforeEach(() => {
    crLoginInBackground(crApiLogin.RO);
  });

  it("read patient 2000-1", () => {
    // id: 1
    patientgo(patientFilesRead2000_1).within(() => {
      cy.get("#Patient_name").should("contain.text", "rezaul islam");
      cy.get("#Patient_sex").should("contain.text", "Male");
      cy.get("#Patient_address_district").should("contain.text", "Chittagong");
      cy.get("#Patient_pathology").should("contain.text", "ClubFoot");
      cy.get("#button_edit").should("not.exist");

      cy.crCompareSnapshot("patient_2000_1");

      cy.get("#folder_menu #summary").click();
      getByDataRole("summary")
        .should("be.visible")
        .within(() => {
          getByDataRole("Patient-1")
            .should("be.visible")
            .within(() => {
              getByDataRole("header")
                .first()
                .within(() => {
                  getByDataRole("type").should("contain", "Patient");
                });
            });
        });

      // TODO: We need to wait for image to be loaded...
      cy.wait(1000); // eslint-disable-line
      cy.crCompareSnapshot("patient_2000_1_summary");

      patientSelectFile("OtherConsult", 1);
      cy.get("#date").should("contain.text", "2007-01-10");
      cy.get("#examiner").should("contain.text", "Ershad");

      cy.get("x-ff-patient-related").should("exist");
      cy.get('x-ff-patient-related[patient-entry-number="2000-1"]').should(
        "exist"
      );

      cy.get("x-fff-weight-sd").should("contain.text", "0 ds");
      cy.get("x-fff-height-sd").should("contain.text", "0 ds");

      cy.get("x-fff-wh").should("contain.text", "0.22");
      cy.get("x-fff-wh-sd").should(
        "contain.text",
        "'value' is out-of-bounds: 134 [80 -> 120]"
      );

      cy.get("x-fff-bmi").should("contain.text", "16.2");
      cy.get("x-fff-bmi-sd").should("contain.text", "0 ds");

      cy.get("#button_edit").should("not.exist");
      cy.crCompareSnapshot("patient_2000_1_otherconsult");

      patientSelectFile("Picture", 2);
      cy.get("#Picture_date").should("contain.text", "2014-11-04");
      cy.get("#Picture_file").should(
        "contain.text",
        "10_2014-11-06_15-32-45.JPG"
      );
      cy.get("#img_file").should("be.visible");
      cy.get("#button_edit").should("not.exist");
      cy.crCompareSnapshot("patient_2000_1_picture");

      patientSelectFile("Bill", 1);
      cy.get("#button_edit").should("not.exist");
      cy.get("#Bill_date").should("contain.text", "2011-06-09");
      // TODO: check bill
      cy.crCompareSnapshot("patient_2000_1_bill");

      patientSelectFile("Surgery", 5);
      cy.get("#Surgery_report_diagnostic").should("contain.text", "test");
      cy.get("#Surgery_follow_up_complication").should(
        "contain.text",
        "nothing"
      );
      cy.crCompareSnapshot("patient_2000_1_surgery");
    });
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

  it("read patient 2001-1", () => {
    // id: 6
    patientgo(patientFilesRead2001_1).within(() => {
      patientSelectFile("RicketConsult", 3);
      // TODO: adapt the data and check them
      cy.get("#button_edit").should("not.exist");
      cy.get("#date").should("contain.text", "2004-10-06");
      cy.crCompareSnapshot("patient_2001_1_ricketconsult");
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
      cy.crCompareSnapshot("patient_2014_103_bill");
    });
  });
});
