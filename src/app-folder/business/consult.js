import PatientRelated from "./patient-related.js";

export default class Consult extends PatientRelated {
  getModel() {
    return "Consult";
  }

  validate(res) {
    res = super.validate(res);

    if (this.date > new Date().toISOString()) {
      res.dateInTheFuture = true;
    }

    return res;
  }
}
