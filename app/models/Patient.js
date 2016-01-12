"use strict";

import Data from "models/Data";

export default class Patient extends Data {
  sexStr() {
    if (!this.isNotZero("Sex")) {
      return null;
    }
    if (this.Sex == "Male") {
      return "m";
    }
    if (this.Sex == "Female") {
      return "f";
    }
    return null;
  }
}
