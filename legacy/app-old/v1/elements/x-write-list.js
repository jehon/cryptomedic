/* istanbul ignore file */

import { getSession, onSession } from "../../../../src/utils/session.ts";
import JHElement from "./jh-element.js";

// We sync over "document" as our EventListener object:
const XWriteListSetReferences = "XWriteList-setReferences";

const followedElement = Symbol("followedElement");
const followedCategory = Symbol("followedCategory");

let lastReferences = {}; // For memory

onSession((session) => {
  if (session?.lists) {
    XWriteList.setReferences(session.lists);
  }
});

let uuid = 1;

export default class XWriteList extends JHElement {
  static setReferences(references = {}) {
    lastReferences = references;
    document.dispatchEvent(new CustomEvent(XWriteListSetReferences));
  }

  static get properties() {
    return {
      value: "String",
      list: "Object",
      nullable: "Boolean",
      "list-name": "String"
    };
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._mode = false;
    this.references = lastReferences;

    this._uuid = uuid++;
    this[followedElement] = false;

    document.addEventListener(XWriteListSetReferences, () => {
      this.references = lastReferences;
      if (this.isInitialized()) {
        this.onListNameChanged(this._listName);
      }
    });
  }

  render() {
    super.render();
    this.createList();
    this.onValueChanged(this._value);
  }

  onValueChanged(v) {
    const escaped = this._escape(v);
    let el;
    switch (this.getAttribute("mode")) {
      case "select":
        el = this.shadowRoot.querySelector("select");
        el.value = escaped;
        break;
      case "radio":
        el = this.shadowRoot.querySelector(
          `input[type=radio][value="${escaped}"]`
        );
        if (el == null) {
          return;
        }
        el.setAttribute("checked", "checked");
        break;
    }
    this.fire("blur", 0);
  }

  onListChanged(_v) {
    this.createList();
    this.onValueChanged(this._value);
  }

  onListNameChanged(v) {
    this.onListChanged(v);
  }

  createList() {
    if (this._listName) {
      if (typeof this.references[this._listName] == "undefined") {
        this._list = [];
      } else {
        this._list = this.references[this._listName];
      }
    }
    if (!this._list) {
      this._list = [];
    }
    if (this._list.length == 0) {
      this._mode = "empty";
      this.shadowRoot.innerHTML = "X-Write-List: no list set";
    } else {
      if (this._list.length > 5) {
        this._mode = "select";
        this._asSelect();
      } else {
        this._mode = "radio";
        this._asRadio();
      }
    }
    this.setAttribute("mode", this._mode);
  }

  _withStyle() {
    return `
                <style>
                    :host {
                        display: block;
                    }

                    #radio {
                        width: 100%;

                        display: flex;
                        flex-wrap: wrap;
                    }

                    #radio > span {
                        display: block;
                        width: 50%;
                    }

                    select {
                        width: 100%;
                    }
                </style>
            `;
  }

  _asRadio() {
    let res = "<span id='radio'>";
    // TODO: set initial value
    for (let item of this._list) {
      let escaped = this._escape(item);
      res += `
                    <span to='${escaped}'>
                        <input type='radio' name='x-write-list-radio-${uuid}' value="${escaped}">
                        <span>${item}</span>
                    <br>
                    </span>
                `;
    }
    if (this._nullable) {
      res += `
                    <span to=''>
                        <input type='radio' name='x-write-list-radio-${uuid}' value="">
                        <span>?</span>
                        <br>
                    </span>
                `;
    }
    res += "</span>";

    this.shadowRoot.innerHTML = "<form>" + this._withStyle() + res + "</form>";
    this.shadowRoot.querySelectorAll("input").forEach((el) => {
      el.addEventListener("change", () => {
        this.fire("blur", 0);
      });
    });
    this.shadowRoot.querySelectorAll("span[to]").forEach((el) => {
      el.onclick = () => {
        // Setting this attribute will fire the "input" change event
        el.querySelector("input").setAttribute("checked", true);
      };
    });
  }

  _asSelect() {
    let res = "<select>\n";
    if (this._nullable) {
      res += '  <option value="">?</option>\n';
    }
    for (let item of this._list) {
      let escaped = this._escape(item);
      res += `  <option value="${escaped}">${item}</option>\n`;
    }
    res += "</select>\n";

    this.shadowRoot.innerHTML = this._withStyle() + res;

    this.shadowRoot
      .querySelector("select")
      .addEventListener("change", () => this.fire("blur", 0));
  }

  _escape(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  set value(v) {
    this.attributeChangedCallback("value", this._value, v);
  }

  get value() {
    this._value = null;
    switch (this.getAttribute("mode")) {
      case "select":
        this._value = this.shadowRoot.querySelector("select").value;
        break;
      case "radio":
        {
          // avoid no-case-declarations
          const checked = this.shadowRoot.querySelector(
            "input[type=radio]:checked"
          );
          if (checked == null) {
            this._value = null;
          } else {
            this._value = checked.value;
          }
        }
        break;
    }
    if (this._value == "" || this._value == undefined) {
      this._value = null;
    }
    return this._value;
  }

  follow(followed, category) {
    this[followedElement] = followed;
    this[followedCategory] = category;
    this[followedElement].addEventListener("blur", () =>
      this._adaptToFollowed()
    );
    if (this._listName) {
      console.error(
        "You could not follow another item if you have a list-name: ",
        this._listName
      );
      this._listName = JHElement.defaultValue("String");
    }
  }

  _adaptToFollowed() {
    const definitions = getSession();
    if (!definitions || !definitions.associations) {
      return;
    }

    const val = this[followedElement].value;
    let list = [];
    // Take the first associated value
    if (definitions.associations[`${this[followedCategory]}.${val}`]) {
      list = list.concat(
        definitions.associations[`${this[followedCategory]}.${val}`]
      );
    }

    // Add the "other" of the category
    if (definitions.associations[`${this[followedCategory]}.other`]) {
      list = list.concat(
        definitions.associations[`${this[followedCategory]}.other`]
      );
    }

    // Add the current value, if selected and not in the list
    const current = this.value;
    if (current) {
      // Only add if current value is not null...
      if (list.indexOf(current) < 0) {
        list = [current].concat(list);
      }
    }

    // Commit
    this.list = list;
  }
}

window.customElements.define("x-write-list", XWriteList);
