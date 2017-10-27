'use strict';

/* global date2CanonicString, nullify */

describe('Cryptomedic.js', function() {
  describe('date2CanonicString', function() {
    it('should return null for null', function() {
      expect(date2CanonicString(null)).toEqual(null);
    });
  });

  describe('nullify', function() {
    it('should handle null', function() {
      expect(nullify(null)).toBe(null);
    });
    it('should handle "null"', function() {
      expect(nullify('null')).toBe(null);
    });
    it('should handle "?"', function() {
      expect(nullify('?')).toBe(null);
    });
    it('should handle numbers', function() {
      expect(nullify(123)).toBe(123);
    });
    it('should handle strings', function() {
      expect(nullify('hehehe')).toBe('hehehe');
    });
    it('should handle false', function() {
      expect(nullify(false)).toBe(false);
    });
    it('should handle true', function() {
      expect(nullify(true)).toBe(true);
    });
    it('should handle object', function() {
      expect(nullify({ a: 123, b: null, c: 'null', d: 456, e: '?', f: { g: 'null' } })).toEqual({ a: 123, b: null, c: null, d: 456, e: null, f: { g: null } });
    });
  });
});
