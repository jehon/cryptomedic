import { Type } from "class-transformer";
import PatientRelated from "./abstracts/patient-related";
import Pojo from "./abstracts/pojo";
import Appointment from "./appointment";

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

  override normalize(): this {
    this.getDependencies().map((e) => {
      e.patient = this;
    });
    return this;
  }

  override getTechnicalName(): string {
    return "patient";
  }

  getDependencies(): PatientRelated[] {
    return [...this.appointment].toSorted(patientRelatedOrder);
  }

  isLocked() {
    return false;
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
