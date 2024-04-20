import { round } from "./numbers";

describe("number helpers", () => {
  it("round", () => {
    expect(round(5, 0.01)).toBe("5");
    expect(round(Math.PI, 0.01)).toBe("3.14");
  });
});
