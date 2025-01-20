import { Type } from "class-transformer";
import "reflect-metadata"; // Required by class-transformer
import { type StringNumber } from "../utils/types";
import PatientRelated from "./abstracts/patient-related";
import Appointment from "./appointment";
import Bill from "./bill";
import ConsultClubfoot from "./consult-clubfoot";
import ConsultOther from "./consult-other";
import ConsultRicket from "./consult-ricket";
import Picture from "./picture";
import Surgery from "./surgery";

// From 1970 to 2029 (see help text on patient-element)
export const yearOfBirthPattern =
  "(19[7-9][0-9]|20[0-2][0-9])(-(0?[1-9]|1[0-2]))?";

// TODO: this is not a PatientRelated
export default class Patient extends PatientRelated {
  static override getModel() {
    return "Patient";
  }

  static override getTechnicalName() {
    return "patient";
  }

  override isLocked() {
    return false;
  }

  override getParentField(): string {
    return "";
  }

  entry_year: StringNumber = "" + new Date().getFullYear();
  entry_order: StringNumber = "";
  name: string = "";
  sex: string = "";
  year_of_birth: string = "" + new Date().getFullYear();
  pathology: string = "";
  phone: string = "";
  address_district: string = "";
  // TODO: should be upazila (1 l)
  address_upazilla: string = "";
  address_union: string = "";
  address_comments: string = "";
  comments: string = "";

  // !! This map to getTechnicalName() !!

  @Type(() => Appointment)
  appointment: Appointment[] = [];

  @Type(() => Bill)
  bill: Bill[] = [];

  @Type(() => ConsultClubfoot)
  club_foot: ConsultClubfoot[] = [];

  @Type(() => ConsultOther)
  other_consult: ConsultOther[] = [];

  @Type(() => ConsultRicket)
  ricket_consult: ConsultRicket[] = [];

  @Type(() => Picture)
  picture: Picture[] = [];

  @Type(() => Surgery)
  surgery: Surgery[] = [];

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

  getChildren(): PatientRelated[] {
    return [
      ...this.appointment,
      ...this.bill,
      ...this.club_foot,
      ...this.other_consult,
      ...this.ricket_consult,
      ...this.picture,
      ...this.surgery
    ].toSorted(Patient.ordering);
  }

  static ordering(o1: PatientRelated, o2: PatientRelated) {
    const o1First = -1;
    const o2First = 1;

    const o1id = parseInt(o1.id || "");
    const o2id = parseInt(o2.id || "");

    // Return 1 if o1 > o2 (o1 - o2) (o1 est après o2)
    // Return -1 if o1 < o2 (o1 - o2) (o1 est avant o2)

    // What to do if one 'id' is missing
    if (isNaN(o1id) && !isNaN(o2id)) {
      return 10 * o1First;
    }
    if (isNaN(o2id) && !isNaN(o1id)) {
      return 10 * o2First;
    }

    if ("date" in o1 && o1.date != undefined) {
      if ("date" in o2 && o2.date != undefined) {
        // Both 'date' are present
        if (o1.date < o2.date) return 30 * o2First;
        if (o1.date > o2.date) return 30 * o1First;
      } else {
        return 20 * o2First;
      }
    } else {
      if ("date" in o2 && o2.date != undefined) {
        return 20 * o1First;
      } else {
        // Both 'date' are absent
        // Not deciding here
      }
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

  getNextAppointment(): Date | undefined {
    const today = new Date();
    return this.appointment
      .map((v) => v.date)
      .map((d) => new Date(d))
      .filter((d) => d > today)
      .sort((a, b) => b.getTime() - a.getTime()) // Bigger at top
      .shift();
  }

  getLastSeen(): Date | undefined {
    const today = new Date();
    return this.getChildren()
      .filter((v) => !(v instanceof Appointment)) // We take everything except Appointment
      .map((v) => "date" in v && v.date)
      .filter((d) => d)
      .map((d) => new Date(d as string))
      .filter((d) => d < today)
      .sort((a, b) => a.getTime() - b.getTime())
      .pop();
  }
}
