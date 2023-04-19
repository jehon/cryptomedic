import { createElementWithTag } from "./custom-element.js";
import { toSentenceCase } from "./string-utils.js";

export const TYPES = Object.freeze({
  TEXT: "text",
  NOTES: "notes",
  BOOLEAN: "boolean"
});

/**
 * @param {string} type of the input
 * @param {string} name in the input
 * @param {*} value of the input
 * @param {object?} opts to enrich the element
 * @returns {HTMLElement} generated
 */
export default function getInputObject(type, name, value = "", opts = {}) {
  switch (type) {
    case TYPES.TEXT:
      return createElementWithTag("input", {
        name,
        value,
        class: "form-control",
        placeholder: toSentenceCase(name),
        ...opts
      });
    case TYPES.NOTES:
      return createElementWithTag("textarea", {
        name,
        value,
        class: "form-control",
        placeholder: toSentenceCase(name),
        ...opts
      });
    case TYPES.BOOLEAN:
      return createElementWithTag("input", {
        type: "checkbox",
        value: "1",
        name,
        ...(value ? { checked: true } : {})
      });
  }
}
