import PatientRelated from "./patient-related.js";

export default class Timed extends PatientRelated {
  getModel() {
    return "Consult";
  }

  date;
  examiner;
  center;

  /**
   *
   * @param {weight_kg?}
   */
  constructor({ date, examiner, center, ...others } = {}) {
    super(others);
    this.date = date;
    this.examiner = examiner;
    this.center = center;
  }

  validate(res) {
    res = super.validate(res);

    // Does not work for appointments
    if (this.date > new Date().toISOString()) {
      res.dateInTheFuture = true;
    }

    return res;
  }
}
