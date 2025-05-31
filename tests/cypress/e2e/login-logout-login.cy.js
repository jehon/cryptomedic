import { crGo, crPage } from "./helpers/cr.js";
import { guiHashStartWith } from "./helpers/gui.js";

context("Actions", () => {
  it("login - logout - login", () => {
    crGo();
    guiHashStartWith("/login");

    crPage().within(() => {
      // Login
      cy.get('[name="username"]').invoke("attr", "value", "murshed");
      cy.get('[name="password"]').invoke("attr", "value", "p");
      cy.get("x-button#submit").click();
      guiHashStartWith("/");
    });

    cy.get("x-user-status #user").should("have.text", "murshed");

    // Logout
    cy.get("x-user-status x-button").click();

    guiHashStartWith("/login");

    crPage().within(() => {
      // Login back again
      cy.get('[name="username"]').invoke("attr", "value", "thierry");
      cy.get('[name="password"]').invoke("attr", "value", "p");
      cy.get("x-button#submit").click();
    });

    cy.get("x-user-status #user").should("have.text", "thierry");
  });
});
