/* istanbul ignore file */

import JHElement from "./jh-element.js";
import date2Display from "../../v2/js/date2Display.js";

const element = Symbol("element");

const cleanUpDate = function (val) {
  if (val instanceof Date) {
    val = val.toISOString();
  }
  if (typeof val === "string") {
    val = val.substring(0, 10);
  }

  if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(val)) {
    // Invalid date
    val = "";
  }
  return val;
};

export default class XInputDate extends JHElement {
  static get properties() {
    return {
      value: "String"
    };
  }

  render() {
    super.render();
    this._value = cleanUpDate(this._value);
    // http://jsfiddle.net/g7mvaosL/3421/
    this.innerHTML = `
				<style>
					x-input-date > input[type=date] {
						position: relative;
						width: 150px; height: 20px;
						border-style: none;
					}

					x-input-date > input[type=date]:before {
						position: absolute;
						display: inline-block;
						color: black;
						content: attr(data-date);
						background-color: white;
						width: 120px;
						height: 20px;
					}
				</style>
				<input type=date value='${this._value}'>
			`;
    this[element] = this.querySelector("input");
    this[element].addEventListener("change", () => {
      this[element].setAttribute(
        "data-date",
        date2Display(this[element].value)
      );
    });
    JHElement.fireOn(this[element], "change");

    this[element].addEventListener("blur", () => this.fire("blur"));
    this.addEventListener("click", () => {
      this[element].focus();
    });
  }

  onValueChanged() {
    this.value = this._value;
  }

  set value(val) {
    this._value = cleanUpDate(val);
    this[element].value = this._value;
    JHElement.fireOn(this[element], "change");
  }

  get value() {
    if (!(element in this)) {
      return null;
    }
    return this[element].value;
  }
}

window.customElements.define("x-input-date", XInputDate);
