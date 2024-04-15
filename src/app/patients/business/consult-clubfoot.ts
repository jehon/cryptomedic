import Consult from "./abstracts/consult";

export default class ConsultClubfoot extends Consult {
  override getTechnicalName(): string {
    return "consult_clubfoot";
  }

  pain_left?: number;
  pain_right?: number;
  walking_floor_contact_left?: number;
  walking_floor_contact_right?: number;
  walking_first_contact_left?: number;
  walking_first_contact_right?: number;
  jumping_one_leg_left?: number;
  jumping_one_leg_right?: number;
  run_left?: number;
  run_right?: number;
  adduction_angle_left?: number;
  adduction_angle_right?: number;
  hind_foot_angle_W_left?: number;
  hind_foot_angle_W_right?: number;
  dorsal_flexion_max_left?: number;
  dorsal_flexion_max_right?: number;
  plantar_flexion_max_left?: number;
  plantar_flexion_max_right?: number;
  muscular_inbalance_left?: number;
  muscular_inbalance_right?: number;
  curved_lateral_border_left?: number;
  curved_lateral_border_right?: number;
  medial_crease_left?: number;
  medial_crease_right?: number;
  talar_head_coverage_left?: number;
  talar_head_coverage_right?: number;
  posterior_crease_left?: number;
  posterior_crease_right?: number;
  rigid_equinus_left?: number;
  rigid_equinus_right?: number;
  empty_heel_left?: number;
  empty_heel_right?: number;
}
