import PatientRelated from "./patient-related.js";

export default class Consult extends PatientRelated {
  getModel() {
    return "Consult";
  }

  weight_kg;
  height_cm;
  brachial_circumference_cm;
  treatment_evaluation;
  treatment_finished;
  comments;
  suggested_for_surgery;

  constructor({
    weight_kg,
    height_cm,
    brachial_circumference_cm,
    treatment_evaluation,
    treatment_finished,
    comments,
    suggested_for_surgery,
    ...others
  } = {}) {
    super(others);

    this.weight_kg = weight_kg;
    this.height_cm = height_cm;
    this.brachial_circumference_cm = brachial_circumference_cm;
    this.treatment_evaluation = treatment_evaluation;
    this.treatment_finished = treatment_finished;
    this.comments = comments;
    this.suggested_for_surgery = suggested_for_surgery;
  }

  validate(res) {
    res = super.validate(res);

    if (this.date > new Date().toISOString()) {
      res.dateInTheFuture = true;
    }

    return res;
  }
}
