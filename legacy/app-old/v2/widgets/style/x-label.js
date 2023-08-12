import {
  createElementWithObject,
  createElementWithTag
} from "../../js/custom-element.js";
import XI18n from "../func/x-i18n.js";

/**
 * Attributes:
 * - label
 * - empty (readonly)
 *
 * Slots:
 * - * (can be multiple)
 * - right
 * - left
 * - stat
 *
 * layout:
 *    +----------+----------+
 *    | label    | default  |
 *    +----------+----------+
 *
 *    +----------+-------------+------------+
 *    | label    | (R) right   | (L) left   |
 *    +----------+-------------+------------+
 *
 *    +----------+-------------++-----------+
 *    | label    | default+    || stat      |
 *    +----------+-------------++-----------+
 *
 */
export default class XLabel extends HTMLElement {
  // TODO: is this used ?
  static get DISPLAY_MODE() {
    return "flex";
  }

  static get observedAttributes() {
    return ["label"];
  }

  attributeChangedCallback(attributeName, _oldValue, newValue) {
    switch (attributeName) {
      case "label":
        this._label.setAttribute("value", newValue ?? "");
        break;
    }
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.append(
      createElementWithTag(
        "style",
        {},
        `
    :host {
        display: ${XLabel.DISPLAY_MODE};
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;

        align-items: center;

        width: 100%;
    }

    :host([empty]) {
        display: none;
    }

    #label {
        width: min(25%, 150px);
        flex-grow: 0;
        flex-shrink: 0;
        font-size: smaller;
        text-align: right;

        overflow: hidden;
        /* text-overflow: clip "." : only work in firefox */
        text-overflow: ellipsis;
    }

    ::slotted(*) {
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 50px;
    }

    ::slotted([slot=right]):before {
        content: 'R';
    }

    ::slotted([slot=left]):before {
        content: 'L';
    }

    ::slotted([slot=right]):before,
    ::slotted([slot=left]):before {
        margin-right: 2px;
        padding: 4px;
        border: 1px solid gray;
        border-radius: 20px;
        font-size: 9px;
        background-color: gray;
        color: white;
        font-weight: bold;
    }

    /* TODO: this should be in x-io-string only */

    ::slotted(input:not([type="checkbox"])) {
        display: block;
        width: 100%;

        box-sizing: border-box;
        margin: 0;
        /* padding: 6px 12px; */

        color: #555555;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    }

    ::slotted(input:focus) {
        border-color: #66afe9;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, 0.6);
    }

    ::slotted(input:invalid) {
        border-color: red;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, 0.6);
    }

    ::slotted([slot=stat]) {
        border-left: 1px solid black;
        padding-left: 5px;
    }
`
      ),
      (this._label = createElementWithObject(XI18n, {
        id: "label",
        value: this.getAttribute("label") ?? ""
      })),
      createElementWithTag("slot"),
      createElementWithTag("slot", { name: "right" }),
      createElementWithTag("slot", { name: "left" }),
      createElementWithTag("slot", { name: "stat" })
    );

    this.onChildChange();
  }

  connectedCallback() {
    ["change", "mode"].forEach((evtName) =>
      this.addEventListener(evtName, () => this.onChildChange())
    );
  }

  onChildChange() {
    /**
     * If we have some "named" elements and that all of those are empty,
     * then we hide usself
     */

    const namedElements = this.querySelectorAll("[name]");
    const notVisible = this.querySelectorAll(
      "[name][empty]:not([input]), [name][unavailable]"
    );

    // console.log({ label: this.getAttribute('label'), namedElements, notVisible });

    this.toggleAttribute(
      "empty",
      namedElements.length > 0 && namedElements.length - notVisible.length == 0
    );
  }
}

customElements.define("x-label", XLabel);
