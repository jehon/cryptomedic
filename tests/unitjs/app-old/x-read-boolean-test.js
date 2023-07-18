import "../../../legacy/app-old/v1/elements/x-read.js";

import { webDescribe } from "./athelpers.js";

// TODO: use constructor instead of webDescribe

describe("x-read-boolean-test", function () {
  // Test click on span for radio
  webDescribe(
    "without value",
    "<x-read-boolean></x-read-boolean>",
    function (element) {
      it("should be instantiated", function (done) {
        expect(true).toBeTrue();
        done();
      });

      it("should show false when no value is specified", function () {
        expect(
          element().shadowRoot.querySelector("img").getAttribute("src")
        ).toMatch(/-false.gif/i);
      });

      it("should update when value is changed", function (done) {
        expect(
          element().shadowRoot.querySelector("img").getAttribute("src")
        ).toMatch(/-false.gif/i);
        element().setAttribute("value", "true");
        setTimeout(() => {
          expect(
            element().shadowRoot.querySelector("img").getAttribute("src")
          ).toMatch(/-true.gif/i);
          done();
        }, 10);
      });
    }
  );

  webDescribe(
    "with value is false",
    "<x-read-boolean value='false'></x-read-boolean>",
    function (element) {
      it("should show false when 'false' is specified", function () {
        expect(
          element().shadowRoot.querySelector("img").getAttribute("src")
        ).toMatch(/-false.gif/i);
      });
    }
  );

  webDescribe(
    "value is invalid",
    "<x-read-boolean value='{truc'></x-read-boolean>",
    function (element) {
      it("should show false when invalid json data is given", function () {
        // Non empty string is ... "true"
        expect(
          element().shadowRoot.querySelector("img").getAttribute("src")
        ).toMatch(/-true.gif/i);
      });
    }
  );

  webDescribe(
    "value is true",
    "<x-read-boolean value='true'></x-read-boolean>",
    function (element) {
      it("should show true only when attribute value=true is specified", function () {
        expect(
          element().shadowRoot.querySelector("img").getAttribute("src")
        ).toMatch(/-true.gif/i);
      });
    }
  );
});
