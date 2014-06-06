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
	
	describe("jsonString2Date", function() {
		var d = new Date();
		d.setMilliseconds(0);
		var sd = d.getFullYear() + 
			"-" + 
			("00" + (d.getMonth() + 1)).substr(-2) + 
			"-" +
			("00" + (d.getDate())).substr(-2) +
			" " +
			("00" + d.getHours()).substr(-2) +
 			":" +
			("00" + d.getMinutes()).substr(-2) +
 			":" +
			("00" + d.getSeconds()).substr(-2) +
			" GMT+" + 
			("0000" + (-(new Date()).getTimezoneOffset()/60 * 100)).substr(-4);
		it("should do nothing with simple types", function() {
			expect(jsonString2Date()).toBe(null);
			expect(jsonString2Date(null)).toBe(null);
			expect(jsonString2Date(123)).toBe(123);
			expect(jsonString2Date("azer")).toBe("azer");
			expect(jsonString2Date(d)).toBe(d);
		});
		it("should parse " + sd + " correctly", function() {
			expect(jsonString2Date(sd)).toEqual(d);
		});
		it("should parse 0000-00-00 correctly", function() {
			expect(jsonString2Date("0000-00-00")).toEqual(null);
		});
		it("should parse recursively arrays and objects", function() {
			expect(jsonString2Date({ a: sd })).toEqual({ a: d });
			expect(jsonString2Date([ sd ])).toEqual([ d ]);
			expect(jsonString2Date({ a: [ sd ]})).toEqual({ a: [ d ]});
		});
	});
});