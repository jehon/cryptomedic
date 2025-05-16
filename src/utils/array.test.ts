import assert from "node:assert";
import test from "node:test";
import { nArray } from "./array";

test("string2date", () => {
  assert.deepEqual(nArray([]), []);
  assert.deepEqual(nArray([1, 2, 3]), [1, 2, 3]);
  assert.deepEqual(nArray(undefined), []);
});
