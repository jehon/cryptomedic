import assert from "node:assert";
import test from "node:test";
import { DataInvalidException, DataOutOfBoundException } from "./exceptions";
import {
  _evaluatePoly,
  _stdDeviation,
  sigma,
  StatLines,
  stdDeviationFor
} from "./standard-deviation";

const poly: StatLines = {
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
  assert.throws(
    () => _stdDeviation(poly, -1, 2),
    new DataOutOfBoundException("value", -1, [0, 10])
  );

  assert.equal(stdDeviationFor("Male", "weight_kg", 10, 32), 0);
  assert(Math.abs(stdDeviationFor("Male", "weight_kg", 10, 42) - sigma) < 0.01);
  assert.equal(stdDeviationFor("Female", "weight_kg", 3, 13.8), 0);
  assert.throws(
    () => stdDeviationFor("anything", "weight_kg", 99, 13.8),
    new DataInvalidException("sex", "anything")
  );
  assert.throws(
    () => stdDeviationFor("Male", "weight_kg", 99, 13.8),
    new DataOutOfBoundException("value", 99, [0, 20])
  );
});
