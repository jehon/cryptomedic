// import { getPref } from "../../utils/prefs.js";
import { StringBoolean } from "../../../generic/io/io.component";
import PatientRelated from "./patient-related";

export default class Timed extends PatientRelated {
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

  #sexStr() {
    if (this.getPatient().sex === "Male") {
      return "m";
    }
    if (this.getPatient().sex === "Female") {
      return "f";
    }
    return null;
  }

  // wh() {
  //   if (!this.isNotZero("height_cm")) {
  //     throw new DataMissingException("Height");
  //   }
  //   if (!this.isNotZero("weight_kg")) {
  //     throw new DataMissingException("Weight");
  //   }
  //   return this.weight_kg / this.height_cm;
  // }

  // bmi() {
  //   if (!this.isNotZero("height_cm")) {
  //     throw new DataMissingException("Height");
  //   }
  //   if (!this.isNotZero("weight_kg")) {
  //     throw new DataMissingException("Weight");
  //   }
  //   return (10000 * this.weight_kg) / (this.height_cm * this.height_cm);
  // }

  // getWeightSd() {
  //   return stdDeviationFor(
  //     this.getPatient().sexStr(),
  //     "weight_kg",
  //     this.getAgeAtThatTime(),
  //     this.weight_kg
  //   );
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
