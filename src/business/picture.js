import Timed from "./abstracts/timed.js";
import { registrySet } from "./registry.js";

const model = "Picture";

export default class Picture extends Timed {
  static getModel() {
    return model;
  }

  static getTechnicalName() {
    return "picture";
  }

  type;
  file;
  comments;

  constructor({ type, file, comments, ...others } = {}, folder = null) {
    super(others, folder);
    this.type = type;
    this.file = file;
    this.comments = comments;
  }

  getPictureUrl() {
    return "/api/picture/" + this.id;
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
