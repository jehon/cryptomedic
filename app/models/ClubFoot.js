"use strict";

import File from "models/File";

export default class ClubFoot extends File {
  constructor(data, folder = null) {
    super(data, folder);
    if (!data) {
      this._type = "ClubFoot";
    }
  }

  f(val) {
    if (val == null) return 0;
    if (typeof(val) == "string") return parseFloat(val);
    return val;
  }

  getPiraniLeft() {
    return this.f(this.CurvedLateralBorderLeft)
      + this.f(this.MedialCreaseLeft)
      + this.f(this.TalarHeadCoverageLeft)
      + this.f(this.PosteriorCreaseLeft)
      + this.f(this.RigidEquinusLeft)
      + this.f(this.EmptyHeelLeft);
  }

  getPiraniRight() {
    return this.f(this.CurvedLateralBorderRight)
      + this.f(this.MedialCreaseRight)
      + this.f(this.TalarHeadCoverageRight)
      + this.f(this.PosteriorCreaseRight)
      + this.f(this.RigidEquinusRight)
      + this.f(this.EmptyHeelRight);
  }
}
