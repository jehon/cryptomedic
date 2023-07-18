import ClubFoot from "../../../legacy/app-old/v2/models/ClubFoot.js";

describe("ClubFoot", function () {
  it("should give the correct model", function () {
    let b = new ClubFoot();

    expect(b.getModel()).toBe("ClubFoot");
    expect(b.getServerRessource()).toBe("clubfeet");
  });
});
