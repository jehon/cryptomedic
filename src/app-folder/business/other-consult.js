import Consult from "./consult.js";

export default class OtherConsult extends Consult {
  getModel() {
    return "OtherConsult";
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

  constructor({
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
  } = {}) {
    super(others);

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
