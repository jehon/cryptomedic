/* istanbul ignore file */

import JHElement from "./jh-element.js";

export default class XReadBoolean extends JHElement {
  static get properties() {
    return {
      value: "Boolean"
    };
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  render() {
    super.render();

    this.shadowRoot.innerHTML = `
                <img>
              `;
  }

  adapt() {
    super.adapt();

    this.shadowRoot
      .querySelector("img")
      .setAttribute(
        "src",
        `/static/img/boolean-${this._value ? "true" : "false"}.gif`
      );
  }
}

window.customElements.define("x-read-boolean", XReadBoolean);
