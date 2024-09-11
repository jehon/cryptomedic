import { spacing } from "../../../../config.js";
import { createElementWithTag } from "../../js/custom-element.js";
import { getPanelStyles } from "../style/x-panel.js";

/**
 * Slot[]: content
 */
export default class XButtons extends HTMLElement {
  static get Tag() {
    return "x-buttons";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(
      getPanelStyles(this.constructor.Tag, true),
      createElementWithTag(
        "style",
        {},
        `
    :host(x-buttons) {
        width: 100%;

        flex-wrap: wrap;
        flex-direction: row;
        align-content: end;
        gap: ${spacing.element};

        margin: 0px;
        margin-top: 10px;

        background-color: transparent;
        /* background-color: white !important; */
    }

    ::slotted(*) {
        flex-grow: 1;
    }
`
      ),
      createElementWithTag("slot")
    );
  }
}

customElements.define(XButtons.Tag, XButtons);
