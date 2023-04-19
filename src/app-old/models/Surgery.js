/* istanbul ignore file */

import PatientRelated from "./PatientRelated.js";

export default class Surgery extends PatientRelated {
  getModel() {
    return "Surgery";
  }

  getServerRessource() {
    return "surgeries";
  }

  validate(res) {
    res = super.validate(res);

    if (this.Date > new Date().toISOString()) {
      res.dateInTheFuture = true;
    }
    return res;
  }
}
