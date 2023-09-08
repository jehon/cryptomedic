import Timed from "./timed.js";

import { DataMissingException } from "../utils/exceptions.js";
import { fromBirthDateTo, normalizeDate } from "../utils/date-old.js";
import { stdDeviationFor } from "../utils/standard-deviation.js";

export default class Consult extends Timed {
  getModel() {
    return "Consult";
  }

  weight_kg;
  height_cm;
  brachial_circumference_cm;
  treatment_evaluation;
  treatment_finished;
  comments;
  suggested_for_surgery;

  /**
   *
   * @param {weight_kg?}
   * @param {height_cm?}
   * @param {brachial_circumference_cm?}
   * @param {treatment_evaluation?}
   * @param {treatment_finished?}
   * @param {comments?}
   * @param {suggested_for_surgery?}
   */
  constructor({
    weight_kg,
    height_cm,
    brachial_circumference_cm,
    treatment_evaluation,
    treatment_finished,
    comments,
    suggested_for_surgery,
    ...others
  } = {}) {
    super(others);

    this.weight_kg = weight_kg;
    this.height_cm = height_cm;
    this.brachial_circumference_cm = brachial_circumference_cm;
    this.treatment_evaluation = treatment_evaluation;
    this.treatment_finished = treatment_finished;
    this.comments = comments;
    this.suggested_for_surgery = suggested_for_surgery;
  }

  validate(res) {
    res = super.validate(res);

    if (this.date > new Date().toISOString()) {
      res.dateInTheFuture = true;
    }

    return res;
  }

  getAgeAtThatTime() {
    return fromBirthDateTo(
      normalizeDate(this.getPatient().year_of_birth),
      normalizeDate(this.date)
    );
  }

  wh() {
    if (!this.isNotZero("height_cm")) {
      throw new DataMissingException("Height");
    }
    if (!this.isNotZero("weight_kg")) {
      throw new DataMissingException("Weight");
    }
    return this.weight_kg / this.height_cm;
  }

  bmi() {
    if (!this.isNotZero("height_cm")) {
      throw new DataMissingException("Height");
    }
    if (!this.isNotZero("weight_kg")) {
      throw new DataMissingException("Weight");
    }
    return (10000 * this.weight_kg) / (this.height_cm * this.height_cm);
  }

  getWeightSd() {
    return stdDeviationFor(
      this.getPatient().sexStr(),
      "weight_kg",
      this.getAgeAtThatTime(),
      this.weight_kg
    );
  }

  getHeightSd() {
    return stdDeviationFor(
      this.getPatient().sexStr(),
      "height_cm",
      this.getAgeAtThatTime(),
      this.height_cm
    );
  }

  getWHSd() {
    return stdDeviationFor(
      this.getPatient().sexStr(),
      "wh",
      this.height_cm,
      this.weight_kg
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
}
