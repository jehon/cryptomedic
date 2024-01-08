import { crGo, crPage } from "./helpers/cr.js";
import { guiHashStartWith } from "./helpers/gui.js";

context("Actions", () => {
  it("should show error on bad login", () => {
    crGo();
    guiHashStartWith("/login");

    crPage().within(() => {
      cy.get('[name="username"]').invoke("attr", "value", "murshed");
      cy.get('[name="password"]').invoke("attr", "value", "invalid");
      cy.get("x-button#submit").click();

      cy.get("x-page-login")
        .find("x-form")
        .shadow()
        .find('x-message[msg-id="invalid-credentials"')
        .should("have.text", "Invalid credentials");

      //      cy.crCompareSnapshot("invalid-credentials");
    });
  });
});
