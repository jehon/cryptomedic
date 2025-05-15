import assert from "node:assert";
import test from "node:test";
import type {
  Appointment,
  Consult,
  ConsultRicket,
  Patient
} from "../app-patient/objects";
import Folder from "../business/folder";
import { loadReference, RefFolder1 } from "../helpers.test";
import {
  bmi,
  getBMISd,
  getHeightSd,
  getLastSeen,
  getNextAppointment,
  getWeightSd,
  getWHSd,
  wh
} from "./calculations";
import { DataMissingException } from "./exceptions";
import { string2number } from "./strings";

function assertToBeClose(
  val: number | string,
  ref: number,
  precision: number = 0.01
) {
  if (typeof val == "string") {
    val = string2number(val);
  }

  assert.equal(Math.sign(val), Math.sign(ref));
  assert(Math.abs(val - ref) < precision);
}

const consultRicket13: ConsultRicket = {
  _type: "consult_ricket",
  patient_id: "1",
  id: "13",
  date: "2014-01-04",
  weight_kg: "37",
  height_cm: "110",
  brachial_circumference_cm: "0"
};

const patient1: Patient = {
  _type: "patient",
  id: "1",
  sex: "Male",
  year_of_birth: "1998"
};

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
  const emptyConsult: Consult = { _type: "consult_other", patient_id: "1" };

  assert.throws(function () {
    bmi(emptyConsult);
  }, new DataMissingException("Height"));
  assert.throws(function () {
    wh(emptyConsult);
  }, new DataMissingException("Height"));
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

    f.list.push({ _type: "appointment", date: "2100-01-01" } as Appointment);
    assert.deepStrictEqual(getNextAppointment(f), new Date("2100-01-01"));
  });
});
