import PatientRelated from "./abstracts/patient-related.js";

export default class Appointment extends PatientRelated {
  getModel() {
    return "Appointment";
  }

  // We could not inherit from Timed because Timed implies a date in the past

  examiner;
  purpose;
  date;
  center;

  /**
   *
   * @param {examiner?}
   * @param {Folder} folder?
   */
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
