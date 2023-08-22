import PatientRelated from "./patient-related.js";

export default class Appointment extends PatientRelated {
  getModel() {
    return "Appointment";
  }

  examiner;
  purpose;
  date;
  center;

  constructor(
    { examiner, purpose, date, center, ...others } = {},
    folder = null
  ) {
    super(others, folder);
    this.examiner = examiner;
    this.purpose = purpose;
    this.date = date;
    this.center = center;
  }

  isLocked() {
    return false;
  }
}
