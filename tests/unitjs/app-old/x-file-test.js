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
      expect(element().adapt).toHaveBeenCalled();
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
          "Anything is undefined"
        );
        expect(() => element().assertExists("nullKey")).toThrowError(
          "Null key is undefined"
        );
        expect(element().assertExists("a")).toBeTruthy();
        expect(element().assertExists("b")).toBe("azer");
        expect(element().assertExists("c")).toBe(0);
        expect(element().assertExists("d")).toBe("1");
        expect(element().assertExists("obj")).toEqual({});
      });

      it("with assertNumeric", function () {
        expect(() => element().assertNumeric("anything")).toThrowError(
          "Anything is undefined"
        );
        expect(() => element().assertNumeric("nullKey")).toThrowError(
          "Null key is undefined"
        );
        expect(element().assertNumeric("a")).toBe(1);
        expect(() => element().assertNumeric("b")).toThrowError(
          "B is not numeric(azer)"
        );
        expect(element().assertNumeric("c")).toBe(0);
        expect(element().assertNumeric("d")).toBe(1);
        expect(() => element().assertNumericNotZero("obj")).toThrowError(
          "Obj is not numeric(object)"
        );
      });

      it("with assertNumericNotZero", function () {
        expect(() => element().assertNumericNotZero("anything")).toThrowError(
          "Anything is undefined"
        );
        expect(() => element().assertNumericNotZero("nullKey")).toThrowError(
          "Null key is undefined"
        );
        expect(element().assertNumericNotZero("a")).toBeTruthy();
        expect(() => element().assertNumericNotZero("b")).toThrowError(
          "B is not numeric(azer)"
        );
        expect(() => element().assertNumericNotZero("c")).toThrowError(
          "C is not non-zero(0)"
        );
        expect(element().assertNumericNotZero("d")).toBeTruthy();
        expect(() => element().assertNumericNotZero("obj")).toThrowError(
          "Obj is not numeric(object)"
        );
      });

      it("with assertDate", function () {
        expect(() => element().assertDate("anything")).toThrowError(
          "Anything is undefined"
        );
        expect(() => element().assertDate("nullKey")).toThrowError(
          "Null key is undefined"
        );
        expect(() => element().assertDate("a")).toThrowError(
          "A is not a valid date(1)"
        );
        expect(() => element().assertDate("b")).toThrowError(
          "B is not a valid date(azer)"
        );
        expect(() => element().assertDate("c")).toThrowError(
          "C is not a valid date(0)"
        );
        expect(() => element().assertDate("d")).toThrowError(
          "D is not a valid date(1)"
        );
        expect(() => element().assertDate("obj")).toThrowError(
          "Obj is not a valid date(object)"
        );

        expect(() => element().assertDate("dateNumInv")).toThrowError(
          "Date num inv is not a valid date(20)"
        );
        expect(element().assertDate("dateNum")).toEqual(new Date(2015, 0, 1));
        expect(element().assertDate("dateNum6")).toEqual(new Date(2016, 1, 1));
        expect(element().assertDate("dateObj")).toEqual(new Date(2016, 1, 3));
      });
    });
  });
});
