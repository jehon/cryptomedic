import { round } from "./numbers";

describe("number helpers", () => {
  it("round", () => {
    expect(round(5, 0.01)).toBe("5");
    expect(round(5.05, 0.01)).toBe("5.05");
    expect(round(Math.PI, 0.01)).toBe("3.14");

    // Float error
    expect(round((10000 * 37) / (110 * 110), 0.01)).toBe("30.58");
  });
});
