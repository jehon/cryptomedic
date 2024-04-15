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
}
