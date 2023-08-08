import {
  fn,
  loadReference,
  RefFolder1,
  RefFolder1RicketConsult13
} from "./athelpers.js";

import Folder from "../../../src/app-folder/business/folder.js";
import XFffHeightSd from "../../../legacy/app-old/v2/widgets/file/x-fff-height-sd.js";

let testFolder;

describe(fn(import.meta.url), function () {
  beforeEach(() => {
    testFolder = new Folder(loadReference(RefFolder1).folder);
    expect(testFolder.getByUid(RefFolder1RicketConsult13)).not.toBeNull();
  });

  describe("with folder", function () {
    /** @type {XFffHeightSd} */
    let el;
    beforeEach(() => {
      el = new XFffHeightSd();
      el.folder = testFolder;
    });

    it("shoud show", function () {
      el.file = testFolder.getByUid(RefFolder1RicketConsult13);
      expect(el.innerText).toBe("-9.6 ds");
    });
  });
});
