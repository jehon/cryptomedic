import PatientRelated from "./patient-related.js";

export default class RicketConsult extends PatientRelated {
  getModel() {
    return "RicketConsult";
  }

  validate(res) {
    res = super.validate(res);

    if (this.date > new Date().toISOString()) {
      console.error("error");
      res.dateInTheFuture = true;
    }
    return res;
  }
}
