import date2Display, {
  Invalid
} from "../../../legacy/app-old/v2/js/date2Display.js";

describe("date2Display-test", function () {
  it("should treat empty", function () {
    expect(date2Display(null)).toBe("");
  });

  it("should treat Date objects", function () {
    expect(date2Display(new Date(2010, 10, 15))).toBe("15-11-2010");
    expect(date2Display(new Date(2010, 1, 5))).toBe("05-02-2010");
    expect(date2Display(new Date(2010, 10, 15, 1, 2, 3))).toBe("15-11-2010");
  });

  it("should treat string objects", function () {
    expect(date2Display("2015-11-10")).toBe("10-11-2015");
    expect(date2Display("")).toBe("");
    expect(date2Display("2015-25-10")).toBe(Invalid);
    expect(date2Display("azerty")).toBe(Invalid);
  });
});
