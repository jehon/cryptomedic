import assert from "node:assert";
import test from "node:test";
import { normalizeDate } from "./date";

test("string2date", () => {
  assert.equal(normalizeDate(""), undefined);
  assert.equal(normalizeDate("2024-01")?.getFullYear(), 2024);
});

// test("ageAtReference", () => {
//   assert.equal(
//     fromBirthDateTo(new Date(2020, 1, 10), new Date(2022, 1, 9)),
//     "1y11m"
//   );

//   assert.equal(
//     fromBirthDateTo(new Date(2020, 1, 10), new Date(2022, 2, 10)),
//     "2y"
//   );

//   assert.equal(
//     fromBirthDateTo(new Date(2020, 1, 10), new Date(2022, 2, 15)),
//     "2y1m"
//   );

//   assert.equal(
//     fromBirthDateTo(new Date(2020, 1, 10), new Date(2020, 1, 10)),
//     "-"
//   );
// });
