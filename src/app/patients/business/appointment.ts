import PatientRelated from "./abstracts/patient-related.js";

export default class Appointment extends PatientRelated {
  override getTechnicalName(): string {
    return "appointment";
  }

  examiner: string = "";
  purpose: string = "";
  center: string = "";

  isLocked() {
    return false;
  }
}
