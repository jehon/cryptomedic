import "../../../legacy/app-old/v2/pages/blocks/x-folder-graphics.js";

import { fn, webDescribe } from "./athelpers.js";

// TODO: use constructor instead of webDescribe

describe(fn(import.meta.url), function () {
  webDescribe(
    "initialized",
    "<x-folder-graphics></x-folder-graphics>",
    function (element) {
      it("should contain data when initialized", function () {
        expect(element().innerHTML.trim().length).toBeGreaterThan(1);
      });
    }
  );
});
