
describe("tests/unit/x-waiting-value-object-test.js", function() {
	webDescribe("initialized", `<x-waiting-value-object></x-waiting-value-object>`, function(element) {
		it("should be blocked when initialized", function() {
			expect(element().isBlocked()).toBeTruthy();
		});

		it("should free when value is set", function() {
			element().value = { a: 123 };
			expect(element().isBlocked()).toBeFalsy();
		});

		it("should block when value is null", function() {
			element().value = null;
			expect(element().isBlocked()).toBeTruthy();
		});

	});
});
