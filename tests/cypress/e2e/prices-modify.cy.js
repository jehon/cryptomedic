import XButton from "../../../legacy/app-old/v2/widgets/style/x-button.js";
import {
  crApiLogin,
  crApiPriceDelete,
  crApiPriceList
} from "./helpers/cr-api.js";
import { crGo, crLoginInBackground, crReady } from "./helpers/cr.js";
import flavorFilter from "./helpers/filter-tests.js";
import TableIterator from "./helpers/table-iterator.js";

function assertTableInitial(i = 0) {
  new TableIterator("#price_lists", { xtable: false })
    .section("thead")
    .row(1)
    .col(1)
    .assert("Beginning date")
    .col(1 + i)
    .nextCol()
    .assert("2016-01-03")
    .nextCol()
    .assert("2013-01-01")
    .nextCol()
    .assert("")
    .row(4)
    .col(1)
    .assert("")
    .col(1 + i)
    .nextCol()
    .assert("Locked")
    .nextCol()
    .assert("Locked")
    .nextCol()
    .assert("Locked")
    .section("tbody")
    .row(1)
    .col(1)
    .assert("consult_CDC_consultation_Bengali_Doctor")
    .col(1 + i)
    .nextCol()
    .assert("300")
    .nextCol()
    .assert("300")
    .nextCol()
    .assert("200")
    .nextRow(4)
    .col(1)
    .assert("consult_field_visit")
    .col(1 + i)
    .nextCol()
    .assert("-")
    .nextCol()
    .assert("-")
    .nextCol()
    .assert("100")
    .nextRow(7)
    .col(1)
    .assert("other_Other_consultation_care")
    .col(1 + i)
    .nextCol()
    .assert("open")
    .nextCol()
    .assert("open")
    .nextCol()
    .assert("open");

  cy.get("#button_save_" + i).should("not.exist");
  cy.get("#button_save_" + (i + 1)).should("not.exist");
  cy.get("#button_save_" + (i + 2)).should("not.exist");
}

flavorFilter(flavorFilter.DESKTOP, () =>
  context("Actions", () => {
    beforeEach(() => {
      crLoginInBackground(crApiLogin.ADMIN);
      crApiPriceList().then((data) => {
        data.forEach((p) => {
          if (p.datefrom > "2130") {
            crApiPriceDelete(p.id);
          }
        });
      });

      crGo("prices");
    });

    it("create a new Price List", () => {
      assertTableInitial();
      cy.crCompareSnapshot();

      // Button to create a new price list
      cy.get("#button_create").should("be.visible").click();
      cy.get("#button_create").should("be.visible");

      cy.get("x-overlay.pivot").should("be.visible");
      cy.get("x-overlay.pivot").within(() => {
        // with an invalic date, it fail
        cy.get("[name=pivot]").should("be.visible");
        cy.get("[name=pivot]").invoke("attr", "value", "2010-01-02");
        cy.get(`x-button[action='${XButton.Save}']`).click();
        cy.get("x-form").should("be.visible");
        cy.get("x-form")
          .shadow()
          .find("x-messages x-message#custom-validation")
          .should("be.visible");

        cy.get("[name=pivot]").invoke("attr", "value", "2130-01-01");
        cy.get(`x-button[action='${XButton.Save}']`).click();
      });
      cy.get("x-overlay.pivot").should("not.exist");

      // Creation ok
      cy.get("#button_create").should("not.to.be.visible");
      assertTableInitial(1);

      // Edit the form
      cy.get('#price_lists [name="consult_CDC_consultation_Doctor"]')
        .should("be.visible")
        .invoke("attr", "value", "123");

      cy.get(`table x-button[action=${XButton.Save}]`)
        .should("be.visible")
        .click();

      cy.get(`x-overlay x-button[action=${XButton.Default}`).click();

      // Check the modif
      crReady();
      new TableIterator("#price_lists", { xtable: false })
        .section("tbody")
        .col(2)
        .row(1)
        .assert(300)
        .nextRow()
        .assert(123)
        .nextRow()
        .assert(100)
        .nextRow()
        .assert(100)
        .row(12)
        .assert("open");

      assertTableInitial(1);

      // Delete it back
      cy.get(`table x-button[action=${XButton.Delete}]`)
        .should("be.visible")
        .click();
      crReady();

      assertTableInitial();
    });
  })
);
