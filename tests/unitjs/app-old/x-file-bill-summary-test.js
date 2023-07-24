import "../../../legacy/app-old/v1/elements/x-file-bill-summary.js";

import { webDescribe, loadReference, RefFolder1 } from "./athelpers.js";

import Folder from "../../../legacy/app-old/v2/models/Folder.js";
import Bill from "../../../src/app-folder/business/bill.js";
import { setSession } from "../../../legacy/app-old/v2/js/session.js";

// TODO: use constructor instead of webDescribe

describe("tests/unit/x-file-bill-test-summary.js", function () {
  /**
   * @param element
   * @param name
   * @param value
   */
  function hasRow(element, name, value) {
    expect(element().innerHTML).toContain(name);
    expect(element().innerHTML).toContain(`name="${name}">${value}<`);
  }

  beforeAll(function () {
    const prices = loadReference("PriceTest.testIndex.json");
    setSession({ prices });
  });

  let getBill = function (ref = RefFolder1, id = 1) {
    let f = new Folder(loadReference(ref).folder);
    expect(f).toEqual(jasmine.any(Folder));
    return f.getByTypeAndId(Bill, id);
  };

  webDescribe(
    "initialized",
    "<x-file-bill-summary></x-file-bill-summary>",
    function (element) {
      it("should be instantiated", function () {
        let b = getBill(RefFolder1, 1);
        element().value = b;
        hasRow(element, "Sociallevel", "2");
        hasRow(element, "total_asked", "6720");
        hasRow(element, "consult_CDC_consultation_physio", 1);
        hasRow(element, "workshop_BHKAFO_night", 1);
        expect(element().innerHTML).not.toContain(
          "consult_CDC_consultation_Bengali_Doctor"
        );
      });
    }
  );
});
