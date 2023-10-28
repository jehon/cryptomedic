import { createElementWithTag } from "../js/custom-element.js";

/**
 * @param {string} tag as the basis of the styling
 * @returns {HTMLElement} with the content
 */
export default function pageStyles(tag) {
  return createElementWithTag(
    "style",
    {},
    `
        ${tag} {
            display: block;
        }
    `
  );
}
