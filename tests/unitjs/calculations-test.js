
import { evaluatePoly, stdDeviation, sigma } from '../../app/js/math.js';
import { fromBirthDate, toBirthDate, atConsultTime } from '../../app/js/age.js';

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

    const now = new Date(2010, 6, 1);
    const nowPlus5 = new Date(2015, 6, 1);

    describe('calculations.age', function () {
        describe('BirthDate2Age', function () {
            // Same
            it('should handle yearOfBirth of string/4 vs. same', function () {
                expect(fromBirthDate('2000', {
                    reference: '2000'
                })).toBe('0y0m');
            });
            it('should handle yearOfBirth of string/4 vs. same string/04', function () {
                expect(fromBirthDate('2000', {
                    reference: '2000-01'
                })).toBe('0y0m');
            });
            it('should handle yearOfBirth of string/7 vs. same', function () {
                expect(fromBirthDate('2000-01', {
                    reference: '2000-01'
                })).toBe('0y0m');
            });

            // String/7 vs...
            it('should handle yearOfBirth of string/7 vs. string/7', function () {
                expect(fromBirthDate('2000-05', {
                    reference: '2010-05'
                })).toBe('10y0m');
            });
            it('should handle yearOfBirth of string/7 vs. string/7', function () {
                expect(fromBirthDate('2000-05', {
                    reference: '2010-06'
                })).toBe('10y1m');
            });
            it('should handle yearOfBirth of string/7 vs. date', function () {
                expect(fromBirthDate('2000-05', {
                    reference: now
                })).toBe('10y2m');
            });

            // String/4 vs...
            it('should handle yearOfBirth of string/4 vs. string/7', function () {
                expect(fromBirthDate('2000', {
                    reference: '2010-06'
                })).toBe('10y5m');
            });
            it('should handle yearOfBirth of string/4 vs. date', function () {
                expect(fromBirthDate('2000', {
                    reference: now
                })).toBe('10y6m');
            });

            // Int vs...
            it('should handle yearOfBirth of number vs. date', function () {
                expect(fromBirthDate(2000, {
                    reference: now
                })).toBe('10y6m');
            });

            // Date vs...
            it('should handle yearOfBirth of date vs. date', function () {
                expect(fromBirthDate(now, {
                    reference: nowPlus5
                })).toBe('4y11m');
            });
            it('should handle yearOfBirth of date vs. date (format object)', function () {
                expect(fromBirthDate(now, {
                    reference: nowPlus5,
                    format: 'object'
                })).toEqual({
                    years: 4,
                    months: 11
                });
            });
            it('should handle yearOfBirth of date vs. date (format number)', function () {
                expect(fromBirthDate(now, {
                    reference: nowPlus5,
                    format: 'number'
                })).toEqual(4 + 11 / 12);
            });

            // Invalid
            it('should handle empty yearOfBirth', function () {
                expect(fromBirthDate('', {
                    reference: nowPlus5
                })).toBe('');
            });

            it('should handle empty yearOfBirth', function () {
                expect(fromBirthDate(null, {
                    reference: nowPlus5
                })).toBe('');
            });

            it('should handle yearOfBirth invalid', function () {
                expect(fromBirthDate('199', {
                    reference: nowPlus5
                })).toBe('?');
            });
            it('should handle yearOfBirth invalid (format object)', function () {
                expect(fromBirthDate('199', {
                    reference: nowPlus5,
                    format: 'object'
                })).toBe(null);
            });
            it('should handle yearOfBirth invalid (format object)', function () {
                expect(fromBirthDate('199', {
                    reference: nowPlus5,
                    format: 'number'
                })).toBe(null);
            });
        });

        describe('age and birth', function () {
            it('should return age from birth adequately', function () {
                expect(fromBirthDate(toBirthDate(10, 5, now), {
                    reference: now
                })).toBe('10y5m');
            });
        });
    });

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
