import ConsultClubfoot from "../consult-clubfoot.js";

test("should give the correct model", function () {
  const b = new ConsultClubfoot();

  expect(b.getModel()).toBe("ClubFoot");
  expect(b.getServerRessource()).toBe("clubfeet");
});
