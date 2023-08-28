import PatientRelated from "./patient-related.js";
import { DataMissingException } from "../../utils/exceptions.js";

export default class Bill extends PatientRelated {
  getModel() {
    return "Bill";
  }

  getRelated() {
    return {
      Payment: "bill_id"
    };
  }

  // sl_family_salary;
  // sl_number_of_household_members;
  // date;
  // price_id;
  // center;
  // examiner;
  // total_real;
  // social_level;
  // total_asked;
  // consult_CDC_consultation_physio;
  // consult_CDC_consultation_Bengali_Doctor;
  // consult_CDC_consultation_Doctor;
  // consult_field_visit;
  // consult_home_visit;
  // medecine_medecine;
  // medecine_calcium_30x500mg;
  // other_making_plaster;
  // other_make_long_plaster;
  // other_make_short_plaster;
  // other_making_dressing;
  // ["other_x-ray"];
  // other_physiotherapy;
  // other_other_consultation_care;
  // workshop_BHKAFO_night;
  // workshop_BHKAFO_walking;
  // workshop_UHKAFO_night;
  // workshop_UHKAFO_night_child;
  // workshop_UHKAFO_walking;
  // ["workshop_BKAFO_night_-_plastic"];
  // workshop_BKAFO_walking;
  // workshop_KAFO_night;
  // workshop_UKAFO_walking;
  // workshop_knee_brace;
  // workshop_BAFO_night;
  // workshop_BAFO_walking;
  // workshop_BAFO_walking_child;
  // workshop_AFO_night;
  // workshop_AFO_night_child;
  // workshop_AFO_walking;
  // workshop_AFO_walking_child;
  // ["workshop_orthoshoes_with_bar_-_one_leg"];
  // ["workshop_orthoshoes_without_bar_-_one_leg"];
  // workshop_DB_splint;
  // workshop_compensation_sole;
  // workshop_compensation_sole_1cm;
  // workshop_compensation_sole_2cm;
  // workshop_compensation_sole_3cm;
  // workshop_compensation_sole_4cm;
  // workshop_compensation_sole_5cm;
  // workshop_arch_support;
  // workshop_matetarsal_pade;
  // workshop_supinator_corner;
  // workshop_wirst_splint;
  // workshop_hand_splint;
  // workshop_finger_splint;
  // ["workshop_walker_with_wheel_-_folding"];
  // ["workshop_walker_with_wheel_-_non_folding"];
  // ["workshop_crutch_a_pair_-_local"];
  // ["workshop_crutch_-_stainless_steel"];
  // ["workshop_wheel_chair_-_folding"];
  // ["workshop_CP_chair_-_wooden"];
  // ["workshop_CP_standing_table_-_wooden"];
  // workshop_cervical_collar;
  // workshop_abdominal_corset_belt;
  // workshop_reparing;
  // workshop_other_orthodevice;
  // surgical_osteotomy;
  // surgical_epiphysiodesis;
  // surgical_polio_AL;
  // surgical_percutaneous_AL_club_foot;
  // surgical_PMR_club_foot;
  // surgical_burn_release;
  // surgical_pin_removal;
  // surgical_other_operation;
  // other_microbus;
  // other_CMOSH_follow_up;
  // consult_give_appointment;
  // medecine_vitamineD;
  // other_nutritionalAdvice;
  // other_nutritionalSupport;
  // other_group_physiotherapy;
  // other_physiotherapy_child;
  // other_physiotherapy_adult;
  // workshop_BHKAFO_drop_lock_single_axis;
  // ["workshop_crutch_alumenium_-_a_pair"];
  // workshop_wheel_chair_china;
  // workshop_mailwalke_brace;
  // workshop_leg_truction;
  // workshop_thoracic_brace;
  // workshop_thoracic_brace_and_scoliosis_brace;
  // workshop_samainto_brace;
  // ["workshop_fracture_brace_-_one_leg"];
  // workshop_smo;
  // workshop_lifspring_afo;
  // surgical_osteotomy_bi;
  // surgical_epiphysiodesis_bi;
  // surgical_polio_achileus_achileus_lenthening_bi;
  // surgical_percutaneous_achil_tenotomy_bi_cmosh;
  // surgical_percutaneous_achil_tenotomy_uni_cdc;
  // surgical_percutaneous_achil_tenotomy_bi_cdc;
  // surgical_PMR_club_club_foot_bi;
  // surgical_burn_little_release;
  // other_other_plaster;
  // other_other_dressing;
  // consult_club_foot_follow_up;
  // ["workshop_UHKAFO_-_Drop_lock_single_axis_-_MI"];
  // ["workshop_artificial_limb_-_BK_-_exoskeleton"];
  // ["workshop_artificial_limb_-_AK_-_exoskeleton"];
  // ["workshop_artificial_limb_-_BK_-_Endoskeleton_with_pylon_standard"];
  // ["workshop_artificial_limb_-_AK_-_single_axis_standard"];
  // ["workshop_artificial_limb_-_AK_-_polycentric_knee_joint"];
  // workshop_artificial_tr_radial_prosthesis_alimco;
  // workshop_artificial_tr_radial_prosthesis_jaipur;
  // ["workshop_wheel_chair_-_china_-_modified"];
  // workshop_white_can;
  // workshop_hearing_aids;
  // workshop_elbow_crutch;
  // workshop_lifspring_BAFO;
  // ["workshop_AFO_-_Articulated"];
  // ["workshop_extension_brace_-_AFO"];
  // workshop_other;

