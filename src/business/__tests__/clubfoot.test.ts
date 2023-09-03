import ClubFoot from "../club-foot.js";

test("should give the correct model", function () {
  let b = new ClubFoot();

  expect(b.getModel()).toBe("ClubFoot");
  expect(b.getServerRessource()).toBe("clubfeet");
});
