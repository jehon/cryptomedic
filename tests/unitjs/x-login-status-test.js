
describe("tests/unit/x-login-status-test.js", function() {
	webDescribe("initialized", `<x-login-status></x-login-status>`, function(element) {
		it("should be hidden when initialized simply", function() {
			expect(element().shadowRoot.querySelector("#logout").offsetHeight).toBe(0);

			// this.jh_keep = true;
		});

		it("should show username when set", function() {
			store.dispatch({ type: ACT_USER_LOGIN, payload: { username: "test" }});
			expect(element().shadowRoot.querySelector("#logout").offsetHeight).toBeGreaterThan(0);
			expect(element().shadowRoot.querySelector("#username").innerHTML).toBe("test");

			store.dispatch({ type: ACT_USER_LOGOUT});
			expect(element().shadowRoot.querySelector("#logout").offsetHeight).toBe(0);
			expect(element().shadowRoot.querySelector("#username").innerHTML).toBe("");
		});

		it("should logout when clicked", function(done) {
			store.dispatch({ type: ACT_USER_LOGIN, payload: { username: "test" }});

			JHElement.fireOn(element().shadowRoot.querySelector("#logout"), "click");

			setTimeout(() => {
				expect(element().shadowRoot.querySelector("#logout").offsetHeight).toBe(0);
				expect(element().shadowRoot.querySelector("#username").innerHTML).toBe("");
				done();
			}, 1);
		});
	});
});
