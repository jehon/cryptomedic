import {
  DataInvalidException,
  DataMissingException
} from "../../js/exceptions.js";
import { defineCustomElement } from "../../js/custom-element.js";
import XWithFile from "./x-with-file.js";
import Patient from "../../models/Patient.js";

/**
 * Obsolete (TODO: remove this function)
 *
 * @param {*} birth the date of birth
 * @param {object} options of the transformation
 * @returns {string|object} 0y0m
 */
export function fromBirthDate(birth, options) {
  options = {
    format: false,
    reference: new Date(),
    ...options
  };

  try {
    const res = fromBirthDateTo(birth, options.reference);
    const obj = {
      years: Math.floor(res),
      months: Math.round((res - Math.trunc(res)) * 12)
    };
    if (options.format == "object") {
      return obj;
    }
    if (options.format == "number") {
      return res;
    }
    // Default ?
    return yearsToYM(res);
  } catch (e) {
    return options.format ? null : "?";
  }
}

/**
 * @param {number} value the fractional year
 * @returns {string} 0y0m
 */
export function yearsToYM(value) {
  const years = Math.floor(value);
  const months = Math.round((value - Math.trunc(value)) * 12);
  return years + "y" + months + "m";
}

/**
 *
 * @param {number|Date|string} date - the date of birth (can be anything)
 * @param {number|Date|string} [reference] - must represent a full date
 * @returns {number} - years old
 */
export function fromBirthDateTo(date, reference = new Date()) {
  if (date == "" || date == null) {
    throw new DataMissingException("date");
  }

  if (reference == "" || reference == null) {
    throw new DataMissingException("reference");
  }

  if (typeof reference == "number") {
    reference = "" + reference;
  }
  if (typeof reference == "string") {
    if (reference.length < 4) {
      throw new DataInvalidException("reference", "is too short");
    }
    var ry = parseInt(reference.substring(0, 4));
    var rm = parseInt(reference.substring(5, 7));
    if (isNaN(rm)) {
      rm = 1; // emulate january
    }
    reference = new Date(ry, rm - 1, 1);
  }
  // reference is a Date

  if (typeof date == "number") {
    date = "" + date;
  }
  if (typeof date == "string") {
    if (date.length < 4) {
      throw new DataInvalidException("date", "is too short");
      // throw new Exception('Invalid birth');
    }
    var by = parseInt(date.substring(0, 4));
    var bm = parseInt(date.substring(5, 7));
    if (isNaN(bm)) {
      bm = 1; // emulate january
    }
    // We take the 'second' of the month,
    // because birth date will resolve to 20xx-xx-01,
    // and so, we count the running month
    date = new Date(by, bm - 1, 2);
  }
  // birth is a Date

  let years = reference.getFullYear() - date.getFullYear();
  let months = reference.getMonth() - date.getMonth();

  return years + months / 12;
}

export default class XFffAge extends XWithFile {
  constructor() {
    super();
    this.style.display = "inline";
  }

  formula() {
    return yearsToYM(this.value);
  }

  get value() {
    if (!this.isOk()) {
      throw "No enough data";
    }
    if (this.file instanceof Patient) {
      this.setAttribute("source", "patient");
      return fromBirthDateTo(
        /** @type {Patient} */ this.file.year_of_birth,
        new Date()
      );
    }

    this.setAttribute("source", "non-patient");
    return fromBirthDateTo(
      this.folder.getPatient().year_of_birth,
      this.file.Date
    );
  }
}

defineCustomElement(XFffAge);
