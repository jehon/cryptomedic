import Consult from "./abstracts/consult.js";

export default class ConsultOther extends Consult {
  static getModel() {
    return "OtherConsult";
  }

  static getTechnicalName() {
    return "consult_other";
  }

  static getTitle() {
    return "Consult. Other";
  }

  side;
  joints_or_bones_affected;
  deformity;
  articulation_mobility;
  muscle_strength;
  pain;
  walk;
  xray;
  performed;
  not_performed;
}
