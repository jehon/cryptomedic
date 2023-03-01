import {
  createElementWithTag,
  defineCustomElement
} from "../../js/custom-element.js";
import XIoString from "./x-io-string.js";

export default class XIoText extends XIoString {
  /**
   * @override
   */
  goInputMode() {
    this.setElements(
      createElementWithTag(
        "textarea",
        {
          style: { width: "100%" },
          rows: 4
        },
        [],
        (el) =>
          el.addEventListener("change", () =>
            this.dispatchChange(/** @type {HTMLInputElement} */ (el).value)
          )
      )
    );
  }

  /**
   * @override
   */
  goOutputMode() {
    super.goOutputMode();
    this.onRootElement("textarea", (el) => {
      el.style.whiteSpace = "pre";
    });
  }

  /**
   * @override
   */
  setInputValue(val) {
    this.onRootElement("textarea", (el) => {
      el.innerHTML = val;
    });
  }

  /**
   * @override
   */
  getInputValue() {
    return this.onRootElement("textarea", (el) => el.value)[0];
  }
}

defineCustomElement(XIoText);
