/* istanbul ignore file */

import {
  createElementWithTag,
  defineCustomElement
} from "../../js/custom-element.js";
import { getSession } from "../../js/session.js";

/**
 * Transform a "value" into a bgd code
 *    and add the original value as a tooltip
 *
 * Attributes:
 *  - value: to be changed by a codage
 *  - translated: the forced translated value
 */
export default class XCodage extends HTMLElement {
  static get observedAttributes() {
    return ["value", "translated"];
  }

  /** @type {HTMLElement} */
  _tooltip;

  /** @type {HTMLElement} */
  _content;

  constructor() {
    super();
    this.append(
      (this._tooltip = createElementWithTag(
        "span",
        {
          id: "original",
          dataToggle: "tooltip",
          dataPlacement: "bottom",
          title: ""
        },
        [(this._content = createElementWithTag("span"))]
      ))
    );
  }

  attributeChangedCallback(attributeName, _oldValue, _newValue) {
    switch (attributeName) {
      case "value":
        this.adapt();
        break;
      case "translated":
        this.adapt();
        break;
    }
  }

  adapt() {
    const originalValue = this.getAttribute("value");
    let translated = this.getAttribute("translated");

    if (!translated) {
      const definitions = getSession();
      if (definitions && definitions.codes[originalValue]) {
        translated = definitions.codes[originalValue];
      }
    }

    if (!translated) {
      translated = originalValue;
    }

    this._content.innerHTML = translated;
    this.setAttribute("printing", translated);
    this._tooltip.setAttribute("title", originalValue);
  }
}

defineCustomElement(XCodage);
