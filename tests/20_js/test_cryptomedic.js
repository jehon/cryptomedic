'use strict';

import objectify          from 'helpers/objectify';
import { nullify }        from 'helpers/service_backend';
import date2CanonicString from 'helpers/date2CanonicString';

describe('Cryptomedic.js', function() {
  describe('date2CanonicString', function() {
    it('should return null for null', function() {
      expect(date2CanonicString(null)).toEqual(null);
    });
    it('should return information that could be understood through objectify', function() {
      var d = new Date();
      d.setMilliseconds(0);
      expect(objectify(date2CanonicString(d))).toEqual(d);
    });
  });

  describe('objectify', function() {
    var d = new Date();
    d.setMilliseconds(0);
    var sd = date2CanonicString(d);
    it('should do nothing with simple types', function() {
      expect(objectify()).toBe(null);
      expect(objectify(null)).toBe(null);
      expect(objectify(123)).toBe(123);
      expect(objectify('azer')).toBe('azer');
      expect(objectify(d)).toBe(d);
    });
    it('should parse ' + sd + ' correctly', function() {
      expect(objectify(sd)).toEqual(d);
    });
    it('should parse null correctly', function() {
      expect(objectify(null)).toEqual(null);
    });
    it('should parse recursively arrays and objects', function() {
      expect(objectify({ a: sd })).toEqual({ a: d });
      expect(objectify([ sd ])).toEqual([ d ]);
      expect(objectify({ a: [ sd ]})).toEqual({ a: [ d ]});
    });
  });

  // describe('stringify', function() {
  //   var d = new Date();
  //   d.setMilliseconds(0);
  //   var sd = date2CanonicString(d);
  //   it('should do nothing with simple types', function() {
  //     expect(stringify(null)).toBe(null);
  //     expect(stringify(null)).toBe(null);
  //     expect(stringify(123)).toBe(123);
  //     expect(stringify('azer')).toBe('azer');
  //   });
  //   it('should encode ' + sd + ' correctly', function() {
  //     expect(stringify(d)).toEqual(sd);
  //   });
  //   it('should parse recursively arrays and objects', function() {
  //     expect(stringify({ a: d })).toEqual({ a: sd });
  //     expect(stringify([ d ])).toEqual([ sd ]);
  //     expect(stringify({ a: [ d ]})).toEqual({ a: [ sd ]});
  //   });
  // });

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
