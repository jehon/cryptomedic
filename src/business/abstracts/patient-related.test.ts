import { expect } from "expect";
import test from "node:test";

import RicketConsult from "../consult-ricket.js";
import Patient from "../patient.js";
import PatientRelated from "./patient-related.js";

import { loadReferenceFolder, RefFolder1 } from "../../test-helper.js";

test("with TestFolder.test1.json", async function () {
  // Go through the rest_service !!!
  const folder = await loadReferenceFolder(RefFolder1);

  expect(folder.getPatient()).toBeInstanceOf(Patient);
  expect(folder.getPatient().sex).toBe("Male");
  expect(folder.getPatient().year_of_birth).toBe("1998");
  expect(folder.getPatient().actualAge(new Date("2014-01-01"))).toBe("16y0m");

  const rc = folder.getByTypeAndId<RicketConsult>(RicketConsult, "13");

  expect(rc).toBeInstanceOf(PatientRelated);
  expect(rc).toBeInstanceOf(RicketConsult);
  expect(rc.getId()).toBe(13);
  expect(rc.getPatient()).toBeInstanceOf(Patient);
  expect(rc.date).toEqual("2014-01-04");
});

test("with ricketConsult_13", async function () {
  const folder = await loadReferenceFolder(RefFolder1);
  const rc = folder.getByTypeAndId<RicketConsult>(RicketConsult, "13")!;

  // Male

  expect(rc).toBeInstanceOf(RicketConsult);
  expect(rc.getId()).toBe(13);
  expect(rc.date).toEqual("2014-01-04");
  expect(rc.height_cm).toBeCloseTo(110, 1);
  expect(rc.weight_kg).toBeCloseTo(37, 1);
  expect(rc.bmi()).toBeCloseTo(30.57, 1);
  expect(rc.wh()).toBeCloseTo(0.3363, 3);
});
