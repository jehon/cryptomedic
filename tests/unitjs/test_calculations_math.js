'use strict';

describe('calculations.math', function() {
  var poly = { 'min': [], 'medium': [], 'max': []};
  poly.medium.push([0, 1]);
  poly.medium.push([1, 2]);
  poly.medium.push([2, 4]);
  poly.medium.push([5, 10]);
  poly.medium.push([10, 20]);

  poly.min.push([0, 0]);
  poly.min.push([10, 15]);
  poly.max.push([0, 2]);
  poly.max.push([10, 30]);

  it('evaluatePoly correctly', function() {
    expect(calculations.math.evaluatePoly(poly.medium, -1)).toBeNaN();
    expect(calculations.math.evaluatePoly(poly.medium, 11)).toBeNaN();
    expect(calculations.math.evaluatePoly(poly.medium, 0)).toBe(1);
    expect(calculations.math.evaluatePoly(poly.medium, 1)).toBe(2);
    expect(calculations.math.evaluatePoly(poly.medium, 5)).toBe(10);
    expect(calculations.math.evaluatePoly(poly.medium, 10)).toBe(20);
    expect(calculations.math.evaluatePoly(poly.medium, 1.5)).toBe(3);
    expect(calculations.math.evaluatePoly(poly.medium, 7.5)).toBe(15);
    expect(calculations.math.evaluatePoly(poly.medium, 1.1)).toBe(2.2);
  });

  it('calculate standard deviations', function() {
    expect(calculations.math.stdDeviation(poly, 0, 1)).toBe(0);
    expect(calculations.math.stdDeviation(poly, 0, 0)).toBe(-calculations.math.sigma);
    expect(calculations.math.stdDeviation(poly, 0, 2)).toBe(calculations.math.sigma);
    expect(calculations.math.stdDeviation(poly, -1, 2)).toBe('#Out of bound#');
  });
});
