/* eslint-env jasmine */
/* global webDescribe, JHElement */
/* global extractPath, API_VERSION */
/* global store, ACT_USER_LOGIN */

describe('tests/unit/x-requestor-test.js', function() {
	const buildErrorResponse = function(status = 200, message = false) {
		const response = new Response(JSON.stringify(), {
			status: status,
			statusText: message
		});
		return response;
	};

	webDescribe('initialized', '<x-requestor><div style=\'width: 200px; height: 100px; background-color: red;\'>Content</div></x-requestor>', function(element) {
		it('should be hidden when initialized simply', function() {
			expect(element().shadowRoot.querySelector('x-waiting').isBlocked()).toBeFalsy();
			expect(element().shadowRoot.querySelector('x-overlay').isBlocked()).toBeFalsy();
			expect(element().hasAttribute('running')).toBeFalsy();
			expect(element().isRequesting()).toBeFalsy();
			expect(element().isFailed()).toBeFalsy();
		});

		describe('should match URL', function() {
			it('should make an absolute request', function() {
				spyOn(window, 'fetch').and.callFake((request) => new Promise((resolve) => resolve(new Response(request.url, {}))));
				const promise = element().request({ url: '/baseUrl', data: { test: 1 }});
				promise.then(response => {
					expect(extractPath(response.url)).toBe('/baseUrl?test=1');
				});
			});

			it('should make an relative request', function() {
				spyOn(window, 'fetch').and.callFake((request) => new Promise((resolve) => resolve(new Response(request.url, {}))));
				const promise = element().request({ url: 'relativeUrl', data: { test: 1 }});
				promise.then(response => expect(response.url.endsWith(`/api/${API_VERSION}/relativeUrl?test=1`)).toBeTruthy());
			});
		});

		describe('with success', function() {
			beforeEach(function() {
				this.ref = { 'test': 123 };
				spyOn(window, 'fetch').and.callFake(() => {
					return new Promise((resolve) => {
						resolve(new Response(JSON.stringify(this.ref), {
							status: 200
						}));
					});
				});
			});

			it('should make a get request', function(done) {
				const promise = element().request({ url: '/', data: { test: 1 }});

				expect(element().shadowRoot.querySelector('x-waiting').isBlocked()).toBeTruthy();
				expect(element().shadowRoot.querySelector('x-overlay').isBlocked()).toBeFalsy();
				expect(element().hasAttribute('running')).toBeTruthy();
				expect(element().isRequesting()).toBeTruthy();
				expect(element().isFailed()).toBeFalsy();

				promise.then(response => {
					expect(element().shadowRoot.querySelector('x-waiting').isBlocked()).toBeFalsy();
					expect(element().shadowRoot.querySelector('x-overlay').isBlocked()).toBeFalsy();
					expect(element().hasAttribute('running')).toBeFalsy();
					expect(element().isRequesting()).toBeFalsy();
					expect(element().isFailed()).toBeFalsy();
					expect(response.asJson).toEqual(this.ref);
					done();
				})
					.catch(error => {
						done.fail(error);
					});
			});

			it('should make a put request', function(done) {
				const promise = element().request({ url: '/', data: { test: 1 }, method: 'PUT'});

				promise.then(response => {
					expect(element().shadowRoot.querySelector('x-waiting').isBlocked()).toBeFalsy();
					expect(element().shadowRoot.querySelector('x-overlay').isBlocked()).toBeFalsy();
					expect(element().hasAttribute('running')).toBeFalsy();
					expect(element().isRequesting()).toBeFalsy();
					expect(element().isFailed()).toBeFalsy();
					expect(response.asJson).toEqual(this.ref);
					done();
				})
					.catch(error => {
						done.fail(error);
					});
			});

			it('should display string messages when requested', function() {
				element().showFailure('Test message');
				expect(element().isRequesting()).toBeFalsy();
				expect(element().isFailed()).toBeTruthy();
				expect(element().shadowRoot.querySelector('#errorMsg').innerText).toContain('Test message');
			});

			it('should close error messages with button', function() {
				element().showFailure('Test message');
				expect(element().isFailed()).toBeTruthy();
				JHElement.fireOn(element().shadowRoot.querySelector('#closeButton'), 'click');
				expect(element().isFailed()).toBeFalsy();
			});

			it('should display object messages when requested', function() {
				element().showFailure({ label: 'Test message' });
				expect(element().isRequesting()).toBeFalsy();
				expect(element().isFailed()).toBeTruthy();
				expect(element().shadowRoot.querySelector('#errorContent').innerText).toContain('label');
				expect(element().shadowRoot.querySelector('#errorContent').innerText).toContain('Test message');
			});

			it('should display response messages when requested', function() {
				element().showFailure(buildErrorResponse(404, 'Not Found'));
				expect(element().isRequesting()).toBeFalsy();
				expect(element().isFailed()).toBeTruthy();
				expect(element().shadowRoot.querySelector('#errorMsg').innerText).toContain('Not Found');
				expect(element().shadowRoot.querySelector('#errorContent').innerText).toContain('404');
			});

			it('should logout on 401 Response messages', function() {
				store.dispatch({ type: ACT_USER_LOGIN, payload: 'blabla' });
				expect(store.getState().user).toBe('blabla');
				element().showFailure(buildErrorResponse(401, 'Unauthorized'));
				expect(store.getState().user).toBeFalsy();
			});

			it('should display TypeError messages when requested', function() {
				element().showFailure(new TypeError());
				expect(element().isRequesting()).toBeFalsy();
				expect(element().isFailed()).toBeTruthy();
				expect(element().shadowRoot.querySelector('#errorMsg').innerText).toContain('Network Error');
				expect(element().shadowRoot.querySelector('#errorContent').innerText).toContain('Something went very wrong');
			});

			it('should resquestAndFilter with filter', function(done) {
				element().requestAndFilter({});
				setTimeout(() => {
					expect(element().isFailed()).toBeFalsy();
					done();
				}, 100);
			});

			it('should resquestAndFilter with filter and have correct results', function(done) {
				element().requestAndFilter({})
					.then(({ asJson, ok, status }) => {
						expect(asJson).toEqual({ test: 123 });
						expect(ok).toBeTruthy();
						expect(status).toBe(200);
						done();
					});
			});

			it('should resquestAndFilter with without treated', function(done) {
				element().requestAndFilter({}, [ 404 ]);
				setTimeout(() => {
					expect(element().isFailed()).toBeFalsy();
					done();
				}, 100);
			});
		});

		describe('with 404', function() {
			beforeEach(function() {
				this.ref = { 'test': 123 };
				spyOn(window, 'fetch').and.callFake(() => {
					return new Promise((resolve) => {
						resolve(new Response('Data is not found', {
							status: 404
						}));
					});
				});
			});
			it('should resquestAndTreat with filter', function(done) {
				element().requestAndFilter({});
				setTimeout(() => {
					expect(element().isFailed()).toBeTruthy();
					done();
				}, 100);
			});

			it('should resquestAndTreat with without treated', function(done) {
				element().requestAndFilter({}, [ 404 ]);
				setTimeout(() => {
					expect(element().isFailed()).toBeFalsy();
					done();
				}, 100);
			});

			it('should resquestAndFilter with filter and have correct results', function(done) {
				element().requestAndFilter({}, [ 404 ])
					.then(({ asText, ok, status }) => {
						expect(asText).toEqual('Data is not found');
						expect(ok).toBeFalsy();
						expect(status).toBe(404);
						done();
					});
			});
		});
		describe('with timeout', function() {
			beforeEach(function() {
				this.ref = { 'test': 123 };
				spyOn(window, 'fetch').and.callFake(() => {
					return new Promise((resolve) => {
						setTimeout(() => {
							resolve(new Response(JSON.stringify(this.ref), {
								status: 200
							}));
						}, 5000);
					});
				});
			});

			it('should handle time-out requests', function(done) {
				const promise = element().request({ timeout: 0.001 });

				promise.then(() => {
					done.fail('We should be in catch');
				})
					.catch(error => {
						expect(element().shadowRoot.querySelector('x-waiting').isBlocked()).toBeFalsy();
						expect(element().shadowRoot.querySelector('x-overlay').isBlocked()).toBeTruthy();
						expect(element().hasAttribute('running')).toBeFalsy();
						expect(element().isRequesting()).toBeFalsy();
						expect(element().isFailed()).toBeTruthy();
						expect(error.timeoutSecs).toEqual(0.001);
						done();
					});
			});
		});

		describe('with general error', function() {
			beforeEach(function() {
				spyOn(window, 'fetch').and.callFake(() => {
					this.ref = 'Error message';
					return new Promise((resolve, reject) => {
						reject(new Response(this.ref, {}));
					});
				});
			});

			it('should handle time-out requests', function(done) {
				const promise = element().request({ timeout: 0.001 });

				promise.then(() => {
					done.fail('We should be in catch');
				})
					.catch(() => {
						expect(element().shadowRoot.querySelector('x-waiting').isBlocked()).toBeFalsy();
						expect(element().shadowRoot.querySelector('x-overlay').isBlocked()).toBeTruthy();
						expect(element().hasAttribute('running')).toBeFalsy();
						expect(element().isRequesting()).toBeFalsy();
						expect(element().isFailed()).toBeTruthy();
						done();
					});
			});
		});
	});
});
