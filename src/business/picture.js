import PatientRelated from "./abstracts/patient-related.js";
import { registrySet } from "./registry.js";

const model = "Picture";

export default class Picture extends PatientRelated {
  getModel() {
    return model;
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

  // Legacy
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

registrySet(model, Picture);
