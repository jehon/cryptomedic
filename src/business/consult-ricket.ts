import { StringList, StringNumber } from "../utils/types";
import Consult from "./abstracts/consult";

export default class ConsultRicket extends Consult {
  static override getModel() {
    return "RicketConsult";
  }

  static override getTechnicalName() {
    return "consult_ricket";
  }

  static override getTitle() {
    return "Consult. Ricket";
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
  cross_right_T: StringNumber = "";
  cross_right_F: StringNumber = "";

  // Left
  left_leg: StringList = "";
  left_leg_angle: StringNumber = "";
  cross_left_T: StringNumber = "";
  cross_left_F: StringNumber = "";

  x_Surgery: string = "";
  x_Brace: string = "";
  x_Nutrisupport: string = "";
}
