import Timed from "./timed";

import { fromBirthDateTo, normalizeDate } from "../../utils/date";
import { DataMissingException } from "../../utils/exceptions";
import { stdDeviationFor } from "../../utils/standard-deviation";
import { string2number } from "../../utils/strings";
import { StringBoolean, StringNumber } from "../../utils/types";

export default class Consult extends Timed {
  weight_kg: StringNumber = "";
  height_cm: StringNumber = "";
  brachial_circumference_cm: StringNumber = "";
  treatment_evaluation: string = "";
  treatment_finished: StringBoolean = "";
  comments: string = "";
  suggested_for_surgery: StringBoolean = "";

  getAgeAtThatTime() {
    return fromBirthDateTo(
      normalizeDate(this.getPatient().year_of_birth),
      normalizeDate(this.date)
    );
  }

  wh() {
    if (!this.height_cm) {
      throw new DataMissingException("Height");
    }
    if (!this.weight_kg) {
      throw new DataMissingException("Weight");
    }
    return string2number(this.weight_kg) / string2number(this.height_cm);
  }

  bmi() {
    if (!this.height_cm) {
      throw new DataMissingException("Height");
    }
    if (!this.weight_kg) {
      throw new DataMissingException("Weight");
    }
    return (
      (10000 * string2number(this.weight_kg)) /
      (string2number(this.height_cm) * string2number(this.height_cm))
    );
  }

  getWeightSd() {
    return stdDeviationFor(
      this.getPatient().sexStr(),
      "weight_kg",
      this.getAgeAtThatTime(),
      string2number(this.weight_kg)
    );
  }

  getHeightSd() {
    return stdDeviationFor(
      this.getPatient().sexStr(),
      "height_cm",
      this.getAgeAtThatTime(),
      string2number(this.height_cm)
    );
  }

  getWHSd() {
    return stdDeviationFor(
      this.getPatient().sexStr(),
      "wh",
      string2number(this.height_cm),
      string2number(this.weight_kg)
    );
  }

  getBMISd() {
    return stdDeviationFor(
      this.getPatient().sexStr(),
      "bmi",
      this.getAgeAtThatTime(),
      this.bmi()
    );
  }

  // // Legacy
  // validate(res) {
  //   res = super.validate(res);

  //   if (this.date > new Date().toISOString()) {
  //     res.dateInTheFuture = true;
  //   }

  //   return res;
  // }
}
