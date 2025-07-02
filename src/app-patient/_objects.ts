import type { BusinessType } from "../config";

type StringBoolean = string;
export type StringDate = string;
type StringNumber = string;
export type StringList = string;
export type StringText = string;

export interface Pojo {
  id?: string;
  created_at?: StringDate;
  updated_at?: StringDate;
  last_user?: string;

  // TODO: Temporary
  _type: BusinessType;
}

export interface PatientRelated extends Pojo {
  patient_id: string | undefined;
}

export interface Timed extends PatientRelated {
  date?: StringDate;
  examiner?: string;
  center?: string;
}

export interface Consult extends Timed {
  // Begin
  weight_kg?: StringNumber;
  height_cm?: StringNumber;
  brachial_circumference_cm?: StringNumber;

  // End
  comments?: string;
  suggested_for_surgery?: StringBoolean;
  treatment_evaluation?: StringList;
  treatment_finished?: StringBoolean;
}

export interface Appointment extends Timed {
  purpose?: string;
}

export interface Bill extends Timed {
  price_id: string;
  sl_family_salary: number;
  sl_number_of_household_members: number; // TODO: Max 10
  total_real: number;
  social_level: number;
  total_asked: number;

  payment: Payment[];
}

export interface ConsultClubfoot extends Consult {
  // Right
  // TODO: rename into right_
  // Right: Pirani
  curved_lateral_border_right: StringList;
  medial_crease_right: StringList;
  talar_head_coverage_right: StringList;
  posterior_crease_right: StringList;
  rigid_equinus_right: StringList;
  empty_heel_right: StringList;

  // Right: 3+
  pain_right: StringList;
  walking_floor_contact_right: StringList;
  walking_first_contact_right: StringList;
  jumping_one_leg_right: StringList;
  run_right: StringList;
  adduction_angle_right: StringNumber;
  hind_foot_angle_W_right: StringNumber;
  dorsal_flexion_max_right: StringNumber;
  plantar_flexion_max_right: StringNumber;
  muscular_inbalance_right: StringBoolean;

  // Left
  // TODO: rename into left_
  // Left: Pirani
  curved_lateral_border_left: StringList;
  medial_crease_left: StringList;
  talar_head_coverage_left: StringList;
  posterior_crease_left: StringList;
  rigid_equinus_left: StringList;
  empty_heel_left: StringList;

  // Left: 3+
  pain_left: StringList;
  walking_floor_contact_left: StringList;
  walking_first_contact_left: StringList;
  jumping_one_leg_left: StringList;
  run_left: StringList;
  adduction_angle_left: StringNumber;
  hind_foot_angle_W_left: StringNumber;
  dorsal_flexion_max_left: StringNumber;
  plantar_flexion_max_left: StringNumber;
  muscular_inbalance_left: StringBoolean;
}

export interface ConsultOther extends Consult {
  side: StringList;
  joints_or_bones_affected: string;
  deformity: string;
  articulation_mobility: string;
  muscle_strength: string;
  pain: StringList;
  walk: StringList;
  xray: string;
  examination_data: string;

  // TODO: Remove this fields in DB
  x_performed: string;
  x_not_performed: string;
}

export interface ConsultRicket extends Consult {
  walking_difficulties?: StringList;
  pain?: StringList;
  wrist_enlargement?: StringList;
  rib_heading?: StringList;
  IMIC_distance?: StringNumber;
  xray?: string;

  // Right
  right_leg?: StringList;
  right_leg_angle?: StringNumber;

  // TODO?: rename right_*
  cross_right_T?: StringNumber;
  cross_right_F?: StringNumber;

  // Left
  left_leg?: StringList;
  left_leg_angle?: StringNumber;
  // TODO?: rename left_*
  cross_left_T?: StringNumber;
  cross_left_F?: StringNumber;
}

export interface Patient extends Pojo {
  entry_year?: StringNumber;
  entry_order?: StringNumber;
  name?: string;
  sex?: string;
  year_of_birth?: string;
  pathology?: string;
  phone?: string;
  address_district?: string;
  // TODO: should be upazila (1 l)
  address_upazilla?: string;
  address_union?: string;
  address_comments?: string;
  comments?: string;

  appointment?: Appointment[];
  bill?: Bill[];
  club_foot?: ConsultClubfoot[];
  other_consult?: ConsultOther[];
  ricket_consult?: ConsultRicket[];
  picture?: Picture[];
  surgery?: Surgery[];
}

export interface Payment extends Pojo {
  bill_id: string;
  date: StringDate;
  amount: number;
  comments?: string;

  // Note: We don't use the "center" from the Timed object
}

export interface Picture extends Timed {
  type: StringList;
  file: string;
  comments: string;
}

export interface Surgery extends Timed {
  report_diagnostic: string;
  report_surgeon: string;
  report_side_right: StringBoolean;
  report_side_left: StringBoolean;
  report_procedure: string;
  follow_up_complication: string;
}
