import { StringList } from "../utils/types.js";
import Consult from "./abstracts/consult.js";

function f(val?: string | number): number {
  if (val == null) {
    throw new Error("Null value");
  }
  if (typeof val == "string") {
    return parseFloat(val);
  }
  return val;
}

const model = "ClubFoot";

export default class ConsultClubfoot extends Consult {
  static override getModel() {
    return model;
  }

  static override getTechnicalName() {
    return "consult_clubfoot";
  }

  static override getTitle() {
    return "Consult. Clubfoot";
  }

  pain_left?: string;
  pain_right?: string;
  walking_floor_contact_left?: string;
  walking_floor_contact_right?: string;
  walking_first_contact_left?: string;
  walking_first_contact_right?: string;
  jumping_one_leg_left?: string;
  jumping_one_leg_right?: string;
  run_left?: string;
  run_right?: string;
  adduction_angle_left?: string;
  adduction_angle_right?: string;
  hind_foot_angle_W_left?: string;
  hind_foot_angle_W_right?: string;
  dorsal_flexion_max_left?: string;
  dorsal_flexion_max_right?: string;
  plantar_flexion_max_left?: string;
  plantar_flexion_max_right?: string;
  muscular_inbalance_left?: string;
  muscular_inbalance_right?: string;
  curved_lateral_border_left?: StringList;
  curved_lateral_border_right?: StringList;
  medial_crease_left?: string;
  medial_crease_right?: string;
  talar_head_coverage_left?: string;
  talar_head_coverage_right?: string;
  posterior_crease_left?: string;
  posterior_crease_right?: string;
  rigid_equinus_left?: string;
  rigid_equinus_right?: string;
  empty_heel_left?: string;
  empty_heel_right?: string;

  getPiraniLeft() {
    // TODO: try-catch it in gui
    try {
      return (
        f(this.curved_lateral_border_left) +
        f(this.medial_crease_left) +
        f(this.talar_head_coverage_left) +
        f(this.posterior_crease_left) +
        f(this.rigid_equinus_left) +
        f(this.empty_heel_left)
      );
    } catch (_e) {
      return "undefined";
    }
  }

  getPiraniRight() {
    // TODO: try-catch it in gui
    try {
      return (
        f(this.curved_lateral_border_right) +
        f(this.medial_crease_right) +
        f(this.talar_head_coverage_right) +
        f(this.posterior_crease_right) +
        f(this.rigid_equinus_right) +
        f(this.empty_heel_right)
      );
    } catch (_e) {
      return "undefined";
    }
  }
}
