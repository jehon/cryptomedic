import { expect } from "expect";
import test from "node:test";
import { loadReferenceFolder, RefFolder1 } from "../../test-helper";
import { DataMissingException } from "../../utils/exceptions";
import RicketConsult from "../consult-ricket";
import Folder from "../folder";
import Patient from "../patient";
import Consult from "./consult";

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
  const p = (
    Patient.factory({ id: 123, sex: "Male" }) as Patient
  ).registerParent(f);
  const c = (Consult.factory({ patient_id: 123 }) as Consult).registerParent(f);
  f.list.push(p);
  f.list.push(c);

  expect(function () {
    c.bmi();
  }).toThrow(new DataMissingException("Height"));
  expect(function () {
    c.wh();
  }).toThrow(new DataMissingException("Height"));
});
