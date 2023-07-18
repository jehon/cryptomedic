import "../../../legacy/app-old/v1/elements/x-input-date.js";

import { webDescribe } from "./athelpers.js";

import JHElement from "../../../legacy/app-old/v1/elements/jh-element.js";

// TODO: use constructor instead of webDescribe

describe("x-input-date-test", function () {
  webDescribe("initial", "<x-input-date></x-input-date>", function (element) {
    it("should be initialized", function () {
      expect(element()).not.toBeNull();
    });

    it("should allow setting the value programmatically", function () {
      element().value = "2018-10-21";
      expect(element().value).toBe("2018-10-21");
    });

    it("should allow setting the value programmatically being a Date", function () {
      element().value = new Date("2018-10-21");
      expect(element().value).toBe("2018-10-21");
    });

    it("should allow setting the value programmatically being invalid", function () {
      element().value = 123;
      expect(element().value).toBe("");
    });

    it("should allow setting the value by attributes", function () {
      element().setAttribute("value", "2018-11-21");
      expect(element().value).toBe("2018-11-21");
    });

    it("should fire blur event on change", function (done) {
      element().addEventListener("blur", () => {
        expect(true).toBeTrue();
        done();
      });
      JHElement.fireOn(element().querySelector("input"), "blur", {});
    });

    it("should give the focus to the underlying element", function () {
      element().click();
      expect(element().querySelector("input:focus")).not.toBeNull();
    });
  });

  webDescribe(
    "with value",
    "<x-input-date value='2017-02-03'></x-input-date>",
    function (element) {
      it("should have the value", function () {
        expect(element().querySelector("input").value).toBe("2017-02-03");
      });
    }
  );
});
