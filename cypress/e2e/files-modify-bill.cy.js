/// <reference types="Cypress" />

import {
  crApiFicheDelete,
  crApiFolderGet,
  crApiLogin
} from "./helpers/cr-api.js";
import { crLoginInBackground, crReady } from "./helpers/cr.js";
import { patientFilesCrud } from "./helpers/e2e-entrynumber-assigned.js";
import { patientgo } from "./helpers/patients.js";

context("Actions", () => {
  beforeEach(() => {
    crLoginInBackground(crApiLogin.PHYSIO);

    crApiFolderGet(patientFilesCrud.id).then((data) => {
      data.folder
        .filter((r) => r.type != "Patient")
        .map((r) => crApiFicheDelete(r.type, r.id));
    });

    patientgo(patientFilesCrud);

    cy.get("#button_add").should("be.visible").click();
    cy.get("#add_bill").should("be.visible").click();
    cy.get("form#fileForm input").should("be.visible");
  });

  function setDate(val) {
    cy.get("#Bill_Date")
      .should("be.visible")
      .invoke("attr", "value", val)
      .within(() => {
        cy.get("input").focus().blur();
      });
  }

  it("add a bill without a date is an error", () => {
    setDate("");

    cy.get("[priceFor]").should("not.exist");
    cy.get("#errorNoDate").should("be.visible");
    cy.crCompareSnapshot("without-date");
  });

  it.skip("try to set date in the future", () => {
    setDate("2100-01-01");
    cy.get("#errorDateFuture").should("be.visible");
  });

  it.only("add a price normally", () => {
    setDate("2015-01-01");

    cy.get("[name=consult_give_appointment]").should("exist");
    cy.get("#errorNoDate").should("not.exist");
    cy.get("#errorDateFuture").should("not.exist");

    cy.get("#Bill_consult_home_visit").clear().type("1");
    cy.get("#total_calculated_raw").should("contain.text", 150);

    cy.get("#Bill_other_Other_consultation_care").clear().type("15");
    cy.get("#total_calculated_raw").should("contain.text", 165);

    // Let's play with SocialLevel
    cy.log("Let's play with Social Level");

    cy.get("[title=Summary]")
      .should("be.visible")
      .within(() => {
        cy.get("#Bill_Sociallevel").should("contain.text", 4);
        cy.get("#percentage").should("contain.text", "100%");
        cy.get("#total_calculated_asked").should("contain.text", "165");
      });

    cy.get('[title="Social Data"]')
      .should("be.visible")
      .within(() => {
        cy.get("#Bill_sl_familySalary").clear().type("3000");
        cy.get("#Bill_sl_numberOfHouseholdMembers").clear().type("3");

        cy.get("x-fff-salary-ratio").should("contain.text", "1000");
        cy.get("[field=Sociallevel]").should("contain.text", 2);
      });

    cy.get("[title=Summary]")
      .should("be.visible")
      .within(() => {
        cy.get("#Bill_Sociallevel").should("contain.text", 2);
        cy.get("#percentage").should("contain.text", "40%");
        cy.get("#total_calculated_asked").should("contain.text", "66");
      });

    // Payment
    cy.get("#first_payment").type("20");

    // Save
    cy.get("#topsubmenu #button_save").should("be.visible").click();
    crReady();

    // Check the result page
    cy.log("Check the result page");

    cy.get('[title="Social Data"]')
      .should("be.visible")
      .within(() => {
        cy.get("#Bill_sl_familySalary").should("contain.text", "3000");
        cy.get("#Bill_sl_numberOfHouseholdMembers").should("contain.text", "3");

        cy.get("x-fff-salary-ratio").should("contain.text", "1000");
        cy.get("[field=Sociallevel]").should("contain.text", 2);
      });

    cy.get("[title=Summary]")
      .should("be.visible")
      .within(() => {
        cy.get("#Bill_Sociallevel").should("contain.text", 2);
        cy.get("#percentage").should("contain.text", "40%");
        cy.get("#total_calculated_asked").should("contain.text", "66");
      });

    // TODO: check items
    // TODO: check payments

    cy.crCompareSnapshot("-2-view");

    // TODO: add payment and check
  });

  it.skip("add a bill without a total is an error", () => {
    setDate("2015-01-01");
    cy.get("#top_menu #button_save").click();
    // Error must be shown !
  });
});
