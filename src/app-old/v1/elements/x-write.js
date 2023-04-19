/* istanbul ignore file */

import JHElement from "./jh-element.js";
import "./x-write-list.js";
import "./x-input-date.js";

export default class XWrite extends JHElement {
  static get properties() {
    return {
      type: "String",
      value: "String",
      list: "Object",
      listName: "String"
    };
  }

  adapt() {
    if (!this._type) {
      this.innerHTML = `<span id='${this._value}' class='error'>Read: key is not defined: '${this._type}'</span>`;
      return;
    }

    let el = false;

    let inline = ""; //= this.attributes;
    for (const a of this.attributes) {
      const n = a.name;
      if (n == "name" || n == "id" || n == "type") {
        continue;
      }
      if (n in this.constructor.properties) {
        continue;
      }
      inline += ` ${n}='${a.value}'`;
    }

    switch (this._type) {
      case "timestamp":
        this.innerHTML = `<x-read type='${this._type}' value='${this._value}'></x-read>`;
        this.getValue = () => this._value;
        break;
      case "boolean":
        this.innerHTML = `<input type='checkbox' ${
          this._value ? "checked" : ""
        }/>`;
        el = this.querySelector("input");
        this.getValue = () => el.checked;
        break;
      case "date":
        this.innerHTML = `<x-input-date value='${this._value}' ${inline} />`;
        el = this.querySelector("x-input-date");
        this.getValue = () => el.value;
        break;
      case "numeric":
        this.innerHTML = `<input type='number' value='${this._value}' ${inline} />`;
        el = this.querySelector("input");
        this.getValue = () => {
          if (el.value === "") {
            return null;
          }
          return parseFloat(el.value);
        };
        break;
      case "char":
        this.innerHTML = `<input value='${this._value}' ${inline} />`;
        el = this.querySelector("input");
        this.getValue = () => el.value;
        break;
      case "text":
        this.innerHTML = `<textarea ${inline}>${this._value}</textarea>`;
        el = this.querySelector("textarea");
        this.getValue = () => el.value;
        break;
      case "list":
        this.innerHTML = `<x-write-list value='${
          this._value
        }' list='${JSON.stringify(this._list)}' list-name='${
          this._listName
        }' ${inline}></x-write-String>`;
        el = this.querySelector("x-write-list");
        this.getValue = () => el.value;
        break;
      default:
        console.error("Type unknown: ", this._type);
        this.innerHTML = `<span class='error'>unknown type: ${this._type}</span>`;
        break;
    }

    if (el) {
      if (el.matches("input") || el.matches("textarea")) {
        el.addEventListener("blur", () => {
          this.fire("blur", this.value);
        });
        el.addEventListener("change", (event) => {
          // If we still have the focus, we don't go further
          // This is in the case of input[numeric], where
          // clicking on gui is not setting the focus...
          if (event.target.matches(":focus")) {
            event.stopPropagation();
            return false;
          }
          this.fire("blur", this.value);
        });
      } else {
        el.addEventListener("blur", () => {
          this.fire("blur", this.value);
        });
      }
    }
  }

  set value(v) {
    this.attributeChangedCallback("value", this._value, v);
  }

  get value() {
    return this.getValue();
  }
}

window.customElements.define("x-write", XWrite);
