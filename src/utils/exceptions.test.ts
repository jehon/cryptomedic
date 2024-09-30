import test from "node:test";

import assert from "node:assert";
import {
  ApplicationException,
  DataInvalidException,
  DataMissingException,
  DataOutOfBoundException
} from "./exceptions";

test("should inherit from Error", function () {
  const ae = new ApplicationException("my message");

  assert(ae instanceof Error);
  assert(ae instanceof ApplicationException);
  assert.equal(ae.message, "my message");
});

test("should have DataMissingException", function () {
  const ae = new DataMissingException("data");

  assert(ae instanceof ApplicationException);
  assert(ae instanceof Error);
  assert(ae instanceof DataMissingException);
  assert.equal(ae.message, "'data' is not defined");
  assert.equal(ae.getKey(), "data");
});

test("should have DataInvalidException", function () {
  const ae = new DataInvalidException("data");

  assert(ae instanceof ApplicationException);
  assert(ae instanceof Error);
  assert.equal(ae.message, "'data' is invalid");
  assert.equal(ae.getKey(), "data");
});

test("should have DataOutOfBoundException", function () {
  const ae = new DataOutOfBoundException("data", 5, [0, 1]);

  assert(ae instanceof ApplicationException);
  assert(ae instanceof Error);
  assert.equal(ae.message, "'data' is out-of-bounds: 5 [0 -> 1]");
  assert.equal(ae.getKey(), "data");
});
