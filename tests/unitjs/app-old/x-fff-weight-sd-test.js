import {
  fn,
  loadReference,
  RefFolder1,
  RefFolder1RicketConsult13
} from "./athelpers.js";

import XFffWeightSd from "../../../legacy/app-old/v2/widgets/file/x-fff-weight-sd.js";
import Folder from "../../../src/business/folder.js";

let testFolder;

describe(fn(import.meta.url), function () {
  beforeEach(() => {
    testFolder = new Folder(loadReference(RefFolder1).folder);
    expect(testFolder.getByUid(RefFolder1RicketConsult13)).not.toBeNull();
  });

  describe("with folder", function () {
    /** @type {XFffWeightSd} */
    let el;
    beforeEach(() => {
      el = new XFffWeightSd();
      el.folder = testFolder;
    });

    it("shoud show", function () {
      el.file = testFolder.getByUid(RefFolder1RicketConsult13);
      expect(el.innerText).toBe("-3.6 ds");
    });
  });
});
