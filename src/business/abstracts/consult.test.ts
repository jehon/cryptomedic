import assert from "node:assert";
import test from "node:test";
import {
  assertToBeClose,
  loadReferenceFolder,
  RefFolder1
} from "../../test-helper";
import { DataMissingException } from "../../utils/exceptions";
import RicketConsult from "../consult-ricket";
import Folder from "../folder";
import Patient from "../patient";
import Consult from "./consult";

test("with ricketConsult_13", async function () {
  const folder = await loadReferenceFolder(RefFolder1);
  const c = folder.getByTypeAndId<RicketConsult>(RicketConsult, "13");

  assert(c instanceof RicketConsult);
  assert(c instanceof Consult);
  assert.equal(c.getId(), 13);

  // Male
  assert.equal(c.date, "2014-01-04");
  assert.equal(c.height_cm, 110);
  assert.equal(c.weight_kg, 37);
  assertToBeClose(c.wh(), 0.34);
  assertToBeClose(c.bmi(), 30.58);
  assertToBeClose(c.getWeightSd(), -3.59);
  assertToBeClose(c.getHeightSd(), -9.57);
  assertToBeClose(c.getWHSd(), 12.61);
  assertToBeClose(c.getBMISd(), 2.39);
});

test("with patient with sex", function () {
  const f = new Folder();
  const p = (
    Patient.factory({ id: 123, sex: "Male" }) as Patient
  ).registerParent(f);
  const c = (Consult.factory({ patient_id: 123 }) as Consult).registerParent(f);
  f.list.push(p);
  f.list.push(c);

  assert.throws(function () {
    c.bmi();
  }, new DataMissingException("Height"));
  assert.throws(function () {
    c.wh();
  }, new DataMissingException("Height"));
});
