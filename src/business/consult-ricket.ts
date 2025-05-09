import { type StringList, type StringNumber } from "../utils/types";
import Consult from "./abstracts/consult";

export default class ConsultRicket extends Consult {
  static override getTechnicalName() {
    return "consult_ricket";
  }

  walking_difficulties: StringList = "";
  pain: StringList = "";
  wrist_enlargement: StringList = "";
  rib_heading: StringList = "";
  IMIC_distance: StringNumber = "";
  xray: string = "";

  // Right
  right_leg: StringList = "";
  right_leg_angle: StringNumber = "";

  // TODO: rename right_*
  cross_right_T: StringNumber = "";
  cross_right_F: StringNumber = "";

  // Left
  left_leg: StringList = "";
  left_leg_angle: StringNumber = "";
  // TODO: rename left_*
  cross_left_T: StringNumber = "";
  cross_left_F: StringNumber = "";
}
