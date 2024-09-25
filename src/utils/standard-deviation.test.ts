import { expect } from "expect";
import assert from "node:assert";
import test from "node:test";
import {
  ConfigurationException,
  DataInvalidException,
  DataOutOfBoundException
} from "./exceptions";
import {
  _evaluatePoly,
  _stdDeviation,
  sigma,
  stdDeviationFor
} from "./standard-deviation";

const poly = {
  min: [
    [0, 0],
    [10, 15]
  ],
  medium: [
    [0, 1],
    [1, 2],
    [2, 4],
    [5, 10],
    [10, 20]
  ],
  max: [
    [0, 2],
    [10, 30]
  ]
};

test("evaluatePoly correctly", function () {
  assert.equal(_evaluatePoly(poly.medium, -1), NaN);
  assert.equal(_evaluatePoly(poly.medium, 11), NaN);
  assert.equal(_evaluatePoly(poly.medium, 0), 1);
  assert.equal(_evaluatePoly(poly.medium, 1), 2);
  assert.equal(_evaluatePoly(poly.medium, 5), 10);
  assert.equal(_evaluatePoly(poly.medium, 10), 20);
  assert.equal(_evaluatePoly(poly.medium, 1.5), 3);
  assert.equal(_evaluatePoly(poly.medium, 7.5), 15);
  assert.equal(_evaluatePoly(poly.medium, 1.1), 2.2);
});

test("calculate standard deviations", function () {
  assert.equal(_stdDeviation(poly, 0, 1), 0);
  assert.equal(_stdDeviation(poly, 0, 0), -sigma);
  assert.equal(_stdDeviation(poly, 0, 2), sigma);
  expect(() => _stdDeviation(poly, -1, 2)).toThrow(
    new DataOutOfBoundException("value", -1, [0, 10])
  );

  assert.equal(stdDeviationFor("m", "weight_kg", 10, 32), 0);
  expect(stdDeviationFor("m", "weight_kg", 10, 42)).toBeCloseTo(sigma);
  assert.equal(stdDeviationFor("f", "weight_kg", 3, 13.8), 0);
  expect(() => stdDeviationFor("f", "invalid", 3, 13.8)).toThrow(
    new ConfigurationException("Unknown serie: invalid")
  );
  expect(() => stdDeviationFor("invalid", "weight_kg", 3, 13.8)).toThrow(
    new DataInvalidException("sex", "invalid")
  );
  expect(() => stdDeviationFor("m", "weight_kg", 99, 13.8)).toThrow(
    new DataOutOfBoundException("value", 99, [0, 20])
  );
});
