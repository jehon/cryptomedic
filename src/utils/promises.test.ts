import assert from "node:assert";
import test from "node:test";
import { passThrough } from "./promises";

test("promise", async () => {
  assert.equal(await Promise.resolve(123).then(passThrough(() => 456)), 123);
});
