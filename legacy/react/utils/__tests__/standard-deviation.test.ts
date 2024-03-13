import { expect, test } from "@jest/globals";

import {
  _evaluatePoly,
  _stdDeviation,
  stdDeviationFor,
  sigma
} from "../standard-deviation.js";
import {
  DataInvalidException,
  DataOutOfBoundException,
  ConfigurationException
} from "../exceptions.js";

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
  expect(_evaluatePoly(poly.medium, -1)).toBeNaN();
  expect(_evaluatePoly(poly.medium, 11)).toBeNaN();
  expect(_evaluatePoly(poly.medium, 0)).toBe(1);
  expect(_evaluatePoly(poly.medium, 1)).toBe(2);
  expect(_evaluatePoly(poly.medium, 5)).toBe(10);
  expect(_evaluatePoly(poly.medium, 10)).toBe(20);
  expect(_evaluatePoly(poly.medium, 1.5)).toBe(3);
  expect(_evaluatePoly(poly.medium, 7.5)).toBe(15);
  expect(_evaluatePoly(poly.medium, 1.1)).toBe(2.2);
});

test("calculate standard deviations", function () {
  expect(_stdDeviation(poly, 0, 1)).toBe(0);
  expect(_stdDeviation(poly, 0, 0)).toBe(-sigma);
  expect(_stdDeviation(poly, 0, 2)).toBe(sigma);
  expect(() => _stdDeviation(poly, -1, 2)).toThrow(
    new DataOutOfBoundException("value", -1, [0, 10])
  );

  expect(stdDeviationFor("m", "weight_kg", 10, 32)).toBe(0);
  expect(stdDeviationFor("m", "weight_kg", 10, 42)).toBeCloseTo(sigma);
  expect(stdDeviationFor("f", "weight_kg", 3, 13.8)).toBe(0);
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
