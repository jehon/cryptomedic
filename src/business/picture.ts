/* istanbul ignore file */

import PatientRelated from "./patientRelated";

export default class Picture extends PatientRelated {
  // getModel() {
  //   return "Picture";
  // }
  // getPictureUrl() {
  //   return "/api/picture/" + this.id;
  // }
  // getThumbnailUrl() {
  //   return "/api/picture/" + this.id + "/thumbnail";
  // }
  // validate(res) {
  //   res = super.validate(res);
  //   if (!this.fileContent && !this.file) {
  //     res.pictureRequired = true;
  //   }
  //   if (this.Date > new Date().toISOString()) {
  //     res.dateInTheFuture = true;
  //   }
  //   return res;
  // }
}
