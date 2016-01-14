"use strict";

import File from "models/File";

function f(val) {
  if (val == null) {
    throw new Error("Null value", val);
  }
  if (typeof(val) == "string") {
    return parseFloat(val);
  }
  return val;
}


export default class ClubFoot extends File {
  getModel() {
    return "ClubFoot";
  }

  // constructor(data, folder = null) {
  //   super(data, folder);
  // }

  getPiraniLeft() {
    // TODO: try-catch it in gui
    try {
      return f(this.CurvedLateralBorderLeft)
        + f(this.MedialCreaseLeft)
        + f(this.TalarHeadCoverageLeft)
        + f(this.PosteriorCreaseLeft)
        + f(this.RigidEquinusLeft)
        + f(this.EmptyHeelLeft);
    } catch (e) {
      return "undefined";
    }
  }

  getPiraniRight() {
    // TODO: try-catch it in gui
    try {
      return f(this.CurvedLateralBorderRight)
        + f(this.MedialCreaseRight)
        + f(this.TalarHeadCoverageRight)
        + f(this.PosteriorCreaseRight)
        + f(this.RigidEquinusRight)
        + f(this.EmptyHeelRight);
    } catch (e) {
      return "undefined";
    }
  }
}
