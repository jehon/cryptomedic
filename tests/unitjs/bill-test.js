import Bill from "../../app/models/Bill.js";

describe("Bill", function () {
  it("should give the correct model", function () {
    let b = new Bill();

    expect(b.getModel()).toBe("Bill");
    expect(b.getServerRessource()).toBe("bills");
  });
});
