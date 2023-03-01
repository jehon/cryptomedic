import {
  createElementWithTag,
  getHTMLNameOfClass
} from "../js/custom-element.js";

/**
 * @param {HTMLElement} el as the basis of the styling
 * @returns {HTMLElement} with the content
 */
export default function pageStyles(el) {
  return createElementWithTag(
    "style",
    {},
    `
        ${getHTMLNameOfClass(el)} {
            display: block;
        }
    `
  );
}
