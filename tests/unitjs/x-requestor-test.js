
describe("tests/unit/x-requestor-test.js", function() {
	const buildErrorResponse = function(status = 200, message = false) {
		const response = new Response(JSON.stringify(), {
			status: status,
			statusText: message
		});
		return response;
	}

	webDescribe("initialized", `<x-requestor><div style='width: 200px; height: 100px; background-color: red;'>Content</div></x-requestor>`, function(element) {
		it("should be hidden when initialized simply", function() {
			expect(element().shadowRoot.querySelector("x-waiting").isBlocked()).toBeFalsy();
			expect(element().shadowRoot.querySelector("x-overlay").isBlocked()).toBeFalsy();
			expect(element().isRequesting()).toBeFalsy();
			expect(element().isFailed()).toBeFalsy();
		});

		describe("should match URL", function() {
			it("should make an absolute request", function() {
				spyOn(window, "fetch").and.callFake((request) => new Promise((resolve, reject) => resolve(new Response(request.url, {}))));
				const promise = element().request({ url: "/baseUrl", data: { test: 1 }});
				promise.then(response => expect(response.asText.endsWith(`/baseUrl?test=1`)).toBeTruthy());
			});

			it("should make an relative request", function() {
				spyOn(window, "fetch").and.callFake((request) => new Promise((resolve, reject) => resolve(new Response(request.url, {}))));
				const promise = element().request({ url: "relativeUrl", data: { test: 1 }});
				promise.then(response => expect(response.asText.endsWith(`/api/${API_VERSION}/relativeUrl?test=1`)).toBeTruthy());
			});
		});

		describe("with success", function() {
			beforeEach(function() {
				this.ref = { "test": 123 };
				spyOn(window, "fetch").and.callFake(() => {
					return new Promise((resolve, reject) => {
						resolve(new Response(JSON.stringify(this.ref), {
							status: 200
						}));
					});
				});
			});

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

			it("should display string messages when requested", function() {
				element().showFailure("Test message");
				expect(element().isRequesting()).toBeFalsy();
				expect(element().isFailed()).toBeTruthy();
				expect(element().shadowRoot.querySelector("#errorMsg").innerText).toContain("Test message");
			});

			it("should display object messages when requested", function() {
				element().showFailure({ label: "Test message" });
				expect(element().isRequesting()).toBeFalsy();
				expect(element().isFailed()).toBeTruthy();
				expect(element().shadowRoot.querySelector("#errorContent").innerText).toContain("label");
				expect(element().shadowRoot.querySelector("#errorContent").innerText).toContain("Test message");
			});

			it("should display response messages when requested", function() {
				element().showFailure(buildErrorResponse(404, "Not Found"));
				expect(element().isRequesting()).toBeFalsy();
				expect(element().isFailed()).toBeTruthy();
				expect(element().shadowRoot.querySelector("#errorMsg").innerText).toContain("Not Found");
				expect(element().shadowRoot.querySelector("#errorContent").innerText).toContain("404");
			});

			it("should display TypeError messages when requested", function() {
				element().showFailure(new TypeError());
				expect(element().isRequesting()).toBeFalsy();
				expect(element().isFailed()).toBeTruthy();
				expect(element().shadowRoot.querySelector("#errorMsg").innerText).toContain("Network Error");
				expect(element().shadowRoot.querySelector("#errorContent").innerText).toContain("Something went very wrong");
			});
		});

		describe("with timeout", function() {
			beforeEach(function() {
				this.ref = { "test": 123 };
				spyOn(window, "fetch").and.callFake(() => {
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							resolve(new Response(JSON.stringify(this.ref), {
								status: 200
							}));
						}, 5000);
					});
				});
			})

			it("should handle time-out requests", function(done) {
				const promise = element().request({ timeout: 0.001 });

				promise.then(response => {
					done.fail("We should be in catch");
				})
				.catch(error => {
					expect(element().shadowRoot.querySelector("x-waiting").isBlocked()).toBeFalsy();
					expect(element().shadowRoot.querySelector("x-overlay").isBlocked()).toBeTruthy();
					expect(element().isRequesting()).toBeFalsy();
					expect(element().isFailed()).toBeTruthy();
					expect(error.timeoutSecs).toEqual(0.001);
					done();
				})
			});
		});

		describe("with general error", function() {
			beforeEach(function() {
				spyOn(window, "fetch").and.callFake(() => {
					this.ref = "Error message";
					return new Promise((resolve, reject) => {
						reject(new Response(this.ref, {}));
					});
				});
			})

			it("should handle time-out requests", function(done) {
				const promise = element().request({ timeout: 0.001 });

				promise.then(response => {
					done.fail("We should be in catch");
				})
				.catch(error => {
					expect(element().shadowRoot.querySelector("x-waiting").isBlocked()).toBeFalsy();
					expect(element().shadowRoot.querySelector("x-overlay").isBlocked()).toBeTruthy();
					expect(element().isRequesting()).toBeFalsy();
					expect(element().isFailed()).toBeTruthy();
					done();
				})
			});
		});
	});
});
