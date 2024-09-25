import { expect } from "expect";
import test from "node:test";

import Pojo from "./pojo";

test("with empty loader", function () {
  const data = new Pojo({});
  expect(data instanceof Pojo).toBeTruthy();
});

test("with data loading at construction time", function () {
  const data = new Pojo({
    id: 123,
    created_at: new Date(),
    updated_at: new Date(),
    last_user: "data1"
  });

  expect(data.id).toBe(123);

  data.id = 123;
  expect(data.uid()).toBe("pojo.123");
});

test("would interpret notSet correctly", function () {
  const data = new Pojo({});
  expect(data.last_user).toBeUndefined();

  data.last_user = "someone";
  expect(data.last_user).toBe("someone");
});
