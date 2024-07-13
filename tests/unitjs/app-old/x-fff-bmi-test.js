import {
  fn,
  loadReference,
  RefFolder1,
  RefFolder1RicketConsult13
} from "./athelpers.js";

import XFffBmi from "../../../legacy/app-old/v2/widgets/file/x-fff-bmi.js";
import Folder from "../../../src/business/folder.js";

let testFolder;

describe(fn(import.meta.url), function () {
  beforeEach(() => {
    testFolder = new Folder(loadReference(RefFolder1).folder);
    expect(testFolder.getByUid(RefFolder1RicketConsult13)).not.toBeNull();
  });

  describe("with folder", function () {
    /** @type {XFffBmi} */
    let el;
    beforeEach(() => {
      el = new XFffBmi();
      el.folder = testFolder;
    });

    it("shoud show", function () {
      el.file = testFolder.getByUid(RefFolder1RicketConsult13);
      expect(el.innerText).toBe("30.6");
    });
  });
});
