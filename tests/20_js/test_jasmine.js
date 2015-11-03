'use strict';

describe('Jasmine', function() {
	it('should work as "expect"', function() {
		var a = true;
		expect(a).toBe(true);
		expect(a).toEqual(true);
	});

	it('prints jasmine version', function() {
		expect(jasmine.version).toMatch("2.3.4");
	});

	it('manage exceptions', function() {
		expect(function() { throw "test"; }).toThrow();
		expect(function() { throw "test"; }).toThrow("test");
		expect(function() { throw new Error("test"); }).toThrow();
		expect(function() { throw new Error("test"); }).toThrow(new Error("test"));
		expect(function() { throw new DataMissingException("test"); }).toThrow();
		expect(function() { throw new DataMissingException("test"); }).toThrow(new DataMissingException("test"));
	});
});
