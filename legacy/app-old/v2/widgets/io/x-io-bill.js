import {
  createElementWithObject,
  createElementWithTag
} from "../../js/custom-element.js";
import XIoNumeric from "./x-io-numeric.js";
import XIoString from "./x-io-string.js";

/**
 * attributes:
 *   - value (inherited)
 *   - price (-1 / >=1 )
 *   - no-price (readonly)
 *
 *
 * Format
 *
 *      +--------------------+-----------------+---------------+
 *  1/  |     unit price     |       input     | total         |
 *      +--------------------+-----------------+---------------+
 *  2/  |         1          |     input       | total         |
 *      +--------------------+-----------------+---------------+
 *
 */
export default class XIoBill extends XIoNumeric {
  static get observedAttributes() {
    return [...XIoString.observedAttributes, "price"];
  }

  /**
   *
   *  -1: unused
   *   1: open (user will enter the price)
   *  >1: value is the fixed price
   *
   * @type {number}
   */
  _price = -1;

  /**
   * We store this input to use it everywhere
   * and to resist to change
   *
   * @type {XIoNumeric}
   */
  _xIoNumericEl;

  constructor() {
    super();
    this.setElements(
      createElementWithTag(
        "style",
        {},
        `

        :host([unavailable]) {
            visibility: hidden;
            position: relative;
        }

        :host([unavailable]):before {
            visibility: visible;
            position: absolute;
            top: 0;
            left: 0;
            content: "unavailable";
            color: red;
        }

        ${this.getRootCssSelector()} {
            display: flex;
            padding-right: 20px;
        }

        ${this.getRootCssSelector()} > * {
            flex-grow: 1;
            flex-basis: 1em;
            text-align: right;
        }

        ${this.getRootCssSelector()} > span {
            flex-grow: 0;
            text-align: center;
        }
    `
      ),
      (this._priceEl = createElementWithTag("div", {}, "" + this._price)),
      createElementWithTag("span", {}, "x"),
      (this._xIoNumericEl = createElementWithObject(XIoNumeric, {}, [], (el) =>
        el.addEventListener("change", () => this.dispatchTotalChanged())
      )),
      createElementWithTag("span", {}, "="),
      (this._totalEl = createElementWithTag("div", { class: "total" }, "0"))
    );
    this.updatePrice();
  }

  /**
   * @override
   */
  goOutputMode() {
    if (this._xIoNumericEl) {
      this._xIoNumericEl.removeAttribute("input");
    }
  }

  /**
   * @override
   */
  setOutputValue(val) {
    if (this._xIoNumericEl) {
      this._xIoNumericEl.value = val;
    }
  }

  /**
   * @override
   */
  goInputMode() {
    if (this._xIoNumericEl) {
      this._xIoNumericEl.setAttribute("input", "input");
    }
    this.updatePrice();
  }

  /**
   * @override
   */
  setInputValue(val) {
    if (this._xIoNumericEl) {
      this._xIoNumericEl.value = val;
    }
  }

  getInputValue() {
    if (this._xIoNumericEl) {
      return this._xIoNumericEl.value;
    }
    return 0;
  }

  //
  //
  // Price management
  //
  //

  attributeChangedCallback(attributeName, oldValue, newValue) {
    super.attributeChangedCallback(attributeName, oldValue, newValue);
    switch (attributeName) {
      case "price":
        this._price = parseInt(newValue);
        this.updatePrice();
        break;
    }
  }

  updatePrice() {
    this._priceEl.innerHTML = "" + this._price;

    if (this._price < 1) {
      this.setAttribute("unavailable", "" + this._price);
    } else {
      this.removeAttribute("unavailable");
    }
    this.dispatchTotalChanged();
  }

  /**
   * Total is always > 0
   *
   * @returns {number} of the total (cost) of the line
   */
  get total() {
    return Math.max(0, this._price * this._xIoNumericEl.value);
  }

  dispatchTotalChanged() {
    this.dispatchChange();
    this._totalEl.innerHTML = "" + this.total;
    if (this.total > 0) {
      this.setAttribute("total", "" + this.total);
    } else {
      this.removeAttribute("total");
    }
    this.dispatchEvent(new CustomEvent("totalchange"));
  }
}

customElements.define("x-io-bill", XIoBill);
