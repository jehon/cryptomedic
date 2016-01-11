"use strict";

import File from "models/File";

export default class OtherConsult extends File {
  constructor(data, folder) {
    super(data, folder);
    if (!data) {
      this._type = "OtherConsult";
    }
  }
}
