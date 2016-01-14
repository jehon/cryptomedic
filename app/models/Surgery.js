"use strict";

import File from "models/File";

export default class Surgery extends File {
  getModel() {
    return "Surgery";
  }

  // constructor(data, folder) {
  //   super(data, folder);
  // }
}
