import assert from "node:assert";
import test from "node:test";
import Consult from "../business/abstracts/consult";
import Patient from "../business/patient";
import { assertToBeClose } from "../test-helper";
import {
  bmi,
  getBMISd,
  getHeightSd,
  getWeightSd,
  getWHSd,
  wh
} from "./calculations";
import { DataMissingException } from "./exceptions";

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
