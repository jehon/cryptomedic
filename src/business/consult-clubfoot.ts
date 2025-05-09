import {
  type StringBoolean,
  type StringList,
  type StringNumber
} from "../utils/types";
import Consult from "./abstracts/consult";

export default class ConsultClubfoot extends Consult {
  static override getModel() {
    return "ClubFoot";
  }

  static override getTechnicalName() {
    return "consult_clubfoot";
  }

  // Right
  // TODO: rename into right_
  // Right: Pirani
  curved_lateral_border_right: StringList = "";
  medial_crease_right: StringList = "";
  talar_head_coverage_right: StringList = "";
  posterior_crease_right: StringList = "";
  rigid_equinus_right: StringList = "";
  empty_heel_right: StringList = "";

  // Right: 3+
  pain_right: StringList = "";
  walking_floor_contact_right: StringList = "";
  walking_first_contact_right: StringList = "";
  jumping_one_leg_right: StringList = "";
  run_right: StringList = "";
  adduction_angle_right: StringNumber = "";
  hind_foot_angle_W_right: StringNumber = "";
  dorsal_flexion_max_right: StringNumber = "";
  plantar_flexion_max_right: StringNumber = "";
  muscular_inbalance_right: StringBoolean = "";

  // Left
  // TODO: rename into left_
  // Left: Pirani
  curved_lateral_border_left: StringList = "";
  medial_crease_left: StringList = "";
  talar_head_coverage_left: StringList = "";
  posterior_crease_left: StringList = "";
  rigid_equinus_left: StringList = "";
  empty_heel_left: StringList = "";

  // Left: 3+
  pain_left: StringList = "";
  walking_floor_contact_left: StringList = "";
  walking_first_contact_left: StringList = "";
  jumping_one_leg_left: StringList = "";
  run_left: StringList = "";
  adduction_angle_left: StringNumber = "";
  hind_foot_angle_W_left: StringNumber = "";
  dorsal_flexion_max_left: StringNumber = "";
  plantar_flexion_max_left: StringNumber = "";
  muscular_inbalance_left: StringBoolean = "";
}
