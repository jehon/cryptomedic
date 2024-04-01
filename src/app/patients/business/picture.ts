import PatientRelated from "./abstracts/patient-related";

export default class Picture extends PatientRelated {
  override getTechnicalName(): string {
    return "picture";
  }

  type: string = "";
  file: string = "";
  comments: string = "";

  // getPictureUrl() {
  //   return "/api/picture/" + this.id;
  // }

  // getThumbnailUrl() {
  //   return "/api/picture/" + this.id + "/thumbnail";
  // }

  // // Legacy
  // validate(res) {
  //   res = super.validate(res);

  //   if (!this.fileContent && !this.file) {
  //     res.pictureRequired = true;
  //   }

  //   if (this.date > new Date().toISOString()) {
  //     res.dateInTheFuture = true;
  //   }
  //   return res;
  // }
}
