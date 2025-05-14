import assert from "node:assert";
import test from "node:test";
import Consult from "../business/abstracts/consult";
import PatientRelated from "../business/abstracts/patient-related";
import Appointment from "../business/appointment";
import Folder from "../business/folder";
import Patient from "../business/patient";
import { loadReference, RefFolder1 } from "../helpers.test";
import {
  bmi,
  getBMISd,
  getHeightSd,
  getLastSeen,
  getNextAppointment,
  getWeightSd,
  getWHSd,
  patientRelatedOrdering,
  wh
} from "./calculations";
import { DataMissingException } from "./exceptions";
import { string2number } from "./strings";
import type { StringNumber } from "./types";

function assertToBeClose(
  val: number | StringNumber,
  ref: number,
  precision: number = 0.01
) {
  if (typeof val == "string") {
    val = string2number(val);
  }

  assert.equal(Math.sign(val), Math.sign(ref));
  assert(Math.abs(val - ref) < precision);
}

const consultRicket13: Consult = Consult.factory({
  id: "13",
  // created_at: "<timestamp>",
  // updated_at: "<timestamp>",
  // last_user: "Thierry",
  // patient_id: "1",
  date: "2014-01-04",
  // examiner: "AMD doctor",
  // center: "Chakaria Disability Center",
  weight_kg: "37",
  height_cm: "110",
  brachial_circumference_cm: "0"
  // suggested_for_surgery: "1",
  // treatment_evaluation: "",
  // treatment_finished: "",
  // comments: ""
});

const patient1: Patient = Patient.factory({
  id: "1",
  // created_at: "<timestamp>",
  // updated_at: "<timestamp>",
  // last_user: "Thierry",
  // entry_year: 2000,
  // entry_order: 1,
  // name: "rezaul islam",
  sex: "Male",
  year_of_birth: "1998"
  // phone: "",
  // address_comments: "",
  // address_district: "Chittagong",
  // address_upazilla: null,
  // address_union: null,
  // pathology: "ClubFoot",
  // comments: ""
});

test("with ricketConsult_13", function () {
  // Male
  assert.equal(consultRicket13.date, "2014-01-04");
  assert.equal(consultRicket13.height_cm, 110);
  assert.equal(consultRicket13.weight_kg, 37);
  assertToBeClose(wh(consultRicket13), 0.34);
  assertToBeClose(bmi(consultRicket13), 30.58);
  assertToBeClose(getWeightSd(consultRicket13, patient1), -3.59);
  assertToBeClose(getHeightSd(consultRicket13, patient1), -9.57);
  assertToBeClose(getWHSd(consultRicket13, patient1), 12.61);
  assertToBeClose(getBMISd(consultRicket13, patient1), 2.39);
});

test("with patient with sex", function () {
  const emptyConsult = Consult.factory({}) as Consult;

  assert.throws(function () {
    bmi(emptyConsult);
  }, new DataMissingException("Height"));
  assert.throws(function () {
    wh(emptyConsult);
  }, new DataMissingException("Height"));
});

test("order", async function (t) {
  const resFirst = (a: PatientRelated, b: PatientRelated) => {
    assert.equal(patientRelatedOrdering(a, a), 0);
    assert.equal(patientRelatedOrdering(b, b), 0);

    assert(patientRelatedOrdering(a, b) < 0);
    assert(patientRelatedOrdering(b, a) > 0);
  };

  await t.test("order by id", function () {
    const o1 = PatientRelated.factory({}) as PatientRelated;
    const o2 = PatientRelated.factory({ id: 2 }) as PatientRelated;
    const o3 = PatientRelated.factory({ id: 1 }) as PatientRelated;

    resFirst(o1, o2);
    resFirst(o1, o3);
    resFirst(o2, o3);

    // Test string completely...
    const o25 = PatientRelated.factory({ id: "25" }) as PatientRelated;
    resFirst(o25, o2);
  });

  await t.test("order by Date", function () {
    const o1 = PatientRelated.factory({}) as PatientRelated;
    const o2 = PatientRelated.factory({ date: "2010-01-01" }) as PatientRelated;
    const o3 = PatientRelated.factory({ date: "2000-01-01" }) as PatientRelated;

    resFirst(o1, o2);
    resFirst(o1, o3);
    resFirst(o2, o3);
  });

  await t.test("order by created_at", function () {
    const o1 = PatientRelated.factory({}) as PatientRelated; // New element
    const o2 = PatientRelated.factory({
      id: 1,
      created_at: "2010-01-01"
    }) as PatientRelated;
    const o3 = PatientRelated.factory({
      id: 1,
      created_at: "2000-01-01"
    }) as PatientRelated;
    resFirst(o1, o2);
    resFirst(o1, o3);
    resFirst(o2, o3);
  });

  await t.test("order by new > date > model > id", function () {
    const o1 = PatientRelated.factory({}) as PatientRelated;
    const o2 = PatientRelated.factory({ date: "2000-01-01" }) as PatientRelated;
    const o3 = PatientRelated.factory({ id: "25" }) as PatientRelated;
    const o4 = PatientRelated.factory({
      id: "25",
      date: "2000-01-01"
    }) as PatientRelated;

    resFirst(o1, o2);
    resFirst(o1, o3);
    resFirst(o2, o3);
    resFirst(o3, o4);
  });
});

test("patient related", async function (t) {
  let f: Folder = new Folder();

  t.beforeEach(async () => {
    f = await loadReference(RefFolder1);
  });

  await t.test("getLastSeen", function () {
    assert.equal(getLastSeen(new Folder()), undefined);
    assert.deepStrictEqual(getLastSeen(f), new Date("2014-11-04"));
  });

  await t.test("getNextAppointment", function () {
    assert.equal(getNextAppointment(new Folder()), undefined);

    f.list.push(Appointment.factory({ date: "2100-01-01" }) as Appointment);
    assert.deepStrictEqual(getNextAppointment(f), new Date("2100-01-01"));
  });
});
