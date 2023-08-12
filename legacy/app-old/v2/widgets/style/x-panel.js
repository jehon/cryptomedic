import "../../../../../node_modules/css-inherit/jehon-css-inherit.js";
import {
  createElementWithTag,
  getHTMLNameOfClass
} from "../../js/custom-element.js";

/**
 * @param {HTMLElement} element to be applied on
 * @param {boolean?} full if need to take full place
 * @returns {HTMLStyleElement} to be applied to each element
 */
export function getPanelStyles(element, full = false) {
  return /** @type {HTMLStyleElement} */ (
    createElementWithTag(
      "style",
      {},
      `

:host(${getHTMLNameOfClass(element)}) {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 0px;
    margin: 0px;

    box-sizing: border-box;

${
  full
    ? `
    height: 100%;
    width: 100%;
`
    : ""
}
}

:host([full]) {
    height: 100%;
    width: 100%;
}
    `
    )
  );
}

/**
 * Slot[]: content to be shown in the pannel
 */
export default class XPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(
      getPanelStyles(this, true),
      createElementWithTag("slot")
    );
  }
}

customElements.define("x-panel", XPanel);
