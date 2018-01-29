
describe("tests/unit/x-requestor-test.js", function() {
	webDescribe("initialized", `<x-requestor><div style='width: 200px; height: 100px; background-color: red;'>Content</div></x-requestor>`, function(element) {
		it("should be hidden when initialized simply", function() {
			expect(element().shadowRoot.querySelector("x-waiting").isBlocked()).toBeFalsy();
			expect(element().shadowRoot.querySelector("x-overlay").isBlocked()).toBeFalsy();
			expect(element().isRequesting()).toBeFalsy();
			expect(element().isFailed()).toBeFalsy();
		});


		describe("with success", function() {
			beforeEach(function() {
				this.ref = { "test": 123 };
				spyOn(window, "fetch").and.callFake(() => {
					const response = new Response(JSON.stringify(this.ref), {
						status: 200
					});
					return Promise.resolve(response);
				});
			})

			it("should make a get request", function(done) {
				const promise = element().request({ url: "/", data: { test: 1 }});

				expect(element().shadowRoot.querySelector("x-waiting").isBlocked()).toBeTruthy();
				expect(element().shadowRoot.querySelector("x-overlay").isBlocked()).toBeFalsy();
				expect(element().isRequesting()).toBeTruthy();
				expect(element().isFailed()).toBeFalsy();

				promise.then(response => {
					expect(element().shadowRoot.querySelector("x-waiting").isBlocked()).toBeFalsy();
					expect(element().shadowRoot.querySelector("x-overlay").isBlocked()).toBeFalsy();
					expect(element().isRequesting()).toBeFalsy();
					expect(element().isFailed()).toBeFalsy();
					expect(response.asJson).toEqual(this.ref);
					done();
				})
				.catch(error => {
					done.fail(error);
				})
			});

			it("should make a put request", function(done) {
				const promise = element().request({ url: "/", data: { test: 1 }, method: "PUT"});

				promise.then(response => {
					expect(element().shadowRoot.querySelector("x-waiting").isBlocked()).toBeFalsy();
					expect(element().shadowRoot.querySelector("x-overlay").isBlocked()).toBeFalsy();
					expect(element().isRequesting()).toBeFalsy();
					expect(element().isFailed()).toBeFalsy();
					expect(response.asJson).toEqual(this.ref);
					done();
				})
				.catch(error => {
					done.fail(error);
				})
			});
		});
	});
});
