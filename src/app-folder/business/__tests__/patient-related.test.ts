import { test, expect } from "@jest/globals";

import PatientRelated from "../patient-related.js";
import Patient from "../patient.js";
import RicketConsult from "../ricket-consult.js";
import { DataMissingException } from "../../../utils/exceptions.js";

import { loadReferenceFolder, RefFolder1 } from "../../../test-helper";

describe("PatientRelated", function () {
  test("with TestFolder.test1.json", async function () {
    // Go through the rest_service !!!
    let folder = await loadReferenceFolder(RefFolder1);

    expect(folder.getPatient()).toBeInstanceOf(Patient);
    expect(folder.getPatient().sex).toBe("Male");
    expect(folder.getPatient().year_of_birth).toBe("1998");
    expect(folder.getPatient().actualAge(new Date("2014-01-01"))).toBe(
      "16y0m"
    );

    let rc = folder.getByTypeAndId(RicketConsult, 13);

    expect(rc).toBeInstanceOf(PatientRelated);
    expect(rc).toBeInstanceOf(RicketConsult);
    expect(rc.getId()).toBe(13);
    expect(rc.getPatient()).toBeInstanceOf(Patient);
    expect(rc.date).toEqual("2014-01-04");
  });

  test("with ricketConsult_13", async function () {
    let folder = await loadReferenceFolder(RefFolder1);
    let rc = folder.getByTypeAndId(RicketConsult, 13);

    expect(rc).toBeInstanceOf(RicketConsult);
    expect(rc.getId()).toBe(13);
    expect(rc.height_cm).toBeCloseTo(110, 1);
    expect(rc.weight_kg).toBeCloseTo(37, 1);
    expect(rc.bmi()).toBeCloseTo(30.57, 1);
    expect(rc.wh()).toBeCloseTo(0.3363, 3);
  });

  test("with patient with sex", function () {
    let p = new Patient({ id: 123, sex: "Male" } as any);
    var o = new PatientRelated({ patient_id: 123});
    o.linkPatient(p);

    expect(function () {
      o.bmi();
    }).toThrow(new DataMissingException("Height"));
    expect(function () {
      o.wh();
    }).toThrow(new DataMissingException("Height"));
  });
});
