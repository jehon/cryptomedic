import { ageWhen, string2date } from "./date";

describe("date helpers", () => {
  it("string2date", () => {
    expect(string2date("")).toBeUndefined();
    expect(string2date("2024-01")).toEqual(new Date(2024, 0));
  });

  it("ageAtReference", () => {
    expect(ageWhen(new Date(2020, 1, 10), new Date(2022, 1, 9))).toBe("1y11m");

    expect(ageWhen(new Date(2020, 1, 10), new Date(2022, 2, 10))).toBe("2y");

    expect(ageWhen(new Date(2020, 1, 10), new Date(2022, 2, 15))).toBe("2y1m");

    expect(ageWhen(new Date(2020, 1, 10), new Date(2020, 1, 10))).toBe("-");
  });
});
