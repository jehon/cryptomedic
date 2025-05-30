import XButton from "../../../../legacy/app-old/v2/widgets/style/x-button.js";
import { crApiLogin } from "./cr-api.js";
import { crLoginInBackground, crPage } from "./cr.js";
import TableIterator from "./table-iterator.js";

export function goReport(reportTestId, fillInFieldsCb, checkCb) {
  crLoginInBackground(crApiLogin.RO);

  crPage().within(() => {
    cy.get(`[data-testid='${reportTestId}'] button`).click();

    cy.get("x-page-reports")
      .should("be.visible")
      .within(() => {
        cy.get("x-form#report_input")
          .should("be.visible")
          .within(() => {
            // Ensure that the xpanel is gone
            cy.get(`x-button[action="${XButton.Search}"]`).should("be.visible");
            cy.get("x-panel#overlay").should("not.exist");

            fillInFieldsCb();
            cy.get(`x-button[action="${XButton.Search}"]`).click();
          });

        cy.get("x-table[count]").should("be.visible");
        cy.get("x-table[empty]").should("not.exist");

        checkCb(new TableIterator("x-table"));
        cy.crCompareSnapshot();
      });
  });
}
