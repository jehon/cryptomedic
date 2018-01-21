
describe("tests/unit/x-waiting-test.js", function() {
	webDescribe("initialized", `<x-waiting><div style='width: 200px; height: 100px; background-color: red;'>Content</div></x-waiting>`, function(element) {
		it("should be hidden when initialized simply", function() {
			expect(element().isBlocked()).toBeFalsy();
			expect(element().shadowRoot.querySelector("img").offsetWidth > 0).toBeFalsy();
		});

		it("should show()", function() {
			element().block();
			expect(element().isBlocked()).toBeTruthy();
			expect(element().shadowRoot.querySelector("img").offsetWidth > 0).toBeTruthy();
		});

		it("should hide()", function() {
			element().free();
			expect(element().isBlocked()).toBeFalsy();
			expect(element().shadowRoot.querySelector("img").offsetWidth > 0).toBeFalsy();
		});

		describe("run around a promise", function() {
			beforeEach(function() {
				jasmine.clock().install();
			});

			afterEach(function() {
				jasmine.clock().uninstall();
			});

			it("should be shown and hidden when the promise succeed", function(done) {
				let p = new Promise(function(resolve, reject) {
					setTimeout(() => resolve(), 100);
				});

				expect(element().isBlocked()).toBeFalsy();
				let p2 = element().aroundPromise(p);
				expect(element().isBlocked()).toBeTruthy();
				jasmine.clock().tick(150);
				p2.then(() => {
					expect(element().isBlocked()).toBeFalsy();
					done();	
				});
			});

			it("should be shown and hidden if the promise fail", function(done) {
				let p = new Promise(function(resolve, reject) {
					setTimeout(() => reject(), 100);
				});

				expect(element().isBlocked()).toBeFalsy();
				let p2 = element().aroundPromise(p);
				expect(element().isBlocked()).toBeTruthy();
				jasmine.clock().tick(150);
				p2.catch(() => {
					expect(element().isBlocked()).toBeFalsy();
					done();	
				});
			});
		});
	});
});
