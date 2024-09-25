import { expect } from "expect";
import test from "node:test";

import Price from "./price";

test("with empty loader", function () {
  const data = new Price();
  expect(data).toBeInstanceOf(Price);
});

test("with data loading at construction time", function () {
  const data = new Price({
    id: 123
  });

  expect(data.id).toBe(123);
});
