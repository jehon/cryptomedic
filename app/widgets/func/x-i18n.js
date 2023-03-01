import { defineCustomElement } from "../../js/custom-element.js";

export default class XI18n extends HTMLElement {
  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(_attributeName, _oldValue, newValue) {
    if (newValue) {
      this.innerHTML = newValue
        .split("_")
        .join(" ")
        .split(/(?=[A-Z]+[a-z])/)
        .join(" ");
    } else {
      this.innerHTML = "";
    }
  }
}

defineCustomElement(XI18n);
