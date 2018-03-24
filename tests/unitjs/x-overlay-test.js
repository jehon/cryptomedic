/* eslint-env jasmine */
/* global webDescribe, JHElement */

describe('tests/unit/x-overlay-test.js', function() {
	webDescribe('initialized', '<x-overlay><div style=\'width: 200px; height: 100px; background-color: red\'>Content</div></x-overlay>', function(element) {
		it('should be hidden when initialized simply', function() {
			expect(element().isBlocked()).toBeFalsy();
			expect(element().shadowRoot.querySelector('#overlay').offsetWidth).toBe(0);
			expect(element().shadowRoot.querySelector('#close').offsetWidth).toBe(0);
			expect(element().shadowRoot.querySelector('#overlay').style.zIndex).toBe('10');
		});

		it('should show()', function() {
			element().block();
			expect(element().isBlocked()).toBeTruthy();
			expect(element().shadowRoot.querySelector('#overlay').offsetWidth).toBeGreaterThan(0);
		});

		it('should hide()', function() {
			element().free();
			expect(element().isBlocked()).toBeFalsy();
			expect(element().shadowRoot.querySelector('#overlay').offsetWidth).toBe(0);
		});

		it('should be react to clicks', function() {
			expect(element().isBlocked()).toBeFalsy();
			element().block();
			expect(element().isBlocked()).toBeTruthy();
			JHElement.fireOn(element().shadowRoot.querySelector('#close'), 'click');
			expect(element().isBlocked()).toBeFalsy();
		});

		describe('run around a promise', function() {
			beforeEach(function() {
				jasmine.clock().install();
			});

			afterEach(function() {
				jasmine.clock().uninstall();
			});

			it('should be shidden when the promise succeed', function(done) {
				let p = new Promise(function(resolve) {
					setTimeout(() => resolve(), 100);
				});

				expect(element().isBlocked()).toBeFalsy();
				let p2 = element().aroundPromise(p);
				expect(element().isBlocked()).toBeFalsy();
				jasmine.clock().tick(150);
				p2.then(() => {
					expect(element().isBlocked()).toBeFalsy();
					done();	
				});
			});

			it('should be shown and hidden if the promise fail', function(done) {
				let p = new Promise(function(resolve, reject) {
					setTimeout(() => reject(), 100);
				});

				expect(element().isBlocked()).toBeFalsy();
				let p2 = element().aroundPromise(p);
				expect(element().isBlocked()).toBeFalsy();
				jasmine.clock().tick(150);
				p2.catch(() => {
					expect(element().isBlocked()).toBeTruthy();
					done();	
				});
			});
		});
	});

	webDescribe('initialized', '<x-overlay closable z-index=123 >Content</x-overlay>', function(element) {
		it('should handle z-index parameter', function() {
			element().block();
			expect(element().shadowRoot.querySelector('#overlay').style.zIndex).toBe('123');
		});

		it('should handle closable parameter', function() {
			element().block();
			expect(element().shadowRoot.querySelector('#close').offsetWidth).toBeGreaterThan(0);
		});
	});
});
