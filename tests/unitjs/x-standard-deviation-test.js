
import { evaluatePoly, stdDeviation, sigma } from '../../app/elements/widgets/x-standard-deviation.js';

describe('calculations', function () {
    const poly = {
        'min': [],
        'medium': [],
        'max': []
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

    describe('calculations.math', function () {
        it('evaluatePoly correctly', function () {
            expect(evaluatePoly(poly.medium, -1)).toBeNaN();
            expect(evaluatePoly(poly.medium, 11)).toBeNaN();
            expect(evaluatePoly(poly.medium, 0)).toBe(1);
            expect(evaluatePoly(poly.medium, 1)).toBe(2);
            expect(evaluatePoly(poly.medium, 5)).toBe(10);
            expect(evaluatePoly(poly.medium, 10)).toBe(20);
            expect(evaluatePoly(poly.medium, 1.5)).toBe(3);
            expect(evaluatePoly(poly.medium, 7.5)).toBe(15);
            expect(evaluatePoly(poly.medium, 1.1)).toBe(2.2);
        });

        it('calculate standard deviations', function () {
            expect(stdDeviation(poly, 0, 1)).toBe(0);
            expect(stdDeviation(poly, 0, 0)).toBe(-sigma);
            expect(stdDeviation(poly, 0, 2)).toBe(sigma);
            expect(stdDeviation(poly, -1, 2)).toBe('#Out of bound#');
        });
    });
});
