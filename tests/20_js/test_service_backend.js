"use strict";


describe("service_backend", function() {
	  describe("nullify", function() {
		  var now2 = new Date(2015, 6, 1);
		// Same
		  it("should handle null", function() {
			  expect(nullify(null)).toBe(null);
		});

		  it("should handle 'null'", function() {
			  expect(nullify("null")).toBe(null);
		});

		  it("should handle '?'", function() {
			  expect(nullify("?")).toBe(null);
		});

		  it("should handle anything else", function() {
			  expect(nullify(123)).toBe(123);
		});

		  it("should handle anything else", function() {
			  expect(nullify("123")).toBe("123");
		});

	});
});
