
describe("tests/unit/x-overlay-test.js", function() {
	webDescribe("initialized", `<x-overlay><div style='width: 200px; height: 100px'>Content</div></x-overlay>`, function(element) {
		it("should be hidden when initialized simply", function() {
			expect(element().isBlocked()).toBeFalsy();
		});

		it("should be react to clicks", function() {
			expect(element().isBlocked()).toBeFalsy();
			element().block();
			expect(element().isBlocked()).toBeTruthy();
			JHElement.fireOn(element().shadowRoot.querySelector("#close"), "click");
			expect(element().isBlocked()).toBeFalsy();
		});
	});
});
