import escapeStringRegexp from "escape-string-regexp";

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
