/* istanbul ignore file */

import JHElement from "./jh-element.js";
import {
  ApplicationException,
  DataMissingException
} from "../../../../src/utils/exceptions.js";

export default class XFile extends JHElement {
  static get properties() {
    return {
      value: "Object",
      patient: "Object"
    };
  }

  constructor() {
    super();
    this.value = false;
  }

  render() {
    super.render();
    this.style.width = "100%";
  }

  adapt() {
    // Stub for testing
    super.adapt();
  }

  assertData() {
    if (!this.value) {
      throw new ApplicationException("Data not set");
    }
    return this.value;
  }

  assertExists(field) {
    const values = this.assertData();
    if (typeof values[field] == "undefined" || values[field] == null) {
      throw new DataMissingException(field, "is undefined");
    }
    return values[field];
  }

  assertNumeric(field) {
    let v = this.assertExists(field);
    if (typeof v == "number") {
      return v;
    }
    if (typeof v == "string") {
      let vi = parseInt(this.value[field]);
      if (!isNaN(vi)) {
        return vi;
      }
      throw new DataMissingException(field, `is not numeric(${v})`);
    }
    throw new DataMissingException(field, `is not numeric(${typeof v})`);
  }

  assertNumericNotZero(field) {
    const v = this.assertNumeric(field);
    if (v !== 0) {
      return v;
    }
    throw new DataMissingException(field, `is not non-zero(${v})`);
  }

  assertDate(field) {
    let v = this.assertExists(field);
    if (typeof v == "number") {
      v = "" + v;
    }
    if (typeof v == "string") {
      if (v.length < 4) {
        throw new DataMissingException(field, `is not a valid date(${v})`);
      }
      var ry = parseInt(v.substring(0, 4));
      if (isNaN(ry)) {
        throw new DataMissingException(field, `is not a valid date(${v})`);
      }
      var rm = parseInt(v.substring(5, 7));
      if (isNaN(rm)) {
        rm = 1; // emulate january
      }
      return new Date(ry, rm - 1, 1);
    }
    if (v instanceof Date) {
      return v;
    }
    throw new DataMissingException(field, `is not a valid date(${typeof v})`);
    // return v;
  }
}

window.customElements.define("x-file", XFile);
