import Consult from "./abstracts/consult.js";
import { registrySet } from "./registry.js";

const model = "RicketConsult";

export default class ConsultRicket extends Consult {
  static getModel() {
    return model;
  }

  getModel() {
    return model;
  }

  getTechnicalName() {
    return "consult_ricket";
  }

  cross_left_T;
  right_leg;
  pain;
  wrist_enlargement;
  rib_heading;
  right_leg_angle;
  left_leg_angle;
  cross_right_T;
  cross_right_F;
  IMIC_distance;
  left_leg;
  cross_left_F;
  x_Surgery;
  xray;
  x_Brace;
  x_Nutrisupport;
  walking_difficulties;

  constructor(
    {
      cross_left_T,
      right_leg,
      pain,
      wrist_enlargement,
      rib_heading,
      right_leg_angle,
      left_leg_angle,
      cross_right_T,
      cross_right_F,
      IMIC_distance,
      left_leg,
      cross_left_F,
      x_Surgery,
      xray,
      x_Brace,
      x_Nutrisupport,
      walking_difficulties,
      ...others
    } = {},
    folder = null
  ) {
    super(others, folder);
    this.cross_left_T = cross_left_T;
    this.right_leg = right_leg;
    this.pain = pain;
    this.wrist_enlargement = wrist_enlargement;
    this.rib_heading = rib_heading;
    this.right_leg_angle = right_leg_angle;
    this.left_leg_angle = left_leg_angle;
    this.cross_right_T = cross_right_T;
    this.cross_right_F = cross_right_F;
    this.IMIC_distance = IMIC_distance;
    this.left_leg = left_leg;
    this.cross_left_F = cross_left_F;
    this.xray = xray;
    this.walking_difficulties = walking_difficulties;
  }
}

registrySet(model, ConsultRicket);
