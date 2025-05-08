import type Consult from "../business/abstracts/consult";
import type Timed from "../business/abstracts/timed";
import type Patient from "../business/patient";
import { fromBirthDateTo, normalizeDate } from "./date";
import { DataMissingException } from "./exceptions";
import { stdDeviationFor } from "./standard-deviation";
import { string2number } from "./strings";

export function getAgeAtThatTime(timed: Timed, patient: Patient) {
  return fromBirthDateTo(
    normalizeDate(patient.year_of_birth),
    normalizeDate(timed.date)
  );
}

export function wh(consult: Consult) {
  if (!consult.height_cm) {
    throw new DataMissingException("Height");
  }
  if (!consult.weight_kg) {
    throw new DataMissingException("Weight");
  }
  return string2number(consult.weight_kg) / string2number(consult.height_cm);
}

export function bmi(consult: Consult) {
  if (!consult.height_cm) {
    throw new DataMissingException("Height");
  }
  if (!consult.weight_kg) {
    throw new DataMissingException("Weight");
  }
  return (
    (10000 * string2number(consult.weight_kg)) /
    (string2number(consult.height_cm) * string2number(consult.height_cm))
  );
}

export function getWeightSd(consult: Consult, patient: Patient) {
  return stdDeviationFor(
    patient.sex,
    "weight_kg",
    getAgeAtThatTime(consult, patient),
    string2number(consult.weight_kg)
  );
}

export function getHeightSd(consult: Consult, patient: Patient) {
  return stdDeviationFor(
    patient.sex,
    "height_cm",
    getAgeAtThatTime(consult, patient),
    string2number(consult.height_cm)
  );
}

export function getWHSd(consult: Consult, patient: Patient) {
  return stdDeviationFor(
    patient.sex,
    "wh",
    string2number(consult.height_cm),
    string2number(consult.weight_kg)
  );
}

export function getBMISd(consult: Consult, patient: Patient) {
  return stdDeviationFor(
    patient.sex,
    "bmi",
    getAgeAtThatTime(consult, patient),
    bmi(consult)
  );
}
