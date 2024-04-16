// import { getPref } from "../../utils/prefs.js";
import { StringBoolean } from "../../../generic/io/io.component";
import PatientRelated from "./patient-related";

export default class Timed extends PatientRelated {
  examiner: string = "";
  center: string = "";
  weight_kg: string = "";
  height_cm: string = "";
  brachial_circumference_cm: string = "";
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
}
