import PatientRelated from "./patient-related.js";

export default class Picture extends PatientRelated {
  getModel() {
    return "Picture";
  }

  type;
  file;
  date;
  comments;

  constructor({ type, file, date, comments, ...others } = {}, folder = null) {
    super(others, folder);
    this.type = type;
    this.file = file;
    this.date = date;
    this.comments = comments;
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
