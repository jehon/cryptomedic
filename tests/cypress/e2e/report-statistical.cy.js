import { goReport } from "./helpers/report.js";

context("Actions", () => {
  it("should show report", () => {
    goReport(
      "statistical-report",
      () => {
        cy.get('[label="Period"] > x-input-list').invoke(
          "attr",
          "value",
          "month"
        );
        cy.get('input[name="month"]').clear();
        cy.get('input[name="month"]').type("2014-05");
      },
      (tableIterator) =>
        tableIterator.row(8).col(1).assert("Club Foots").nextCol().assert("5")
    );
  });
});
