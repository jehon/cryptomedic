import { expect, test } from "@jest/globals";
import { passThrough } from "../promises";

test("promise", async () => {
  expect(await Promise.resolve(123).then(passThrough(() => 456))).toBe(123);
});
