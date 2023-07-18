import date2CanonicString from "../../../legacy/app-old/v2/js/date2CanonicString.js";

describe("date2CanonicString-test", function () {
  it("should return null", function () {
    expect(date2CanonicString(null)).toBeNull();
  });

  it("should send back dates only", function () {
    expect(date2CanonicString(new Date(2010, 10, 15), true)).toBe("2010-11-15");
    expect(date2CanonicString(new Date(2010, 10, 15, 1, 2, 3), true)).toBe(
      "2010-11-15"
    );
  });

  it("should send back dates without time", function () {
    expect(date2CanonicString(new Date(2010, 10, 15))).toBe("2010-11-15");
    // Even with timezone offset
    expect(date2CanonicString(new Date(2010, 10, 15))).toBe("2010-11-15");
  });

  it("should send back dates with time", function () {
    spyOn(Date.prototype, "getTimezoneOffset").and.returnValue(-60);
    expect(date2CanonicString(new Date(2010, 10, 15, 1, 2, 3))).toBe(
      "2010-11-15 01:02:03 GMT+0100"
    );
  });

  it("should send back dates with time", function () {
    spyOn(Date.prototype, "getTimezoneOffset").and.returnValue(60);
    expect(date2CanonicString(new Date(2010, 10, 15, 1, 2, 3))).toBe(
      "2010-11-15 01:02:03 GMT-0100"
    );
  });
});
