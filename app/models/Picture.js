"use strict";

import File from "models/File";

export default class Picture extends File {
  constructor(data, folder) {
    super(data, folder);
    if (!data) {
      this._type = "Picture";
    }
  }

  validate(res) {
    res = this._super(res);
    if (!this.fileContent && !this.file) {
      res.pictureRequired = true;
    }
    return res;
  }
}
