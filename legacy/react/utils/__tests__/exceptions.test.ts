import { expect, test } from "@jest/globals";

import {
  ApplicationException,
  DataInvalidException,
  DataMissingException,
  DataOutOfBoundException
} from "../exceptions.js";

test("should inherit from Error", function () {
  var ae = new ApplicationException("my message");

  expect(ae instanceof Error).toBeTruthy();
  expect(ae instanceof ApplicationException).toBeTruthy();
  expect(ae.message).toBe("my message");
});

test("should have DataMissingException", function () {
  var ae = new DataMissingException("data");

  expect(ae instanceof ApplicationException).toBeTruthy();
  expect(ae instanceof Error).toBeTruthy();
  expect(ae instanceof DataMissingException).toBeTruthy();
  expect(ae.message).toBe("'data' is not defined");
  expect(ae.getKey()).toBe("data");
});

test("should have DataInvalidException", function () {
  var ae = new DataInvalidException("data");

  expect(ae instanceof ApplicationException).toBeTruthy();
  expect(ae instanceof Error).toBeTruthy();
  expect(ae.message).toBe("'data' is invalid");
  expect(ae.getKey()).toBe("data");
});

test("should have DataOutOfBoundException", function () {
  var ae = new DataOutOfBoundException("data", 5, [0, 1]);

  expect(ae instanceof ApplicationException).toBeTruthy();
  expect(ae instanceof Error).toBeTruthy();
  expect(ae.message).toBe("'data' is out-of-bounds: 5 [0 -> 1]");
  expect(ae.getKey()).toBe("data");
});
