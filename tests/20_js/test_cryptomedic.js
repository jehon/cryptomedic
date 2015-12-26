"use strict";


describe("Cryptomedic.js", function() {
	describe("math", function() {
		var poly = { 'min': [], 'medium': [], 'max': []};
		poly.medium.push([0, 1]);
		poly.medium.push([1, 2]);
		poly.medium.push([2, 4]);
		poly.medium.push([5, 10]);
		poly.medium.push([10, 20]);

		poly.min.push([0, 0]);
		poly.min.push([10, 15]);
		poly.max.push([0, 2]);
		poly.max.push([10, 30]);

		it("evaluatePoly correctly", function() {
			expect(cryptomedic.math.evaluatePoly(poly.medium, -1)).toBeNaN();
			expect(cryptomedic.math.evaluatePoly(poly.medium, 11)).toBeNaN();
			expect(cryptomedic.math.evaluatePoly(poly.medium, 0)).toBe(1);
			expect(cryptomedic.math.evaluatePoly(poly.medium, 1)).toBe(2);
			expect(cryptomedic.math.evaluatePoly(poly.medium, 5)).toBe(10);
			expect(cryptomedic.math.evaluatePoly(poly.medium, 10)).toBe(20);
			expect(cryptomedic.math.evaluatePoly(poly.medium, 1.5)).toBe(3);
			expect(cryptomedic.math.evaluatePoly(poly.medium, 7.5)).toBe(15);
			expect(cryptomedic.math.evaluatePoly(poly.medium, 1.1)).toBe(2.2);
		});

		it("calculate standard deviations", function() {
			expect(cryptomedic.math.stdDeviation(poly, 0, 1)).toBe(0);
			expect(cryptomedic.math.stdDeviation(poly, 0, 0)).toBe(-cryptomedic.math.sigma);
			expect(cryptomedic.math.stdDeviation(poly, 0, 2)).toBe(cryptomedic.math.sigma);
			expect(cryptomedic.math.stdDeviation(poly, -1, 2)).toBe("#Out of bound#");
		});
	});

	describe("date2CanonicString", function() {
		it("should return 0000-00-00 00:00:00 GMT+0000 for null", function() {
			expect(date2CanonicString(null)).toEqual("0000-00-00 00:00:00 GMT+0000");
		});
		it("should return information that could be understood through objectify", function() {
			var d = new Date();
			d.setMilliseconds(0);
			expect(objectify(date2CanonicString(d))).toEqual(d);
		});
	});

	describe("objectify", function() {
		var d = new Date();
		d.setMilliseconds(0);
		var sd = date2CanonicString(d);
		it("should do nothing with simple types", function() {
			expect(objectify()).toBe(null);
			expect(objectify(null)).toBe(null);
			expect(objectify(123)).toBe(123);
			expect(objectify("azer")).toBe("azer");
			expect(objectify(d)).toBe(d);
		});
		it("should parse " + sd + " correctly", function() {
			expect(objectify(sd)).toEqual(d);
		});
		it("should parse " + date2CanonicString(null) + " correctly", function() {
			expect(objectify("0000-00-00 00:00:00 GMT+0000")).toEqual(null);
		});
		it("should parse recursively arrays and objects", function() {
			expect(objectify({ a: sd })).toEqual({ a: d });
			expect(objectify([ sd ])).toEqual([ d ]);
			expect(objectify({ a: [ sd ]})).toEqual({ a: [ d ]});
		});
	});

	describe("stringify", function() {
		var d = new Date();
		d.setMilliseconds(0);
		var sd = date2CanonicString(d);
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

	var now = new Date(2010, 6, 1);
	describe("calculateAgeFromBirth", function() {
		var now2 = new Date(2015, 6, 1);
		// Same
		it("should handle yearOfBirth of string/4 vs. same", function() {
			expect(cryptomedic.calculateAgeFromBirth("2000", "2000")).toBe("0y0m");
		});
		it("should handle yearOfBirth of string/4 vs. same string/04", function() {
			expect(cryptomedic.calculateAgeFromBirth("2000", "2000-01")).toBe("0y0m");
		});
		it("should handle yearOfBirth of string/7 vs. same", function() {
			expect(cryptomedic.calculateAgeFromBirth("2000-01", "2000-01")).toBe("0y0m");
		});

		// String/7 vs...
		it("should handle yearOfBirth of string/7 vs. string/7", function() {
			expect(cryptomedic.calculateAgeFromBirth("2000-05", "2010-05")).toBe("10y0m");
		});
		it("should handle yearOfBirth of string/7 vs. string/7", function() {
			expect(cryptomedic.calculateAgeFromBirth("2000-05", "2010-06")).toBe("10y1m");
		});
		it("should handle yearOfBirth of string/7 vs. date", function() {
			expect(cryptomedic.calculateAgeFromBirth("2000-05", now)).toBe("10y2m");
		});

		// String/4 vs...
		it("should handle yearOfBirth of string/4 vs. string/7", function() {
			expect(cryptomedic.calculateAgeFromBirth("2000", "2010-06")).toBe("10y5m");
		});
		it("should handle yearOfBirth of string/4 vs. date", function() {
			expect(cryptomedic.calculateAgeFromBirth("2000", now)).toBe("10y6m");
		});

		// Int vs...
		it("should handle yearOfBirth of number vs. date", function() {
			expect(cryptomedic.calculateAgeFromBirth(2000, now)).toBe("10y6m");
		});

		// Date vs...
		it("should handle yearOfBirth of date vs. date", function() {
			expect(cryptomedic.calculateAgeFromBirth(now, now2)).toBe("4y11m");
		});

		// Invalid
		it("should handle yearOfBirth invalid", function() {
			expect(cryptomedic.calculateAgeFromBirth("199", now2)).toBe("?");
		});
	});

	describe("age and birth", function() {
		it("should return age from birth adequately", function() {
			expect(cryptomedic.calculateAgeFromBirth(cryptomedic.calculateBirthFromAge(10, 5, now), now)).toBe('10y5m');
		});
	});
});
