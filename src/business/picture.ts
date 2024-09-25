import Timed from "./abstracts/timed";

export default class Picture extends Timed {
  static override getModel() {
    return "Picture";
  }

  static override getTechnicalName() {
    return "picture";
  }

  type: string = "";
  file: string = "";
  comments: string = "";

  getPictureUrl() {
    return "/api/picture/" + this.id;
  }

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
