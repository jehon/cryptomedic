import type { Consult, Patient, Pojo, Timed } from "../app-patient/_objects";
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

export function actualAge(
  patient: Patient,
  reference: Date | string | number = new Date()
) {
  if (!patient.year_of_birth) {
    return null;
  }
  let birth: Date | string | number = patient.year_of_birth;
  const options: {
    reference: Date | string | number;
    format: string;
  } = {
    reference,
    format: ""
  };
  if (typeof options.reference == "number") {
    options.reference = "" + options.reference;
  }
  if (typeof options.reference == "string") {
    if (options.reference.length < 4) {
      return options.format ? null : "?";
      // throw new Exception('Invalid reference');
    }
    const ry = parseInt(options.reference.substring(0, 4));
    let rm = parseInt(options.reference.substring(5, 7));
    if (isNaN(rm)) {
      rm = 1; // emulate january
    }
    options.reference = new Date(ry, rm - 1, 1);
  }
  if (typeof birth == "number") {
    birth = "" + birth;
  }
  if (typeof birth == "string") {
    if (birth.length < 4) {
      return options.format ? null : "?";
      // throw new Exception('Invalid birth');
    }
    const by = parseInt(birth.substring(0, 4));
    let bm = parseInt(birth.substring(5, 7));
    if (isNaN(bm)) {
      bm = 1; // emulate january
    }
    birth = new Date(by, bm - 1 - 1, 30);
  }
  const days = new Date(
    0,
    0,
    0,
    0,
    0,
    0,
    options.reference.getTime() - birth.getTime()
  );
  const res = { years: days.getFullYear() - 1900, months: days.getMonth() };
  if (options.format === "object") {
    return res;
  }
  if (options.format === "number") {
    return res.years + res.months / 12;
  }
  return res.years + "y" + res.months + "m";
}

export function sortList(list: Pojo[]) {
  return list.sort(pojoOrdering);
}

export function pojoOrdering(o1: Pojo, o2: Pojo) {
  const o1First = -1;
  const o2First = 1;

  const o1id = parseInt(o1.id || "");
  const o2id = parseInt(o2.id || "");

  // Return 1 if o1 > o2 (o1 - o2) (o1 est après o2)
  // Return -1 if o1 < o2 (o1 - o2) (o1 est avant o2)

  // What to do if one 'id' is missing
  if (isNaN(o1id) && !isNaN(o2id)) {
    return 10 * o1First;
  }
  if (isNaN(o2id) && !isNaN(o1id)) {
    return 10 * o2First;
  }

  if ("date" in o1 && o1.date != undefined) {
    if ("date" in o2 && o2.date != undefined) {
      // Both 'date' are present
      if (o1.date < o2.date) return 30 * o2First;
      if (o1.date > o2.date) return 30 * o1First;
    } else {
      return 20 * o2First;
    }
  } else {
    if ("date" in o2 && o2.date != undefined) {
      return 20 * o1First;
    } else {
      // Both 'date' are absent
      // Not deciding here
    }
  }

  if (typeof o2.created_at == "undefined") {
    // Even if o1 is undefined
    return 10 * o1First;
  }

  if (typeof o1.created_at == "undefined") {
    return 10 * o2First;
  }

  if (o1.created_at < o2.created_at) return 40 * o2First;
  if (o1.created_at > o2.created_at) return 40 * o1First;

  // Both 'id' are present
  if (!isNaN(o1id) && !isNaN(o2id)) {
    if (o1id > o2id) return 50 * o1First;
    if (o1id < o2id) return 50 * o2First;
  }

  return 0;
}
