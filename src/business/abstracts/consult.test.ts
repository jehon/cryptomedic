import { expect } from "expect";
import test from "node:test";

import { DataMissingException } from "../../utils/exceptions.js";
import RicketConsult from "../consult-ricket.js";
import Patient from "../patient";
import Consult from "./consult.js";

import { loadReferenceFolder, RefFolder1 } from "../../test-helper.js";
import Folder from "../folder";

test("with ricketConsult_13", async function () {
  const folder = await loadReferenceFolder(RefFolder1);
  const c = folder.getByTypeAndId<RicketConsult>(RicketConsult, "13");

  expect(c).toBeInstanceOf(RicketConsult);
  expect(c).toBeInstanceOf(Consult);
  expect(c.getId()).toBe(13);

  // Male
  expect(c.date).toEqual("2014-01-04");
  expect(c.height_cm).toBe(110);
  expect(c.weight_kg).toBe(37);
  expect(c.wh()).toBeCloseTo(0.34, 2);
  expect(c.bmi()).toBeCloseTo(30.58, 2);

  expect(c.getWeightSd()).toBeCloseTo(-3.59, 2);
  expect(c.getHeightSd()).toBeCloseTo(-9.57, 2);
  expect(c.getWHSd()).toBeCloseTo(12.61, 2);
  expect(c.getBMISd()).toBeCloseTo(2.39, 2);
});

test("with patient with sex", function () {
  const f = new Folder();
  const p = new Patient({ id: 123, sex: "Male" } as any, f as any);
  const c = new Consult({ patient_id: 123 }, f);
  f.list.push(p);
  f.list.push(c);

  expect(function () {
    c.bmi();
  }).toThrow(new DataMissingException("Height"));
  expect(function () {
    c.wh();
  }).toThrow(new DataMissingException("Height"));
});
