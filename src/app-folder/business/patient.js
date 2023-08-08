/* istanbul ignore file */

import FolderPage from "../../../legacy/app-old/v2/models/FolderPage.js";

export default class Patient extends FolderPage {
  getModel() {
    return "Patient";
  }

  comments;

  constructor({
    entry_year,
    entry_order,
    name,
    sex,
    year_of_birth,
    phone,
    address_comments,
    address_district,
    address_upazilla,
    address_union,
    pathology,
    comments,
    ...others
  } = {}) {
    super(others);
    this.entry_year = entry_year;
    this.entry_order = entry_order;
    this.name = name;
    this.sex = sex;
    this.year_of_birth = year_of_birth;
    this.phone = phone;
    this.address_comments = address_comments;
    this.address_district = address_district;
    this.address_upazilla = address_upazilla;
    this.address_union = address_union;
    this.pathology = pathology;
    this.comments = comments;
  }

  getRelated() {
    return {
      Appointment: "patient_id",
      Bill: "patient_id",
      ClubFoot: "patient_id",
      OtherConsult: "patient_id",
      Picture: "patient_id",
      RicketConsult: "patient_id",
      Surgery: "patient_id"
    };
  }

  sexStr() {
    if (!this.isNotZero("sex")) {
      return null;
    }
    if (this.sex == "Male") {
      return "m";
    }
    if (this.sex == "Female") {
      return "f";
    }
    return null;
  }

  // Used in typescript
  actualAge(reference = new Date()) {
    if (!this.isSet("year_of_birth")) {
      return null;
    }
    var birth = this.year_of_birth;
    var options = Object.assign(
      {},
      {
        reference,
        format: false
      },
      options
    );
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
    if (options.format == "object") {
      return res;
    }
    if (options.format == "number") {
      return res.years + res.months / 12;
    }
    return res.years + "y" + res.months + "m";
  }
}
