"use strict";

describe("The browser", function() {
	it("should parse date correctly", function() {
		var d = new Date("2001-02-03");
		expect(d.getUTCDate()).toBe(3);
		expect(d.getUTCMonth() + 1).toBe(2);
		expect(d.getUTCFullYear()).toBe(2001);
	});
});