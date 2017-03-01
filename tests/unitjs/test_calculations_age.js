'use strict';

describe('calculations.age', function() {
  var now = new Date(2010, 6, 1);
  describe('BirthDate2Age', function() {
    var now2 = new Date(2015, 6, 1);
    // Same
    it('should handle yearOfBirth of string/4 vs. same', function() {
      expect(calculations.age.fromBirthDate('2000', { reference: '2000' })).toBe('0y0m');
    });
    it('should handle yearOfBirth of string/4 vs. same string/04', function() {
      expect(calculations.age.fromBirthDate('2000', { reference: '2000-01' })).toBe('0y0m');
    });
    it('should handle yearOfBirth of string/7 vs. same', function() {
      expect(calculations.age.fromBirthDate('2000-01', { reference: '2000-01' })).toBe('0y0m');
    });

    // String/7 vs...
    it('should handle yearOfBirth of string/7 vs. string/7', function() {
      expect(calculations.age.fromBirthDate('2000-05', { reference: '2010-05' })).toBe('10y0m');
    });
    it('should handle yearOfBirth of string/7 vs. string/7', function() {
      expect(calculations.age.fromBirthDate('2000-05', { reference: '2010-06' })).toBe('10y1m');
    });
    it('should handle yearOfBirth of string/7 vs. date', function() {
      expect(calculations.age.fromBirthDate('2000-05', { reference: now })).toBe('10y2m');
    });

    // String/4 vs...
    it('should handle yearOfBirth of string/4 vs. string/7', function() {
      expect(calculations.age.fromBirthDate('2000', { reference: '2010-06' })).toBe('10y5m');
    });
    it('should handle yearOfBirth of string/4 vs. date', function() {
      expect(calculations.age.fromBirthDate('2000', { reference: now })).toBe('10y6m');
    });

    // Int vs...
    it('should handle yearOfBirth of number vs. date', function() {
      expect(calculations.age.fromBirthDate(2000, { reference: now })).toBe('10y6m');
    });

    // Date vs...
    it('should handle yearOfBirth of date vs. date', function() {
      expect(calculations.age.fromBirthDate(now, { reference: now2 })).toBe('4y11m');
    });
    it('should handle yearOfBirth of date vs. date (format object)', function() {
      expect(calculations.age.fromBirthDate(now, { reference: now2, format: 'object' })).toEqual({ years: 4, months: 11 });
    });
    it('should handle yearOfBirth of date vs. date (format number)', function() {
      expect(calculations.age.fromBirthDate(now, { reference: now2, format: 'number' })).toEqual(4 + 11/12);
    });

    // Invalid
    it('should handle yearOfBirth invalid', function() {
      expect(calculations.age.fromBirthDate('199', { reference: now2 })).toBe('?');
    });
    it('should handle yearOfBirth invalid (format object)', function() {
      expect(calculations.age.fromBirthDate('199', { reference: now2, format: 'object' })).toBe(null);
    });
    it('should handle yearOfBirth invalid (format object)', function() {
      expect(calculations.age.fromBirthDate('199', { reference: now2, format: 'number' })).toBe(null);
    });
  });

  describe('age and birth', function() {
    it('should return age from birth adequately', function() {
      expect(calculations.age.fromBirthDate(calculations.age.toBirthDate(10, 5, now), { reference: now })).toBe('10y5m');
    });
  });
});
