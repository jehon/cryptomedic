// import { getPref } from "../../utils/prefs.js";
import { round } from "../../../_helpers/numbers";
import { StringBoolean } from "../../../generic/io/io.component";
import PatientRelated from "./patient-related";

export default class Consult extends PatientRelated {
  examiner: string = "";
  center: string = "";
  weight_kg?: number;
  height_cm?: number;
  brachial_circumference_cm?: number;
  comments: string = "";
  suggested_for_surgery: StringBoolean = "";
  treatment_evaluation: string = "";
  treatment_finished: StringBoolean = "";

  //   // Legacy
  //   initFromCachedPreferences() {
  //     const c = getPref("file", {
  //       examiner: "",
  //       center: "",
  //       date: ""
  //     });
  //     this.examiner = c.examiner;
  //     this.center = c.center;
  //     this.date = c.date;
  //   }

  //   // Legacy
  //   validate(res) {
  //     res = super.validate(res);

  //     // Does not work for appointments
  //     if (this.date > new Date().toISOString()) {
  //       res.dateInTheFuture = true;
  //     }

  //     return res;
  //   }

  wh() {
    if (!this.height_cm) {
      return "?";
    }
    if (!this.weight_kg) {
      return "?";
    }
    return round(this.weight_kg / this.height_cm, 0.01);
  }

  bmi() {
    if (!this.height_cm) {
      return "?";
    }
    if (!this.weight_kg) {
      return "?";
    }
    return round(
      (10000 * this.weight_kg) / (this.height_cm * this.height_cm),
      0.01
    );
  }

  // getWeightSd() {
  // return stdDeviationFor(
  //   this.#sexStr(),
  //   "weight_kg",
  //   this.getAgeAtThatTime(),
  //   this.weight_kg
  // );
  // }

  // getHeightSd() {
  //   return stdDeviationFor(
  //     this.getPatient().sexStr(),
  //     "height_cm",
  //     this.getAgeAtThatTime(),
  //     this.height_cm
  //   );
  // }

  // getWHSd() {
  //   return stdDeviationFor(
  //     this.getPatient().sexStr(),
  //     "wh",
  //     this.height_cm,
  //     this.weight_kg
  //   );
  // }

  // getBMISd() {
  //   return stdDeviationFor(
  //     this.getPatient().sexStr(),
  //     "bmi",
  //     this.getAgeAtThatTime(),
  //     this.bmi()
  //   );
  // }
}
