/* istanbul ignore file */

import PatientRelated from "./PatientRelated.js";

export default class Picture extends PatientRelated {
  getModel() {
    return "Picture";
  }

  getPictureUrl() {
    return "/api/picture/" + this.id;
  }

  getThumbnailUrl() {
    return "/api/picture/" + this.id + "/thumbnail";
  }

  validate(res) {
    res = super.validate(res);

    if (!this.fileContent && !this.file) {
      res.pictureRequired = true;
    }

    if (this.date > new Date().toISOString()) {
      res.dateInTheFuture = true;
    }
    return res;
  }
}
