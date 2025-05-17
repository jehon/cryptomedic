import { getAuthorized, onSession } from "../../../../../src/utils/session.ts";
import { createElementWithTag } from "../../js/custom-element.js";
import { getPanelStyles } from "../style/x-panel.js";

/**
 * Slot[]: content
 */
export default class XRestricted extends HTMLElement {
  static get Tag() {
    return "x-restricted";
  }

  static get observedAttributes() {
    return ["restricted-by", "inverted"];
  }

  constructor() {
    super();
    /**@type {function} */
    this.unreg = null;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(
      getPanelStyles(this.constructor.Tag),
      createElementWithTag(
        "style",
        {},
        `

:host(:not([authorized])) {
    display: none;
}

`
      ),
      createElementWithTag("slot")
    );
  }

  connectedCallback() {
    // Will fire immediately
    this.unreg = onSession(() => this.adapt());
    this.adapt();
  }

  disconnectedCallback() {
    /* istanbul ignore else */
    if (this.unreg) {
      this.unreg();
    }
    this.unreg = null;
  }

  attributeChangedCallback(attributeName, _oldValue, _newValue) {
    switch (attributeName) {
      case "restricted-by":
      case "inverted":
        this.adapt();
        break;
    }
  }

  adapt() {
    const authKey = this.getAttribute("restricted-by");
    let active = false;
    if (authKey) {
      active = getAuthorized(authKey);
      if (this.hasAttribute("inverted")) {
        active = !active;
      }
    }
    if (active) {
      this.setAttribute("authorized", "authorized");
    } else {
      this.removeAttribute("authorized");
    }
  }
}

window.customElements.define(XRestricted.Tag, XRestricted);
