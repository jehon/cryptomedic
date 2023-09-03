import { test, expect } from "@jest/globals";

import Price from "../price.js";

test("with empty loader", function () {
  let data = new Price();
  expect(data).toBeInstanceOf(Price);
  expect(Price.getBaseUrl()).toBe("admin/prices");
});

test("with data loading at construction time", function () {
  let data = new Price({
    id: 123
  });

  expect(data.id).toBe(123);
});
