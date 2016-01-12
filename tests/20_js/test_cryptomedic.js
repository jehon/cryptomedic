"use strict";

describe("Cryptomedic.js", function() {
  describe("date2CanonicString", function() {
    it("should return 0000-00-00 00:00:00 GMT+0000 for null", function() {
      expect(appState().helpers.date2CanonicString(null)).toEqual("0000-00-00 00:00:00 GMT+0000");
    });
    it("should return information that could be understood through appState().helpers.objectify", function() {
      var d = new Date();
      d.setMilliseconds(0);
      expect(appState().helpers.objectify(appState().helpers.date2CanonicString(d))).toEqual(d);
    });
  });

  describe("appState().helpers.objectify", function() {
    var d = new Date();
    d.setMilliseconds(0);
    var sd = appState().helpers.date2CanonicString(d);
    it("should do nothing with simple types", function() {
      expect(appState().helpers.objectify()).toBe(null);
      expect(appState().helpers.objectify(null)).toBe(null);
      expect(appState().helpers.objectify(123)).toBe(123);
      expect(appState().helpers.objectify("azer")).toBe("azer");
      expect(appState().helpers.objectify(d)).toBe(d);
    });
    it("should parse " + sd + " correctly", function() {
      expect(appState().helpers.objectify(sd)).toEqual(d);
    });
    it("should parse " + appState().helpers.date2CanonicString(null) + " correctly", function() {
      expect(appState().helpers.objectify("0000-00-00 00:00:00 GMT+0000")).toEqual(null);
    });
    it("should parse recursively arrays and objects", function() {
      expect(appState().helpers.objectify({ a: sd })).toEqual({ a: d });
      expect(appState().helpers.objectify([ sd ])).toEqual([ d ]);
      expect(appState().helpers.objectify({ a: [ sd ]})).toEqual({ a: [ d ]});
    });
  });

  describe("stringify", function() {
    var d = new Date();
    d.setMilliseconds(0);
    var sd = appState().helpers.date2CanonicString(d);
    it("should do nothing with simple types", function() {
      expect(stringify(null)).toBe(null);
      expect(stringify(null)).toBe(null);
      expect(stringify(123)).toBe(123);
      expect(stringify("azer")).toBe("azer");
    });
    it("should encode " + sd + " correctly", function() {
      expect(stringify(d)).toEqual(sd);
    });
    it("should parse recursively arrays and objects", function() {
      expect(stringify({ a: d })).toEqual({ a: sd });
      expect(stringify([ d ])).toEqual([ sd ]);
      expect(stringify({ a: [ d ]})).toEqual({ a: [ sd ]});
    });
  });

  describe("nullify", function() {
    it("should handle null", function() {
      expect(nullify(null)).toBe(null);
    });
    it("should handle 'null'", function() {
      expect(nullify("null")).toBe(null);
    });
    it("should handle '?'", function() {
      expect(nullify("?")).toBe(null);
    });
    it("should handle numbers", function() {
      expect(nullify(123)).toBe(123);
    });
    it("should handle strings", function() {
      expect(nullify("hehehe")).toBe("hehehe");
    });
    it("should handle false", function() {
      expect(nullify(false)).toBe(false);
    });
    it("should handle true", function() {
      expect(nullify(true)).toBe(true);
    });
    it("should handle object", function() {
      expect(nullify({ a: 123, b: null, c: "null", d: 456, e: "?", f: { g: "null" } })).toEqual({ a: 123, b: null, c: null, d: 456, e: null, f: { g: null } });
    });
  });
});
