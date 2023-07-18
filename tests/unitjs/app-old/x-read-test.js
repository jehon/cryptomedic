import "../../../legacy/app-old/v1/elements/x-read.js";

import { webDescribe } from "./athelpers.js";
// import JHElement from '../../legacy/app-old/v1/elements/jh-element.js';

// TODO: use constructor instead of webDescribe

describe("x-read-test", function () {
  // Test click on span for radio
  webDescribe("", "<x-read name='test'></x-read>", function () {
    it("should be instantiated", function () {
      expect(true).toBeTrue();
    });
  });

  describe("with error", function () {
    beforeEach(() => {
      spyOn(console, "error").and.returnValue(null);
    });
    webDescribe(
      "",
      "<x-read name='test' type='anything'></x-read>",
      function (element) {
        it("should manage unknown type", function () {
          expect(element().querySelector("span:not(#error)")).not.toBeNull();
          expect(
            element().querySelector("span:not(#error)").innerHTML
          ).toContain("unknown");
          expect(console.error).toHaveBeenCalledTimes(1);
        });
      }
    );
  });

  const date = new Date(Date.parse("2017-07-07 18:30:25.432"));
  webDescribe(
    "",
    `<x-read name='test' type='timestamp' value='${date.toISOString()}'></x-read>`,
    function (element) {
      it("should manage timestamp", function () {
        expect(element().querySelector("span:not(#error)")).not.toBeNull();
        expect(element().querySelector("span:not(#error)").innerHTML).toBe(
          date.toLocaleDateString() + " " + date.toLocaleTimeString()
        );

        element().setAttribute("value", "");
        expect(element().querySelector("span:not(#error)")).not.toBeNull();
        expect(element().querySelector("span:not(#error)").innerHTML).toBe("");
      });
    }
  );

  // Invalid date
  webDescribe(
    "",
    "<x-read name='test' type='timestamp' value='aaaa-13-01'></x-read>",
    function (element) {
      it("should show an error message", function () {
        expect(element().querySelector("span:not(#error)")).not.toBeNull();
        expect(element().querySelector("span:not(#error)").innerHTML).toBe("");
      });
    }
  );

  webDescribe(
    "",
    "<x-read name='test' type='boolean' value='true'></x-read>",
    function (element) {
      it("should manage boolean", function () {
        expect(
          element().querySelector("x-read-boolean[value=true]")
        ).not.toBeNull();
        expect(
          element().querySelector("x-read-boolean[value=false]")
        ).toBeNull();

        element().setAttribute("value", "false");

        expect(
          element().querySelector("x-read-boolean[value=true]")
        ).toBeNull();
        expect(
          element().querySelector("x-read-boolean[value=false]")
        ).not.toBeNull();
      });
    }
  );

  webDescribe(
    "",
    "<x-read name='test' type='numeric' value='123'></x-read>",
    function (element) {
      it("should manage numeric", function () {
        expect(element().querySelector("span:not(#error)")).not.toBeNull();
        expect(element().querySelector("span:not(#error)").innerHTML).toBe(
          "123"
        );

        element().setAttribute("value", 0);

        let span = element().querySelector("span:not(#error)");

        expect(span).not.toBeNull();
        expect(span.innerHTML).toBe("0");
      });
    }
  );

  ["list", "date", "char", "text"].forEach((type) => {
    webDescribe(
      "",
      `<x-read name='test' type='${type}' value='hello'></x-read>`,
      function (element) {
        it(`should manage ${type}`, function () {
          expect(element().querySelector("span:not(#error)")).not.toBeNull();
          expect(element().querySelector("span:not(#error)").innerHTML).toBe(
            "hello"
          );

          element().setAttribute("value", "");

          let span = element().querySelector("span:not(#error)");

          expect(span).not.toBeNull();
          expect(span.innerHTML).toBe("");
        });
      }
    );
  });
});
