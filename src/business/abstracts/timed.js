import PatientRelated from "./patient-related.js";

// TODO: Use mixins https://www.typescriptlang.org/docs/handbook/mixins.html

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
  constructor({ date, examiner, center, ...others } = {}, folder = null) {
    super(others, folder);
    this.date = date;
    this.examiner = examiner;
    this.center = center;
  }

  // Legacy
  validate(res) {
    res = super.validate(res);

    // Does not work for appointments
    if (this.date > new Date().toISOString()) {
      res.dateInTheFuture = true;
    }

    return res;
  }
}
