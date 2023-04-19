import {
  createElementWithTag,
  defineCustomElement
} from "../../js/custom-element.js";
import XIoString from "./x-io-string.js";

export default class XIoBoolean extends XIoString {
  #checkbox;

  canonizeValue(val) {
    if (val == "0" || val == 0) {
      val = false;
    }
    return !!val;
  }

  setOutputValue(newValue) {
    this.setElements(
      createElementWithTag("img", {
        src: `/static/img/boolean-${newValue ? "true" : "false"}.gif`
      })
    );
  }

  /**
   * @override
   */
  goInputMode() {
    this.setElements(
      (this.#checkbox = createElementWithTag(
        "input",
        {
          type: "checkbox"
        },
        [],
        (el) => el.addEventListener("click", () => this.dispatchChange())
      ))
    );
  }

  /**
   * @override
   */
  setInputValue(val) {
    this.#checkbox.checked = val;
  }

  /**
   * @override
   */
  getInputValue() {
    return this.#checkbox.checked;
  }
}

defineCustomElement(XIoBoolean);
