import { StringNumber } from "../utils/types.js";
import Consult from "./abstracts/consult.js";

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

  cross_left_T: string = "";
  right_leg: string = "";
  pain: string = "";
  wrist_enlargement: string = "";
  rib_heading: string = "";
  right_leg_angle: string = "";
  left_leg_angle: string = "";
  cross_right_T: string = "";
  cross_right_F: string = "";
  IMIC_distance: string = "";
  left_leg: string = "";
  cross_left_F: StringNumber = "";
  x_Surgery: string = "";
  xray: string = "";
  x_Brace: string = "";
  x_Nutrisupport: string = "";
  walking_difficulties: string = "";
}
