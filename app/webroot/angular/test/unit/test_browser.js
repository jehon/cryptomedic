"use strict";

describe("The browser", function() {
	it("should parse date correctly", function() {
		var d = new Date("2001-02-03");
		expect(d.getDate()).toBe(3);
		expect(d.getMonth() + 1).toBe(2);
		expect(d.getFullYear()).toBe(2001);
	});
});