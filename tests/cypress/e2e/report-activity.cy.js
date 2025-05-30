import { goReport } from "./helpers/report.js";

context("Actions", () => {
  it("should show report", () => {
    goReport(
      "activity-report",
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
        tableIterator
          .assert("1")
          .nextCol()
          .assert("2014-05")
          .nextCol()
          .assert("Ershad")
          .nextCol()
          .assert("RA") // Ramu (codage)
          .nextCol()
          .assert("2014-103")
          .nextCol()
          .assert("OSMAN")
          .nextCol()
          .assert("5y4m")
          .nextCol()
          .assert("Male")
          .nextCol()
          .assert("Old")
          .nextCol()
          .assert("4500")
          .nextCol()
          .assert("9")
          .nextCol()
          .assert("500")
          .nextCol()
          .assert("2")
          .nextCol()
          .assert("CF")
          .nextCol()
          .assert("CsP")
          .nextCol()
          .assert("Plast")

          .nextCol(4)
          .assert("100")
          .nextCol()
          .assert("0")
          .nextCol()
          .assert("0")
          .nextCol()
          .assert("0")
          .nextCol()
          .assert("400")
          .nextCol()
          .assert("500")
          .nextCol()
          .assert("100")
          .nextCol()
          .assert("")

          // New / Old patient in same month
          .row(2)
          .col(5)
          .assert("2014-107")
          .nextCol(4)
          .assert("New")
          .nextRow(1)
          .col(5)
          .assert("2014-107")
          .nextCol(4)
          .assert("Old")

          // Payment recovery
          .row(6)
          .col(3)
          .assert("Ershad")
          .nextCol()
          .assert("CDC")
          .col(16)
          .assert("Plast")
          .nextCol(4)
          .assert("Complementary payments")
          .lastCol()
          .assert("113")

          .section("tfoot")
          .lastRow()
          .col(2)
          .assert("400")
          .lastCol()
          .assert("569")
    );
  });
});
