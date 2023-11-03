import { crApiLogin } from "./helpers/cr-api.js";
import { crGo, crLoginInBackground, crPage } from "./helpers/cr.js";
import { guiHashStartWith } from "./helpers/gui.js";

context("Actions", () => {
  it("login", () => {
    crGo();
    guiHashStartWith("/login");
    crPage().within(() => {
      cy.get("x-page-login").should("be.visible");
      cy.crCompareSnapshot("x-page-login");

      cy.get('[name="username"]').invoke("attr", "value", crApiLogin.RO);
      cy.get('[name="password"]').invoke("attr", "value", "p");
      cy.get("x-button#submit").click();
    });

    cy.get("x-user-status").within(() => {
      cy.get("#user").should("have.text", crApiLogin.RO);
      cy.crCompareSnapshot("x-user-status");
    });
  });

  it("login in background", () => {
    crLoginInBackground(crApiLogin.RO);
    guiHashStartWith("/home");
    cy.get("x-user-status #user").should("have.text", crApiLogin.RO);
  });
});
