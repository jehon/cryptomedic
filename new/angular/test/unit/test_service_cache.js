"use strict";

describe("perishableCache", function() {
	var pc = new perishableCache(0, 0);
	
	it("should be empty at startup", function() {
		expect(pc.isCached("123")).toBeFalsy();
	});
	it("should allow store and retrieve", function() {
		expect(pc.isCached(123)).toBeFalsy();
		expect(pc.set(123, 456)).toEqual(456);
		expect(pc.isCached(123)).toBeTruthy();
		expect(pc.get(123)).toEqual(456);
		expect(pc.perish(123, 456)).toBeTruthy();
		expect(pc.isCached(123)).toBeFalsy();
	});
	it("should handle non-cached items", function() {
		expect(pc.isCached(123)).toBeFalsy();
		expect(pc.perish(123)).toBeTruthy();
		expect(pc.get(123)).toEqual(null);
	});
});
