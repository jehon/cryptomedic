import "../../../legacy/app-old/v1/elements/x-file.js";

import { webDescribe } from "./athelpers.js";

// TODO: use constructor instead of webDescribe

describe("tests/unit/x-file-test.js", function () {
  webDescribe("initialized", "<x-file></x-file>", function (element) {
    const f = { a: 1 };
    it("should be blocked when initialized", function () {
      expect(element().value).toBeFalsy();
    });

    it("should free when value is set", function () {
      element().value = f;
      expect(element().value).toBe(f);
    });

    it("should free when value is set and call adapt", function () {
      spyOn(element(), "adapt");
      element().value = f;
      expect(element().value).toBe(f);
      expect(element().adapt).toHaveBeenCalledWith();
    });

    it("should free when value is set and not call adapt if not initialized", function () {
      spyOn(element(), "adapt");
      spyOn(element(), "isInitialized").and.returnValue(false);
      element().value = f;
      expect(element().value).toBe(f);
      expect(element().adapt).not.toHaveBeenCalled();
    });

    it("should block when value is null", function () {
      spyOn(element(), "adapt");
      element().value = null;
      expect(element().value).toBeFalsy();
    });

    describe("with data", function () {
      beforeEach(function () {
        element().value = {
          a: 1,
          b: "azer",
          c: 0,
          d: "1",
          obj: {},
          nullKey: null,
          dateNum: "2015",
          dateNumInv: "20",
          dateNum6: "2016-02",
          dateObj: new Date(2016, 1, 3)
        };
      });

      it("should handle null value", function () {
        element().value = null;
        expect(() => element().assertExists("anything")).toThrowError(
          "Data not set"
        );
      });

      it("with assertExists", function () {
        expect(() => element().assertExists("anything")).toThrowError(
          "'anything' is not defined"
        );
        expect(() => element().assertExists("nullKey")).toThrowError(
          "'nullKey' is not defined"
        );
        expect(element().assertExists("a")).toBeTruthy();
        expect(element().assertExists("b")).toBe("azer");
        expect(element().assertExists("c")).toBe(0);
        expect(element().assertExists("d")).toBe("1");
        expect(element().assertExists("obj")).toEqual({});
      });

      it("with assertNumeric", function () {
        expect(() => element().assertNumeric("anything")).toThrowError(
          "'anything' is not defined"
        );
        expect(() => element().assertNumeric("nullKey")).toThrowError(
          "'nullKey' is not defined"
        );
        expect(element().assertNumeric("a")).toBe(1);
        expect(() => element().assertNumeric("b")).toThrowError(
          "'b' is invalid (\"azer\")"
        );
        expect(element().assertNumeric("c")).toBe(0);
        expect(element().assertNumeric("d")).toBe(1);
        expect(() => element().assertNumericNotZero("obj")).toThrowError(
          "'obj' is invalid ({})"
        );
      });

      it("with assertNumericNotZero", function () {
        expect(() => element().assertNumericNotZero("anything")).toThrowError(
          "'anything' is not defined"
        );
        expect(() => element().assertNumericNotZero("nullKey")).toThrowError(
          "'nullKey' is not defined"
        );
        expect(element().assertNumericNotZero("a")).toBeTruthy();
        expect(() => element().assertNumericNotZero("b")).toThrowError(
          "'b' is invalid (\"azer\")"
        );
        expect(() => element().assertNumericNotZero("c")).toThrowError(
          "'c' is invalid (0)"
        );
        expect(element().assertNumericNotZero("d")).toBeTruthy();
      });

      it("with assertDate", function () {
        expect(() => element().assertDate("anything")).toThrowError(
          "'anything' is not defined"
        );
        expect(() => element().assertDate("nullKey")).toThrowError(
          "'nullKey' is not defined"
        );
        expect(() => element().assertDate("a")).toThrowError(
          "'a' is invalid (\"1\")"
        );
        expect(() => element().assertDate("b")).toThrowError(
          "'b' is invalid (\"azer\")"
        );
        expect(() => element().assertDate("c")).toThrowError(
          "'c' is invalid (\"0\")"
        );
        expect(() => element().assertDate("d")).toThrowError(
          "'d' is invalid (\"1\")"
        );
        expect(() => element().assertDate("obj")).toThrowError(
          "'obj' is invalid ({})"
        );

        expect(() => element().assertDate("dateNumInv")).toThrowError(
          "'dateNumInv' is invalid (\"20\")"
        );
        expect(element().assertDate("dateNum")).toEqual(new Date(2015, 0, 1));
        expect(element().assertDate("dateNum6")).toEqual(new Date(2016, 1, 1));
        expect(element().assertDate("dateObj")).toEqual(new Date(2016, 1, 3));
      });
    });
  });
});
