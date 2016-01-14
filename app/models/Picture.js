"use strict";

import File from "models/File";

export default class Picture extends File {
  getModel() {
    return "Picture";
  }

  // constructor(data, folder) {
  //   super(data, folder);
  // }

  validate(res) {
    res = super.validate(res);
    if (!this.fileContent && !this.file) {
      res.pictureRequired = true;
    }
    return res;
  }
}
