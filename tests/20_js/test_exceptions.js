"use strict";

describe("ApplicationException", function() {
	  it("should inherit from Error", function() {
		  var ae = new ApplicationException("my message");
		
		  expect(ae instanceof Error).toBeTruthy();
		  expect(ae.getMessage()).toBe("my message");
	});
});
