/* istanbul ignore file */

import PatientRelated from "../../../../src/app-folder/business/patient-related.js";

export default class Surgery extends PatientRelated {
  getModel() {
    return "Surgery";
  }

  getServerRessource() {
    return "surgeries";
  }

  validate(res) {
    res = super.validate(res);

    if (this.date > new Date().toISOString()) {
      res.dateInTheFuture = true;
    }
    return res;
  }
}
