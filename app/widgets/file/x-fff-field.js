import {
  createElementWithObject,
  createElementWithTag,
  defineCustomElement
} from "../../js/custom-element.js";
import { toSentenceCase } from "../../js/string-utils.js";
import XLabel from "../style/x-label.js";
import { getPanelStyles } from "../style/x-panel.js";
import XWithFile from "./x-with-file.js";

// TODO: use x-label

/**
 * Transform an abstract field into a real sided field
 *
 * @param {string} field - the name of the abstract field (with * as placeholder)
 * @param {string} side - the side (Left / Right)
 * @returns {string} - the field in the object
 */
function toSide(field, side) {
  if (field.includes("*")) {
    return field.replace("*", side);
  }
  return field + side;
}

/**
 * Attributes:
 *  - mode: ro / wo / rw
 *  - edit: true / false
 *
 *    ! One of the two !
 *  - field: to be shown
 *  - by-sides: field if set by sides
 *
 *  - label (default constructed basd on field / by-sides)
 */
export default class XFffField extends XWithFile {
  label = "";
  field = "";
  bySides = "";
  sideLeft = "";
  sideRight = "";

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.append(
      getPanelStyles(this),
      createElementWithTag(
        "style",
        {},
        `
                :host([mode=read][empty]) {
                    display: none !important;
                }
            `
      ),
      createElementWithObject(XLabel, {}, [
        createElementWithTag("slot", {}, [
          createElementWithTag("div", { id: "content" })
        ]),
        createElementWithTag("slot", { name: "right" }, [
          createElementWithTag("div", { slot: "right" })
        ]),
        createElementWithTag("slot", { name: "left" }, [
          createElementWithTag("div", { slot: "left" })
        ]),
        createElementWithTag("slot", { name: "stat" }, [
          createElementWithTag("div", { slot: "stat" })
        ])
      ])
    );
  }

  static get observedAttributes() {
    return ["field", "label", "by-sides"];
  }

  connectedCallback() {
    // TODO (angular): workaround for ng-if
    if (!this.folder) {
      let parent = this.closest("[x-top]");
      if (parent && parent.folder) {
        this.folder = parent.folder;
      }
    }
    this.refresh();
  }

  attributeChangedCallback(attributeName, _oldValue, newValue) {
    switch (attributeName) {
      case "label":
        this.label = newValue;
        this.adaptLabel();
        break;
      case "field":
        this.field = newValue;
        this.adapt();
        break;
      case "by-sides":
        this.bySides = newValue;
        this.sideLeft = toSide(this.bySides, "Left");
        this.sideRight = toSide(this.bySides, "Right");
        this.adapt();
    }
  }

  isOk() {
    if (!this.folder) {
      return super.isOk();
    }
    if (!this.field && !this.bySides) {
      // If we don't have a field, we are valid with already a folder
      return true;
    }
    return super.isOk();
  }

  _setElementFor(field, where) {
    if (field && this.folder) {
      this.shadowRoot.querySelectorAll(where).forEach((e) => {
        e.style.display = "inline-block";
        e.innerHTML = this.file[field];
      });
    } else {
      this.shadowRoot
        .querySelectorAll(where)
        .forEach((e) => (e.style.display = "none"));
    }
  }

  _testFieldIsEmpty(field) {
    if (!field) {
      return false;
    }
    if (!this.file) {
      return false;
    }
    if (!(field in this.file) || !this.file[field]) {
      this.setAttribute("empty", field);
      return true;
    }
    return false;
  }

  adapt() {
    // We dont' call super.adapt, because we are not based on formula();
    this.adaptEmpty();
    this.adaptLabel();
    this._setElementFor(this.field, "#content");
    this._setElementFor(this.sideLeft, "#side-left");
    this._setElementFor(this.sideRight, "#side-right");
  }

  adaptEmpty() {
    if (this._testFieldIsEmpty(this.field)) {
      return;
    }
    if (this.bySides) {
      if (
        this._testFieldIsEmpty(this.sideLeft) &&
        this._testFieldIsEmpty(this.sideRight)
      ) {
        return;
      }
    }
    this.removeAttribute("empty");
  }

  adaptLabel() {
    let label = this.label;
    if (!label) {
      label = toSentenceCase(this.field);
    }
    if (!label) {
      label = toSentenceCase(toSide(this.bySides, ""));
    }
    this.shadowRoot.querySelector("x-label").setAttribute("label", label);
  }
}

defineCustomElement(XFffField);
