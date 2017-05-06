'use strict';

function f(val) {
  if (val == null) {
    throw new Error('Null value', val);
  }
  if (typeof(val) == 'string') {
    return parseFloat(val);
  }
  return val;
}


class ClubFoot extends PatientRelated {
  getModel() {
    return 'ClubFoot';
  }

  getServerRessource() {
    return "clubfeet";
  }

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
      return 'undefined';
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
      return 'undefined';
    }
  }
}
