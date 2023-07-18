/* istanbul ignore file */

import JHElement from "./jh-element.js";
import "./x-read-boolean.js";

export default class XRead extends JHElement {
  static get properties() {
    return {
      type: "String",
      value: "String"
    };
  }

  adapt() {
    if (!this._type) {
      this.innerHTML = `<span class='error'>Read: key is not defined: '${this._type}'</span>`;
      return;
    }

    switch (this._type) {
      case "timestamp":
        var display = "";
        if (this._value > "") {
          let date = new Date(Date.parse(this._value));
          if (isNaN(date.getYear())) {
            display = "";
          } else {
            display =
              date.toLocaleDateString() + " " + date.toLocaleTimeString();
          }
        }
        this.innerHTML = `<span>${display}</span>"`;
        break;
      case "boolean":
        this._value = this.constructor.canonizeBoolean(this._value);
        this.innerHTML = `<x-read-boolean value='${this._value}'></x-read-boolean>`;
        break;
      case "numeric":
        this._value = parseFloat(this._value);
        // TODO: fix rounding
        this.innerHTML = `<span>${this._value}</span>`;
        break;
      case "list":
      case "date":
      case "char":
        this.innerHTML = `<span>${this._value}</span>`;
        break;
      case "text":
        this.innerHTML = `<span style='white-space: pre'>${this._value}</span>`;
        break;

      default:
        console.error("Type unknown: ", this._type);
        this.innerHTML = `<span>unknown type: ${this._type}</span>`;
        break;
    }
  }
}

window.customElements.define("x-read", XRead);
