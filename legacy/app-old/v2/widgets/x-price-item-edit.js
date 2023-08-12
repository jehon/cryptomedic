import { createElementWithTag } from "../js/custom-element.js";

/**
 * Attributes:
 *    value: the value of the widget
 *       -1: unused
 *        1: open (user will enter the price)
 *       >1: value is the fixed price
 *
 */
export default class XPriceItemEdit extends HTMLElement {
  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(attributeName, _oldValue, newValue) {
    switch (attributeName) {
      case "value":
        this.value = newValue;
        break;
    }
  }

  /** @type {HTMLInputElement} */
  elSpecific;

  /** @type {HTMLInputElement} */
  elChoiceOpen;

  /** @type {HTMLInputElement} */
  elChoiceUnused;

  /** @type {HTMLInputElement} */
  elChoiceSpecific;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.style.display = "block";

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.append(
      createElementWithTag("div", {}, [
        (this.elChoiceOpen = /** @type {HTMLInputElement} */ (
          createElementWithTag(
            "input",
            { type: "radio", name: "choice", choice: "open" },
            "",
            (el) => el.addEventListener("changed", () => this.choiceChanged())
          )
        )),
        createElementWithTag("span", {}, "Open"),

        (this.elChoiceUnused = /** @type {HTMLInputElement} */ (
          createElementWithTag(
            "input",
            { type: "radio", name: "choice", choice: "unused" },
            "",
            (el) => el.addEventListener("changed", () => this.choiceChanged())
          )
        )),
        createElementWithTag("span", {}, "Not used"),

        (this.elChoiceSpecific = /** @type {HTMLInputElement} */ (
          createElementWithTag(
            "input",
            { type: "radio", name: "choice", choice: "specified" },
            "",
            (el) => el.addEventListener("changed", () => this.choiceChanged())
          )
        )),
        createElementWithTag("span", {}, "Specific")
      ]),
      (this.elSpecific = /** @type {HTMLInputElement} */ (
        createElementWithTag("input", { type: "number", min: 2 })
      ))
    );

    this.choiceChanged();
  }

  choiceChanged() {
    if (this.elSpecific) {
      this.elSpecific.style.display = this.elChoiceSpecific.checked
        ? ""
        : "none";
    }
  }

  get value() {
    if (this.elChoiceOpen.checked) {
      return 1;
    }
    if (this.elChoiceUnused.checked) {
      return 0;
    }
    return Number.parseInt(this.elSpecific.value);
  }

  /**
   * @param {number|string} val to be set
   */
  set value(val) {
    if (typeof val == "string") {
      val = Number.parseInt(val);
    }
    if (val <= 0) {
      this.elChoiceUnused.checked = true;
    } else if (val == 1) {
      this.elChoiceOpen.checked = true;
    } else {
      this.elChoiceSpecific.checked = true;
      this.elSpecific.value = "" + val;
    }
    this.choiceChanged();
  }
}

customElements.define("x-price-item-edit", XPriceItemEdit);
