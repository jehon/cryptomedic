import { crApiLogin } from "./cr-api.js";
import { guiHashStartWith } from "./gui.js";

/**
 * Test that everything is ready
 * - no request running
 * - no (visible) image loading
 */
export function crReady() {
  cy.root()
    .closest("html")
    .within(() => {
      cy.get("x-requestor[running]", { includeShadowDom: true }).should(
        "not.exist"
      );

      // We need at least a img for this to work...
      cy.get("img", { includeShadowDom: true })
        .filter("[src]")
        .filter(":visible")
        .each(
          // https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/testing-dom__wait-for-resource/README.md#delayed-image
          /** @type {HTMLImageElement} */
          (img) => cy.wrap(img).should("be.visible")
          // expect(img.naturalWidth, "loaded: ").to.be.greaterThan(0)
        );
    });
}

/**
 * Make a login using API and notify GUI
 *
 * @param {string?} username
 * @param {string?} password
 */
export function crLoginInBackground(username = null, password = null) {
  cy.visit("/");
  const realUser = crApiLogin(username, password);
  crGo();
  cy.get("x-user-status #user").should("have.text", realUser);
  guiHashStartWith("/home");

  crReady();
  cy.log(`Done crLoginInBackground: ${realUser}`);
}

/**
 * Go to route
 *   and wait for "crReady"
 *
 * @param {string} route
 */
export function crGo(route = "") {
  cy.visit(`/static/#${route}`);
  crReady();
  cy.log(`Done crGo: ${route}`);
}

/**
 * Get the page element
 *
 * @returns {Cypress.Chainable} with the Page element
 */
export function crPage() {
  crReady();
  return cy.get("#main_content").should("be.visible");
}

export function crFormFillIn(subject, fields) {
  cy.get(subject)
    .should("be.visible")
    .within(() => {
      for (const f in fields) {
        cy.get(f).should("be.visible");

        cy.get(f).invoke("focus");

        if (fields[f] === true) {
          cy.get(f).click();
        } else if (fields[f] === false) {
          // no action needed
        } else if (typeof fields[f] == "object") {
          for (let k of Object.keys(fields[f])) {
            cy.get(f).invoke("attr", k, fields[f][k]);
          }
        } else if (f.substring(0, 6) == "select") {
          //         this.mySelect(fsel, fields[f]);
        } else {
          cy.get(f).clear();
          cy.get(f).type(fields[f]);
          cy.get(f).then((el) => {
            el.value = fields[f];
          });
        }
        // cy.get('@element').tab(); cypress-plugin-tab
        // this.execute(function (fsel) { document.querySelector(fsel).blur(); }, [fsel]);
      }
    });

  cy.log("Done: crFormFillIn: ", fields);
}
