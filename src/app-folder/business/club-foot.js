/* istanbul ignore file */

import PatientRelated from "./patient-related.js";

/**
 * @param {string|null} val the value to be parsed
 * @returns {number} the value parsed as float
 */
function f(val) {
  if (val == null) {
    throw new Error("Null value");
  }
  if (typeof val == "string") {
    return parseFloat(val);
  }
  return val;
}

export default class ClubFoot extends PatientRelated {
  getModel() {
    return "ClubFoot";
  }

  getServerRessource() {
    return "clubfeet";
  }

  getPiraniLeft() {
    // TODO: try-catch it in gui
    try {
      return (
        f(this.curved_lateral_border_left) +
        f(this.medial_crease_left) +
        f(this.talar_head_coverage_left) +
        f(this.posterior_crease_left) +
        f(this.rigid_equinus_left) +
        f(this.empty_heel_left)
      );
    } catch (e) {
      return "undefined";
    }
  }

  getPiraniRight() {
    // TODO: try-catch it in gui
    try {
      return (
        f(this.curved_lateral_border_right) +
        f(this.medial_crease_right) +
        f(this.talar_head_coverage_right) +
        f(this.posterior_crease_right) +
        f(this.rigid_equinus_right) +
        f(this.empty_heel_right)
      );
    } catch (e) {
      return "undefined";
    }
  }

  validate(res) {
    res = super.validate(res);

    if (this.date > new Date().toISOString()) {
      res.dateInTheFuture = true;
    }

    return res;
  }
}
