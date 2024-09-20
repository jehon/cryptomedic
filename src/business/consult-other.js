import Consult from "./abstracts/consult.js";

const model = "OtherConsult";

export default class ConsultOther extends Consult {
  static getModel() {
    return model;
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

  constructor(
    {
      side,
      joints_or_bones_affected,
      deformity,
      articulation_mobility,
      muscle_strength,
      pain,
      walk,
      xray,
      performed,
      not_performed,
      ...others
    } = {},
    folder = null
  ) {
    super(others, folder);

    this.side = side;
    this.joints_or_bones_affected = joints_or_bones_affected;
    this.deformity = deformity;
    this.articulation_mobility = articulation_mobility;
    this.muscle_strength = muscle_strength;
    this.pain = pain;
    this.walk = walk;
    this.xray = xray;
    this.performed = performed;
    this.not_performed = not_performed;
  }
}
