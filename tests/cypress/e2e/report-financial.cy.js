import { goReport } from "./helpers/report.js";

context("Actions", () => {
  it("should show report", () => {
    goReport(
      "financial-report",
      () => {
        cy.get('[label="Period"] > x-input-list').invoke(
          "attr",
          "value",
          "year"
        );
        cy.get('input[name="year"]').clear();
        cy.get('input[name="year"]').type("2014");
      },
      (tableIterator) =>
        tableIterator
          .row(1)
          .col(1)
          .assert("2014-103")
          .nextCol()
          .assert("OSMAN")
          .nextCol()
          .assert("5")

          .section("tfoot")
          .col(5)
          .assert(4)
          .nextCol(3)
          .assert(2)
          .nextCol()
          .assert(1000)
    );
  });
});
