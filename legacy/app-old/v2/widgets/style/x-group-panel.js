import { spacing } from "../../../../config.js";
import { createElementWithTag } from "../../js/custom-element.js";
import { getPanelStyles } from "./x-panel.js";

/**
 * Slot[]: content
 */
export default class XGroupPanel extends HTMLElement {
  static get Tag() {
    return "x-group-panel";
  }

  static get observedAttributes() {
    return ["title"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(
      getPanelStyles(this.constructor.Tag),
      createElementWithTag(
        "style",
        {},
        `
    fieldset {
        height: 100%;
        width: 100%;

        margin: 0px;
        padding: ${spacing.element};

        border: solid 2px #002060;
        border-radius: 10px;

        /* Horizontal Flex [versal - content ]*/
        display: flex;
        flex-grow: 1;
    }

    fieldset > legend {
        margin-bottom: 0;
        padding-left: 10px;
        padding-right: 10px;

        font-size: 120%;
        color: #004a94;
        border: 0;
        border-bottom: 1px solid #e5e5e5;
    }

    /***************************
     *
     * Versal (left)
     *
     * TODO: align top the versal !
     */

    ::slotted([slot=versal]) {
        background-color: white;
        flex-grow: 0;
        margin: ${spacing.text};
        object-fit: contain;
    }

    /***************************
     *
     * Main content (right)
     *
     */

    slot:not([name]) {
        flex-grow: 1;

        display: flex;
        flex-direction: column;
        margin: ${spacing.element};

        height: 100%;
    }

    ::slotted(:not(hr):not([slot]):not([white]):nth-child(odd)) {
        background-color: #f5f5f5;
    }

    ::slotted(:not(hr):not([slot]):not([white]):nth-child(even)) {
        background-color: lightgray;
    }
`
      ),

      createElementWithTag("fieldset", {}, [
        (this._legend = createElementWithTag("legend")),
        createElementWithTag("slot", { name: "versal" }),
        createElementWithTag("slot")
      ])
    );
  }

  attributeChangedCallback(attributeName, _oldValue, newValue) {
    switch (attributeName) {
      case "title":
        this._legend.innerHTML = newValue;
        break;
    }
  }

  checkValidity() {
    // TODO: legacy, but used for bill_fiche.php
    return true;
  }
}

customElements.define(XGroupPanel.Tag, XGroupPanel);
