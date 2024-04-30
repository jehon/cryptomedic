import { expect, test } from "@jest/globals";

import Price from "../price.js";

test("with empty loader", function () {
  const data = new Price();
  expect(data).toBeInstanceOf(Price);
  expect(Price.getBaseUrl()).toBe("admin/prices");
});

test("with data loading at construction time", function () {
  const data = new Price({
    id: 123
  });

  expect(data.id).toBe(123);
});