  constructor(data, folder = null) {
    super(data, folder);
    if (!data || !data.id) {
      // Initialize social level from last bill (if any)
      var last_bill = null;
      if (folder) {
        for (var v of folder.getListByType(Bill)) {
          if (!last_bill) {
            last_bill = v;
          } else {
            if (last_bill.date < v.date) {
              last_bill = v;
            }
          }
        }
        if (last_bill) {
          this.sl_family_salary = last_bill.sl_family_salary;
          this.sl_number_of_household_members =
            last_bill.sl_number_of_household_members;
        }
      }
    }
  }

  ratioSalary() {
    if (!this.isNotZero("sl_number_of_household_members")) {
      throw new DataMissingException("sl_number_of_household_members");
    }

    return Math.ceil(
      this.sl_family_salary / this.sl_number_of_household_members
    );
  }

  social_level_calculated() {
    /**
     From TC:
     Level 0 is when the familial ration is < 300
     Level 1 is when the familial ration is 300<  FR < 500
     Level 2 is when the familial ration is 500< FR < 1500
     Level 3 is when the familial ration is 1500< FR < 3000
     Level 4 is when the familial ration is 3000< FR
     */
    try {
      const rs = this.ratioSalary();

      if (rs <= 300) {
        return 0;
      }

      if (rs <= 500) {
        return 1;
      }

      if (rs <= 1500) {
        return 2;
      }

      if (rs <= 3000) {
        return 3;
      }
    } catch (e) {}
    return 4;
  }

  calculate_total_real() {
    if (!this.price) {
      this.total_real = 0;
      this.total_asked = 0;
      return -1;
    }
    var total = 0;
    for (var i in this.price) {
      if (i[0] === "_") {
        continue;
      }
      if (i === "id") {
        continue;
      }
      if (i === "created_at") {
        continue;
      }
      if (i === "updated_at") {
        continue;
      }
      if (i === "last_user") {
        continue;
      }
      if (i === "date_from") {
        continue;
      }
      if (i === "date_to") {
        continue;
      }
      if (i === "controller") {
        continue;
      }
      if (i === "locked") {
        continue;
      }
      if (i === "dlocked") {
        continue;
      }
      if (i === "social_level_percentage_0") {
        continue;
      }
      if (i === "social_level_percentage_1") {
        continue;
      }
      if (i === "social_level_percentage_2") {
        continue;
      }
      if (i === "social_level_percentage_3") {
        continue;
      }
      if (i === "social_level_percentage_4") {
        continue;
      }
      if (this.price[i] < 0) {
        continue;
      }
      if (typeof this[i] === "undefined") {
        continue;
      }
      if (this[i] <= 0) {
        continue;
      }
      total += this.price[i] * this[i];
    } //, this);
    this.total_real = total;
    this.total_asked = this.total_real * this.calculate_percentage_asked();
    return this.total_real;
  }

  calculate_percentage_asked() {
    if (!this.price) {
      //console.warn('calculate_percentage_asked(): no price id');
      return 1;
    }
    var sl = this["social_level"];
    if (sl == null) {
      //console.warn('calculate_percentage_asked(): no social level');
      return 1;
    }
    if (typeof this.price["social_level_percentage_" + sl] == "undefined") {
      //console.warn('calculate_percentage_asked(): no social level in price for sl ' + sl);
      return 1;
    }
    var perc = this.price["social_level_percentage_" + sl];
    // console.log("price", this.price, sl, perc)
    return perc;
  }

  getPriceFor(key) {
    if (!this.price) return 0;
    if (!this.price[key]) return 0;
    return this.price[key];
  }

  getTotalFor(key) {
    if (!this.price) return 0;
    if (!this.price[key]) return 0;
    if (!this[key]) return 0;
    return this.price[key] * this[key];
  }

  calculatePriceId(prices) {
    if (typeof this.date == "undefined" || !this.date || !prices) {
      this.price_id = 0;
      this.price = false;
      return 0;
    }
    this.price_id = -1;
    var t = this;
    var dref = this.date;
    for (var i in prices) {
      var p = prices[i];
      if (
        (p["date_from"] == null || p["date_from"] <= dref) &&
        (p["date_to"] == null || p["date_to"] > dref)
      ) {
        t.price_id = i;
        t.price = prices[i];
      }
    }
    if (this.price_id < 0) {
      throw new Error("Price Id not set");
    }
    this.calculate_total_real();
  }

  getPriceId() {
    return this.price_id;
  }

  validate(res) {
    /* Business rules (price > 4):
        - il faut pourvoir coder home visit ou give appointment mais pas les 2
        - il faut pourvoir coder consultation physio ou doctor mais pas les 2
        */
    res = super.validate(res);

    if (!this.date) {
      res.noDate = true;
    }

    if (this.date > new Date().toISOString()) {
      res.dateInTheFuture = true;
    }

    if (this.price_id >= 2) {
      if (this.consult_home_visit > 0 && this.consult_give_appointment > 0) {
        res.homeVisitAndGiveAppointment = true;
      }

      if (
        this.consult_CDC_consultation_physio > 0 &&
        this.consult_CDC_consultation_Doctor > 0
      ) {
        res.consultPhisioAndDoctor = true;
      }
    }
    return res;
  }
}
