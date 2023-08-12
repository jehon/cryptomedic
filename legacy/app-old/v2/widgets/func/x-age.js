/* istanbul ignore file */

import { yearsToYM, fromBirthDateTo } from "../file/x-fff-age";

export default class XAge extends HTMLElement {
  static get observedAttributes() {
    return ["value", "ref"];
  }

  constructor() {
    super();
    this.adapt();
  }

  attributeChangedCallback(_attributeName, _oldValue, _newValue) {
    this.adapt();
  }

  adapt() {
    // Do we need to hide this in the e2e screenshots ?
    if (this.hasAttribute("ref")) {
      this.removeAttribute("variable");
    } else {
      this.setAttribute("variable", "variable");
    }
    try {
      this.removeAttribute("error");
      this.innerHTML = yearsToYM(this.value);
    } catch (e) {
      this.setAttribute("error", e.id);
      this.innerHTML = e.message;
    }
  }

  get value() {
    const value = this.getAttribute("value");
    const ref = this.getAttribute("ref");
    return fromBirthDateTo(value, ref ? ref : new Date());
  }
}

customElements.define("x-age", XAge);
