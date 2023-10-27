import escapeStringRegexp from "escape-string-regexp";

/**
 * @param cb
 */
export function guiAcceptAlert(cb = (_txt) => {}) {
  cy.on("window:alert", (txt) => cb(txt));
  cy.log("Alert accepted");
}

/**
 * @param hash
 * @param strict
 */
export function guiHashStartWith(hash, strict = false) {
  cy.hash().should(
    "match",
    new RegExp(
      `^#${escapeStringRegexp(hash)}${strict ? "" : "([/].*)?"}([?].*)?$`
    )
  );
}

export function getByDataRole(dataRole) {
  return cy.get(`[data-role="${dataRole}"]`);
}

export function getByTestId(testId) {
  return cy.get(`[data-test-id="${testId}"]`);
}

export function expectFieldContain(field, value) {
  getByDataRole(field).get(".content").should("contain.text", value);
}
