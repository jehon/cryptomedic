import {
  copyAttributes,
  defineCustomElement
} from "../../js/custom-element.js";
import { nround } from "../../js/number-utils.js";
import XIoString from "./x-io-string.js";
/**
 * Attributes:
 *  - radix[0] (used only at value change): number of decimal to keep
 *
 */
export default class XIoNumeric extends XIoString {
  static get transmissibleAttributesWithDefaultValues() {
    return super.transmissibleAttributesWithDefaultValues;
  }

  constructor() {
    super();

    // Set the initial value without calling the setter
    this.value = 0;
  }

  /**
   * @param {number|string} val to be rounded
   * @returns {number} rounded
   */
  _round(val) {
    if (typeof val == "string") {
      val = parseFloat(val);
    }

    const radix = this.hasAttribute("radix")
      ? parseInt(this.getAttribute("radix"))
      : 0;
    return nround(val, radix);
  }

  /**
   * @override
   */
  set value(val) {
    super.value = val;
  }

  /**
   * @override
   */
  get value() {
    return this._round(super.value);
  }

  /**
   * @override
   */
  getInitialValue() {
    return this._round(super.getInitialValue());
  }

  /**
   * @override
   */
  goInputMode() {
    super.goInputMode();
    this.onRootElement("input", (el) => {
      el.setAttribute("type", "number");
      el.setAttribute("step", "1");
      el.setAttribute("min", "0");
      copyAttributes(
        this,
        el,
        this.constructor.transmissibleAttributesWithDefaultValues
      );
    });
  }
}

defineCustomElement(XIoNumeric);
