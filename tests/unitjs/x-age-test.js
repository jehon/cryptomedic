
import { fn, webDescribe } from './athelpers.js';
import { fromBirthDate, fromBirthDateTo } from '../../app/elements/widgets/x-age.js';

describe(fn(import.meta.url), function () {
    describe('BirthDate2Age', function () {
        const now = new Date(2010, 6, 1);
        const nowPlus5 = new Date(2015, 6, 1);

        // Same
        it('should handle yearOfBirth of string/4 vs. same', function () {
            expect(fromBirthDateTo('2000', '2000')).toBe(0);
        });

        it('should handle yearOfBirth of string/4 vs. same string/04', function () {
            expect(fromBirthDateTo('2000', '2000-01')).toBe(0);
        });

        it('should handle yearOfBirth of string/7 vs. same', function () {
            expect(fromBirthDateTo('2000-01', '2000-01')).toBe(0);
        });

        // String/7 vs...
        it('should handle yearOfBirth of string/7 vs. string/7', function () {
            expect(fromBirthDateTo('2000-05', '2010-05')).toBe(10);
        });

        it('should handle yearOfBirth of string/7 vs. string/7', function () {
            expect(fromBirthDateTo('2000-05', '2010-06')).toBe(10 + 1 / 12);
        });

        it('should handle yearOfBirth of string/7 vs. date', function () {
            expect(fromBirthDateTo('2000-05', now)).toBe(10 + 2 / 12);
        });

        // String/4 vs...
        it('should handle yearOfBirth of string/4 vs. string/7', function () {
            expect(fromBirthDateTo('2000', '2010-06')).toBe(10 + 5 / 12);
        });

        it('should handle yearOfBirth of string/4 vs. date', function () {
            expect(fromBirthDateTo('2000', now)).toBe(10.5);
        });

        // Int vs...
        it('should handle yearOfBirth of number vs. date', function () {
            expect(fromBirthDateTo(2000, now)).toBe(10.5);
        });

        // Date vs...
        it('should handle yearOfBirth of date vs. date', function () {
            expect(fromBirthDateTo(now, nowPlus5)).toBe(4 + 11 / 12);
        });

        it('should handle yearOfBirth of date vs. date (format object)', function () {
            expect(fromBirthDateTo(now, nowPlus5)).toEqual(4 + 11 / 12);
        });

        it('should handle yearOfBirth of date vs. date (format number)', function () {
            expect(fromBirthDateTo(now, nowPlus5)).toEqual(4 + 11 / 12);
        });

        // Invalid
        it('should handle empty yearOfBirth', function () {
            expect(() => fromBirthDateTo('', nowPlus5)).toThrow();
        });

        it('should handle empty yearOfBirth', function () {
            expect(() => fromBirthDateTo(null, nowPlus5)).toThrow();
        });

        it('should handle yearOfBirth invalid', function () {
            expect(() => fromBirthDateTo('199', nowPlus5)).toThrow();
        });

        it('should handle yearOfBirth invalid (format object)', function () {
            expect(() => fromBirthDateTo('199', nowPlus5)).toThrow();
        });

        it('should handle yearOfBirth invalid (format object)', function () {
            expect(() => fromBirthDateTo('199', nowPlus5)).toThrow();
        });

        it('should handle ref invalid (format object)', function () {
            expect(() => fromBirthDateTo('2000', '199')).toThrow();
        });
    });

    // TODO: remove
    describe('BirthDate2Age (legacy)', function () {
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
            })).toBe('?');
        });

        it('should handle empty yearOfBirth', function () {
            expect(fromBirthDate(null, {
                reference: nowPlus5
            })).toBe('?');
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
        it('should show nothing', function () {
            expect(element().innerHTML).toBe('Date is missing');
            expect(() => element().value).toThrow();
            expect(element().getAttribute('error')).toBe('DataMissingException#date');
        });
    });

    webDescribe('x-age', '<x-age value="x"></x-age>', function (element) {
        it('should show an error', function () {
            expect(element().innerHTML).toBe('Date is too short');
            expect(() => element().value).toThrow();
            expect(element().getAttribute('error')).toBe('DataInvalidException#date');
        });
    });

    webDescribe('x-age', '<x-age value="2019-01-12"></x-age>', function (element) {
        it('should show a value', function () {
            expect(element().innerHTML).not.toBe('');
            expect(element().hasAttribute('error')).toBeFalse();
            expect(element().value).toBeGreaterThan(1);
        });
    });

    webDescribe('x-age', '<x-age value="2019-01-12" ref="2020-01-13"></x-age>', function (element) {
        it('should show a value', function () {
            expect(element().innerHTML).toBe('1y0m');
            expect(element().hasAttribute('error')).toBeFalse();
            expect(element().value).toBe(1);
        });
    });
});
