import PatientRelated from "../../../legacy/app-old/v2/models/PatientRelated.js";
import Patient from "../../../legacy/app-old/v2/models/Patient.js";
import Folder from "../../../legacy/app-old/v2/models/Folder.js";
import RicketConsult from "../../../legacy/app-old/v2/models/RicketConsult.js";
import { DataMissingException } from "../../../legacy/app-old/v2/js/exceptions.js";

import { loadReference, RefFolder1 } from "./athelpers.js";

describe("PatientRelated", function () {
  describe("with TestFolder.test1.json", function () {
    it("should have correct properties", function () {
      // Go through the rest_service !!!
      let folder = new Folder(loadReference(RefFolder1).folder);

      expect(folder.getPatient()).toEqual(jasmine.any(Patient));
      expect(folder.getPatient().sex).toBe("Male");
      expect(folder.getPatient().year_of_birth).toBe("1998");
      expect(folder.getPatient().actualAge(new Date("2014-01-01"))).toBe(
        "16y0m"
      );

      let rc = folder.getByTypeAndId(RicketConsult, 13);

      expect(rc).toEqual(jasmine.any(PatientRelated));
      expect(rc).toEqual(jasmine.any(RicketConsult));
      expect(rc).toEqual(jasmine.anything({ id: 13 }));
      expect(rc.getPatient()).toEqual(jasmine.any(Patient));
      expect(rc.date).toEqual("2014-01-04");
    });

    describe("with ricketConsult_13", function () {
      it("should have correct statistics", function () {
        let folder = new Folder(loadReference(RefFolder1).folder);
        let rc = folder.getByTypeAndId(RicketConsult, 13);

        expect(rc).toEqual(jasmine.any(RicketConsult));
        expect(rc).toEqual(jasmine.anything({ id: 13 }));
        expect(rc.Heightcm).toBeCloseTo(110, 1);
        expect(rc.Weightkg).toBeCloseTo(37, 1);
        expect(rc.bmi()).toBeCloseTo(30.57, 1);
        expect(rc.wh()).toBeCloseTo(0.3363, 3);
      });
    });
  });

  describe("with patient with sex", function () {
    it("should throw error everytime", function () {
      let p = new Patient({ sex: "Male" });
      var o = new PatientRelated({});
      o.linkPatient(p);

      expect(function () {
        o.bmi();
      }).toThrow(new DataMissingException("Height"));
      expect(function () {
        o.wh();
      }).toThrow(new DataMissingException("Height"));
    });
  });
});
