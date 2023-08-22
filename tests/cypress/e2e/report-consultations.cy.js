import XButton from "../../../legacy/app-old/v2/widgets/style/x-button.js";
import flavorFilter from "./helpers/filter-tests.js";
import { goReport } from "./helpers/report.js";

flavorFilter(flavorFilter.DESKTOP, () =>
  context("Actions", () => {
    it("should show report", () => {
      goReport(
        "consultations",
        () => {
          // cy.get('@form').find('[label="Period"] > x-input-list').invoke('attr', 'value', 'day');
          cy.get('x-input-date[name="day"]').invoke(
            "attr",
            "value",
            "2015-04-28"
          );

          cy.get(`x-button[action="${XButton.Search}"]`).click();
        },
        (tableIterator) =>
          tableIterator
            .row(3)
            .assert("Chakaria Disability Center")
            .col(2)
            .assert("2001-1")
      );
    });
  })
);
