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
  static override getModel() {
    return model;
  }

  static override getTechnicalName() {
    return "patient";
  }

  override isLocked() {
    return false;
  }

  entry_year: string = "" + new Date().getFullYear();
  entry_order: string = "";
  name: string = "";
  sex: string = "";
  year_of_birth: string = "" + new Date().getFullYear();
  phone: string = "";
  address_comments: string = "";
  address_district: string = "";
  address_upazilla: string = "";
  address_union: string = "";
  pathology: string = "";
  comments: string = "";

  sexStr() {
    if (this.sex === "Male") {
      return "m";
    }
    if (this.sex === "Female") {
      return "f";
    }
    return null;
  }

  actualAge(reference: Date | string | number = new Date()) {
    if (!this.year_of_birth) {
      return null;
    }
    let birth: Date | string | number = this.year_of_birth;
    const options: {
      reference: Date | string | number;
      format: string;
    } = {
      reference,
      format: ""
    };
    if (typeof options.reference == "number") {
      options.reference = "" + options.reference;
    }
    if (typeof options.reference == "string") {
      if (options.reference.length < 4) {
        return options.format ? null : "?";
        // throw new Exception('Invalid reference');
      }
      const ry = parseInt(options.reference.substring(0, 4));
      let rm = parseInt(options.reference.substring(5, 7));
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
      const by = parseInt(birth.substring(0, 4));
      let bm = parseInt(birth.substring(5, 7));
      if (isNaN(bm)) {
        bm = 1; // emulate january
      }
      birth = new Date(by, bm - 1 - 1, 30);
    }
    const days = new Date(
      0,
      0,
      0,
      0,
      0,
      0,
      options.reference.getTime() - birth.getTime()
    );
    const res = { years: days.getFullYear() - 1900, months: days.getMonth() };
    if (options.format === "object") {
      return res;
    }
    if (options.format === "number") {
      return res.years + res.months / 12;
    }
    return res.years + "y" + res.months + "m";
  }
}
