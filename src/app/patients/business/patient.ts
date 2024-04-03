import { Type } from "class-transformer";
import { string2date } from "../../_helpers/date";
import PatientRelated from "./abstracts/patient-related";
import Pojo from "./abstracts/pojo";
import Appointment from "./appointment";
import Bill from "./bill";
import ConsultClubfoot from "./consult-clubfoot";
import ConsultOther from "./consult-other";
import ConsultRicket from "./consult-ricket";
import Picture from "./picture";
import Surgery from "./surgery";

export default class Patient extends Pojo {
  entry_year: string = "";
  entry_order: string = "";
  name: string = "";
  sex?: "Male" | "Female";
  year_of_birth?: string;
  phone: string = "";
  address_comments: string = "";
  address_district?: string;
  address_upazilla?: string;
  address_union?: string;
  pathology: string = "";
  comments: string = "";

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

  override normalize(): this {
    // this.getRelated().map((e) => {
    //   e.patient = this;
    // });
    return this;
  }

  override getTechnicalName(): string {
    return "patient";
  }

  getRelated(): PatientRelated[] {
    return [
      ...this.appointment,
      ...this.bill,
      ...this.club_foot,
      ...this.other_consult,
      ...this.ricket_consult,
      ...this.picture,
      ...this.surgery
    ].toSorted(patientRelatedOrder);
  }

  isLocked() {
    return false;
  }

  ageAtReference(reference: Date = new Date()): string {
    if (!this.year_of_birth || !reference) {
      return "?";
    }

    // We have to take -1 for the month difference to be ok
    const birth_date = string2date(this.year_of_birth + "", -1);
    if (!birth_date) {
      return "?";
    }

    const days = new Date(
      0,
      0,
      0,
      0,
      0,
      0,
      reference.getTime() - birth_date.getTime()
    );
    const res = { years: days.getFullYear() - 1900, months: days.getMonth() };
    return res.years + "y" + res.months + "m";
  }
}

export function patientRelatedOrder(
  o1: PatientRelated,
  o2: PatientRelated
): number {
  const o1First = -1;
  const o2First = 1;

  // What to do if one 'date' is missing
  if (!o1.date && o2.date) {
    return 20 * o1First;
  }

  if (!o2.date && o1.date) {
    return 20 * o2First;
  }

  // Both 'date' are present
  if (o1.date && o2.date) {
    if (o1.date < o2.date) return 30 * o2First;
    if (o1.date > o2.date) return 30 * o1First;
  }

  if (o1.created_at < o2.created_at) return 40 * o2First;
  if (o1.created_at > o2.created_at) return 40 * o1First;

  const o1id = parseInt(o1.id);
  const o2id = parseInt(o2.id);
  if (!isNaN(o1id) && !isNaN(o2id)) {
    if (o1id > o2id) return 50 * o1First;
    if (o1id < o2id) return 50 * o2First;
  }

  // Both 'type' are present
  if (o1.getTechnicalName() < o2.getTechnicalName()) return 40 * o1First;
  if (o1.getTechnicalName() > o2.getTechnicalName()) return 40 * o2First;

  return 0;
}
