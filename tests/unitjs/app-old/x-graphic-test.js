import { fn, loadReference, RefFolder1 } from "./athelpers.js";
import Folder from "../../../legacy/app-old/v2/models/Folder.js";
import XGraphic from "../../../legacy/app-old/v2/widgets/folder/x-graphic.js";

describe(fn(import.meta.url), function () {
  describe("without folder", function () {
    it("should initialize", function () {
      const el = new XGraphic();
      el.folder = null;
      expect(el.innerHTML).toContain("No patient");
    });

    describe("with invalid patient", function () {
      it("should initialize", function () {
        const el = new XGraphic();
        const folder = new Folder(loadReference(RefFolder1).folder);
        folder.getPatient().sex = 0;
        el.folder = folder;
        expect(el.innerHTML).toContain("Sex of the patient is unknown");
      });
    });

    describe("with folder", function () {
      it("should initialize", function () {
        const el = new XGraphic();
        const folder = new Folder(loadReference(RefFolder1).folder);
        expect(folder).toEqual(jasmine.any(Folder));
        el.folder = folder;

        expect(el.innerHTML).not.toContain("No patient");

        let n = 1;
        expect(folder.getFilesRelatedToPatient(n).id).toBe(13);
        expect(folder.getFilesRelatedToPatient(n).getModel()).toBe(
          "RicketConsult"
        );
        expect(el.displayX(folder.getFilesRelatedToPatient(n))).toBe(
          "16 too high"
        );
        expect(el.displayY(folder.getFilesRelatedToPatient(n))).toBe(
          "Invalid Y"
        );

        n = 3;
        expect(folder.getFilesRelatedToPatient(n).id).toBe(1);
        expect(folder.getFilesRelatedToPatient(n).getModel()).toBe("Bill");
        expect(el.displayX(folder.getFilesRelatedToPatient(n))).toBe(
          "13 too high"
        );
        expect(el.displayY(folder.getFilesRelatedToPatient(n))).toBe(
          "Invalid Y"
        );
      });
    });
  });
});
