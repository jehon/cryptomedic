import { test, expect } from "@jest/globals";

import Consult from "../consult.js";
import Patient from "../../patient.js";
import RicketConsult from "../../consult-ricket.js";
import { DataMissingException } from "../../../utils/exceptions.js";

import { loadReferenceFolder, RefFolder1 } from "../../../test-helper";
import Folder from "../../folder.js";

test("with ricketConsult_13", async function () {
  let folder = await loadReferenceFolder(RefFolder1);
  let c = folder.getByTypeAndId(RicketConsult, 13);

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
  let f = new Folder();
  let p = new Patient({ id: 123, sex: "Male" } as any, f);
  var c = new Consult({ patient_id: 123}, f);
  f.list.push(p);
  f.list.push(c);

  expect(function () {
    c.bmi();
  }).toThrow(new DataMissingException("Height"));
  expect(function () {
    c.wh();
  }).toThrow(new DataMissingException("Height"));
});
