import { crReady } from "../e2e/helpers/cr.js";

const SHADOW_SELECTOR = "[variable], [data-variable=variable]";

Cypress.Commands.add("crCompareSnapshot", (name = "") => {
  crReady();

  //
  // Remove caret by putting it on the offsecreen input
  //
  //
  // Add an input to hold the focus. This input is "offscreen"
  // We do this here to enjoy the crReady delay (if necessary)
  //
  // Note: Tried to create the input here, but that cause the "cy.within" to be resetted
  //

  cy.document().then((document) => {
    document.querySelector("input#no-caret").focus();
  });

  // TODO: clean-up this wait, but don't know how to do that otherwise
  cy.wait(100); /* eslint-disable-line */

  var testName = ""
    .concat(Cypress.spec.name.replace(".js", ""))
    .concat(name ? "-" + name : ""); // Take a screenshot and copy to baseline if it does not exist

  const setStyle = (style = "") => {
    cy.document().then((el) =>
      el
        .querySelectorAll(SHADOW_SELECTOR)
        .forEach((el) => (el.style.display = style))
    );
  };

  // Hide those
  setStyle("none");
  cy.screenshot(testName);
  // Reset those
  setStyle();
});
