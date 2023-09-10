import { test, expect } from "@jest/globals";

import Pojo from "../pojo.js";

test("with empty loader", function () {
  var data = new Pojo();
    expect(data instanceof Pojo).toBeTruthy();
});

test("with data loading at construction time", function () {
  var data = new Pojo({
    id: 123,
    created_at: new Date(),
    updated_at: new Date(),
    last_user: "data1"
  });

  expect(data.id).toBe(123);

  data.id = 123;
  data.getModel = () => "Data";
  expect(data.uid()).toBe("Data-123");
});

test("would interpret notSet correctly", function () {
  var data = new Pojo();
  expect(data.last_user).toBeUndefined();
  expect(data.isSet("last_user")).toBeFalsy();
  expect(data.isNotZero("last_user")).toBeFalsy();

  data.last_user = "someone";
  expect(data.last_user).toBe("someone");
  expect(data.isSet("last_user")).toBeTruthy();
  expect(data.isNotZero("last_user")).toBeTruthy();
});
