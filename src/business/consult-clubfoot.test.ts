import { expect } from "expect";
import test from "node:test";
import ConsultClubfoot from "./consult-clubfoot";

test("should give the correct model", function () {
  const b = new ConsultClubfoot();

  expect(b.getStatic().getTechnicalName()).toBe("consult_clubfoot");
});
