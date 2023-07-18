import "../../../legacy/app-old/v1/elements/x-write.js";

import JHElement from "../../../legacy/app-old/v1/elements/jh-element.js";
import { webDescribe } from "./athelpers.js";

// TODO: use constructor instead of webDescribe

describe("x-write-test", function () {
  beforeEach(function () {
    spyOn(console, "error");
  });

  webDescribe(
    "without parameters",
    "<x-write name='test'></x-write>",
    function (element) {
      it("should be instantiated", function () {
        expect(element().querySelector("span.error")).not.toBeNull();
      });
    }
  );

  webDescribe(
    "with unknown type",
    "<x-write name='test' type='anything'></x-write>",
    function (element) {
      it("should be instantiated", function () {
        expect(element().querySelector("span.error")).not.toBeNull();
        expect(console.error).toHaveBeenCalledTimes(1);
      });
    }
  );

  /* default one, testing some more... */
  describe("with char", function () {
    webDescribe(
      "without value",
      "<x-write name='test' type='char'></x-write>",
      function (element) {
        it("should be instantiated", function () {
          let el = element().querySelector("input");
          expect(element().querySelector("span.error")).toBeNull();
          expect(el).not.toBeNull();
          expect(element().value).toBe("");
        });
      }
    );

    webDescribe(
      "with value",
      "<x-write name='test' type='char' value='xvalue'></x-write>",
      function (element) {
        it("should be instantiated", function () {
          let el = element().querySelector("input");
          expect(element().querySelector("span.error")).toBeNull();
          expect(el).not.toBeNull();
          expect(element().value).toBe("xvalue");
        });

        it("should fire event", function () {
          let el = element().querySelector("input");
          let res = false;
          element().addEventListener("blur", () => {
            res = "test";
          });
          el.value = "blablabla";
          JHElement.fireOn(element().querySelector("input"), "blur", "test");
          expect(res).toBe("test");
          expect(element().value).toBe("blablabla");
        });

        it("should work with setter", function () {
          element().value = "something new";
          expect(element().value).toBe("something new");
        });

        it("should not fire event if still having focus", function () {
          let el = element().querySelector("input");
          let res = false;
          element().addEventListener("blur", () => {
            res = "test";
          });

          el.focus();
          JHElement.fireOn(element().querySelector("input"), "change", "test");
          expect(res).toBe(false);

          el.blur();
          JHElement.fireOn(element().querySelector("input"), "change", "test");
          expect(res).toBe("test");
        });
      }
    );
  });

  describe("with timestamp", function () {
    webDescribe(
      "without value",
      "<x-write name='test' type='timestamp'></x-write>",
      function (element) {
        it("should be instantiated", function () {
          expect(element().querySelector("span.error")).toBeNull();
          let el = element().querySelector("x-read");
          expect(el).not.toBeNull();
          expect(el.getAttribute("name")).toBeNull();
          expect(el.getAttribute("type")).toBe("timestamp");
          expect(element().value).toBe("");
        });
      }
    );

    webDescribe(
      "with value",
      "<x-write name='test' type='timestamp' value='2016-01-01'></x-write>",
      function (element) {
        it("should be instantiated", function () {
          expect(element().querySelector("span.error")).toBeNull();
          let el = element().querySelector("x-read");
          expect(el).not.toBeNull();
          expect(el.getAttribute("name")).toBeNull();
          expect(el.getAttribute("type")).toBe("timestamp");
          expect(el.getAttribute("value")).toBe("2016-01-01");
          expect(element().value).toBe("2016-01-01");
        });
      }
    );
  });

  describe("with boolean", function () {
    webDescribe(
      "without value",
      "<x-write name='test' type='boolean'></x-write>",
      function (element) {
        it("should be instantiated", function () {
          let el = element().querySelector("input[type=checkbox]");
          expect(element().querySelector("span.error")).toBeNull();
          expect(el).not.toBeNull();
          expect(element().value).toBe(false);
        });
      }
    );

    webDescribe(
      "with value",
      "<x-write name='test' type='boolean' value='1'></x-write>",
      function (element) {
        it("should be instantiated", function () {
          let el = element().querySelector("input[type=checkbox]");
          expect(element().querySelector("span.error")).toBeNull();
          expect(el).not.toBeNull();
          expect(element().value).toBe(true);
        });

        it("should fire event", function () {
          let el = element().querySelector("input[type=checkbox]");
          let res = false;
          element().addEventListener("blur", () => {
            res = "test";
          });
          el.setAttribute("checked", "checked");
          JHElement.fireOn(element().querySelector("input"), "blur", "test");
          expect(res).toBe("test");
          expect(element().value).toBe(true);
        });
      }
    );
  });

  describe("with date", function () {
    webDescribe(
      "without value",
      "<x-write name='test' type='date'></x-write>",
      function (element) {
        it("should be instantiated", function () {
          let el = element().querySelector("x-input-date");
          expect(element().querySelector("span.error")).toBeNull();
          expect(el).not.toBeNull();
          expect(element().value).not.toBeNull();
        });
      }
    );

    webDescribe(
      "with value",
      "<x-write name='test' type='date' value='2016-01-15'></x-write>",
      function (element) {
        it("should be instantiated", function () {
          let el = element().querySelector("x-input-date");
          expect(element().querySelector("span.error")).toBeNull();
          expect(el).not.toBeNull();
          expect(element().value).toBe("2016-01-15");
        });

        it("should fire event", function () {
          let el = element().querySelector("x-input-date");
          let res = false;
          element().addEventListener("blur", () => {
            res = "test";
          });
          el.value = "2016-02-25";
          JHElement.fireOn(
            element().querySelector("x-input-date"),
            "blur",
            "test"
          );
          expect(res).toBe("test");
          expect(element().value).toBe("2016-02-25");
        });
      }
    );
  });

  describe("with numeric", function () {
    webDescribe(
      "without value",
      "<x-write name='test' type='numeric'></x-write>",
      function (element) {
        it("should be instantiated", function () {
          let el = element().querySelector("input[type=number]");
          expect(element().querySelector("span.error")).toBeNull();
          expect(el).not.toBeNull();
          expect(element().value).toBe(null);
        });
      }
    );

    webDescribe(
      "with value",
      "<x-write name='test' type='numeric' value='15'></x-write>",
      function (element) {
        it("should be instantiated", function () {
          let el = element().querySelector("input[type=number]");
          expect(element().querySelector("span.error")).toBeNull();
          expect(el).not.toBeNull();
          expect(element().value).toBe(15);
        });

        it("should fire event", function () {
          let el = element().querySelector("input[type=number]");
          let res = false;
          element().addEventListener("blur", () => {
            res = "test";
          });
          el.value = 10;
          JHElement.fireOn(element().querySelector("input"), "blur", "test");
          expect(res).toBe("test");
          expect(element().value).toBe(10);
        });
      }
    );
  });

  describe("with text", function () {
    webDescribe(
      "without value",
      "<x-write name='test' type='text'></x-write>",
      function (element) {
        it("should be instantiated", function () {
          let el = element().querySelector("textarea");
          expect(element().querySelector("span.error")).toBeNull();
          expect(el).not.toBeNull();
          expect(element().value).toBe("");
        });
      }
    );

    webDescribe(
      "with value",
      "<x-write name='test' type='text' value='xvalue'></x-write>",
      function (element) {
        it("should be instantiated", function () {
          let el = element().querySelector("textarea");
          expect(element().querySelector("span.error")).toBeNull();
          expect(el).not.toBeNull();
          expect(element().value).toBe("xvalue");
        });

        it("should fire event", function () {
          let el = element().querySelector("textarea");
          let res = false;
          element().addEventListener("blur", () => {
            res = "test";
          });
          el.value = "blablabla";
          JHElement.fireOn(el, "blur", "test");
          expect(res).toBe("test");
          expect(element().value).toBe("blablabla");
        });
      }
    );
  });

  const list = ["machin", "truc", "brol"];

  describe("with list", function () {
    webDescribe(
      "without value",
      `<x-write name='test' type='list' list='${JSON.stringify(
        list
      )}'></x-write>`,
      function (element) {
        it("should be instantiated", function () {
          let el = element().querySelector("x-write-list");
          expect(element().querySelector("span.error")).toBeNull();
          expect(el).not.toBeNull();

          // First one is automatically selected
          expect(element().value).toBe(null);
        });
      }
    );

    webDescribe(
      "with value",
      `<x-write name='test' type='list' list='${JSON.stringify(
        list
      )}' value='truc'></x-write>`,
      function (element) {
        it("should be instantiated", function () {
          let el = element().querySelector("x-write-list");
          expect(element().querySelector("span.error")).toBeNull();
          expect(el).not.toBeNull();
          expect(element().value).toBe("truc");
        });

        it("should fire event", function () {
          let el = element().querySelector("x-write-list");
          let res = false;
          element().addEventListener("blur", () => {
            res = "test";
          });
          el.setAttribute("value", "brol");
          JHElement.fireOn(el, "blur", "test");
          expect(res).toBe("test");
          expect(element().value).toBe("brol");
        });
      }
    );
  });
});
