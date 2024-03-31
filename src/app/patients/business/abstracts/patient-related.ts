import Patient from "../patient";
import Pojo, { StringDate } from "./pojo.js";

export default abstract class PatientRelated extends Pojo {
  patient_id: string = "";
  patient?: Patient;
  date: StringDate = "";
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
