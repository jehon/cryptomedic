import PatientRelated from "./abstracts/patient-related.js";
import "./bill.js";
import "./consult-clubfoot.js";
import "./consult-other.js";
import "./consult-ricket.js";
import "./payment.js";
import "./picture.js";
import "./surgery.js";

const model = "Patient";

export default class Patient extends PatientRelated {
  static getModel() {
    return model;
  }

  static getTechnicalName() {
    return "patient";
  }

  isLocked() {
    return false;
  }

  entry_year;
  entry_order;
  name;
  sex;
  year_of_birth;
  phone;
  address_comments;
  address_district;
  address_upazilla;
  address_union;
  pathology;
  comments;

  sexStr() {
    if (this.sex === "Male") {
      return "m";
    }
    if (this.sex === "Female") {
      return "f";
    }
    return null;
  }

  actualAge(reference = new Date()) {
    if (!this.year_of_birth) {
      return null;
    }
    var birth = this.year_of_birth;
    var options = {
      reference,
      format: false
    };
    if (typeof options.reference == "number") {
      options.reference = "" + options.reference;
    }
    if (typeof options.reference == "string") {
      if (options.reference.length < 4) {
        return options.format ? null : "?";
        // throw new Exception('Invalid reference');
      }
      var ry = parseInt(options.reference.substring(0, 4));
      var rm = parseInt(options.reference.substring(5, 7));
      if (isNaN(rm)) {
        rm = 1; // emulate january
      }
      options.reference = new Date(ry, rm - 1, 1);
    }
    if (typeof birth == "number") {
      birth = "" + birth;
    }
    if (typeof birth == "string") {
      if (birth.length < 4) {
        return options.format ? null : "?";
        // throw new Exception('Invalid birth');
      }
      var by = parseInt(birth.substring(0, 4));
      var bm = parseInt(birth.substring(5, 7));
      if (isNaN(bm)) {
        bm = 1; // emulate january
      }
      birth = new Date(by, bm - 1 - 1, 30);
    }
    var days = new Date(0, 0, 0, 0, 0, 0, options.reference - birth);
    var res = { years: days.getFullYear() - 1900, months: days.getMonth() };
    if (options.format === "object") {
      return res;
    }
    if (options.format === "number") {
      return res.years + res.months / 12;
    }
    return res.years + "y" + res.months + "m";
  }
}
