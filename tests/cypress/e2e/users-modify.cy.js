import XButton from "../../../legacy/app-old/v2/widgets/style/x-button.js";
import { crApiUserDelete, crApiLogin, crApiLogout } from "./helpers/cr-api.js";
import { crGo, crLoginInBackground } from "./helpers/cr.js";
import flavorFilter from "./helpers/filter-tests.js";

function getRowByUsername(username) {
  return cy
    .get("x-table[count]:not([count=0])")
    .find("tr")
    .find("td")
    .contains(username)
    .parent();
}

flavorFilter(flavorFilter.DESKTOP, () =>
  context("Actions", () => {
    const username = "cypress_user_modify_spec";

    before(() => {
      crLoginInBackground(crApiLogin.ADMIN);
      crApiUserDelete(username);
    });

    it("list users", () => {
      crGo("/users");
      cy.get("x-page-users-list")
        .should("be.visible")
        .within(() => {
          // Check the data's
          getRowByUsername("ershad")
            .find("td:nth-child(1)")
            .should("contains.text", "105");
          getRowByUsername("ershad")
            .find("td:nth-child(2)")
            .should("contains.text", "ershad");
          cy.crCompareSnapshot("1 - listing");

          // Add a user
          cy.get("x-button#add").click();
        });

      cy.get("x-page-user-edit")
        .should("be.visible")
        .within(() => {
          cy.get('[name="username"]').type(username);
          cy.get('[name="name"]').type("Cypress");
          cy.crCompareSnapshot("2 - add user");

          cy.get(`x-button[action="${XButton.Save}"]`).click();
        });
      // Add a user: confirm
      cy.get("x-overlay.acknowledge x-button").click();

      cy.get("x-page-users-list")
        .should("be.visible")
        .within(() => {
          // Find back in the menu
          getRowByUsername(username).find("x-button#pwd").click();
        });

      // Set a password
      cy.get("x-page-user-password")
        .should("be.visible")
        .within(() => {
          cy.get('[name="password"]').type("test");
          cy.crCompareSnapshot("3 - set password");

          cy.get(`x-button[action="${XButton.Save}"]`).click();
        });

      // Test that the new login is working correctly
      crApiLogout();
      crApiLogin(username, "test");
      crApiLogout();

      crLoginInBackground(crApiLogin.ADMIN);
      crGo("/users");

      cy.get("x-page-users-list")
        .should("be.visible")
        .within(() => {
          getRowByUsername(username).find("x-button#edit").click();
        });

      cy.get("x-page-user-edit")
        .should("be.visible")
        .within(() => {
          // Edit it back
          cy.get('[name="username"]').should("contain.value", username);

          // Delete it
          cy.get(`x-button[action="${XButton.Delete}"]`).click();
        });

      // Delete it: confirm
      cy.get("x-overlay.acknowledge x-button").click();
    });
  })
);
