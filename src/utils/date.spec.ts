import assert from "node:assert";
import test, { TestContext } from "node:test";
import { fromBirthDateTo, normalizeDate } from "./date";

test("date helpers", (t: TestContext) => {
  t.test("string2date", () => {
    assert.equal(normalizeDate(""), undefined);
    assert.equal(normalizeDate("2024-01"), new Date(2024, 0));
  });

  t.test("ageAtReference", () => {
    assert.equal(
      fromBirthDateTo(new Date(2020, 1, 10), new Date(2022, 1, 9)),
      "1y11m"
    );

    assert.equal(
      fromBirthDateTo(new Date(2020, 1, 10), new Date(2022, 2, 10)),
      "2y"
    );

    assert.equal(
      fromBirthDateTo(new Date(2020, 1, 10), new Date(2022, 2, 15)),
      "2y1m"
    );

    assert.equal(
      fromBirthDateTo(new Date(2020, 1, 10), new Date(2020, 1, 10)),
      "-"
    );
  });
});
