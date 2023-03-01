import {
  copyAttributes,
  createElementWithTag,
  defineCustomElement
} from "../../js/custom-element.js";

/**
 * Attributes:
 *  - value (write only)
 *  - input (boolean)
 *  - empty (readonly)
 *
 *  - readonly (todo)
 *  - required (todo)
 *  - placeholder (todo)
 *
 *
 * Properties
 *  - value (also set by attribute)
 *
 * Events:
 *  - mode
 *  - change
 */
export default class XIoString extends HTMLElement {
  static get observedAttributes() {
    return ["input", "value", ...this.transmissibleAttributesWithDefaultValues];
  }

  /**
   * @type {Array<string>} as name of attributes that need to be copied
   */
  static get transmissibleAttributesWithDefaultValues() {
    return ["type", "required", "autofocus", "placeholder"];
  }

  /** @type {HTMLElement} */
  _rootEl;

  /** @type {string} */
  _initialValue = "";

  /** @type {string} */
  _currentValue = "";

  constructor() {
    super();
    this.setAttribute("x-io", "x-io");

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(
      createElementWithTag(
        "style",
        {},
        `
            div#root {
                align-items: center;
            }

            input, textarea, select {
                display: block;
                box-sizing: border-box;
                xmargin: 0;
                width: 100%;
                /* height: calc(1.5em + .75rem + 2px); */

                padding: .375rem .75rem;
                font-weight: 400;
                color: #495057;
                background-color: #fff;
                background-clip: padding-box;
                border: 1px solid #ced4da;
                border-radius: .25rem;

                box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);

                transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
            }

            input:focus {
                border-color: #66afe9;
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, 0.6);
            }

            input:invalid {
                border-color: red;
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, 0.6);
            }

            input[type=checkbox] {
                height: 1em;
            }

            input[required] {
                border: 1px solid blue;
            }

            /*
            *, ::after, ::before {
                box-sizing: border-box;
            }
*/
            `
      ),
      (this._rootEl = createElementWithTag("div", { id: "root" }))
    );
    this.goOutputMode();
    this.dispatchChange(this._initialValue);
  }

  /**
   * @returns {string} as the root css selector
   */
  getRootCssSelector() {
    return "#root";
  }

  /**
   * @returns {HTMLElement} as the root element
   */
  getRootElement() {
    return this._rootEl;
  }

  /**
   * Apply callback on each found element
   *
   * @param {string} selector based on root element
   * @param {function(HTMLElement): any} cb to apply on each found element
   * @returns {Array<*>} as the results of each function
   */
  onRootElement(selector, cb) {
    return Array.from(this.getRootElement().querySelectorAll(selector)).map(
      (el) => cb(el)
    );
  }

  attributeChangedCallback(attributeName, _oldValue, newValue) {
    if (
      this.constructor.transmissibleAttributesWithDefaultValues.includes(
        attributeName
      )
    ) {
      this.onRootElement("input", (el) =>
        el.setAttribute(attributeName, newValue)
      );
      return;
    }
    switch (attributeName) {
      case "input":
        if (this.isInputMode()) {
          this.goInputMode();
        } else {
          this.goOutputMode();
        }
        this.dispatchEvent(new CustomEvent("mode", { bubbles: true }));
        break;

      case "value":
        // Call the setter to have the same behavior
        this.value = newValue ?? "";
        break;
    }
  }

  /**
   * @returns {*} as the initial value
   */
  getInitialValue() {
    return this._initialValue;
  }

  //
  //
  // I/O Mode handling
  //
  //

  isInputMode() {
    return this.hasAttribute("input");
  }

  /**
   *
   * @param {...HTMLElement}els to be inserted
   */
  setElements(...els) {
    this.getRootElement().innerHTML = "";
    this.getRootElement().append(...els);
  }

  goInputMode() {
    this.setElements(
      createElementWithTag(
        "input",
        { value: this.getInitialValue(), style: { width: "100%" } },
        [],
        (el) => {
          el.addEventListener("change", () =>
            this.dispatchChange(/** @type {HTMLInputElement} */ (el).value)
          );
          el.addEventListener("blur", () =>
            this.dispatchChange(/** @type {HTMLInputElement} */ (el).value)
          );
          copyAttributes(
            this,
            el,
            this.constructor.transmissibleAttributesWithDefaultValues
          );
        }
      )
    );

    this.setInputValue(this._initialValue);
  }

  goOutputMode() {
    this.setElements(createElementWithTag("div"));
    this.setOutputValue(this._initialValue);
  }

  //
  //
  // Value handling
  //
  //

  canonizeValue(val) {
    return val;
  }

  set value(newValue) {
    this._initialValue = newValue = this.canonizeValue(newValue);
    if (this.isInputMode()) {
      this.setInputValue(newValue);
    } else {
      this.setOutputValue(newValue);
    }
    this.dispatchChange(newValue);
  }

  /**
   * According to mode
   *
   * @returns {*} with the value
   */
  get value() {
    if (this.isInputMode()) {
      return this.getInputValue();
    }
    return this._initialValue;
  }

  setOutputValue(val) {
    const el = this.shadowRoot.querySelector("div");
    if (el) {
      el.innerHTML = val;
    }
  }

  setInputValue(val) {
    const el = this.shadowRoot.querySelector("input");
    if (el) {
      el.setAttribute("value", val);
    }
  }

  getInputValue() {
    return this.onRootElement("input", (el) => el.value)[0];
  }

  /**
   * To be called by child elements when element is changed
   */
  dispatchChange() {
    this.toggleAttribute("empty", !this.value);
    this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
  }

  /**
   *
   * checkValidity():
   *   Immediately runs the validity check on the element, triggering the document to fire the invalid event at the element if the value isn't valid.
   *
   * @see XForm.checkAndSubmit()
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input
   * @returns {boolean} if ok
   */
  checkValidity() {
    if (!this.isInputMode()) {
      return true;
    }
    return this.onRootElement("input", (el) => el.checkValidity()).reduce(
      (prev, curr) => prev & curr,
      true
    );
  }

  // /**
  //  * reportValidity():
  //  *   Returns true if the element's value passes validity checks; otherwise, returns false.
  //  *
  //  * (not used in cr code)
  //  *
  //  * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reportValidity
  //  * @returns {boolean} if ok
  //  */
  // reportValidity() {
  //     console.log('reportValidity');
  //     if (!this.isInputMode()) {
  //         return true;
  //     }
  //     return this.querySelector('input').reportValidity();
  // }
}

defineCustomElement(XIoString);
