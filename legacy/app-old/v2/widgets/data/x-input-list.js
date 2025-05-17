/* istanbul ignore file */

import { getSession } from "../../../../../src/utils/session.ts";
import { createElementWithTag } from "../../js/custom-element.js";
import fireOn from "../../js/fire.js";

let uuid = 1;

/**
 * @param {string} str to be transformed
 * @returns {string} acceptable form for html
 */
function _escape(str) {
  if (!str) {
    return "";
  }

  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * attributes:
 *   list: the list content (array)
 *   list-name: the list name inside the session
 *   nullable: boolean if the field could be null
 *
 *   value: the value inside the list
 */
export default class XInputList extends HTMLElement {
  static get observedAttributes() {
    return ["value", "list", "list-name", "nullable"];
  }

  attributeChangedCallback(attributeName, _oldValue, newValue) {
    switch (attributeName) {
      case "value":
        this.value = newValue;
        break;

      case "list":
      case "list-name":
      case "nullable":
        this.draw();
        break;
    }
  }

  _listing = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.draw();
  }

  draw() {
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.append(
      createElementWithTag(
        "style",
        {},
        `
            :host {
                display: block;
            }

            .radio {
                width: 100%;

                display: flex;
                flex-wrap: wrap;
            }

            .radio > span {
                display: block;
                width: 50%;
            }

            select {
                width: 100%;
            }
            `
      )
    );

    const references = getSession()?.lists ?? [];
    const listName = this.getAttribute("list-name");
    let list = [];

    if (listName) {
      if (!(listName in references)) {
        console.error("List not found: ", listName);
        list = [];
      } else {
        list = references[listName];
      }
    } else {
      if (this.hasAttribute("list") && this.getAttribute("list")) {
        list = JSON.parse(this.getAttribute("list"));
      }
    }

    if (!list || list.length == 0) {
      this.setAttribute("mode", "empty");
      this.shadowRoot.innerHTML = "XInputList: no list set";
      return;
    }

    this._listing = list.reduce((obj, v) => {
      obj[_escape(v)] = v;
      return obj;
    }, {});

    const ruuid = uuid++;
    if (list.length > 5) {
      this.setAttribute("mode", "select");
      const b = (val, txt) =>
        createElementWithTag("option", { value: _escape(val) }, txt);

      this.shadowRoot.append(
        createElementWithTag(
          "select",
          {},
          [
            this.hasAttribute("nullable") ? b("", "?") : null,
            ...list.map((val) => b(val, val))
          ],
          (el) => el.addEventListener("change", () => this.changed())
        )
      );
    } else {
      this.setAttribute("mode", "radio");
      const b = (val, txt) =>
        createElementWithTag(
          "span",
          { to: val },
          [
            createElementWithTag(
              "input",
              {
                type: "radio",
                name: `x-input-list-radio-${ruuid}`,
                value: escape(val)
              },
              [],
              (el) => el.addEventListener("change", () => this.changed())
            ),
            createElementWithTag("span", {}, txt),
            createElementWithTag("br")
          ],
          (el) => {
            el.addEventListener("click", () => {
              /** @type {HTMLInputElement} */ (
                el.querySelector("input[type=radio]")
              ).checked = true;
              this.changed();
            });
          }
        );

      this.shadowRoot.append(
        createElementWithTag("span", { class: "radio" }, [
          this.hasAttribute("nullable") ? b("", "?") : null,
          ...list.map((val) => b(val, val))
        ])
      );
    }
  }

  changed() {
    fireOn(this, "change");
  }

  set value(value) {
    const escaped = _escape(value);
    switch (this.getAttribute("mode")) {
      case "select": {
        const el = this.shadowRoot.querySelector("select");
        el.value = escaped;
        break;
      }
      case "radio": {
        const el = this.shadowRoot.querySelector(
          `input[type=radio][value="${escaped}"]`
        );
        if (el != null) {
          /** @type {HTMLInputElement} */ (el).checked = true;
          // el.setAttribute('checked', 'checked');
        }
        break;
      }
    }
    this.changed();
  }

  get value() {
    let value = null;
    switch (this.getAttribute("mode")) {
      case "select":
        value = this.shadowRoot.querySelector("select").value;
        break;
      case "radio":
        {
          // avoid no-case-declarations
          const checked = /** @type {HTMLInputElement} */ (
            this.shadowRoot.querySelector("input[type=radio]:checked")
          );
          if (checked == null) {
            value = null;
          } else {
            value = checked.value;
          }
        }
        break;
    }
    if (value == "" || value == undefined) {
      value = null;
    }
    if (value in this._listing) {
      return this._listing[value];
    }

    return value;
  }
}

customElements.define("x-input-list", XInputList);
