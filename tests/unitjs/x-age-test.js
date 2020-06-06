
import { fn, webDescribe } from './athelpers.js';
import { fromBirthDate } from '../../app/elements/widgets/x-age.js';

describe(fn(import.meta.url), function () {
    describe('BirthDate2Age', function () {
        const now = new Date(2010, 6, 1);
        const nowPlus5 = new Date(2015, 6, 1);

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

    webDescribe('x-age', '<x-age></x-age>', function (element) {
        xit('should show nothing', function () {
            expect(element().innerHTML).toBe('');
            expect(element().hasAttribute('error')).toBeTrue();
            expect(() => element().value).toThrow();
        });
    });

    webDescribe('x-age', '<x-age value="x"></x-age>', function (element) {
        xit('should show an error', function () {
            expect(element().innerHTML).toBe('');
            expect(element().hasAttribute('error')).toBeTrue();
            expect(() => element().value).toThrow();
        });
    });

    webDescribe('x-age', '<x-age value="2019-01-12"></x-age>', function (element) {
        xit('should show a value', function () {
            expect(element().innerHTML).not.toBe('');
            expect(element().hasAttribute('error')).toBeFalse();
            expect(element().value).toBeGreaterThan(1);
        });
    });

    webDescribe('x-age', '<x-age value="2019-01-12" ref="2020-01-13"></x-age>', function (element) {
        xit('should show a value', function () {
            expect(element().innerHTML).toBe('1 year old');
            expect(element().hasAttribute('error')).toBeFalse();
            expect(element().value).toBe(1);
        });
    });
});
