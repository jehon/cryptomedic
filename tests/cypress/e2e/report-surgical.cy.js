import flavorFilter from "./helpers/filter-tests.js";
import { goReport } from "./helpers/report.js";

flavorFilter(flavorFilter.DESKTOP, () =>
  context("Actions", () => {
    it("should show report", () => {
      goReport(
        "surgical",
        () => {
          cy.get('[label="Period"] > x-input-list').invoke(
            "attr",
            "value",
            "month"
          );
          cy.get('input[name="month"]').clear();
          cy.get('input[name="month"]').type("2014-01");
        },
        (tableIterator) =>
          tableIterator
            .row(2)
            .col(3)
            .assert("Ukhia")
            .nextCol()
            .assert("2014-104")
      );
    });
  })
);
