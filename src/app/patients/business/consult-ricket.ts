import Consult from "./abstracts/consult";

export default class ConsultRicket extends Consult {
  override getTechnicalName(): string {
    return "consult_ricket";
  }

  cross_left_T?: string;
  right_leg?: string;
  pain?: string;
  wrist_enlargement?: string;
  rib_heading?: string;
  right_leg_angle?: string;
  left_leg_angle?: string;
  cross_right_T?: string;
  cross_right_F?: string;
  IMIC_distance?: string;
  left_leg?: string;
  cross_left_F?: string;
  x_Surgery?: string;
  xray?: string;
  x_Brace?: string;
  x_Nutrisupport?: string;
  walking_difficulties?: string;
}
