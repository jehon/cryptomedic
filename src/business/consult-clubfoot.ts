import { string2number } from "../utils/strings";
import { StringList } from "../utils/types";
import Consult from "./abstracts/consult";

export default class ConsultClubfoot extends Consult {
  static override getModel() {
    return "ClubFoot";
  }

  static override getTechnicalName() {
    return "consult_clubfoot";
  }

  static override getTitle() {
    return "Consult. Clubfoot";
  }

  pain_left: string = "";
  pain_right: string = "";
  walking_floor_contact_left: string = "";
  walking_floor_contact_right: string = "";
  walking_first_contact_left: string = "";
  walking_first_contact_right: string = "";
  jumping_one_leg_left: string = "";
  jumping_one_leg_right: string = "";
  run_left: string = "";
  run_right: string = "";
  adduction_angle_left: string = "";
  adduction_angle_right: string = "";
  hind_foot_angle_W_left: string = "";
  hind_foot_angle_W_right: string = "";
  dorsal_flexion_max_left: string = "";
  dorsal_flexion_max_right: string = "";
  plantar_flexion_max_left: string = "";
  plantar_flexion_max_right: string = "";
  muscular_inbalance_left: string = "";
  muscular_inbalance_right: string = "";
  curved_lateral_border_left: StringList = "";
  curved_lateral_border_right: StringList = "";
  medial_crease_left: string = "";
  medial_crease_right: string = "";
  talar_head_coverage_left: string = "";
  talar_head_coverage_right: string = "";
  posterior_crease_left: string = "";
  posterior_crease_right: string = "";
  rigid_equinus_left: string = "";
  rigid_equinus_right: string = "";
  empty_heel_left: string = "";
  empty_heel_right: string = "";

  getPiraniLeft() {
    // TODO: try-catch it in gui
    try {
      return (
        string2number(this.curved_lateral_border_left) +
        string2number(this.medial_crease_left) +
        string2number(this.talar_head_coverage_left) +
        string2number(this.posterior_crease_left) +
        string2number(this.rigid_equinus_left) +
        string2number(this.empty_heel_left)
      );
    } catch (_e) {
      return "undefined";
    }
  }

  getPiraniRight() {
    // TODO: try-catch it in gui
    try {
      return (
        string2number(this.curved_lateral_border_right) +
        string2number(this.medial_crease_right) +
        string2number(this.talar_head_coverage_right) +
        string2number(this.posterior_crease_right) +
        string2number(this.rigid_equinus_right) +
        string2number(this.empty_heel_right)
      );
    } catch (_e) {
      return "undefined";
    }
  }
}
