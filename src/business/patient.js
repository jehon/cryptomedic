import PatientRelated from "./abstracts/patient-related.js";
import "./bill.js";
import "./consult-clubfoot.js";
import "./consult-other.js";
import "./consult-ricket.js";
import "./payment.js";
import "./picture.js";
import { registrySet } from "./registry.js";
import "./surgery.js";

const model = "Patient";

function ordering(o1, o2) {
  const o1First = -1;
  const o2First = 1;

  const o1id = parseInt(o1.id);
  const o2id = parseInt(o2.id);

  // Return 1 if o1 > o2 (o1 - o2) (o1 est après o2)
  // Return -1 if o1 < o2 (o1 - o2) (o1 est avant o2)

  // What to do if one 'id' is missing
  if (isNaN(o1id) && !isNaN(o2id)) {
    return 10 * o1First;
  }
  if (isNaN(o2id) && !isNaN(o1id)) {
    return 10 * o2First;
  }

  // What to do if one 'date' is missing
  if (typeof o1.date == "undefined" && typeof o2.date != "undefined") {
    return 20 * o1First;
  }
  if (typeof o2.date == "undefined" && typeof o1.date != "undefined") {
    return 20 * o2First;
  }

  // Both 'date' are present
  if (typeof o1.date != "undefined" && typeof o2.date != "undefined") {
    if (o1.date < o2.date) return 30 * o2First;
    if (o1.date > o2.date) return 30 * o1First;
  }

  if (
    typeof o1.created_at != "undefined" &&
    typeof o2.created_at != "undefined"
  ) {
    if (o1.created_at < o2.created_at) return 40 * o2First;
    if (o1.created_at > o2.created_at) return 40 * o1First;
  }

  // Both 'id' are present
  if (!isNaN(o1id) && !isNaN(o2id)) {
    if (o1id > o2id) return 50 * o1First;
    if (o1id < o2id) return 50 * o2First;
  }

  // Both 'type' are present
  if (o1.getStatic().getTitle() < o2.getStatic().getTitle())
    return 40 * o1First;
  if (o1.getStatic().getTitle() > o2.getStatic().getTitle())
    return 40 * o2First;

  return 0;
}

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

  comments;

  /**
   *
   * @param {*} param0
   * @param {Folder} folder
   */
  constructor(
    {
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
    } = {},
    _folder = null
  ) {
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

registrySet(model, Patient);
