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

customElements.define("x-i18n", XI18n);
