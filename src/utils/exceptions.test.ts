import { expect } from "expect";
import test from "node:test";

import {
  ApplicationException,
  DataInvalidException,
  DataMissingException,
  DataOutOfBoundException
} from "./exceptions.js";

test("should inherit from Error", function () {
  const ae = new ApplicationException("my message");

  expect(ae instanceof Error).toBeTruthy();
  expect(ae instanceof ApplicationException).toBeTruthy();
  expect(ae.message).toBe("my message");
});

test("should have DataMissingException", function () {
  const ae = new DataMissingException("data");

  expect(ae instanceof ApplicationException).toBeTruthy();
  expect(ae instanceof Error).toBeTruthy();
  expect(ae instanceof DataMissingException).toBeTruthy();
  expect(ae.message).toBe("'data' is not defined");
  expect(ae.getKey()).toBe("data");
});

test("should have DataInvalidException", function () {
  const ae = new DataInvalidException("data");

  expect(ae instanceof ApplicationException).toBeTruthy();
  expect(ae instanceof Error).toBeTruthy();
  expect(ae.message).toBe("'data' is invalid");
  expect(ae.getKey()).toBe("data");
});

test("should have DataOutOfBoundException", function () {
  const ae = new DataOutOfBoundException("data", 5, [0, 1]);

  expect(ae instanceof ApplicationException).toBeTruthy();
  expect(ae instanceof Error).toBeTruthy();
  expect(ae.message).toBe("'data' is out-of-bounds: 5 [0 -> 1]");
  expect(ae.getKey()).toBe("data");
});
