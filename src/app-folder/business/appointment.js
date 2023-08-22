import PatientRelated from "./patient-related.js";

export default class Appointment extends PatientRelated {
  getModel() {
    return "Appointment";
  }

  examiner;
  purpose;
  next_appointment;
  next_center;

  constructor(
    { examiner, purpose, next_appointment, next_center, ...others } = {},
    folder = null
  ) {
    super(others, folder);
    this.examiner = examiner;
    this.purpose = purpose;
    this.next_appointment = next_appointment;
    this.next_center = next_center;
  }

  isLocked() {
    return false;
  }
}
