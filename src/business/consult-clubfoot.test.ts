import assert from "node:assert";
import test from "node:test";
import ConsultClubfoot from "./consult-clubfoot";

test("should give the correct model", function () {
  const b = new ConsultClubfoot();

  assert.equal(b.getStatic().getTechnicalName(), "consult_clubfoot");
});
