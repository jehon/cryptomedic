import { string2date } from "./date";

describe("strings helpers", () => {
  it("string2date", () => {
    expect(string2date("")).toBeUndefined();
    expect(string2date("2024-01")).toEqual(new Date(2024, 0));
  });
});
