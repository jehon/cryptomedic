"use strict";

import File from "models/File";

export default class RicketConsult extends File {
  constructor(data, folder) {
    super(data, folder);
    if (!data) {
      this._type = "RicketConsult";
    }
  }
}
