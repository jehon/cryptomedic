import { expect, test } from '@jest/globals';

import {
  ApplicationException,
  DataMissingException,
  ConfigurationMissingException,
  DataInvalidException,
  DataOutOfBoundException
} from "../exceptions.js";

test("should inherit from Error", function () {
  var ae = new ApplicationException("my message");

  expect(ae instanceof Error).toBeTruthy();
  expect(ae.id).toBe("ApplicationException");
  expect(ae.getMessage()).toBe("my message");
});

test("should have DataMissingException", function () {
  var ae = new DataMissingException("data");

  expect(ae instanceof ApplicationException).toBeTruthy();
  expect(ae instanceof Error).toBeTruthy();
  expect(ae.getMessage()).toBe("Data is missing");
  expect(ae.id).toBe("DataMissingException#data");
  expect(ae.data).toBe("data");

  var ae2 = new DataMissingException("data", "is not null");
  expect(ae2.message).toBe("Data is not null");

  var ae3 = new DataMissingException();
  expect(ae3.message).toBe("Some data is missing");
});

test("should have DataInvalidException", function () {
  var ae = new DataInvalidException("data");

  expect(ae instanceof ApplicationException).toBeTruthy();
  expect(ae instanceof Error).toBeTruthy();
  expect(ae.getMessage()).toBe("Data is invalid");
  expect(ae.data).toBe("data");

  var ae2 = new DataInvalidException("data", "is not null");
  expect(ae2.message).toBe("Data is not null");

  var ae3 = new DataInvalidException();
  expect(ae3.message).toBe("Some data is invalid");
});

test("should have DataOutOfBoundException", function () {
  var ae = new DataOutOfBoundException("data");

  expect(ae instanceof ApplicationException).toBeTruthy();
  expect(ae instanceof Error).toBeTruthy();
  expect(ae.getMessage()).toBe("Data is out-of-bounds");
  expect(ae.data).toBe("data");

  var ae2 = new DataOutOfBoundException("data", [0, 1]);
  expect(ae2.message).toBe("Data is out-of-bounds [0 -> 1]");

  var ae3 = new DataOutOfBoundException();
  expect(ae3.message).toBe("Some data is out-of-bounds");
});

test("should have ConfigurationMissingException", function () {
  var ae = new ConfigurationMissingException("data");

  expect(ae.getMessage()).toBe("Configuration 'data' is missing.");
  expect(ae.data).toBe("data");
});
