"use strict";

import File from "models/File";

export default class Surgery extends File {
  constructor(data, folder) {
    super(data, folder);
    if (!data) {
      this._type = "Surgery";
    }
  }
}
