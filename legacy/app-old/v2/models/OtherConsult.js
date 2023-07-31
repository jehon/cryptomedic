/* istanbul ignore file */

import PatientRelated from "./PatientRelated.js";

export default class OtherConsult extends PatientRelated {
  getModel() {
    return "OtherConsult";
  }

  validate(res) {
    res = super.validate(res);

    if (this.date > new Date().toISOString()) {
      res.dateInTheFuture = true;
    }

    return res;
  }
}
