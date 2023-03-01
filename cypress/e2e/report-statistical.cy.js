/// <reference types="Cypress" />

import flavorFilter from "./helpers/filter-tests.js";
import { goReport } from "./helpers/report.js";

flavorFilter(flavorFilter.DESKTOP, () =>
  context("Actions", () => {
    it("should show report", () => {
      goReport(
        "statistical",
        () => {
          cy.get('[label="Period"] > x-input-list').invoke(
            "attr",
            "value",
            "month"
          );
          cy.get('input[name="month"]').clear().type("2014-05");
        },
        (tableIterator) =>
          tableIterator.row(8).col(1).assert("Club Foots").nextCol().assert("5")
      );
    });
  })
);
