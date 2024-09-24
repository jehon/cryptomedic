import Consult from "./abstracts/consult.js";

export default class ConsultRicket extends Consult {
  static getModel() {
    return "RicketConsult";
  }

  static getTechnicalName() {
    return "consult_ricket";
  }

  static getTitle() {
    return "Consult. Ricket";
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
}
