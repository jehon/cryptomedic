import { fn } from "./athelpers.js";
import {
  _evaluatePoly,
  _stdDeviation,
  stdDeviationFor,
  sigma
} from "../../../legacy/app-old/v2/js/standard-deviation.js";
import {
  DataInvalidException,
  DataOutOfBoundException,
  ConfigurationMissingException,
  ConfigurationException
} from "../../../src/utils/exceptions.js";

describe(fn(import.meta.url), function () {
  const poly = {
    min: [],
    medium: [],
    max: []
  };

  poly.min.push([0, 0]);
  poly.min.push([10, 15]);

  poly.medium.push([0, 1]);
  poly.medium.push([1, 2]);
  poly.medium.push([2, 4]);
  poly.medium.push([5, 10]);
  poly.medium.push([10, 20]);

  poly.max.push([0, 2]);
  poly.max.push([10, 30]);

  it("evaluatePoly correctly", function () {
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

  it("calculate standard deviations", function () {
    expect(_stdDeviation(poly, 0, 1)).toBe(0);
    expect(_stdDeviation(poly, 0, 0)).toBe(-sigma);
    expect(_stdDeviation(poly, 0, 2)).toBe(sigma);
    expect(() => _stdDeviation(poly, -1, 2)).toThrow(
      new DataOutOfBoundException()
    );

    expect(stdDeviationFor("m", "weight_kg", 10, 32)).toBe(0);
    expect(stdDeviationFor("m", "weight_kg", 10, 42)).toBeCloseTo(sigma);
    expect(stdDeviationFor("f", "weight_kg", 3, 13.8)).toBe(0);
    expect(() => stdDeviationFor("f", "invalid", 3, 13.8)).toThrow(
      jasmine.any(ConfigurationMissingException)
    );
    expect(() => stdDeviationFor("invalid", "weight_kg", 3, 13.8)).toThrow(
      jasmine.any(DataInvalidException)
    );
    expect(() => stdDeviationFor("m", "weight_kg", 99, 13.8)).toThrow(
      jasmine.any(DataOutOfBoundException)
    );

    // https://cheatsheets.joshuatz.com/cheatsheets/v2/js/jsdoc/
    expect(() =>
      stdDeviationFor(
        "m",
        "weight_kg",
        /** @type {number} */ (/** @type {*} */ ("a")),
        13.8
      )
    ).toThrow(jasmine.any(ConfigurationException));
    expect(() =>
      stdDeviationFor(
        "m",
        "weight_kg",
        3,
        /** @type {number} */ (/** @type {*} */ ("a"))
      )
    ).toThrow(jasmine.any(ConfigurationException));
  });
});
