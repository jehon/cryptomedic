import {
  fn,
  loadReference,
  RefFolder1,
  RefFolder1RicketConsult13
} from "./athelpers.js";

import XWithFile from "../../../legacy/app-old/v2/widgets/file/x-with-file.js";
import Folder from "../../../src/business/folder.js";

let testFolder;
let file;

describe(fn(import.meta.url), function () {
  beforeEach(() => {
    testFolder = new Folder(loadReference(RefFolder1).folder);
    file = testFolder.list[0];
  });

  describe("with folder", function () {
    let el;
    beforeEach(() => {
      el = new XWithFile();
      el.folder = testFolder;
    });

    it("should not have a default value", function () {
      expect(el.fileUid).toBe("");
      expect(el.file).toBeNull();
      expect(el.hasAttribute("with-folder")).toBeTrue();
      expect(el.hasAttribute("with-file")).toBeTrue();
    });

    it("should define when set", function () {
      el.folder = testFolder;

      expect(el.folder.id).toBe(testFolder.id);

      el.file = file;

      expect(el.file).toBe(file);
      expect(el.file.uid()).toBe(file.uid());
      expect(el.fileUid).toBe(file.uid());
    });

    it("should not fire when null", function () {
      let ok = false;
      el.adapt = function () {
        ok = true;
      };

      el.file = null;

      expect(el.file).toBe(null);
      expect(el.fileUid).toBe("");
      expect(el.getAttribute("with-file")).toBe("null");
      expect(el.hasAttribute("blocked")).toBeTrue();
      expect(ok).toBeFalse();
    });

    it("should fire when set", function () {
      let ok = false;
      el.adapt = function () {
        ok = true;
      };

      el.file = file;

      expect(el.folder.getId()).toBe(testFolder.getId());
      expect(el.file.id).toBe(testFolder.list[0].id);
      expect(el.getAttribute("with-folder")).toBe(testFolder.uid());
      expect(el.getAttribute("with-file")).toBe("" + testFolder.list[0].uid());
      expect(el.hasAttribute("blocked")).toBeFalse();
      expect(ok).toBeTrue();
    });
  });

  describe("without folder at first", function () {
    it("should select file based on file-uid", function () {
      const el = new XWithFile();
      el.setAttribute("file-uid", RefFolder1RicketConsult13);
      el.folder = testFolder;

      expect(el.folder.getId()).toBe(testFolder.getId());
      expect(el.file.uid()).toBe(RefFolder1RicketConsult13);
      expect(el.getAttribute("with-folder")).toBe(testFolder.uid());
      expect(el.getAttribute("with-file")).toBe(RefFolder1RicketConsult13);
      expect(el.hasAttribute("blocked")).toBeFalse();
    });
  });
});
