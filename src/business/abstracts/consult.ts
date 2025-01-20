import Timed from "./timed";

import { fromBirthDateTo, normalizeDate } from "../../utils/date";
import { DataMissingException } from "../../utils/exceptions";
import { stdDeviationFor } from "../../utils/standard-deviation";
import { string2number } from "../../utils/strings";
import {
  type StringBoolean,
  type StringList,
  type StringNumber
} from "../../utils/types";

export default class Consult extends Timed {
  // Begin
  weight_kg: StringNumber = "";
  height_cm: StringNumber = "";
  brachial_circumference_cm: StringNumber = "";
  // End
  comments: string = "";
  suggested_for_surgery: StringBoolean = "";
  treatment_evaluation: StringList = "";
  treatment_finished: StringBoolean = "";

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
      this.getPatient().sex,
      "weight_kg",
      this.getAgeAtThatTime(),
      string2number(this.weight_kg)
    );
  }

  getHeightSd() {
    return stdDeviationFor(
      this.getPatient().sex,
      "height_cm",
      this.getAgeAtThatTime(),
      string2number(this.height_cm)
    );
  }

  getWHSd() {
    return stdDeviationFor(
      this.getPatient().sex,
      "wh",
      string2number(this.height_cm),
      string2number(this.weight_kg)
    );
  }

  getBMISd() {
    return stdDeviationFor(
      this.getPatient().sex,
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
