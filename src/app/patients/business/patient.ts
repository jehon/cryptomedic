import { Type } from "class-transformer";
import constants from "../../generic/constants";
import { StringList, StringText } from "../../generic/io/io.component";
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
  override getTechnicalName(): string {
    return constants.models["patient"].name;
  }

  entry_year: number = 0;
  entry_order: number = 0;
  name: string = "";
  sex?: StringList;
  year_of_birth?: number;
  phone?: string;
  address_comments?: StringText;
  address_district?: string;
  address_upazilla?: string;
  address_union?: string;
  pathology?: string;
  comments?: StringText;

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

  override getTitle(): string {
    return `patient ${this.entry_year}.${this.entry_order} ${this.name}`;
  }

  override isLocked(): boolean {
    return false;
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

  override canDelete(): boolean {
    return this.getRelated().length == 0;
  }
}

function patientRelatedOrder(o1: PatientRelated, o2: PatientRelated): number {
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

  return 0;
}
