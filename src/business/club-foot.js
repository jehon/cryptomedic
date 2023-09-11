import Consult from "./abstracts/consult.js";
import { registrySet } from "./registry.js";

/**
 * @param {string|null} val the value to be parsed
 * @returns {number} the value parsed as float
 */
function f(val) {
  if (val == null) {
    throw new Error("Null value");
  }
  if (typeof val == "string") {
    return parseFloat(val);
  }
  return val;
}

const model = "ClubFoot";

// TODO: rename to ConsultClubfoot
export default class ClubFoot extends Consult {
  getModel() {
    return model;
  }

  // Legacy
  getServerRessource() {
    return "clubfeet";
  }

  pain_left;
  pain_right;
  walking_floor_contact_left;
  walking_floor_contact_right;
  walking_first_contact_left;
  walking_first_contact_right;
  jumping_one_leg_left;
  jumping_one_leg_right;
  run_left;
  run_right;
  adduction_angle_left;
  adduction_angle_right;
  hind_foot_angle_W_left;
  hind_foot_angle_W_right;
  dorsal_flexion_max_left;
  dorsal_flexion_max_right;
  plantar_flexion_max_left;
  plantar_flexion_max_right;
  muscular_inbalance_left;
  muscular_inbalance_right;
  curved_lateral_border_left;
  curved_lateral_border_right;
  medial_crease_left;
  medial_crease_right;
  talar_head_coverage_left;
  talar_head_coverage_right;
  posterior_crease_left;
  posterior_crease_right;
  rigid_equinus_left;
  rigid_equinus_right;
  empty_heel_left;
  empty_heel_right;

  /**
   *
   * @param {any} any
   * @param {Folder} folder
   */
  constructor(
    {
      pain_left,
      pain_right,
      walking_floor_contact_left,
      walking_floor_contact_right,
      walking_first_contact_left,
      walking_first_contact_right,
      jumping_one_leg_left,
      jumping_one_leg_right,
      run_left,
      run_right,
      adduction_angle_left,
      adduction_angle_right,
      hind_foot_angle_W_left,
      hind_foot_angle_W_right,
      dorsal_flexion_max_left,
      dorsal_flexion_max_right,
      plantar_flexion_max_left,
      plantar_flexion_max_right,
      muscular_inbalance_left,
      muscular_inbalance_right,
      curved_lateral_border_left,
      curved_lateral_border_right,
      medial_crease_left,
      medial_crease_right,
      talar_head_coverage_left,
      talar_head_coverage_right,
      posterior_crease_left,
      posterior_crease_right,
      rigid_equinus_left,
      rigid_equinus_right,
      empty_heel_left,
      empty_heel_right,
      ...others
    } = {},
    folder = null
  ) {
    super(others, folder);
    this.pain_left = pain_left;
    this.pain_right = pain_right;
    this.walking_floor_contact_left = walking_floor_contact_left;
    this.walking_floor_contact_right = walking_floor_contact_right;
    this.walking_first_contact_left = walking_first_contact_left;
    this.walking_first_contact_right = walking_first_contact_right;
    this.jumping_one_leg_left = jumping_one_leg_left;
    this.jumping_one_leg_right = jumping_one_leg_right;
    this.run_left = run_left;
    this.run_right = run_right;
    this.adduction_angle_left = adduction_angle_left;
    this.adduction_angle_right = adduction_angle_right;
    this.hind_foot_angle_W_left = hind_foot_angle_W_left;
    this.hind_foot_angle_W_right = hind_foot_angle_W_right;
    this.dorsal_flexion_max_left = dorsal_flexion_max_left;
    this.dorsal_flexion_max_right = dorsal_flexion_max_right;
    this.plantar_flexion_max_left = plantar_flexion_max_left;
    this.plantar_flexion_max_right = plantar_flexion_max_right;
    this.muscular_inbalance_left = muscular_inbalance_left;
    this.muscular_inbalance_right = muscular_inbalance_right;
    this.curved_lateral_border_left = curved_lateral_border_left;
    this.curved_lateral_border_right = curved_lateral_border_right;
    this.medial_crease_left = medial_crease_left;
    this.medial_crease_right = medial_crease_right;
    this.talar_head_coverage_left = talar_head_coverage_left;
    this.talar_head_coverage_right = talar_head_coverage_right;
    this.posterior_crease_left = posterior_crease_left;
    this.posterior_crease_right = posterior_crease_right;
    this.rigid_equinus_left = rigid_equinus_left;
    this.rigid_equinus_right = rigid_equinus_right;
    this.empty_heel_left = empty_heel_left;
    this.empty_heel_right = empty_heel_right;
  }

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
    } catch (e) {
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
    } catch (e) {
      return "undefined";
    }
  }
}

registrySet(model, ClubFoot);
