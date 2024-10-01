import assert from "node:assert";
import test from "node:test";
import {
  assertToBeClose,
  loadReferenceFolder,
  RefFolder1
} from "../../test-helper";
import RicketConsult from "../consult-ricket";
import Patient from "../patient";
import PatientRelated from "./patient-related";

test("with TestFolder.test1.json", async function () {
  // Go through the rest_service !!!
  const folder = await loadReferenceFolder(RefFolder1);

  assert(folder.getPatient() instanceof Patient);
  assert.equal(folder.getPatient().sex, "Male");
  assert.equal(folder.getPatient().year_of_birth, "1998");
  assert.equal(folder.getPatient().actualAge(new Date("2014-01-01")), "16y0m");

  const rc = folder.getByTypeAndId<RicketConsult>(RicketConsult, "13");

  assert(rc instanceof PatientRelated);
  assert(rc instanceof RicketConsult);
  assert.equal(rc.getId(), 13);
  assert(rc.getPatient() instanceof Patient);
  assert.equal(rc.date, "2014-01-04");
});

test("with ricketConsult_13", async function () {
  const folder = await loadReferenceFolder(RefFolder1);
  const rc = folder.getByTypeAndId<RicketConsult>(RicketConsult, "13")!;

  // Male

  assert(rc instanceof RicketConsult);
  assert.equal(rc.getId(), 13);
  assert.equal(rc.date, "2014-01-04");
  assertToBeClose(rc.height_cm, 110);
  assertToBeClose(rc.weight_kg, 37);
  assertToBeClose(rc.bmi(), 30.57);
  assertToBeClose(rc.wh(), 0.34);
});
