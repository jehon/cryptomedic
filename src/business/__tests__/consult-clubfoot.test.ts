import { expect, test } from "@jest/globals";
import ConsultClubfoot from "../consult-clubfoot.js";

test("should give the correct model", function () {
  const b = new ConsultClubfoot();

  expect(b.getStatic().getModel()).toBe("ClubFoot");
  expect(b.getServerResource()).toBe("clubfeet");
});
