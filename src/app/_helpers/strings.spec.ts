import { technical2Human } from "./strings";

describe("strings helpers", () => {
  it("technical2Human", () => {
    expect(technical2Human("bill")).toBe("Bill");
    expect(technical2Human("consult_other")).toBe("Consult Other");
  });
});
