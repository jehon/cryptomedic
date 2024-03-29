import date2Display from "../../js/date2Display.js";

export default class XDisplayDate extends HTMLElement {
  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(attributeName, _oldValue, newValue) {
    switch (attributeName) {
      case "value":
        this.innerHTML = date2Display(newValue);
        break;
    }
  }
}

customElements.define("x-display-date", XDisplayDate);
